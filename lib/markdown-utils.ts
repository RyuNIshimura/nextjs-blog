import remark from 'remark';
import html from 'remark-html';

export const copyText = (text: string) => {
  navigator.clipboard.writeText(text);
};

export const getExtend = (filename: string) => {
  const pos = filename.lastIndexOf('.');
  if (pos === -1) return '';
  return filename.slice(pos + 1);
};

export const removeTags = (htmlString: string) => {
  const removeTagPattern = new RegExp('<("[^"]*"|\'[^\']*\'|[^\'">])*>', 'g');
  return htmlString.replace(removeTagPattern, '');
};

export const getDescription = async (markdown: string) => {
  const result = await remark()?.use(html)?.process(markdown);
  const htmlString = result.toString();
  const description = removeTags(htmlString).slice(0, 120) + '...';
  return { description };
};
