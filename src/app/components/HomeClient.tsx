"use client";

import { Input, TextArea, Select } from "./common/form";
import { Modal } from "./common/modal";
import { Card, CardHeader, CardContent } from "./common/card";
import { Navigation } from "./common/navigation";
import Button from "./common/button";
import { ModalSample } from "./ModalSample";
import { ImageModalSample } from "./ImageModalSample";
import FormSample from "./common/form/FormSample";
import { useState } from "react";

/**
 * @description 結婚式招待状のメインページのクライアントコンポーネント
 * @returns インタラクティブなコンポーネントを含むJSX要素
 */
export function HomeClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    attendance: "",
    phone: "",
    guests: "",
  });

  const navigationItems = [
    { id: "home", label: "ホーム", isActive: true },
    { id: "about", label: "私たちについて" },
    { id: "rsvp", label: "RSVP" },
    { id: "gallery", label: "ギャラリー" },
  ];

  const attendanceOptions = [
    { value: "", label: "選択してください", disabled: true },
    { value: "yes", label: "出席" },
    { value: "no", label: "欠席" },
    { value: "maybe", label: "検討中" },
  ];

  const guestsOptions = [
    { value: "", label: "人数を選択してください", disabled: true },
    { value: "1", label: "1名" },
    { value: "2", label: "2名" },
    { value: "3", label: "3名" },
    { value: "4", label: "4名" },
    { value: "5", label: "5名以上" },
  ];

  return (
    <>
      {/* ナビゲーション */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">ナビゲーション</h2>
        <Navigation
          items={navigationItems}
          onItemClick={(item) => console.log("Clicked:", item)}
          className="bg-white p-4 rounded-lg shadow-md"
        />
      </section>

      {/* フォームコンポーネント */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          フォームコンポーネント
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: value })}
            placeholder="お名前を入力してください"
            label="お名前"
            required
            type="text"
            maxLength={50}
            autoComplete="name"
            aria-describedby="name-help"
          />
          <Input
            value={formData.email}
            onChange={(value) => setFormData({ ...formData, email: value })}
            placeholder="メールアドレスを入力してください"
            label="メールアドレス"
            type="email"
            required
            autoComplete="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          />
          <Input
            value={formData.phone}
            onChange={(value) => setFormData({ ...formData, phone: value })}
            placeholder="電話番号を入力してください"
            label="電話番号"
            type="tel"
            autoComplete="tel"
            pattern="[0-9-]+"
          />
          <Select
            value={formData.attendance}
            onChange={(value) =>
              setFormData({ ...formData, attendance: value })
            }
            options={attendanceOptions}
            label="出席状況"
            required
            multiple={false}
            size={1}
          />
          <Select
            value={formData.guests}
            onChange={(value) => setFormData({ ...formData, guests: value })}
            options={guestsOptions}
            label="参加人数"
            required
            multiple={false}
            size={1}
          />
          <div className="md:col-span-2">
            <TextArea
              value={formData.message}
              onChange={(value) => setFormData({ ...formData, message: value })}
              placeholder="メッセージを入力してください"
              label="メッセージ"
              rows={4}
              maxLength={500}
              minLength={10}
              wrap="soft"
              spellCheck="true"
            />
          </div>
        </div>
      </section>

      {/* カードコンポーネント */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          カードコンポーネント
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card variant="default" hover>
            <CardHeader>
              <h3 className="font-noto text-lg font-semibold text-gray-900">
                デフォルトカード
              </h3>
            </CardHeader>
            <CardContent>
              <p className="font-noto text-gray-700">
                シンプルなカードコンポーネントです。
              </p>
            </CardContent>
          </Card>

          <Card variant="elevated" hover>
            <CardHeader>
              <h3 className="font-noto text-lg font-semibold text-gray-900">
                エレベーテッドカード
              </h3>
            </CardHeader>
            <CardContent>
              <p className="font-noto text-gray-700">
                影付きのカードコンポーネントです。
              </p>
            </CardContent>
          </Card>

          <Card variant="outlined" hover>
            <CardHeader>
              <h3 className="font-noto text-lg font-semibold text-gray-900">
                アウトラインカード
              </h3>
            </CardHeader>
            <CardContent>
              <p className="font-noto text-gray-700">
                枠線付きのカードコンポーネントです。
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ボタンコンポーネント */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          ボタンコンポーネント
        </h2>
        <div className="flex flex-wrap gap-4">
          <Button
            variant="primary"
            onClick={() => console.log("Primary clicked")}
          >
            プライマリボタン
          </Button>
          <Button
            variant="secondary"
            onClick={() => console.log("Secondary clicked")}
          >
            セカンダリボタン
          </Button>
          <Button
            variant="outline"
            onClick={() => console.log("Outline clicked")}
          >
            アウトラインボタン
          </Button>
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            モーダルを開く
          </Button>
        </div>
      </section>

      {/* フォントサンプル */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          フォントサンプル
        </h2>

        {/* Noto Sans JP */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Noto Sans JP</h3>
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
        </div>

        {/* Great Vibes */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Great Vibes</h3>
          <div className="space-y-2">
            <p className="font-great-vibes text-3xl text-pink-500">
              エレガントなタイトル - Great Vibes
            </p>
            <p className="font-great-vibes text-2xl text-lavender-500">
              ロマンチックなメッセージ - Great Vibes
            </p>
          </div>
        </div>

        {/* Berkshire Swash */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Berkshire Swash
          </h3>
          <div className="space-y-2">
            <p className="font-berkshire text-3xl text-yellow-600">
              装飾的なタイトル - Berkshire Swash
            </p>
            <p className="font-berkshire text-2xl text-lavender-600">
              特別なメッセージ - Berkshire Swash
            </p>
          </div>
        </div>

        {/* Rock Salt */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Rock Salt</h3>
          <div className="space-y-2">
            <p className="font-rock text-2xl text-pink-600">
              手書き風テキスト - Rock Salt
            </p>
            <p className="font-rock text-xl text-yellow-500">
              カジュアルなメッセージ - Rock Salt
            </p>
          </div>
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

      {/* Modalサンプル */}
      <ModalSample />

      {/* フォームサンプル */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          フォームサンプル（ラジオボタン・チェックボックス）
        </h2>
        <FormSample />
      </section>

      {/* 画像拡大表示Modalサンプル */}
      <ImageModalSample />

      {/* モーダル */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="確認"
        size="md"
      >
        <div className="space-y-4">
          <p className="font-noto text-gray-700">
            これはモーダルコンポーネントのサンプルです。
          </p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              キャンセル
            </Button>
            <Button variant="primary" onClick={() => setIsModalOpen(false)}>
              確認
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
