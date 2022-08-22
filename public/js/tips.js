const tips = document.getElementById('tips')

function random_tips(tips) {
  return tips[Math.floor(Math.random() * items.length)]
}

var items = [
  'Spin your plants around every week so they grow evenly and not lopsided.',
  "Don't fertilize in the winter; only spring and summer.",
  'Use pots with holes in them.',
  'Try taking your plants outside for the summer and grow them in the shade.',
  "Use a moisture meter so you don't over water your plants.",
  'Sprinkle insecticide on the surface soil to keep bugs away.',
  'Cut off brown edges of your plant to tidy up.',
  'Be sure to dust your plants.',
  'Egg shells are a great source of nutrients.'
]
tips.innerText = random_tips(items)