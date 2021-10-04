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

export const removeHtmlTags = (htmlString: string) => {
  const htmlTagPattern = new RegExp('<("[^"]*"|\'[^\']*\'|[^\'">])*>', 'g');
  return htmlString.replace(htmlTagPattern, '');
};

export const getDescription = async (markdown: string) => {
  const result = await remark()?.use(html)?.process(markdown);
  const htmlString = result.toString();
  const description = removeHtmlTags(htmlString).slice(0, 120) + '...';
  return { description };
};
