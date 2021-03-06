$(() => {
  const $status = $('#status')
  const $makethathappen = $('#makethathappen')
  const $blockthistoo = $('#blockthistoo')
  const $dontgothere = $('#dontgothere')
  const $watchthatinstead = $('#watchthatinstead')

  function showBlockList() {
      $('#blocklist').children().remove()
      $.each(GB.getBlockedSites(), (i, value) => {
        $('#blocklist').append(`<div id = 'site-${i}'><input type = 'button' id = 'unblock-${i}' value = 'UNBLOCK' />${i}: ${value}</div>`)
          $('#unblock-' + i).click(() => {
              GB.removeBlockedSite(i)
              showBlockList()
          })
      })
  }

  $makethathappen.click(() => {
    GB.setWatchThisInstead($('#watchthatinstead').val())
    $status.text('You will now be redirected.')
    $status.append(`<a href = 'http://${$watchthatinstead.val()}'>TRY ME</a>`)
  })

  $blockthistoo.click(() => {
    GB.addBlockedSite($dontgothere.val())
    $status.text('Site blocked! Try me!')
    var prot = /\/\//g
    if ($dontgothere.val().match(prot)) {
      $status.append(`<a href = '${$dontgothere.val()}'>TRY ME</a>`)
    } else {
      $status.append(`<a href = 'http://${$dontgothere.val()}'>TRY ME</a>`)
    }
    showBlockList()
  })

  if (GB.getWatchThisInstead() != chrome.extension.getURL('../pages/instead.html')) {
    $watchthatinstead.text(GB.getWatchThisInstead())
  }
  showBlockList()
})
