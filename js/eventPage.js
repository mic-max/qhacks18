var SM = (function () {
  var my = {}

  my.get = function (key) {
    return localStorage.getItem(key)
  }

  my.put = function (key, value) {
    return localStorage.setItem(key, value)
  }

  my.delete = function (key) {
    return localStorage.removeItem(key)
  }

  return my
}())

var GB = (function (SM) {
  var my = {}

  my.blockTheseSites = {
    'facebook.com' : 'Facebook',
    'twitter.com' : 'Twitter',
    'instagram.com' : 'Instagram',
    'pinterest.ca' : 'Pinterest'
  }

  if (!SM.get('blocklist')) {
    SM.put('blocklist', JSON.stringify(my.blockTheseSites))
  }

  my.setTimeDelay = function (delay) {
    SM.put('delay', delay)
  }

  my.getTimeDelay = function () {
    return SM.get('delay')
  }

  my.getBlockedSites = function () {
    return JSON.parse(SM.get('blocklist'))
  }

  my.setWatchThisInstead = function (value) {
    var prot = /^http|chrome-extension/i
    if (value.match(prot)) {
      SM.put('instead', value)
    } else {
      SM.put('instead', 'http://' + value)
    }
    return SM.get('instead')
  }

  my.getWatchThisInstead = function () {
    return SM.get('instead')
  }

  my.addBlockedSite = function (site) {
    my.blockedSites = JSON.parse(SM.get('blocklist'))
    my.blockedSites[site] = 'Custom Add'
    SM.put('blocklist', JSON.stringify(my.blockedSites))
  }

  my.removeBlockedSite = function (site) {
    my.blockedSites = JSON.parse(SM.get('blocklist'))
    delete my.blockedSites[site]
    SM.put('blocklist', JSON.stringify(my.blockedSites))
  }

  return my
}(SM))

if (!GB.getWatchThisInstead()) {
  GB.setWatchThisInstead(chrome.extension.getURL('../pages/instead.html'))
}

chrome.tabs.onUpdated.addListener((tabId, changedInfo, tab) => {
    for (site in GB.getBlockedSites()) {
        if (tab.url.match(site)) {
            chrome.tabs.update(tabId, {'url' : GB.getWatchThisInstead()}, function () {})
        }
    }
})

chrome.tabs.onCreated.addListener((tab) => {
    for (site in GB.getBlockedSites()) {
        if (tab.url.match(site)) {
            chrome.tabs.update(tab.id, {'url' : GB.getWatchThisInstead()}, function () {})
        }
    }
})
