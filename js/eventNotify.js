const studyBreaks = [
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
  ]},
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
      'Put a smile on, it looks good on you :D',
      'Give yourself a pat on the back, you\'re doing great'
  ]}
];

(function myLoop() {
	setTimeout(() => {
    // choose a study break
    let studyObj = studyBreaks[Math.floor(Math.random() * studyBreaks.length)]
    let msg = studyObj.actions[Math.floor(Math.random() * studyObj.actions.length)]
    notify(studyObj.type, msg, `../img/${studyObj.type}.png`)
		myLoop()
  }, 1e3 * GB.getTimeDelay() + 4e3)
})()

function notify(title, msg, icon) {
  chrome.notifications.create('', {
    type: "basic",
    title: title,
    message: msg,
    iconUrl: icon
  })
}
