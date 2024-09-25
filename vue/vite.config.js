import { fileURLToPath, URL } from "node:url";
import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";
// NOTE: コンポーネントをインポートせずに使用できるようになるプラグイン。Element UI Plusは頻繁に使用され、インポートの記述が増える為、本プラグインを導入した。
// =============================================================================
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// =============================================================================
import vue from "@vitejs/plugin-vue";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  console.log({ env });
  return {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    // NOTE: ViteはCommonJS Module（required）をESModule（import）に自動変換している。しかし、自動変換できないライブラリも存在する為、それらはこちらに記載する事で変換可能となる。
    build: {
      commonjsOptions: { include: [] },
    },
    // NOTE: 開発環境にて最適化（依存関係の解析、事前バンドルを実施するかどうか等々）を実施するかどうか設定する。
    // "disabled: false" にする事で最適化が有効となり、開発中のビルドが高速化する。
    optimizeDeps: {
      disabled: false,
    },
    // NOTE: assetsとして、取り扱って欲しい場合に明示的にこちらへ記載する。例えば、MacのQuickTimeの動画の拡張子がMOVだが、Vite標準ではこの拡張子はアセットとして取り扱ってくれない為、こちらのオプションへ記載する。
    assetsInclude: [],
    resolve: {
      // NOTE: エイリアスに設定した文字列を使って、import時のパスを簡潔にする。
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "./runtimeConfig": "./runtimeConfig.browser",
        "app-configs": resolve(
          __dirname,
          ["./src/config", env.VITE_APP_ENV, "js"].join(".")
        ),
      },
    },
    // NOTE: ローカルホストのポートを指定する
    server: {
      host: true,
      port: 8080,
    },
  };
});
