/**
 * @description 型定義と定数の使用例
 * @author WeddingInvitations
 * @since 1.0.0
 */

import {
  Guest,
  Event,
  ApiResponse,
  RSVPFormData,
  ImageConfig,
  AnimationConfig,
  NavigationItem,
  CountdownConfig,
  GalleryItem,
  MessageItem,
  HostInfo,
  ErrorInfo,
  ValidationResult,
  PerformanceMetrics,
} from "./index";

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
} from "../constants/index";

/**
 * @description 型定義と定数の使用例
 */
export class TypeDefinitionExample {
  /**
   * @description Guest型の使用例
   * @returns Guestオブジェクト
   */
  static createGuestExample(): Guest {
    return {
      id: "guest-1",
      name: "テスト太郎",
      email: "test@example.com",
      companions: [
        {
          id: "companion-1",
          name: "お連れ様太郎",
          age: 30,
          relationship: "友人",
        },
      ],
      rsvpStatus: RSVP_STATUS.PENDING,
      message: "参加します",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  /**
   * @description Event型の使用例
   * @returns Eventオブジェクト
   */
  static createEventExample(): Event {
    return {
      id: "event-1",
      name: "結婚式",
      date: EVENT_INFO.WEDDING_DATE,
      venue: EVENT_INFO.VENUE,
      address: EVENT_INFO.ADDRESS,
      mapUrl: EVENT_INFO.MAP_URL,
      description: "ディズニーテーマの結婚式",
    };
  }

  /**
   * @description ApiResponse型の使用例
   * @returns ApiResponseオブジェクト
   */
  static createApiResponseExample(): ApiResponse<Guest> {
    return {
      success: true,
      data: this.createGuestExample(),
      statusCode: 200,
    };
  }

  /**
   * @description RSVPFormData型の使用例
   * @returns RSVPFormDataオブジェクト
   */
  static createRSVPFormDataExample(): RSVPFormData {
    return {
      guestId: "guest-1",
      status: RSVP_STATUS.ATTENDING,
      companionCount: 2,
      message: "参加します",
      dietaryRestrictions: FORM_CONFIG.DIETARY_OPTIONS[1], // ベジタリアン
    };
  }

  /**
   * @description ImageConfig型の使用例
   * @returns ImageConfigオブジェクト
   */
  static createImageConfigExample(): ImageConfig {
    return {
      src: `${IMAGE_PATHS.SECTIONS}/mv-hero.jpg`,
      alt: "メインビジュアル画像",
      width: 1200,
      height: 800,
      responsive: {
        mobile: { width: 400, height: 300 },
        tablet: { width: 800, height: 600 },
        desktop: { width: 1200, height: 800 },
      },
    };
  }

  /**
   * @description AnimationConfig型の使用例
   * @returns AnimationConfigオブジェクト
   */
  static createAnimationConfigExample(): AnimationConfig {
    return {
      duration: ANIMATION_CONFIG.DURATION,
      easing: ANIMATION_CONFIG.EASING,
      delay: ANIMATION_CONFIG.DELAY,
      direction: "up",
    };
  }

  /**
   * @description NavigationItem型の使用例
   * @returns NavigationItemオブジェクト
   */
  static createNavigationItemExample(): NavigationItem {
    return {
      id: SECTION_IDS.MV,
      name: "トップ",
      href: `#${SECTION_IDS.MV}`,
      icon: "home",
      isActive: true,
    };
  }

  /**
   * @description CountdownConfig型の使用例
   * @returns CountdownConfigオブジェクト
   */
  static createCountdownConfigExample(): CountdownConfig {
    return {
      targetDate: COUNTDOWN_CONFIG.TARGET_DATE,
      format: COUNTDOWN_CONFIG.FORMAT as CountdownConfig["format"],
      interval: COUNTDOWN_CONFIG.UPDATE_INTERVAL,
    };
  }

  /**
   * @description GalleryItem型の使用例
   * @returns GalleryItemオブジェクト
   */
  static createGalleryItemExample(): GalleryItem {
    return {
      id: "gallery-1",
      image: this.createImageConfigExample(),
      title: "結婚式の写真",
      description: "素晴らしい結婚式の写真です",
      category: "式場",
    };
  }

  /**
   * @description MessageItem型の使用例
   * @returns MessageItemオブジェクト
   */
  static createMessageItemExample(): MessageItem {
    return {
      id: "message-1",
      sender: "ゲスト太郎",
      content: "おめでとうございます！素晴らしい結婚式でした。",
      timestamp: new Date(),
      avatar: "/images/avatars/guest.jpg",
    };
  }

  /**
   * @description HostInfo型の使用例
   * @returns HostInfoオブジェクト
   */
  static createHostInfoExample(): HostInfo {
    return {
      groomName: HOST_CONFIG.GROOM.name,
      brideName: HOST_CONFIG.BRIDE.name,
      groomImage: HOST_CONFIG.GROOM.image,
      brideImage: HOST_CONFIG.BRIDE.image,
      introduction: "新郎新婦の紹介文です",
    };
  }

  /**
   * @description ErrorInfo型の使用例
   * @returns ErrorInfoオブジェクト
   */
  static createErrorInfoExample(): ErrorInfo {
    return {
      code: "NETWORK_ERROR",
      message: ERROR_MESSAGES.NETWORK_ERROR,
      details: "詳細なエラー情報",
      timestamp: new Date(),
    };
  }

  /**
   * @description ValidationResult型の使用例
   * @returns ValidationResultオブジェクト
   */
  static createValidationResultExample(): ValidationResult {
    return {
      isValid: true,
      errors: [],
      warnings: ["軽微な警告"],
    };
  }

  /**
   * @description PerformanceMetrics型の使用例
   * @returns PerformanceMetricsオブジェクト
   */
  static createPerformanceMetricsExample(): PerformanceMetrics {
    return {
      loadTime: 1500,
      renderTime: 300,
      memoryUsage: 50,
      networkRequests: 10,
    };
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
