const url = {
  magnet: {
    regex: new RegExp(/magnet:\?xt=urn:[a-z0-9]+:[a-z0-9]{32}/i),
    tracker: '&tr'
  },
  pattern: null,
  regex: null,
  protocol: '^(https?:\\/\\/)?',
  domainName: '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|',
  ipAddress: '((\\d{1,3}\\.){3}\\d{1,3}))',
  portPath: '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*',
  queryString: '(\\?[;&a-z\\d%_.~+=-]*)?',
  fragmentLocator: '(\\#[-a-z\\d_]*)?$'
}

url.pattern =
  url.protocol +
  url.domainName +
  url.ipAddress +
  url.portPath +
  url.queryString +
  url.fragmentLocator

url.regex = new RegExp(url.pattern, 'i')

// Ensure the URL provided starts with `magnet`.
const isMagnetLink = str => str.startsWith('magnet')

export default {
  isMagnetLink,
  isValidMagnetLink: str => {
    // Ensure the magnet URL provided is valid.
    if (!isMagnetLink(str)) {
      return false
    }
    return str.match(url.magnet.regex) !== null
  },
  isValidUrl: str => {
    // Validates the URL provided.
    return url.regex.test(str)
  },
  parseMagnetLink: str => {
    // Strips/parses the magnet link of trackers.
    return str.split(url.magnet.tracker)[0]
  },
  url
}
