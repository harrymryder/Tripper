  // var ProgressBar = require('progressbar.js');
  import ProgressBar from 'progressbar.js'
  // var bar = new ProgressBar.Line('#container', {easing: 'easeInOut'});

  let bar = new ProgressBar.Circle('#container', {
    strokeWidth: 3,
    easing: 'easeInOut',
    duration: 1400,
    color: '#93B7BE',
    trailColor: '#eee',
    trailWidth: 1,
    svgStyle: null
  });

  const daysLeft = document.getElementById('container').dataset['daysleft']
  const totalStay = document.getElementById('container').dataset['los']


  const timeLeft = 1 - (daysLeft / totalStay)
  console.log(timeLeft)
  bar.animate(timeLeft);  // Number from 0.0 to 1.0


// document.querySelectorAll(".submit").forEach(function(button) {
//   button.addEventListener("click", (e) => {
//     bar.animate();
//   })
// });
