/**
 * @description 型定義と定数の使用例
 * @author WeddingInvitations
 * @since 1.0.0
 */

import {
  GuestContent,
  DearBlockData,
  InviteType,
  AutofillConfig,
  convertToDearBlockData,
} from './microcms';

import {
  APP_CONFIG,
  BREAKPOINTS,
  SECTION_IDS,
  RSVP_STATUS,
  EVENT_INFO,
  IMAGE_PATHS,
  API_CONFIG,
  FORM_CONFIG,
  ANIMATION_CONFIG,
  COLORS,
  NAVIGATION_CONFIG,
  COUNTDOWN_CONFIG,
  GALLERY_CONFIG,
  MESSAGE_CONFIG,
  HOST_CONFIG,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  VALIDATION_CONFIG,
  PERFORMANCE_CONFIG,
  ACCESSIBILITY_CONFIG,
} from '../constants/index';

/**
 * @description 型定義と定数の使用例
 */
export class TypeDefinitionExample {
  /**
   * @description GuestContent型の使用例
   * @returns GuestContentオブジェクト
   */
  static createGuestContentExample(): GuestContent {
    return {
      id: 'guest-1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString(),
      name: 'テスト太郎',
      kana: 'テストタロウ',
      dear: 'テスト太郎様',
      message: 'おめでとうございます！' as TrustedHTML,
      invite: ['挙式', '披露宴'] as InviteType[],
      autofill: {
        fieldId: 'guest-1',
        name: true,
        kana: true,
      },
      family: [],
    } as GuestContent;
  }

  /**
   * @description DearBlockData型の使用例
   * @returns DearBlockDataオブジェクト
   */
  static createDearBlockDataExample(): DearBlockData {
    return {
      guestName: 'テスト太郎',
      kana: 'テストタロウ',
      dear: 'テスト太郎様',
      message: 'おめでとうございます！' as TrustedHTML,
      inviteTypes: ['挙式', '披露宴'] as InviteType[],
      autofill: {
        fieldId: 'guest-1',
        name: true,
        kana: true,
      },
      familyMembers: [],
    };
  }

  /**
   * @description InviteType型の使用例
   * @returns InviteType配列
   */
  static createInviteTypeExample(): InviteType[] {
    return ['挙式', '披露宴', '二次会'];
  }

  /**
   * @description AutofillConfig型の使用例
   * @returns AutofillConfigオブジェクト
   */
  static createAutofillConfigExample(): AutofillConfig {
    return {
      fieldId: 'guest-1',
      name: true,
      kana: true,
    };
  }

  /**
   * @description convertToDearBlockData関数の使用例
   * @returns DearBlockDataオブジェクト
   */
  static createConvertedDataExample(): DearBlockData {
    const guestContent = this.createGuestContentExample();
    return convertToDearBlockData(guestContent);
  }

  /**
   * @description 定数の使用例
   * @returns 定数オブジェクト
   */
  static getConstantsExample() {
    return {
      appConfig: APP_CONFIG,
      breakpoints: BREAKPOINTS,
      sectionIds: SECTION_IDS,
      rsvpStatus: RSVP_STATUS,
      eventInfo: EVENT_INFO,
      imagePaths: IMAGE_PATHS,
      apiConfig: API_CONFIG,
      formConfig: FORM_CONFIG,
      animationConfig: ANIMATION_CONFIG,
      colors: COLORS,
      navigationConfig: NAVIGATION_CONFIG,
      countdownConfig: COUNTDOWN_CONFIG,
      galleryConfig: GALLERY_CONFIG,
      messageConfig: MESSAGE_CONFIG,
      hostConfig: HOST_CONFIG,
      errorMessages: ERROR_MESSAGES,
      successMessages: SUCCESS_MESSAGES,
      validationConfig: VALIDATION_CONFIG,
      performanceConfig: PERFORMANCE_CONFIG,
      accessibilityConfig: ACCESSIBILITY_CONFIG,
    };
  }
}
