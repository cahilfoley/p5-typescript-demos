let demo = 'guesser'

let guesser: Guesser
let terrain: Terrain

function setup() {
  switch (demo) {
    case 'guesser':
      guesser = new Guesser('Programmers took our jerbs')
      guesser.setup()
      break

    case 'terrain':
      terrain = new Terrain()
      terrain.setup()
      break

    default:
      createCanvas(windowWidth, windowHeight)
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  switch (demo) {
    case 'terrain':
      terrain.generateLandscape()
      break
  }
}

function draw() {
  switch (demo) {
    case 'guesser':
      guesser.draw()
      break

    case 'terrain':
      terrain.draw()
      break
  }
}
