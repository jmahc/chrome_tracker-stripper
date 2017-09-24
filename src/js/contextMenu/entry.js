// ID to manage the context-menu entry.
let myContextMenuId

// Handles a click event.
const clickHandler = (clickData, tab) =>
  alert('Selected ' + clickData.selectionText + ' in ' + tab.url)

export default chrome.runtime.onMessage.addListener(
  (msg, sender, sendResponse) => {
    if (msg.request === 'updateContextMenu') {
      const type = msg.selection

      if (type === '') {
        // Remove the context menu entry.
        if (myContextMenuId !== null) {
          chrome.contextMenus.remove(myContextMenuId)

          // Invalidate entry now to avoid race conditions.
          myContextMenuId = null
        }
        // No context-menu ID, so nothing to remove.
      } else {
        // Add/update context menu entry.
        const options = {
          title: type,
          contexts: ['selection'],
          onclick: clickHandler
        }
        if (myContextMenuId != null) {
          chrome.contextMenus.update(myContextMenuId, options)
        } else {
          // Create new menu, and remember the context menu ID.
          myContextMenuId = chrome.contextMenus.create(options)
        }
      }
    }
  }
)
