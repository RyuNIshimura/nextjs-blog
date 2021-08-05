import { useState } from 'react'
import { useRouter } from 'next/router'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { vs2015, tomorrowNightBlue } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import { ClipboardIcon, CheckIcon } from '@heroicons/react/solid'
import { PaperClipIcon } from '@heroicons/react/outline'
import { ControlIcon } from '@/components/svg.js'
import { BASE_URL } from 'lib/constants.ts'
import { useTheme } from 'next-themes'

// 拡張子の取得
function getExtend(filename)
{
  const pos = filename.lastIndexOf('.')
  if (pos === -1) return ''
  return filename.slice(pos + 1)
}

function copy(text) {
  navigator.clipboard.writeText(text)
}

export const customComponents = {
  a({href, children, ...props}) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    )
  },
  h2({ node, children, ...props }) {
    const router = useRouter()
    console.log(router.query.slug)
    let id = ''
    if (node.children[0].value) {
      id = node.children[0].value
    }
    console.log(id)
    return <h2 
      // eslint-disable-next-line react/no-children-prop
      id={id}
      {...props} 
    >
      {String(children).replace(/\n$/, '')}
      <PaperClipIcon 
        className="clip cursor-pointer inline-flex ml-1 relative bottom-1 text-gray-500 h-6 w-6 hover:text-gray-300"
        onClick={() => copy(`${BASE_URL}/${router.query.slug}#${id}`)}
      />
    </h2>
  },
  // eslint-disable-next-line no-unused-vars
  code({ node, inline, className, children, ...props }) {
    const [enableCopy, setEnableCopy] = useState(true)
    // eslint-disable-next-line no-unused-vars
    const { theme, setTheme } = useTheme()
    const code = String(children).replace(/\n$/, '')

    function copySnippet(code) {
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
        <div className="snippet-controls flex items-center justify-between">
          <div className="flex items-center">
            <div>
              <ControlIcon />
            </div>
            <div className="flex text-gray-200 ml-2">
              <div>{fileName}</div>
            </div>
          </div>
          <div className="flex mr-2">
            {enableCopy ? <ClipboardIcon 
              onClick={() => copySnippet(code)}
              className="h-6 w-6 text-gray-200 cursor-pointer"
              aria-hidden="true"
            /> : <CheckIcon 
              className="h-6 w-6 text-pink-400 cursor-pointer"
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