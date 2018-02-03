function randomInsult() {
  let insults = [
    'get back to studying',
    'do you remember the last time you messaged one of rachel\'s boys',
    'so you want to fail',
    'dropout alert!'
  ]

  return insults[Math.floor(Math.random() * insults.length)]
}

let insult = document.getElementById('insult')
insult.innerHTML = randomInsult()
