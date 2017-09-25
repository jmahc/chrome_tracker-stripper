import config from '@/js/shared'

const handleBackgroundData = data => {
  console.log('From background to the content script has been hit! The data: ')
  console.info(data)
  // Shorthand the node id's.
  const childNodeId = config.child.id
  const parentNodeId = config.parent.id
  const parentNode = document.getElementById(parentNodeId)

  // Check if the element has already been inserted via the GUID.
  if (parentNode !== null && parentNode !== undefined) {
    elementUtils.removeElement(parentNodeId)
  }

  // Create the element and append it to the DOM's <body> tag.
  const el = config.createElement(data)
  elementUtils.appendElement(el)

  // Ensure that the child node exists & was properly inserted.
  let childNode = document.getElementById(childNodeId)
  console.log('Child (nested) node is: ')
  console.info(childNode)

  // Selected text (need to force this on the DOM after inserting value into HTML)
  // as the copy command copies the selected text.
  childNode.select()

  try {
    const hasSupport = document.queryCommandSupported('copy')
    console.log('Your browser can support the copy command? ', hasSupport)

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

// Message receives from the background process.
chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
  console.log('chrome.ext.onMsg.addListen hit in - contentScript.js')
  if (request.method === config.listenMethod) {
    console.log('Background message received. Request data: ')
    console.info(request.data)

    // alert(request.data)
    // handleBackgroundData(request.data)
    // sendResponse({data: document.getElementById('header').innerHTML});
    // Do nothing...
    sendResponse({})
  } else {
    // Do nothing...
    sendResponse({})
  }
})
