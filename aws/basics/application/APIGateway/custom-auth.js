// API Gatewayカスタム認証。Lambdaでカスタム認証を実施する。

'use strict';

// TODO: 後で削除
const { CognitoJwtVerifier } = require("aws-jwt-verify");

// TODO: 後でimportに変更する
// import { CognitoJwtVerifier } from "aws-jwt-verify";
// import { JwtInvalidClaimError } from "aws-jwt-verify/error";

// TODO: 環境変数を定義しなければならない
// NOTE: 定数
const USER_POOL_ID = "ap-northeast-1_XXXXXXXX";
const CLIENT_ID = "XXXXXXXXXXXXXXXXXXXX";

// Enum
const TokenKind = {
  idToken: 'id',
  accessToken: 'access',
};

const makeResponse = (principalId, effect, resource, isExpiredToken = false) => {
	// アクセス許可のオブジェクト
    const response = {
    	// TODO: 何を指定すべきか調査
        principalId: principalId,
        policyDocument: {
        Version: "2012-10-17",
        Statement: [
                {
                    Action: "execute-api:Invoke",
                    Effect: effect,
                    Resource: resource,
                },
            ],
        },
    };
    
    // アクセス許可 => レスポンスをそのまま返す
    if (effect === "Allow") return response;
    
    console.log("===>有効期限切れかどうか", isExpiredToken);
    
    // アクセス拒否の場合 => エラー情報を加えたオブジェクトをレスポンスに加える
    response.context = {
        cognitoError: JSON.stringify({
            isExpiredToken: isExpiredToken,
            message: isExpiredToken ? "トークン有効期限切れ" : "トークン認証エラー",
        }),
    };
    return response;
};

exports.lambdaHandler = async (event, context, callback) => {
	// AuthorizationヘッダーからIDトークンを取得
	const token = event.headers.Authorization;

	// Cognitoユーザー検証用のリクエストパラメーター
    const verifier = CognitoJwtVerifier.create({
      userPoolId: USER_POOL_ID,
      tokenUse: TokenKind.idToken,
      clientId: CLIENT_ID,
      includeRawJwtInErrors: true
    });
    
    try {
    	// APIでCognitoユーザーの検証を行う（エンコード、IDトークンの検証、有効期限のチェック）
    	const payload = await verifier.verify(token);
        console.log("Token is valid. Payload:", payload);
        
        // 正常に認証が成功した場合
        return makeResponse("user", "Allow", event.methodArn);
    } catch (err) {
	    // もし、有効期限が切れていれば JwtInvalidClaimError インスタンスタイプのエラーとなる
        // TODO: 後でJwtInvalidClaimErrorに変更する（今はimportでJwtInvalidClaimErrorが使えない為）
	    // if (err instanceof JwtInvalidClaimError) {
	    if (err?.rawJwt?.payload) {
	       console.error("JWT invalid because:", err.message);
           console.error("Raw JWT:", err.rawJwt.payload);
           
           return makeResponse("user", "Deny", event.methodArn, true);
	    }
	    // もし、有効期限より前の段階でエラーがあればこちらを返す
	    return makeResponse("user", "Deny", event.methodArn, false);
    }
};
