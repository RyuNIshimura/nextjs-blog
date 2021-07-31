import { BASE_URL } from '@/lib/constants.js'

export function tweet(article) {
  let shareURL = 'https://twitter.com/share?'

  const params = {
    url: `${BASE_URL}/${article.fields.slug}`, 
    text: article.fields.title,
  }

  for(const prop in params) shareURL += '&' + prop + '=' + encodeURIComponent(params[prop])
  window.open(shareURL, '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0')
}