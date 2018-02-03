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

}());

var GB = (function (SM) {
    var my = {
      blockTheseSites: [
        'facebook.com',
        'twitter.com',
        'instagram.com'
      ],
      enabled: true
    }

    if (!SM.get('blocklist')) {
        SM.put('blocklist', JSON.stringify(my.blockTheseSites))
    }

    my.getBlockedSites = function () {
      // if(my.enabled) {
        return JSON.parse(SM.get('blocklist'))
      // }
      // return null
    }

    my.setWatchThisInstead = function (value) {
        var prot = /^http|chrome-extension/i;
        if (value.match(prot)) {
            SM.put('instead', value);
        } else {
            SM.put('instead', 'http://' + value);
        }
        return SM.get('instead');
    }

    my.getWatchThisInstead = function () {
        return SM.get('instead');
    }

    my.addBlockedSite = function (site) {
        my.blockedSites = JSON.parse(SM.get('blocklist'));
        my.blockedSites[site] = 'Custom Add';
        SM.put('blocklist', JSON.stringify(my.blockedSites));
    }

    my.removeBlockedSite = function (site) {
        my.blockedSites = JSON.parse(SM.get('blocklist'));
        delete my.blockedSites[site];
        SM.put('blocklist', JSON.stringify(my.blockedSites));
    }

    return my;
}(SM));


if (!GB.getWatchThisInstead()) {
    GB.setWatchThisInstead(chrome.extension.getURL('../pages/instead.html'));
}

chrome.tabs.onUpdated.addListener(function(tabId, changedInfo, tab) {
    for (site in GB.getBlockedSites()) {
      // console.log('tabId:', tabId)
      // console.log('changedInfo:', changedInfo)
      // console.log('tab:', tab)
        if (tab.url.match(site)) {
            chrome.tabs.update(tabId, {'url' : GB.getWatchThisInstead()}, function () {});
        }
    }
});
chrome.tabs.onCreated.addListener(function(tab) {
    for (site in GB.getBlockedSites()) {
      // console.log('tab:', tab)
        if (tab.url.match(site)) {
            chrome.tabs.update(tab.id, {'url' : GB.getWatchThisInstead()}, function () {});
        }
    }
});
