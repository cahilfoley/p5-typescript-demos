type LandscapeVertex = number

interface TerrainOptions {
  gridSize?: number
  speed?: number
  maxHeight?: number
  smoothness?: number
}

class Terrain {
  landscape: LandscapeVertex[]

  rows: number
  cols: number

  gridSize: number
  maxHeight: number
  smoothness: number

  speed: number
  yOffset = 0

  constructor(options: TerrainOptions = {}) {
    this.gridSize = options.gridSize || 20
    this.maxHeight = options.maxHeight || 250
    this.smoothness = options.smoothness || 10
    this.speed = options.speed || 0.1
  }

  get width() {
    return width * 1.2
  }

  get height() {
    return height * 2
  }

  setup() {
    createCanvas(windowWidth, windowHeight, WEBGL)
    this.generateLandscape()
  }

  windowResized() {
    resizeCanvas(windowWidth, windowHeight)
    this.generateLandscape()
  }

  generateLandscape() {
    this.rows = floor(this.height / this.gridSize)
    this.cols = floor(this.width / this.gridSize)

    this.landscape = []

    this.updateLandscape()
  }

  updateLandscape() {
    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        const index = this.getIndex(x, y)
        this.landscape[index] = map(
          noise(x / this.smoothness, y / this.smoothness + this.yOffset),
          0,
          1,
          -this.maxHeight / 2,
          this.maxHeight / 2
        )
      }
    }
  }

  /** Calculate the index of a cell in the landscape based on it's coordinates */
  getIndex(x: number, y: number): number {
    return y * this.rows + x
  }

  /** Gets the landscape vertex at the given coordinates */
  getAtIndex(x: number, y: number): LandscapeVertex {
    const index = this.getIndex(x, y)
    return this.landscape[index]
  }

  draw() {
    this.updateLandscape()
    background(51)

    rotateX(PI / 3)
    // rotateZ(PI / 6)
    stroke(200)
    fill(51)

    translate(-this.width / 2, -this.height / 1.5)

    for (let y = 0; y < this.rows - 1; y++) {
      beginShape(TRIANGLE_STRIP)
      for (let x = 0; x < this.cols; x++) {
        vertex(x * this.gridSize, y * this.gridSize, this.getAtIndex(x, y))
        vertex(
          x * this.gridSize,
          (y + 1) * this.gridSize,
          this.getAtIndex(x, y + 1)
        )
      }
      endShape()
    }

    this.yOffset -= this.speed
  }
}
