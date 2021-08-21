import { useState } from 'react'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { vs2015, tomorrowNightBlue } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import { ClipboardIcon, CheckIcon } from '@heroicons/react/solid'
import { PaperClipIcon } from '@heroicons/react/outline'
import { ControlIcon } from '@/components/svg'
import { getExtend, copyText } from '@/lib/markdown-utils'
import { BASE_URL } from '@/lib/constants'

export const MarkdownComponents = {
  a({href, children, ...props}: any) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    )
  },
  h2({ node, children, ...props }: any) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter()
    let id = ''
    if (node.children[0].value) {
      id = node.children[0].value
    }
    return <h2 
      // eslint-disable-next-line react/no-children-prop
      id={id}
      {...props} 
    >
      {String(children).replace(/\n$/, '')}
      <PaperClipIcon 
        className="relative inline-flex w-6 h-6 ml-1 text-gray-500 cursor-pointer clip bottom-1 hover:text-gray-300"
        onClick={() => copyText(`${BASE_URL}/${router.query.slug}#${id}`)}
      />
    </h2>
  },
  // eslint-disable-next-line no-unused-vars
  code({ node, inline, className, children, ...props }: any) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [enableCopy, setEnableCopy] = useState(true)
    // eslint-disable-next-line no-unused-vars
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { theme, setTheme } = useTheme()
    const code = String(children).replace(/\n$/, '')

    function copySnippet(code: string) {
      navigator.clipboard.writeText(code)
      setEnableCopy(false)
      setTimeout(() => { setEnableCopy(true) }, 500)
    }

    const match = /language-([\w./]*)/.exec(className || '')
    let fileName = ''
    if (match) {
      fileName = match[1]
    }

    let matchedExt = getExtend(fileName)

    // NOTE: highlightjsの場合、下記を記載してハイライトさせる
    // TODO: うまくできていない
    if (matchedExt === 'js' || fileName === 'js') {
      matchedExt = 'javascript'
    } else if (matchedExt === 'py' || fileName === 'py') {
      matchedExt = 'python'
    }

    const containerStyle = { paddingTop: '48px' }

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
            {enableCopy ? <ClipboardIcon 
              onClick={() => copySnippet(code)}
              className="w-6 h-6 text-gray-200 cursor-pointer"
              aria-hidden="true"
            /> : <CheckIcon 
              className="w-6 h-6 text-pink-400 cursor-pointer"
              aria-hidden="true"
            />}
          </div>
        </div>
        <SyntaxHighlighter
          className={className}
          customStyle={containerStyle}
          style={theme === 'dark' ? tomorrowNightBlue : vs2015}
          language={matchedExt || fileName}
          PreTag="div"
          // eslint-disable-next-line react/no-children-prop
          children={code}
          {...props}
        />
      </>
    ) : (
      <code
        className={className}
        // eslint-disable-next-line react/no-children-prop
        children={code}
        {...props}
      />
    )
  }
}