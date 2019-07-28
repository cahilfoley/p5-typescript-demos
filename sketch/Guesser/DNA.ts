class DNA {
  genes: string

  // prettier-ignore
  static validCharacters = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    // 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    ' ',
  ]

  constructor(value?: string) {
    this.genes = value || this.createRandomGuess()
  }

  createRandomGuess() {
    let guess = ''
    for (let i = 0; i < DNA.size; i++) {
      guess += random(DNA.validCharacters)
    }
    return guess
  }

  splice(otherDNA: DNA) {
    let newValue = ''
    const splitPoint = random(1, DNA.size - 1)
    for (let i = 0; i < DNA.size; i++) {
      if (random() <= DNA.mutationRate) {
        newValue += random(DNA.validCharacters)
      } else if (i < splitPoint) {
        newValue += this.genes[i]
      } else {
        newValue += otherDNA.genes[i]
      }
    }

    return new DNA(newValue)
  }

  static size: number
  static mutationRate = 0.01
}
