import elementUtils from '@/js/element'

import '@@/img/icon-128.png'
import '@@/img/icon-34.png'

const copyToClipboard = info => {
  const childNodeId = elementUtils.configElement.child.id
  const parentNodeId = elementUtils.configElement.parent.id
  let parentNode = document.getElementById(parentNodeId)
  const linkUrl = info.linkUrl
  const el = elementUtils.createElement()

  console.log('copyToClipboard(info) - info is:')
  console.info(info)
  console.log('Child node ID: ', childNodeId)
  console.log('Parent node ID: ', parentNodeId)
  console.log('Parent node: ', parentNode)
  console.log('Link url is: ', linkUrl)
  console.log('Created element:', el)

  // Check if the element has already been inserted via the GUID.
  if (parentNode === null || parentNode === undefined) {
    console.log('Parent node is null or undefined. Append it.')
    elementUtils.appendElement(el)
  } else {
    console.log('Parent node exists.  Remove it and append a new one.')
    elementUtils.removeElement(parentNodeId)
    elementUtils.appendElement(el)
  }

  console.log('Document.body at this point (after if/else)')
  console.info(document.body)

  // Ensure that the child node exists & was properly inserted.
  let childNode = document.getElementById(childNodeId)
  console.log('Child (nested) node is: ')
  console.info(childNode)

  // Set the inner text & value of the child node using the link URL.
  childNode.innerText = info.linkUrl
  childNode.value = info.linkUrl

  console.log('Child (nested) node after value added is: ')
  console.info(childNode)

  // Selected text (need to force this on the DOM after inserting value into HTML)
  // as the copy command copies the selected text.
  childNode.select()

  try {
    let successful = setTimeout(() => {
      document.execCommand('copy', null, false)
    })
    console.info(successful)
    const msg = successful ? 'successful' : 'unsuccessful'
    console.log('Copying text command was ' + msg)
  } catch (err) {
    console.log('Oops, unable to copy.  Error: ')
    console.info(err)
  }
}

// The onClicked callback function.
const onClickHandler = (info, tab) => {
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
chrome.contextMenus.onClicked.addListener(copyToClipboard)
// Original listener.
// chrome.contextMenus.onClicked.addListener(onClickHandler)

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
