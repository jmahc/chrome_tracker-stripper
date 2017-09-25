/**
 * Element configuration object.
 */

// Parent element identity.
const id = '_tracker_stripper_temp_'
const childId = `${id}select_`

// Creates a new <div>.
const divElement = () => document.createElement('div')

// Configuration.
const cfg = {
  child: {
    el: `<input type="text" id="${childId}"></code>`,
    id: childId
  },
  parent: {
    el: divElement,
    id
  },
  style: {
    position: 'position: absolute; top: -10000px; left: -100000px;',
    size: 'height: 1px; width: 1px;',
    visibility: 'visibility: hidden; overflow: hidden;'
  }
}

/**
 * Parent element styles.
 */
const style = `${cfg.style.position} ${cfg.style.size} ${cfg.style.visibility}`
cfg.style['css'] = style

/**
 *  Element methods.
 */

// Append the elements to the <body>.
const appendElement = el => document.body.appendChild(el)

// Create a <div> element.
const createElement = () => {
  let el = document.createElement('div')

  el.id = cfg.parent.id
  el.style = cfg.style.css
  el.innerHTML = cfg.child.el

  return el
}

// Insert the element into the DOM.
const insertElement = () => {
  const el = createElement()
  return appendElement(el)
}

// Remove the element from the DOM.
const removeElement = identity => {
  let el = document.getElementById(identity)
  return el.parentNode.removeChild(el)
}

export default {
  appendElement,
  configElement: cfg,
  createElement,
  insertElement,
  removeElement
}
