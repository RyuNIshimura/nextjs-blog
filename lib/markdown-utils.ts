import remark from 'remark';
import html from 'remark-html';

export function getExtend(filename: string) {
  const pos = filename.lastIndexOf('.');
  if (pos === -1) return '';
  return filename.slice(pos + 1);
}

export function copyText(text: string) {
  navigator.clipboard.writeText(text);
}

export function removeTags(htmlString: string) {
  const removeTagPattern = new RegExp('<("[^"]*"|\'[^\']*\'|[^\'">])*>', 'g');
  return htmlString.replace(removeTagPattern, '').slice(0, 120) + '…';
}

export async function getDescription(markdown: string) {
  const result = await remark()?.use(html)?.process(markdown);
  const htmlString = result.toString();
  const description = removeTags(htmlString);
  return { description };
}
