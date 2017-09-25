import '@@/img/icon-128.png'
import '@@/img/icon-34.png'

const copyToClipboard = info => {
  var tempNode = document.getElementById('temp')
  tempNode.value = info.selectionText // <-- Selected text
  tempNode.select()
  document.execCommand('copy', false, null)
}

// The onClicked callback function.
const context = (info, tab) => {
  console.log('onClickHandler()')
  console.info(info)
  console.info(tab)

  const linkUrl = info.linkUrl

  console.log('item: ' + info.menuItemId + ' was clicked')
  console.log('info: ' + JSON.stringify(info))
  console.log('tab: ' + JSON.stringify(tab))

  // On right click, copy to clipboard.
  document
    .querySelector('body')
    .addEventListener('contextMagnetLink', event => {
      console.log('onClickHandler() -> contextMagnetLink')
      console.info(event)
      // Prevent the normal context menu from popping up.
      event.preventDefault()
      // Copy current selection.
      document.execCommand('copy')
    })
}

// Add the listener.
chrome.contextMenus.onClicked.addListener(onClickHandler)

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(() => {
  // Create one test item for each context type.
  const contexts = ['link'] // 'page', 'editable', 'selection',
  const title = 'Copy and strip the magnet link'

  // for (var i = 0; i < contexts.length; i++) {
  //   const context = contexts[i]
  //   const title =
  //     context === 'link'
  //       ? `Copy the magnet ${context}`
  //       : `the context is: ${context}`
  //
  //   const id = chrome.contextMenus.create({
  //     title,
  //     contexts: [context],
  //     id: 'context' + context
  //   })
  //   console.log(`'${context}' item: ${id}`)
  // }

  // Magnet link item in the right-click (context) menu.
  chrome.contextMenus.create({
    title,
    contexts,
    id: 'contextMagnetLink'
  })

  // TODO
  // - use the chrome.contextMenus API to add the buttons to the context menu
  // - add an event listener to each button
  // - copy the item into storage using the chrome.storage API
  // - paste the item by getting it from the chrome.storage API
})
