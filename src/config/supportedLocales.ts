// src/config/supportedLocales.ts

// 지원되는 언어 목록을 정의합니다
export const SUPPORTED_LOCALES: { [key: string]: string } = {
    'en': 'English',
    'ko': '한국어'
  };
  
  // 기본 언어 설정
  export const DEFAULT_LOCALE = 'en';
  
  // 언어 감지 옵션
  export const DETECTION_OPTIONS = {
    order: ['localStorage', 'navigator', 'htmlTag'],
    caches: ['localStorage'],
    lookupLocalStorage: 'i18nextLng',
  };
  
  // 언어별 국가 코드 매핑 (통화, 날짜 형식 등에 사용)
  export const LOCALE_REGION_MAP: { [key: string]: string } = {
    'en': 'en-US',
    'ko': 'ko-KR'
  };
  
  // 옵션 목록으로 변환하는 유틸리티 함수
  export const getLocaleOptions = () => 
    Object.entries(SUPPORTED_LOCALES).map(([value, label]) => ({ value, label }));