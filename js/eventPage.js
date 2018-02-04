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
    'Take a 3 minute break and try the Tree Pose',
    'Take a 5 minute break and try one of our many yoga positions offered on the dashboard!',
    'Take a 4 minute break and try the Cat Position'
  ]},
  {type: 'Meditation',
    actions: [
    'Lie down and take a break for 5 minutes!',
    'Take a deep breath in, hold for a few seconds, and release. Repeat for 5 minutes',
	'Close your eyes and enjoy two minutes of silence and think about how far you have come'
    ]
  },
  {type: 'Random',
    actions: [
    'Go for a walk!',
    'Have a healthy snack! Check out the dashboard for ideas',
    'Go grab a glass of water! :)',
  	'If there is a dog near by, pet it!',
	'Grab a treat, you deserve it!',
	'Call a friend for five minutes and see how he or she is :)'
  ]},
  {type: 'Inspiration',
    actions: [
    'You are doing so well!',
    'Keep up the great work!',
  	'It will be worth it in the end! Keep it up!',
	'Put a smile on, it looks good on you:D',
	'Give yourself a pat on the back, you\'re doing great'
    ]
  }

];

(function myLoop() {
	setTimeout(() => {
    // choose a study break
    let studyObj = studyBreaks[Math.floor(Math.random() * studyBreaks.length)]
    let msg = studyObj.actions[Math.floor(Math.random() * studyObj.actions.length)]
    notify(studyObj.type, msg, `../img/${studyObj.type}.png`)
    console.log('Time Delay:', 1e3 * GB.getTimeDelay() + 4e3) // TODO testing
		myLoop()
  }, 1e3 * GB.getTimeDelay() + 1e3)
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
