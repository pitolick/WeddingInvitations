/**
 * RSVP フォームデータを Google スプレッドシートに保存する Google Apps Script
 *
 * 使用方法:
 * 1. Google Apps Script エディタでこのコードをデプロイ
 * 2. Web API として公開
 * 3. 生成された URL を環境変数 GOOGLE_APPS_SCRIPT_URL に設定
 */

/**
 * POST リクエストを処理するメイン関数
 * @param {Object} e - リクエストオブジェクト
 * @returns {Object} レスポンスオブジェクト
 */
function doPost(e) {
  try {
    // リクエストデータを取得
    const data = JSON.parse(e.postData.contents);

    // データの検証
    if (!validateData(data)) {
      return ContentService.createTextOutput(
        JSON.stringify({
          success: false,
          error: 'Invalid data format',
        })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // スプレッドシートにデータを追加
    const result = saveToSpreadsheet(data);

    if (result.success) {
      return ContentService.createTextOutput(
        JSON.stringify({
          success: true,
          message: 'RSVP data saved successfully',
        })
      ).setMimeType(ContentService.MimeType.JSON);
    } else {
      return ContentService.createTextOutput(
        JSON.stringify({
          success: false,
          error: result.error,
        })
      ).setMimeType(ContentService.MimeType.JSON);
    }
  } catch (error) {
    console.error('Error processing RSVP data:', error);
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        error: 'Internal server error',
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * GET リクエストを処理する関数（ヘルスチェック用）
 * @param {Object} e - リクエストオブジェクト
 * @returns {Object} レスポンスオブジェクト
 */
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      success: true,
      message: 'RSVP API is running',
      timestamp: new Date().toISOString(),
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * データの検証を行う
 * @param {Object} data - 検証するデータ
 * @returns {boolean} 検証結果
 */
function validateData(data) {
  // 必須フィールドのチェック
  const requiredFields = ['guestId', 'guestName', 'events'];

  for (const field of requiredFields) {
    if (!data[field]) {
      console.error(`Missing required field: ${field}`);
      return false;
    }
  }

  // イベントの値チェック
  const validEvents = ['ceremony', 'reception', 'afterparty'];
  for (const event of data.events) {
    if (!validEvents.includes(event)) {
      console.error(`Invalid event: ${event}`);
      return false;
    }
  }

  return true;
}

/**
 * スプレッドシートにデータを保存する
 * @param {Object} data - 保存するデータ
 * @returns {Object} 保存結果
 */
function saveToSpreadsheet(data) {
  try {
    // アクティブなスプレッドシートを取得
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName('RSVP_Responses');

    // シートが存在しない場合は作成
    if (!sheet) {
      const newSheet = spreadsheet.insertSheet('RSVP_Responses');
      // ヘッダー行を追加
      newSheet
        .getRange(1, 1, 1, 7)
        .setValues([
          [
            '招待者ID',
            '招待者名',
            '参加予定イベント',
            '参加人数',
            'お連れ様情報',
            'メッセージ',
            '送信日時',
          ],
        ]);
      newSheet.getRange(1, 1, 1, 7).setFontWeight('bold');
    }

    const targetSheet = sheet || spreadsheet.getSheetByName('RSVP_Responses');

    // データを配列に変換
    const rowData = [
      data.guestId || '',
      data.guestName || '',
      data.events.join(', ') || '',
      data.attendees || 1,
      data.companions ? JSON.stringify(data.companions) : '',
      data.message || '',
      new Date().toISOString(),
    ];

    // データを追加
    targetSheet.appendRow(rowData);

    return { success: true };
  } catch (error) {
    console.error('Error saving to spreadsheet:', error);
    return { success: false, error: error.toString() };
  }
}

/**
 * スプレッドシートの初期設定を行う
 * 初回実行時に手動で実行する
 */
function setupSpreadsheet() {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

    // RSVP_Responses シートを作成
    let sheet = spreadsheet.getSheetByName('RSVP_Responses');
    if (!sheet) {
      sheet = spreadsheet.insertSheet('RSVP_Responses');
    }

    // ヘッダー行を設定
    const headers = [
      '招待者ID',
      '招待者名',
      '参加予定イベント',
      '参加人数',
      'お連れ様情報',
      'メッセージ',
      '送信日時',
    ];

    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');

    // 列幅を調整
    sheet.autoResizeColumns(1, headers.length);

    console.log('Spreadsheet setup completed successfully');
  } catch (error) {
    console.error('Error setting up spreadsheet:', error);
  }
}
