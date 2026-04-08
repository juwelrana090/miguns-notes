export interface Language {
  code: string;
  label: string;
  nativeLabel: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'bn-BD', label: 'Bangla (Bangladesh)', nativeLabel: 'বাংলা' },
  { code: 'bn-IN', label: 'Bangla (India)', nativeLabel: 'বাংলা' },
  { code: 'en-US', label: 'English (US)', nativeLabel: 'English' },
  { code: 'en-GB', label: 'English (UK)', nativeLabel: 'English' },
  { code: 'hi-IN', label: 'Hindi', nativeLabel: 'हिन्दी' },
  { code: 'ar-SA', label: 'Arabic', nativeLabel: 'العربية' },
  { code: 'zh-CN', label: 'Chinese (Simplified)', nativeLabel: '中文' },
  { code: 'fr-FR', label: 'French', nativeLabel: 'Français' },
  { code: 'de-DE', label: 'German', nativeLabel: 'Deutsch' },
  { code: 'es-ES', label: 'Spanish', nativeLabel: 'Español' },
  { code: 'pt-BR', label: 'Portuguese', nativeLabel: 'Português' },
  { code: 'ru-RU', label: 'Russian', nativeLabel: 'Русский' },
  { code: 'ja-JP', label: 'Japanese', nativeLabel: '日本語' },
  { code: 'ko-KR', label: 'Korean', nativeLabel: '한국어' },
  { code: 'tr-TR', label: 'Turkish', nativeLabel: 'Türkçe' },
];

export const DEFAULT_LANGUAGE = SUPPORTED_LANGUAGES[0];
