const parentId = '_tracker_stripper_'
const childId = `${parentId}select_`
const css = {
  position: 'position: absolute; top: -10000px; left: -100000px;',
  size: 'height: 1px; width: 1px;',
  visibility: 'visibility: visible; overflow: hidden;'
}
const style = `${css.position} ${css.size} ${css.visibility}`

const createChildElement = myValue => {
  const inputValue =
    myValue === '' || myValue === null || myValue === undefined ? '' : myValue
  return `<input type="text" id="${childId}" value="${inputValue}" />`
}

export default {
  /*
    Data objects / Defaults
   */
  child: {
    id: childId,
    el: createChildElement
  },
  contextMenu: {
    id: 'contextMagnetLink',
    contexts: ['link'], // 'page', 'editable', 'selection',
    title: 'Copy and strip the magnet link'
  },
  listenMethod: 'tracker_stripper_chrome_method',
  parent: {
    id: parentId,
    style: `${css.position} ${css.size} ${css.visibility}`
  },
  /*
    Methods
   */
  appendElement: el => {
    // Append the elements to the <body>.
    return document.body.appendChild(el)
  },
  createElement: text => {
    // Create a <div> element.
    let el = document.createElement('div')
    // Parent element <div>.
    el.id = parentId
    el.style = style
    // Child element <input>.
    el.innerHTML = createChildElement(text)
    return el
  },
  removeElement: identity => {
    // Remove the element from the DOM.
    let el = document.getElementById(identity)
    return el.parentNode.removeChild(el)
  }
}
