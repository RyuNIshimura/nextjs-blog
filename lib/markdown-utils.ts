import { BASE_URL } from '@/lib/constants'

export function getExtend(filename: string)
{
  const pos = filename.lastIndexOf('.')
  if (pos === -1) return ''
  return filename.slice(pos + 1)
}

export function copyText(text: string) {
  navigator.clipboard.writeText(text)
}

export function tweet(article: any) {
  let shareURL: string = 'https://twitter.com/share?'

  const params: any = {
    url: `${BASE_URL}/${article.fields.slug}`, 
    text: article.fields.title,
  }

  for(const prop in params) shareURL += '&' + prop + '=' + encodeURIComponent(params[prop])
  window.open(shareURL, '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0')
}