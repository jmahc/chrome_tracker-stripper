import config from '@/js/shared'
import helpers from '@/js/helpers'

import '@@/img/icon-128.png'
import '@@/img/icon-34.png'

// Event listener for when a user clicks the contextMenu option.
const onClickHandler = info => {
  // Parse the magnet link and strip the trackers from it.
  const data = helpers.parseMagnetLink(info.linkUrl)

  // Ensure the URL is a magnet link before continuing.
  if (!helpers.isMagnetLink(data) || !helpers.isValidMagnetLink(data)) {
    throw new Error(
      'The URL is not a magnet link or the magnet link is invalid.'
    )
    return null
  }

  console.log('background.js is passing data.');

  // We first need to find the active tab and window and then send
  // the data along to the contentScripts, which has access to the DOM.
  // This is based on:
  // ~ https://developer.chrome.com/extensions/messaging
  chrome.tabs.query({ active: true, currentWindow: true }, tabs =>
    chrome.tabs.sendMessage(tabs[0].id, { method: config.listenMethod, data })
  )
}

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(() => {
  // Magnet link item in the right-click (context) menu.
  chrome.contextMenus.create({
    contexts: config.contextMenu.contexts, // ['link']
    title: config.contextMenu.title, // 'Copy and strip the magnet link'
    id: config.contextMenu.id // 'contextMagnetLink'
  })
})

// Add the listener/click-event handler.
chrome.contextMenus.onClicked.addListener(onClickHandler)
