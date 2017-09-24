export default document.addEventListener('selectionchange', () =>
  chrome.runtime.sendMessage({
    request: 'updateContextMenu',
    selection: window
      .getSelection()
      .toString()
      .trim()
  })
)
