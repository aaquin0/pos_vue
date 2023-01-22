import defaultSettings from '@/settings'

const title = defaultSettings.title || 'POSv2 Backoffice'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
