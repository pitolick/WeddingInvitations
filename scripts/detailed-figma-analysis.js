#!/usr/bin/env node

/**
 * Figma MCP詳細分析スクリプト
 * Figma MCPを使用してデザイン詳細を取得し、実装仕様を明確化する
 */

/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Figma API設定
const FIGMA_API_KEY = process.env.FIGMA_API_KEY;
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;

if (!FIGMA_API_KEY || !FIGMA_FILE_KEY) {
  console.error('❌ Figma API設定が不完全です');
  console.error('FIGMA_API_KEY と FIGMA_FILE_KEY を設定してください');
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
          'X-Figma-Token': FIGMA_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Figma API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('❌ Figma API取得エラー:', error.message);
    throw error;
  }
}

/**
 * ノードから色情報を抽出
 */
function extractColorsFromNode(node) {
  const colors = [];

  if (node.fills) {
    node.fills.forEach(fill => {
      if (fill.type === 'SOLID' && fill.color) {
        const { r, g, b } = fill.color;
        const hex = rgbToHex(r * 255, g * 255, b * 255);
        colors.push({
          type: 'fill',
          hex,
          opacity: fill.opacity || 1,
        });
      }
    });
  }

  if (node.strokes) {
    node.strokes.forEach(stroke => {
      if (stroke.type === 'SOLID' && stroke.color) {
        const { r, g, b } = stroke.color;
        const hex = rgbToHex(r * 255, g * 255, b * 255);
        colors.push({
          type: 'stroke',
          hex,
          opacity: stroke.opacity || 1,
        });
      }
    });
  }

  return colors;
}

/**
 * RGB値をHEXに変換
 */
