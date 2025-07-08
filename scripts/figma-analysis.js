#!/usr/bin/env node

/**
 * Figmaデザイン詳細分析スクリプト
 * Figma MCPを使用してデザイン詳細を取得し、実装仕様を明確化する
 */

const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Figma API設定
const FIGMA_API_KEY = process.env.FIGMA_API_KEY;
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;

if (!FIGMA_API_KEY || !FIGMA_FILE_KEY) {
  console.error("❌ Figma API設定が不完全です");
  console.error("FIGMA_API_KEY と FIGMA_FILE_KEY を設定してください");
  process.exit(1);
}

/**
 * Figma APIからファイル情報を取得
 */
async function getFigmaFile() {
  try {
    const response = await fetch(
      `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}`,
      {
        headers: {
          "X-Figma-Token": FIGMA_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Figma API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Figma API取得エラー:", error.message);
    throw error;
  }
}

/**
 * デザインシステム情報を抽出
 */
function extractDesignSystem(figmaData) {
  const designSystem = {
    colors: {},
    typography: {},
    spacing: {},
    components: {},
  };

  // 色情報の抽出
  if (figmaData.styles) {
    Object.values(figmaData.styles).forEach((style) => {
      if (style.styleType === "FILL") {
        designSystem.colors[style.name] = {
          key: style.key,
          description: style.description || "",
        };
      }
    });
  }

  // タイポグラフィ情報の抽出
  if (figmaData.styles) {
    Object.values(figmaData.styles).forEach((style) => {
      if (style.styleType === "TEXT") {
        designSystem.typography[style.name] = {
          key: style.key,
          description: style.description || "",
        };
      }
    });
  }

  return designSystem;
}

/**
 * セクション別の分析結果を生成
 */
function analyzeSections() {
  const sections = [
    "MV",
    "Navigation",
    "Countdown",
    "Host",
    "Message",
    "Event",
    "Gallery",
    "RSVP",
    "Footer",
  ];

  const analysis = {};

  sections.forEach((section) => {
    analysis[section] = {
      components: [],
      colors: [],
      typography: [],
      layout: {},
      animations: [],
      responsive: {},
    };
  });

  return analysis;
}

/**
 * 分析結果をファイルに保存
 */
function saveAnalysisResults(designSystem, sectionAnalysis) {
  const outputDir = path.join(__dirname, "../docs/design-analysis");

  // デザインシステム情報を保存
  fs.writeFileSync(
    path.join(outputDir, "design-system.json"),
    JSON.stringify(designSystem, null, 2)
  );

  // セクション別分析を保存
  fs.writeFileSync(
    path.join(outputDir, "section-analysis.json"),
    JSON.stringify(sectionAnalysis, null, 2)
  );

  // 実装仕様書テンプレートを生成
  generateImplementationSpecs(sectionAnalysis);
}

/**
 * 実装仕様書テンプレートを生成
 */
function generateImplementationSpecs(sectionAnalysis) {
  const specsDir = path.join(__dirname, "../docs/implementation-specs");

  Object.keys(sectionAnalysis).forEach((section) => {
    const specContent = `# ${section}セクション実装仕様書

## 概要
${section}セクションの実装仕様を定義します。

## デザイン仕様
- 色: ${sectionAnalysis[section].colors.join(", ") || "未定義"}
- フォント: ${sectionAnalysis[section].typography.join(", ") || "未定義"}

## レイアウト仕様
\`\`\`json
${JSON.stringify(sectionAnalysis[section].layout, null, 2)}
\`\`\`

## アニメーション仕様
${
  sectionAnalysis[section].animations.map((anim) => `- ${anim}`).join("\n") ||
  "- 未定義"
}

## レスポンシブ対応
\`\`\`json
${JSON.stringify(sectionAnalysis[section].responsive, null, 2)}
\`\`\`

## 実装ガイドライン
1. コンポーネント設計
2. スタイリング
3. アニメーション実装
4. レスポンシブ対応

## 完了条件
- [ ] デザイン仕様に準拠した実装
- [ ] アニメーションの実装
- [ ] レスポンシブ対応の実装
- [ ] テストの実装
`;

    fs.writeFileSync(
      path.join(specsDir, `${section.toLowerCase()}-spec.md`),
      specContent
    );
  });
}

/**
 * メイン処理
 */
async function main() {
  console.log("🎨 Figmaデザイン詳細分析を開始します...");

  try {
    // Figmaファイル情報を取得
    console.log("📋 Figmaファイル情報を取得中...");
    const figmaData = await getFigmaFile();

    // デザインシステム情報を抽出
    console.log("🎨 デザインシステム情報を抽出中...");
    const designSystem = extractDesignSystem(figmaData);

    // セクション別分析を実行
    console.log("📊 セクション別分析を実行中...");
    const sectionAnalysis = analyzeSections(figmaData);

    // 結果を保存
    console.log("💾 分析結果を保存中...");
    saveAnalysisResults(designSystem, sectionAnalysis);

    console.log("✅ Figmaデザイン詳細分析が完了しました");
    console.log("📁 出力先: docs/design-analysis/");
    console.log("📁 仕様書: docs/implementation-specs/");
  } catch (error) {
    console.error("❌ 分析中にエラーが発生しました:", error.message);
    process.exit(1);
  }
}

// スクリプト実行
if (require.main === module) {
  main();
}

module.exports = {
  getFigmaFile,
  extractDesignSystem,
  analyzeSections,
  saveAnalysisResults,
};
