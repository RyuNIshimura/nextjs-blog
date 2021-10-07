import remark from 'remark';
import html from 'remark-html';

export const copyText = ({ text }: { text: string }) => {
  navigator.clipboard.writeText(text);
};

export const getExtend = ({ filename = '' }: { filename: string }) => {
  const pos = filename.lastIndexOf('.');
  if (pos === -1) return '';
  return filename.slice(pos + 1);
};

export const removeHtmlTags = ({ htmlString }: { htmlString: string }) => {
  const htmlTagPattern = new RegExp('<("[^"]*"|\'[^\']*\'|[^\'">])*>', 'g');
  return htmlString.replace(htmlTagPattern, '');
};

export const removeNewLine = ({ text }: { text: string }) => {
  const newText = text.replace(/\r?\n/g, '');
  return newText;
};

export const getMetaDescription = async ({ text }: { text: string }) => {
  const result = await remark()?.use(html)?.process(text);
  const htmlString = removeNewLine({ text: result.toString() });
  const description = removeHtmlTags({ htmlString }).slice(0, 120) + '...';
  return description;
};
