chrome.contextMenus.create({
  title: 'Search in UrbanDictionary',
  contexts: ['selection'], // ContextType
  onclick: searchUrbanDict // A callback function
})
