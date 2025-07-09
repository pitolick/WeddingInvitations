export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          結婚式招待状 - フォントサンプル
        </h1>

        {/* Noto Sans JP */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Noto Sans JP</h2>
          <div className="space-y-2">
            <p className="font-noto text-lg">通常のテキスト - Noto Sans JP</p>
            <p className="font-noto font-light text-lg">
              軽量テキスト - Noto Sans JP Light
            </p>
            <p className="font-noto font-medium text-lg">
              中量テキスト - Noto Sans JP Medium
            </p>
            <p className="font-noto font-bold text-lg">
              太字テキスト - Noto Sans JP Bold
            </p>
          </div>
        </section>

        {/* Great Vibes */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Great Vibes</h2>
          <div className="space-y-2">
            <p className="font-great-vibes text-3xl text-pink-500">
              エレガントなタイトル - Great Vibes
            </p>
            <p className="font-great-vibes text-2xl text-lavender-500">
              ロマンチックなメッセージ - Great Vibes
            </p>
          </div>
        </section>

        {/* Berkshire Swash */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Berkshire Swash
          </h2>
          <div className="space-y-2">
            <p className="font-berkshire text-3xl text-yellow-600">
              装飾的なタイトル - Berkshire Swash
            </p>
            <p className="font-berkshire text-2xl text-lavender-600">
              特別なメッセージ - Berkshire Swash
            </p>
          </div>
        </section>

        {/* Rock Salt */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Rock Salt</h2>
          <div className="space-y-2">
            <p className="font-rock text-2xl text-pink-600">
              手書き風テキスト - Rock Salt
            </p>
            <p className="font-rock text-xl text-yellow-500">
              カジュアルなメッセージ - Rock Salt
            </p>
          </div>
        </section>

        {/* カラーパレットサンプル */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            カラーパレットサンプル
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-lavender-300 p-4 rounded-lg">
              <p className="font-noto text-sm">Lavender 300</p>
            </div>
            <div className="bg-lavender-500 p-4 rounded-lg">
              <p className="font-noto text-sm text-white">Lavender 500</p>
            </div>
            <div className="bg-yellow-400 p-4 rounded-lg">
              <p className="font-noto text-sm">Yellow 400</p>
            </div>
            <div className="bg-pink-500 p-4 rounded-lg">
              <p className="font-noto text-sm text-white">Pink 500</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
