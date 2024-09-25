/** 
【解説】
PutTraceSegmentsCommand SDK を使用したX-Rayトレース取得処理。
このSDKのメリットはX-Rayデーモンを作成する必要がなく、ECSのサイドカーコンテナやEC2のX-Rayデーモンを建てる必要がない事。
その分お金がかからない。
デメリットはキャプチャが取得できない（かも？？？）なので、アプリ→DB間、アプリ→S3等のトレース内の各処理時間は取得できない事。
下記の様な使い方をする為、単純なメソッドの処理時間しか取得できない。

new XRay.trace("バッチ名", コールバック関数());
 */

import dayjs from "dayjs";
import { XRayClient, PutTraceSegmentsCommand } from "@aws-sdk/client-xray";
import crypto from "crypto";

/**
 * X-Rayクラス
 */
export class XRay {
  /** X-Rayクライアント */
  private readonly xRayClient;

  /** セグメント */
  private segment;

  /**
   * コンストラクタ
   */
  constructor() {
    this.xRayClient = new XRayClient();
    this.segment = {
      trace_id: "",
      id: "",
      start_time: 0,
      end_time: 0,
      name: "",
    };
  }

  /**
   * トレース
   * @param batchName バッチ名
   * @param callBack バッチ処理
   */
  async trace(batchName: string, callBack: any) {
    try {
      this.setTimeSegment("start");
      await callBack();
      this.setTimeSegment("end");

      // TODO: 環境変数から環境名を取得できるように実装する
      const stage = "dev";
      if (!stage)
        console.error(`環境変数の取得に失敗しました。[STAGE：${stage}]`);
      const segmentName = `${stage}-ctvpf-job-${batchName}`;

      await this.putSegment(segmentName);
    } catch (error: any) {
      console.error(error);
    }
  }

  /**
   * セグメント送信
   * @param segmentName セグメント名
   * @returns 処理結果
   */
  async putSegment(segmentName: string) {
    this.setParamsSegment(segmentName);
    const segmentJSONParsms = JSON.stringify(this.segment);
    const input = { TraceSegmentDocuments: [segmentJSONParsms] };

    // API処理
    try {
      const command = new PutTraceSegmentsCommand(input);
      const response = await this.xRayClient.send(command);
      console.log(JSON.stringify(response));
      return response;
    } catch (error: any) {
      // TDOO: エラーハンドリングを実装する
      switch (error?.name) {
        case "InvalidRequestException":
          console.error(error);
          break;
        case "ThrottledException":
          console.error(error);
          break;
        case "XRayServiceException":
          console.error(error);
          break;
        default:
          console.error(error);
      }
      throw error;
    }
  }

  /**
   * セグメント時間設定
   * 処理開始時間・終了時間を取得し、segment変数に値をセットする
   * 当処理で設定された時間（endTime - startTime）がX-Rayトレースに表示される
   * @param target X-Ray時刻計測モード
   */
  setTimeSegment(target: "start" | "end") {
    const currentUnixTime = this.getCurrentUnixTime();

    if (target === "start") {
      this.segment.start_time = currentUnixTime;
    } else {
      this.segment.end_time = currentUnixTime;
    }
  }

  /**
   * セグメントパラメータ設定
   * 処理時間以外の各種パラメータを設定する（設定された情報はX-Rayトレースに表示される）
   * @param segmentName セグメント名
   */
  setParamsSegment(segmentName: string) {
    const id = this.getHexId(16);
    const traceId = "1-" + this.getHexTime() + "-" + this.getHexId(24);

    this.segment.name = segmentName;
    this.segment.id = id;
    this.segment.trace_id = traceId;
  }

  /**
   * 現UNIX時間取得
   * @returns 現UNIX時間
   */
  getCurrentUnixTime() {
    return dayjs().unix();
  }

  /**
   * 16進数時間取得
   * AWS公式ドキュメントの手順に従って実装（https://docs.aws.amazon.com/ja_jp/xray/latest/devguide/xray-api-segmentdocuments.html）
   * リクエスト送信する時刻をUNIXタイム ⇒ 16進数に変換した値を作成し、trace_id の生成に利用する
   * @returns 16進数時間
   */
  getHexTime() {
    // UNIX時間（ミリ秒）変換
    const currentUnixTime = this.getCurrentUnixTime();
    // 16進数変換
    return Math.round(currentUnixTime).toString(16);
  }

  /**
   * 16進数ID取得
   * AWS公式ドキュメントの手順に従って実装（https://docs.aws.amazon.com/ja_jp/xray/latest/devguide/xray-api-segmentdocuments.html）
   * X-Rayトレースの96ビット識別子でグローバルに一意であり、24桁の16進数で表され、id, trace_id の生成に利用する
   * @param length サイズ
   * @returns 16進数ID
   */
  getHexId(length: number) {
    // 8ビット & 2進数の24のバイト列の配列を初期化
    const bytes = new Uint8Array(length);

    // 配列の値を0～255までの乱数値に変換（例：[60, 150, 215, 86, 162, 91, 181, 212,...4]）
    const ramdomNumArray = crypto.getRandomValues(bytes);

    // 整数 ⇒ 16進数に変換し、文字列結合（例：3c96d756a25bb5d4adcc841f142447bf6bdbbccea25192d8）
    let hex = "";
    for (let i = 0; i < ramdomNumArray.length; i++) {
      hex += ramdomNumArray[i].toString(16);
    }

    // 頭からn桁（引数のlength分）の文字列を取得（例：3c96d756a25bb5d4adcc841f）
    const cutText = hex.substring(0, length);

    return cutText;
  }
}
