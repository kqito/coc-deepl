import { Documentation, FloatFactory, Neovim, window, fetch } from 'coc.nvim';
import { DEEPL_FREE_PLAN_BASE_URL, DEEPL_PRO_PLAN_BASE_URL, DEEPL_TRANSLATE_ENDPOINT, Mode } from './constants';
import { URL } from 'url';
import { getCurrentWord } from './utils/coc/getCurrentWord';
import { DeeplPlan, getDeeplPlan, getDeeplTargetLanguage, TargetLanguage } from './getConfigurationValue';

interface TranslateResult {
  translations: {
    detected_source_language?: string;
    text?: string;
  }[];
}

export class Deepl {
  private floatFactory: FloatFactory;
  private apiKey: string | undefined;
  private targetLanguage: TargetLanguage;
  private plan: DeeplPlan;

  constructor(nvim: Neovim, apiKey: string | undefined) {
    this.floatFactory = new FloatFactory(nvim);
    this.apiKey = apiKey;
    this.targetLanguage = getDeeplTargetLanguage();
    this.plan = getDeeplPlan();
  }

  async translate(mode: Mode): Promise<void> {
    const target = await getCurrentWord(mode);
    if (!target) {
      return;
    }

    const documentations: Documentation[] = [];
    try {
      const res = await this.fetchTranslate(target);
      const translateResult = res.translations[0].text;

      if (!translateResult) {
        throw new Error('Translation failed.');
      }

      this.pushToMarkdownDocumentation(documentations, target);
      this.pushToMarkdownDocumentation(documentations, translateResult);
      await this.popup(documentations);
    } catch (err) {
      const message = err.message;
      window.showErrorMessage(message);
    }
  }

  private pushToMarkdownDocumentation(documentations: Documentation[], message: string, prefix?: string): void {
    const filetype = 'markdown';
    const content = prefix
      ? `
    ${prefix}
    ${message}
    `
      : message;

    documentations.push({
      content,
      filetype,
    });
  }

  private async fetchTranslate(text: string): Promise<TranslateResult> {
    if (!this.apiKey) {
      throw new Error(
        'The API key for coc-deepl is not settings. Please see installation: https://github.com/kqito/coc-deepl#installation'
      );
    }

    const url = new URL(
      (this.plan === 'free' ? DEEPL_FREE_PLAN_BASE_URL : DEEPL_PRO_PLAN_BASE_URL) + DEEPL_TRANSLATE_ENDPOINT
    );

    url.searchParams.set('auth_key', this.apiKey);
    url.searchParams.set('text', text);
    url.searchParams.set('target_lang', this.targetLanguage);

    try {
      const res = fetch(url.toString());
      const body = typeof res === 'string' ? JSON.parse(res) : res;

      return body;
    } catch {
      throw new Error('Fetch failed.');
    }
  }

  private async popup(documentations: Documentation[]): Promise<void> {
    await this.floatFactory.show(documentations);
  }
}
