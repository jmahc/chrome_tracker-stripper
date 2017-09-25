import config from '@/js/shared'

const handleBackgroundData = data => {
  const childNodeId = config.child.id
  const parentNodeId = config.parent.id
  const parentNode = document.getElementById(parentNodeId)

  // Check if the element has already been inserted via the unique identity.
  if (parentNode !== null && parentNode !== undefined) {
    config.removeElement(parentNodeId)
  }

  // Create the element and append it to the DOM's <body> tag.
  const el = config.createElement(data)
  config.appendElement(el)

  // Ensure that the child node exists & was properly inserted then select
  // select the input element.
  const childNode = document.getElementById(childNodeId)
  childNode.select()

  try {
    const hasSupport = document.queryCommandSupported('copy')
    if (hasSupport) {
      let successful = setTimeout(() => {
        document.execCommand('copy', null, false)
      })
      const msg = successful ? 'successful.' : 'unsuccessful.'
      console.log('Copying text command was ' + msg)
    }
    throw new Error(
      'Unfortunately, the current version of your browser does not support' +
        ' interacting with the clipboard via JavaScript.'
    )
  } catch (err) {
    throw new Error(err)
  }
}

// Message receives from the background process.
chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
  if (request.method === config.listenMethod) {
    handleBackgroundData(request.data)
  }
  // Do nothing...
  sendResponse({})
})
