import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import gfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { CustomMarkdown } from '@/components/organisms/custom-markdown';

interface MarkdownProps {
  source: string;
}

export default function Markdown({ source }: MarkdownProps) {
  return (
    <ReactMarkdown
      className="markdown-body"
      components={CustomMarkdown}
      linkTarget="_blank"
      // eslint-disable-next-line react/no-children-prop
      children={source}
      rehypePlugins={[rehypeRaw, rehypeKatex]}
      remarkPlugins={[gfm, remarkMath]}
    />
  );
}
