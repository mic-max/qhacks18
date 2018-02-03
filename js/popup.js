$(document).ready(function() {
  $.each(chrome.extension.getBackgroundPage().GB.getBlockedSites(), function (index, value) {
    $('#blockedlist').append(`<div class='siterow' title='${value}'><span class='sitename'>${value}</span></div>`)
  })
})
