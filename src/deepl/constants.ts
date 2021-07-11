export const DEEPL_PRO_PLAN_BASE_URL = 'https://api.deepl.com' as const;
export const DEEPL_FREE_PLAN_BASE_URL = 'https://api-free.deepl.com' as const;
export const DEEPL_TRANSLATE_ENDPOINT = '/v2/translate' as const;
export const MODES = {
  normal: 'n',
  visual: 'v',
} as const;
export type Mode = typeof MODES[keyof typeof MODES];