function rgbToHex(r, g, b) {
  return (
    '#' +
    [r, g, b]
      .map(x => {
        const hex = Math.round(x).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
}

/**
 * ノードからタイポグラフィ情報を抽出
 */
function extractTypographyFromNode(node) {
  if (!node.style) return null;

  return {
    fontFamily: node.style.fontFamily,
    fontSize: node.style.fontSize,
    fontWeight: node.style.fontWeight,
    lineHeight: node.style.lineHeightPx,
    letterSpacing: node.style.letterSpacing,
    textAlign: node.style.textAlignHorizontal,
  };
}

/**
 * ノードからレイアウト情報を抽出
 */
function extractLayoutFromNode(node) {
  return {
    x: node.absoluteBoundingBox?.x || 0,
    y: node.absoluteBoundingBox?.y || 0,
    width: node.absoluteBoundingBox?.width || 0,
    height: node.absoluteBoundingBox?.height || 0,
    padding: node.paddingTop || 0,
    margin: node.itemSpacing || 0,
  };
}

/**
 * セクション別の詳細分析を実行
 */
function analyzeSectionsDetailed(figmaData) {
  const sections = [
    'MV',
    'Navigation',
    'Countdown',
    'Host',
    'Message',
    'Event',
    'Gallery',
    'RSVP',
    'Footer',
  ];

  const analysis = {};

  sections.forEach(section => {
    analysis[section] = {
      components: [],
      colors: [],
      typography: [],
      layout: {},
      animations: [],
      responsive: {
        mobile: {},
        tablet: {},
        desktop: {},
      },
    };
  });

  // ノードを再帰的に分析
  function analyzeNode(node, sectionName = '') {
    if (!node) return;

    // セクション名を推測
    const nodeName = node.name?.toLowerCase() || '';
    let currentSection = sectionName;

    if (!currentSection) {
      if (nodeName.includes('mv') || nodeName.includes('hero'))
        currentSection = 'MV';
      else if (nodeName.includes('nav')) currentSection = 'Navigation';
      else if (nodeName.includes('countdown')) currentSection = 'Countdown';
      else if (nodeName.includes('host')) currentSection = 'Host';
      else if (nodeName.includes('message')) currentSection = 'Message';
      else if (nodeName.includes('event')) currentSection = 'Event';
      else if (nodeName.includes('gallery')) currentSection = 'Gallery';
      else if (nodeName.includes('rsvp')) currentSection = 'RSVP';
      else if (nodeName.includes('footer')) currentSection = 'Footer';
    }

    if (currentSection && analysis[currentSection]) {
      // 色情報を抽出
      const colors = extractColorsFromNode(node);
      analysis[currentSection].colors.push(...colors);

      // タイポグラフィ情報を抽出
      const typography = extractTypographyFromNode(node);
      if (typography) {
        analysis[currentSection].typography.push(typography);
      }

      // レイアウト情報を抽出
      const layout = extractLayoutFromNode(node);
      if (layout.width > 0 && layout.height > 0) {
        analysis[currentSection].layout[node.name || 'unknown'] = layout;
      }

      // コンポーネント情報を抽出
      if (node.type === 'COMPONENT' || node.type === 'INSTANCE') {
        analysis[currentSection].components.push({
          name: node.name,
          type: node.type,
          key: node.key,
        });
      }
    }

    // 子ノードを再帰的に分析
    if (node.children) {
      node.children.forEach(child => analyzeNode(child, currentSection));
    }
  }

  // ルートノードから分析開始
  if (figmaData.document) {
    analyzeNode(figmaData.document);
  }

  return analysis;
}

/**
 * デザインシステム情報を詳細に抽出
 */
function extractDesignSystemDetailed(figmaData) {
  const designSystem = {
    colors: {},
    typography: {},
    spacing: {},
    components: {},
    effects: {},
  };

  // スタイル情報を抽出
  if (figmaData.styles) {
    Object.entries(figmaData.styles).forEach(([key, style]) => {
      if (style.styleType === 'FILL') {
        designSystem.colors[style.name] = {
          key: style.key,
          description: style.description || '',
          type: 'color',
        };
      } else if (style.styleType === 'TEXT') {
        designSystem.typography[style.name] = {
          key: style.key,
          description: style.description || '',
          type: 'typography',
        };
      } else if (style.styleType === 'EFFECT') {
        designSystem.effects[style.name] = {
          key: style.key,
          description: style.description || '',
          type: 'effect',
        };
      }
    });
  }

  return designSystem;
}

/**
 * 分析結果をファイルに保存
 */
function saveDetailedAnalysisResults(designSystem, sectionAnalysis) {
  const outputDir = path.join(__dirname, '../docs/design-analysis');

  // デザインシステム情報を保存
  fs.writeFileSync(
    path.join(outputDir, 'design-system-detailed.json'),
    JSON.stringify(designSystem, null, 2)
  );

  // セクション別分析を保存
  fs.writeFileSync(
    path.join(outputDir, 'section-analysis-detailed.json'),
    JSON.stringify(sectionAnalysis, null, 2)
  );

  // 実装仕様書を詳細化
  generateDetailedImplementationSpecs(sectionAnalysis);
}

/**
 * 詳細な実装仕様書を生成
 */
function generateDetailedImplementationSpecs(sectionAnalysis) {
  const specsDir = path.join(__dirname, '../docs/implementation-specs');

  Object.keys(sectionAnalysis).forEach(section => {
    const sectionData = sectionAnalysis[section];

    // 色情報を整理
    const uniqueColors = [...new Set(sectionData.colors.map(c => c.hex))];
    const colorInfo = uniqueColors.map(hex => `- ${hex}`).join('\n');

    // フォント情報を整理
    const uniqueFonts = [
      ...new Set(
        sectionData.typography.map(t => `${t.fontFamily} ${t.fontWeight}`)
      ),
    ];
    const fontInfo = uniqueFonts.map(font => `- ${font}`).join('\n');

    const specContent = `# ${section}セクション実装仕様書

## 概要
${section}セクションの実装仕様を定義します。

## デザイン仕様

### 色
${colorInfo || '- 未定義'}

### フォント
${fontInfo || '- 未定義'}

## レイアウト仕様
\`\`\`json
${JSON.stringify(sectionData.layout, null, 2)}
\`\`\`

## コンポーネント
${
  sectionData.components
    .map(comp => `- ${comp.name} (${comp.type})`)
    .join('\n') || '- 未定義'
}

## アニメーション仕様
${sectionData.animations.map(anim => `- ${anim}`).join('\n') || '- 未定義'}

## レスポンシブ対応
\`\`\`json
${JSON.stringify(sectionData.responsive, null, 2)}
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
      path.join(specsDir, `${section.toLowerCase()}-detailed-spec.md`),
      specContent
    );
  });
}

/**
 * メイン処理
 */
async function main() {
  console.log('🎨 Figma詳細分析を開始します...');

  try {
    // Figmaファイル情報を取得
    console.log('📋 Figmaファイル情報を取得中...');
    const figmaData = await getFigmaFile();

    // デザインシステム情報を詳細に抽出
    console.log('🎨 デザインシステム情報を詳細に抽出中...');
    const designSystem = extractDesignSystemDetailed(figmaData);

    // セクション別詳細分析を実行
    console.log('📊 セクション別詳細分析を実行中...');
    const sectionAnalysis = analyzeSectionsDetailed(figmaData);

    // 結果を保存
    console.log('💾 詳細分析結果を保存中...');
    saveDetailedAnalysisResults(designSystem, sectionAnalysis);

    console.log('✅ Figma詳細分析が完了しました');
    console.log('📁 出力先: docs/design-analysis/');
    console.log('📁 仕様書: docs/implementation-specs/');
  } catch (error) {
    console.error('❌ 詳細分析中にエラーが発生しました:', error.message);
    process.exit(1);
  }
}

// スクリプト実行
if (require.main === module) {
  main();
}

module.exports = {
  getFigmaFile,
  extractDesignSystemDetailed,
  analyzeSectionsDetailed,
  saveDetailedAnalysisResults,
};
