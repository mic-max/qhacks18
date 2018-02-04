$(() => {
  $.each(chrome.extension.getBackgroundPage().GB.getBlockedSites(), function (index, value) {
    $("#blockedlist").append(`<div class='siterow' title='${value}'><div class='sitename'>${index}</div><span class='sitedesc'> :${value}</span></div>`);
  })

  // When opening popup, loads actual values
  let lastDelay = GB.getTimeDelay()
  $('#timeSlide').val(lastDelay)
  $('#delayVal').html(lastDelay)

  $('#timeSlide').change(ev => {
    let value = $('#timeSlide').val()
    GB.setTimeDelay( value )
    $('#delayVal').html(value)
  })
})
