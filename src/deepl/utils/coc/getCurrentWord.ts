import { window, workspace } from 'coc.nvim';
import { Mode, MODES } from '../../constants';

export const getCurrentWord = async (mode: Mode): Promise<string> => {
  const doc = await workspace.document;
  const pos = await window.getCursorPosition();

  const range = mode === MODES.normal ? doc.getWordRangeAtPosition(pos) : await workspace.getSelectedRange('v', doc);
  const text = range ? doc.textDocument.getText(range) : (await workspace.nvim.eval('expand("<cword>")')).toString();

  return text.trim();
};
