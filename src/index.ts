import { ExtensionContext, workspace } from 'coc.nvim';
import { Deepl, getDeeplIsEnabled, modes } from './deepl';

export async function activate(context: ExtensionContext): Promise<void> {
  const { subscriptions } = context;
  const { nvim } = workspace;

  const isEnabled = getDeeplIsEnabled();

  if (!isEnabled) {
    return;
  }

  const deepl = new Deepl(nvim, process.env.COC_DEEPL_API_KEY);

  subscriptions.push(
    workspace.registerKeymap(
      ['n'],
      'deepl',
      async () => {
        await deepl.translate(modes.normal);
      },
      { sync: false }
    )
  );

  subscriptions.push(
    workspace.registerKeymap(
      ['v'],
      'deepl-selected',
      async () => {
        await deepl.translate(modes.visual);
      },
      { sync: false }
    )
  );
}
