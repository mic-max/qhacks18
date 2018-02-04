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

    my.getBlockedSites = function () {
        return JSON.parse(SM.get('blocklist'));
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

let studyBreaks = [
  {type: 'Yoga',
    actions: [
    '3 minutes of the beached whale',
    'the tree',
    'Slither like a snake!'
  ]},
  {type: 'Meditation',
    actions: [
    'Lie down and take a break!',
    'Hold your breath'
    ]
  },
  {type: 'Random',
    actions: [
    'Go for a walk!',
    'Have a healthy snack! Check out the website for ideas',
    'Go grab a glass of water! :)',
  	'If there is a dog near by, pet it!',
	   'Grab a treat, you deserve it!'
  ]},
  {type: 'Inspiration',
    actions: [
    'You are doing so well!',
    'Keep up the great work!',
  	'It will be worth it in the end! Keep it up!'
    ]
  }

];

(function myLoop() {
	setTimeout(() => {
    // choose a study break
    let studyObj = studyBreaks[Math.floor(Math.random() * studyBreaks.length)]
    let msg = studyObj.actions[Math.floor(Math.random() * studyObj.actions.length)]
    notify(studyObj.type, msg, `img/${studyObj.type}.png`)
		myLoop()
  }, 5e3)
})()

function notify(title, msg, icon) {
  chrome.notifications.create('', {
    type: "basic",
    title: title,
    message: msg,
    iconUrl: icon
  })
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
