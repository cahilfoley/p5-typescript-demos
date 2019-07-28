class Guesser {
  target: string
  population: Population
  generations = 0
  currentFittest: Monkey
  started: number
  finished?: number

  constructor(target: string) {
    this.target = target
    DNA.size = target.length

    this.population = new Population(this.target)
    this.progressEvolution()
  }

  setup() {
    createCanvas(windowWidth, windowHeight)
    frameRate(15)
    this.started = performance.now()
  }

  progressEvolution() {
    this.population.evolve()
    this.currentFittest = this.population.getFittestMember()
    this.generations++
  }

  draw() {
    const currentGuess = this.currentFittest.dna.genes
    const score = floor(this.currentFittest.fitness * 100)

    background(51)
    textSize(80)
    textAlign('center')
    textFont('monospace')

    for (let i = 0; i < currentGuess.length; i++) {
      if (currentGuess[i] === this.target[i]) {
        fill(255, 167, 26)
      } else {
        fill(255)
      }

      const x = width / 2 + i * 50 - (currentGuess.length - 1) * 25
      text(currentGuess[i], x, height / 2 - 80)
    }

    for (let i = 0; i < this.target.length; i++) {
      if (currentGuess[i] === this.target[i]) {
        fill(255, 167, 26)
      } else {
        fill(160)
      }

      const x = width / 2 + i * 50 - (this.target.length - 1) * 25
      text(this.target[i], x, height / 2)
    }

    fill(255)
    textSize(50)

    text(`Score: ${score}%`, width / 2, height / 2 + 150)
    text(`Generations: ${this.generations}`, width / 2, height / 2 + 200)

    if (score === 100) {
      if (!this.finished) this.finished = performance.now()

      fill(50, 200, 50)
      textSize(30)
      const runtime = this.finished - this.started
      const perGeneration = runtime / this.generations
      text(
        `Finished in: ${runtime.toFixed(2)}ms (${perGeneration.toFixed(
          2
        )}ms/gen)`,
        width / 2,
        height / 2 + 250
      )
      noLoop()
    } else {
      this.progressEvolution()
    }
  }
}
