/* eslint-disable  react-hooks/rules-of-hooks */
/* eslint-disable  react/no-children-prop */
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { ClipboardIcon, CheckIcon } from '@heroicons/react/solid';
import { PaperClipIcon } from '@heroicons/react/outline';
import { ControlIcon } from '@/components/svg';
import { getExtend, copyText } from '@/lib/markdown';
import { BASE_URL } from '@/lib/constants';

export const CustomMarkdown = {
  a({ href, children, ...props }: any) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },
  h2({ node, children, ...props }: any) {
    const router = useRouter();
    const id = node.children[0].value || '';
    const link = `${BASE_URL}/${router.query.slug}#${id}`;

    return (
      <h2 id={id} {...props}>
        {String(children).replace(/\n$/, '')}
        <a href={`#${id}`}>
          <PaperClipIcon
            className="relative inline-flex w-5 h-5 mt-1 ml-1 text-gray-500 cursor-pointer clip bottom-1"
            onClick={() => copyText({ text: link })}
          />
        </a>
      </h2>
    );
  },
  code({ node, inline, className, children, ...props }: any) {
    const [enableCopy, setEnableCopy] = useState(true);
    const code = String(children).replace(/\n$/, '');

    const copyCode = ({ code }: { code: string }) => {
      copyText({ text: code });
      setEnableCopy(false);
      setTimeout(() => {
        setEnableCopy(true);
      }, 500);
    };

    const [_, filename] = /language-([\w./]*)/.exec(className) || [];
    const extend = getExtend({ filename });
    const containerStyle = { paddingTop: '48px' };

    return !inline ? (
      <>
        <div className="flex items-center justify-between snippet-controls">
          <div className="flex items-center">
            <ControlIcon />
            <div className="flex ml-2 text-gray-200">{filename}</div>
          </div>
          <div className="flex mr-2">
            {enableCopy ? (
              <ClipboardIcon
                onClick={() => copyCode({ code })}
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
          language={extend || filename}
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
