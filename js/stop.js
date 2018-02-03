function randomInsult() {
  let insults = [
    'Please return to studying',
    'Hey! You shouldn\'t be going here! This will be unproductive for you',
    'You don\'t want to fail',
    'It\'s not in your best interest to do that',
	'I know it\'s hard but you need to return to studying',
	'HEY! You can\'t do that'
  ]

  return insults[Math.floor(Math.random() * insults.length)]
}

let insult = document.getElementById('insult')
insult.innerHTML = randomInsult()
