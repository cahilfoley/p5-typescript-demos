class Monkey {
  dna: DNA
  fitness?: number
  scaledFitness?: number

  constructor(dna: DNA) {
    this.dna = dna
  }

  calculateFitness(target: string) {
    let count = 0
    // check how close guess and target are
    for (let i = 0; i < target.length; i++) {
      if (this.dna.genes[i] === target[i]) {
        count++
      }
    }
    this.fitness = count / target.length
  }
}
