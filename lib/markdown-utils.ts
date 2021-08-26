import remark from 'remark'
import html from 'remark-html'

export function getExtend(filename: string)
{
  const pos = filename.lastIndexOf('.')
  if (pos === -1) return ''
  return filename.slice(pos + 1)
}

export function copyText(text: string) {
  navigator.clipboard.writeText(text)
}

export function extractTagText(htmlString: string, targetTag: string) {
  const tableOfContents: { name: string; id: string }[] = []

  const tagMatchPattern = new RegExp('<' + targetTag + '(?: .+?)?>.*?</' + targetTag + '>', 'g')
  const removeTagPattern = new RegExp('<("[^"]*"|\'[^\']*\'|[^\'">])*>', 'g')

  const result = htmlString.match(tagMatchPattern)

  if (result && result.length) {
    result.forEach((value) => {
      const name = value.replace(removeTagPattern, '')
      tableOfContents.push({
        name: name,
        id: name
      })
    })
  }
  return tableOfContents
}

export function removeTags(htmlString: string) {
  const removeTagPattern = new RegExp('<("[^"]*"|\'[^\']*\'|[^\'">])*>', 'g')
  return htmlString.replace(removeTagPattern, '').slice(0, 120) + '…'
}

export async function generateTableOfContents(markdown: any) {
  const result = await remark()?.use(html)?.process(markdown)
  const htmlString = result.toString()
  const description = removeTags(htmlString)
  const tableOfContents = extractTagText(htmlString, 'h2')
  return { tableOfContents, description }
}
