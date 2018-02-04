$(document).ready(function() {
  $.each(chrome.extension.getBackgroundPage().GB.getBlockedSites(), function (index, value) {
    $("#blockedlist").append(`<div class='siterow' title='${value}'><div class='sitename'>${index}</div><span class='sitedesc'> :${value}</span></div>`);
  })

  // When opening popup, loads actual values
  $('#timeSlide').val(GB.getTimeDelay())
  $('#delayVal').html(GB.getTimeDelay())

  $('#timeSlide').change(ev => {
    GB.setTimeDelay( $('#timeSlide').val() )
    let value = $('#timeSlide').val()
    console.log( 'delay!!!', value )
    $('#delayVal').html(value)
  })
})
