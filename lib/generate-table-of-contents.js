import remark from 'remark'
import html from 'remark-html'

function extractTagText(htmlString, targetTag) {
  const tableOfContents = []

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

function removeTags(htmlString) {
  const removeTagPattern = new RegExp('<("[^"]*"|\'[^\']*\'|[^\'">])*>', 'g')
  return htmlString.replace(removeTagPattern, '').slice(0, 120) + '…'
}

export default async function generateTableOfContents(markdown) {
  const result = await remark().use(html).process(markdown)
  const htmlString = result.toString()
  const description = removeTags(htmlString)
  const tableOfContents = extractTagText(htmlString, 'h2')
  return { tableOfContents, description }
}
