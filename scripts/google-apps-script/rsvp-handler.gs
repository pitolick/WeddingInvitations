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

    // スプレッドシートにデータを保存
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
  const requiredFields = ['guestId', 'contactInfo', 'attendees'];

  for (const field of requiredFields) {
    if (!data[field]) {
      console.error(`Missing required field: ${field}`);
      return false;
    }
  }

  // 連絡先情報の検証
  const contactRequired = [
    'postalCode',
    'prefecture',
    'address',
    'phone',
    'email',
  ];
  for (const field of contactRequired) {
    if (!data.contactInfo[field]) {
      console.error(`Missing required contact field: ${field}`);
      return false;
    }
  }

  // 出席者情報の検証
  if (!Array.isArray(data.attendees) || data.attendees.length === 0) {
    console.error('Attendees must be a non-empty array');
    return false;
  }

  // 各出席者の必須フィールドチェック
  const attendeeRequired = [
    'name',
    'furigana',
    'birthday',
    'hotelUse',
    'taxiUse',
    'parkingUse',
  ];
  for (let i = 0; i < data.attendees.length; i++) {
    const attendee = data.attendees[i];
    for (const field of attendeeRequired) {
      if (!attendee[field]) {
        console.error(
          `Missing required attendee field: ${field} for attendee ${i}`
        );
        return false;
      }
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
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const timestamp = new Date().toISOString();

    // RSVP_Responses シートにメインデータを保存
    const responsesSheet = getOrCreateSheet(spreadsheet, 'RSVP_Responses', [
      '招待者ID',
      '招待者名',
      '送信日時',
      '郵便番号',
      '都道府県',
      '住所',
      '電話番号',
      'メールアドレス',
      'メッセージ',
    ]);

    // メインデータを保存
    const mainData = [
      data.guestId || '',
      data.name || '',
      timestamp,
      data.contactInfo.postalCode || '',
      data.contactInfo.prefecture || '',
      data.contactInfo.address || '',
      data.contactInfo.phone || '',
      data.contactInfo.email || '',
      data.message || '',
    ];
    responsesSheet.appendRow(mainData);

    // RSVP_Attendees シートに出席者詳細を保存
    const attendeesSheet = getOrCreateSheet(spreadsheet, 'RSVP_Attendees', [
      '招待者ID',
      '出席者番号',
      '出席者名',
      'ふりがな',
      '誕生日',
      'ホテル利用',
      'タクシー利用',
      '駐車場利用',
      'アレルギー',
      '苦手な食べ物',
      '挙式出欠',
      '披露宴出欠',
      '二次会出欠',
    ]);

    // 各出席者のデータを保存
    data.attendees.forEach((attendee, index) => {
      const attendeeData = [
        data.guestId || '',
        attendee.attendeeId || '',
        attendee.name || '',
        attendee.furigana || '',
        attendee.birthday || '',
        attendee.hotelUse || '',
        attendee.taxiUse || '',
        attendee.parkingUse || '',
        JSON.stringify(attendee.allergies || []),
        attendee.dislikedFoods || '',
        attendee.ceremony || '',
        attendee.reception || '',
        attendee.afterParty || '',
      ];
      attendeesSheet.appendRow(attendeeData);
    });

    // 集計を更新
    updateSummary(spreadsheet);

    return { success: true };
  } catch (error) {
    console.error('Error saving to spreadsheet:', error);
    return { success: false, error: error.toString() };
  }
}

/**
 * シートを取得または作成する
 * @param {Spreadsheet} spreadsheet - スプレッドシート
 * @param {string} sheetName - シート名
 * @param {Array} headers - ヘッダー行
 * @returns {Sheet} シート
 */
function getOrCreateSheet(spreadsheet, sheetName, headers) {
  let sheet = spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    // ヘッダー行を設定
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.autoResizeColumns(1, headers.length);
  }

  return sheet;
}

/**
 * 集計シートを更新する
 * @param {Spreadsheet} spreadsheet - スプレッドシート
 */
function updateSummary(spreadsheet) {
  try {
    const attendeesSheet = spreadsheet.getSheetByName('RSVP_Attendees');
    if (!attendeesSheet) return;

    const summarySheet = getOrCreateSheet(spreadsheet, 'RSVP_Summary', [
      'イベント種別',
      '参加予定者数',
      '不参加者数',
      '未回答者数',
      '更新日時',
    ]);

    // 既存の集計データをクリア（ヘッダー以外）
    const lastRow = summarySheet.getLastRow();
    if (lastRow > 1) {
      summarySheet.getRange(2, 1, lastRow - 1, 5).clear();
    }

    // 出席者データを取得
    const attendeeData = attendeesSheet.getDataRange().getValues();
    const headers = attendeeData[0];
    const dataRows = attendeeData.slice(1);

    // 列インデックスを取得
    const ceremonyIndex = headers.indexOf('挙式出欠');
    const receptionIndex = headers.indexOf('披露宴出欠');
    const afterPartyIndex = headers.indexOf('二次会出欠');

    // 各イベントの集計
    const events = [
      { name: '挙式', index: ceremonyIndex },
      { name: '披露宴', index: receptionIndex },
      { name: '二次会', index: afterPartyIndex },
    ];

    const summaryData = [];
    const timestamp = new Date().toISOString();

    events.forEach(event => {
      if (event.index !== -1) {
        let attending = 0;
        let declined = 0;
        let noResponse = 0;

        dataRows.forEach(row => {
          const response = row[event.index];
          if (response === 'attending') {
            attending++;
          } else if (response === 'declined') {
            declined++;
          } else {
            noResponse++;
          }
        });

        summaryData.push([
          event.name,
          attending,
          declined,
          noResponse,
          timestamp,
        ]);
      }
    });

    // 集計データを保存
    if (summaryData.length > 0) {
      summarySheet.getRange(2, 1, summaryData.length, 5).setValues(summaryData);
    }
  } catch (error) {
    console.error('Error updating summary:', error);
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
    const responsesSheet = getOrCreateSheet(spreadsheet, 'RSVP_Responses', [
      '招待者ID',
      '招待者名',
      '送信日時',
      '郵便番号',
      '都道府県',
      '住所',
      '電話番号',
      'メールアドレス',
      'メッセージ',
    ]);

    // RSVP_Attendees シートを作成
    const attendeesSheet = getOrCreateSheet(spreadsheet, 'RSVP_Attendees', [
      '招待者ID',
      '出席者番号',
      '出席者名',
      'ふりがな',
      '誕生日',
      'ホテル利用',
      'タクシー利用',
      '駐車場利用',
      'アレルギー',
      '苦手な食べ物',
      '挙式出欠',
      '披露宴出欠',
      '二次会出欠',
    ]);

    // RSVP_Summary シートを作成
    const summarySheet = getOrCreateSheet(spreadsheet, 'RSVP_Summary', [
      'イベント種別',
      '参加予定者数',
      '不参加者数',
      '未回答者数',
      '更新日時',
    ]);

    console.log('Spreadsheet setup completed successfully');
  } catch (error) {
    console.error('Error setting up spreadsheet:', error);
  }
}
