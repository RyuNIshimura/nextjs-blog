/* eslint-disable  react-hooks/rules-of-hooks */
/* eslint-disable  react/no-children-prop */
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { ClipboardIcon, CheckIcon } from '@heroicons/react/solid';
import { PaperClipIcon } from '@heroicons/react/outline';
import { ControlIcon } from '@/components/svg';
import { getExtend, copyText } from '@/lib/markdown-utils';
import { BASE_URL } from '@/lib/constants';

export const MarkdownComponents = {
  a({ href, children, ...props }: any) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },
  h2({ node, children, ...props }: any) {
    const router = useRouter();
    let id = '';
    if (node.children[0].value) {
      id = node.children[0].value;
    }
    return (
      <h2 id={id} {...props}>
        {String(children).replace(/\n$/, '')}
        <PaperClipIcon
          className="relative inline-flex w-5 h-5 mt-1 ml-1 text-gray-500 cursor-pointer clip bottom-1 hover:text-gray-300"
          onClick={() => copyText(`${BASE_URL}/${router.query.slug}#${id}`)}
        />
      </h2>
    );
  },
  code({ node, inline, className, children, ...props }: any) {
    const [enableCopy, setEnableCopy] = useState(true);
    const code = String(children).replace(/\n$/, '');

    function copySnippet(code: string) {
      navigator.clipboard.writeText(code);
      setEnableCopy(false);
      setTimeout(() => {
        setEnableCopy(true);
      }, 500);
    }

    const match = /language-([\w./]*)/.exec(className || '');
    let fileName = '';
    if (match) {
      fileName = match[1];
    }

    const matchedExt = getExtend(fileName);
    const containerStyle = { paddingTop: '48px' };

    return !inline || match ? (
      <>
        <div className="flex items-center justify-between snippet-controls">
          <div className="flex items-center">
            <div>
              <ControlIcon />
            </div>
            <div className="flex ml-2 text-gray-200">
              <div>{fileName}</div>
            </div>
          </div>
          <div className="flex mr-2">
            {enableCopy ? (
              <ClipboardIcon
                onClick={() => copySnippet(code)}
                className="w-6 h-6 text-gray-200 cursor-pointer"
                aria-hidden="true"
              />
            ) : (
              <CheckIcon
                className="w-6 h-6 text-pink-400 cursor-pointer"
                aria-hidden="true"
              />
            )}
          </div>
        </div>
        <SyntaxHighlighter
          className={className}
          customStyle={containerStyle}
          style={tomorrow}
          language={matchedExt || fileName}
          PreTag="div"
          children={code}
          {...props}
        />
      </>
    ) : (
      <code className={className} children={code} {...props} />
    );
  },
};
