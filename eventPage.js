let sites = [
  "facebook.com",
  "twitter.com",
  "instagram.com"
]

let studyMode = false

chrome.tabs.onUpdated.addListener(function(tabId, changedInfo, tab) {
  for (site of sites) {
    console.log('tabId:', tabId)
    console.log('changedInfo:', changedInfo)
    console.log('tab:', tab)
    if (tab.url.match(site) && studyMode) {
      // serve a page with a continue link to what they were trying to reach
      chrome.tabs.update(tabId, {
        "url" : "pages/stop.html" // add next url to query params???
      }, function () {});
    }
  }
});
