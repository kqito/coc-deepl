import { workspace } from 'coc.nvim';

export type DeeplPlan = 'free' | 'pro';
export type TargetLanguage =
  | 'BG'
  | 'CS'
  | 'DA'
  | 'DE'
  | 'EL'
  | 'EN-GB'
  | 'EN-US'
  | 'EN'
  | 'ES'
  | 'ET'
  | 'FI'
  | 'FR'
  | 'HU'
  | 'IT'
  | 'JA'
  | 'LT'
  | 'LV'
  | 'NL'
  | 'PL'
  | 'PT-PT'
  | 'PT-BR'
  | 'PT'
  | 'RO'
  | 'RU'
  | 'SK'
  | 'SL'
  | 'SV'
  | 'ZH';

export const DEEPL_CONFIGURE_KEYS = {
  enabled: true,
  plan: 'free',
  isShowSource: false,
  targetLanguage: 'EN',
} as const;

const getConfigurationValue = <T>(key: keyof typeof DEEPL_CONFIGURE_KEYS, defaultValue: T) => {
  const config = workspace.getConfiguration('deepl');

  return config.get(key, defaultValue);
};

export const getDeeplIsEnabled = () => getConfigurationValue<boolean>('enabled', DEEPL_CONFIGURE_KEYS.enabled);
export const getDeeplPlan = () => getConfigurationValue<DeeplPlan>('plan', DEEPL_CONFIGURE_KEYS.plan);
export const getDeeplIsShowSource = () =>
  getConfigurationValue<boolean>('isShowSource', DEEPL_CONFIGURE_KEYS.isShowSource);
export const getDeeplTargetLanguage = () =>
  getConfigurationValue<TargetLanguage>('targetLanguage', DEEPL_CONFIGURE_KEYS.targetLanguage);
