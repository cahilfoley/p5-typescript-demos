/**
 * 1. [x] Create a population with random traits (DNA)
 * 2. [x] Test how well each member does the thing (fitness)
 * 3. [x] Create a mating pool (heh) of parents by randomly picking member based on fitness
 * 4. [x] Select pairs of parent members and combine their traits to make a new member for the next population (splice DNA)
 * 5. [x] Repeat from 2 until totally sentient
 */

class Population {
  target: string
  size: number

  members: Monkey[] = []
  /** Fittest members from current generation to choose parents from */
  matingPool: Monkey[] = []

  constructor(target: string, size = 500) {
    this.target = target
    this.size = size

    for (let i = 0; i < this.size; i++) {
      let dna = new DNA()
      this.members.push(new Monkey(dna))
    }
  }

  calculateFitness() {
    let maxFitness = 0
    for (let member of this.members) {
      member.calculateFitness(this.target)
      maxFitness = max(maxFitness, member.fitness)
    }

    for (let member of this.members) {
      member.scaledFitness = member.fitness / maxFitness
    }
  }

  getFittestMember() {
    this.calculateFitness()
    let fittestMember = this.members[0]

    for (let member of this.members) {
      if (member.fitness > fittestMember.fitness) {
        fittestMember = member
      }
    }

    return fittestMember
  }

  /** Calculates the fitness of all members and populates a mating pool */
  createMatingPool() {
    this.calculateFitness()
    this.matingPool = []

    for (let member of this.members) {
      const chances = member.scaledFitness * 1000 + 1
      for (let i = 0; i < chances; i++) {
        this.matingPool.push(member)
      }
    }
  }

  /** Choses parents from the mating pool and splices their DNA together to create the next generation */
  spawnNewPopulation() {
    this.members = []
    for (let i = 0; i < this.size; i++) {
      const parentA = random(this.matingPool)
      const parentB = random(this.matingPool)
      const newDNA = parentA.dna.splice(parentB.dna)
      this.members.push(new Monkey(newDNA))
    }
  }

  /** Run the evolutionary process to create a new generation */
  evolve() {
    this.createMatingPool()
    this.spawnNewPopulation()
  }
}
