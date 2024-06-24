# リポジトリ

## リポジトリ詳細を取得（全リポジトリ）
```bash
aws ecr describe-repositories
```

# ライフサイクル
## リポジトリのライフサイクルルールを取得
一括で全リポジトリのライフサイクルを取り出すことはできない。
```bash
aws ecr get-lifecycle-policy --repository-name <レポジトリ名>
```

## 全リポジトリのライフサイクルルールを取得

### 配列にリポジトリ名を入力
```bash
repositories=( \
"test-repository-1" \
"test-repository-2" \
"test-repository-3" \
)
```

### 値の確認
```
echo ${repositories[0]}
```

### ファイルに結果を出力
```bash
for repo in "${repositories[@]}"; do
    aws ecr get-lifecycle-policy --repository-name "$repo" >> output.json
done
```

### 値の確認
CloudShell等で実施し、output.jsonファイルをダウンロードする。
```
cat output.json
```