//https://processing.org/examples/morph.html
class Morph {
  // Arrays to store the vertices for the shapes
  shapes: { points: p5.Vector[]; color: p5.Color }[]
  currentShape: number

  // An array for the set of vertices beign drawn into the window
  morph: p5.Vector[] = []

  setup() {
    // Setup shapes array
    this.shapes = [
      { points: Shapes.circle(100), color: color('#009CDF') },
      { points: Shapes.square(50), color: color(175, 100, 220) },
      { points: Shapes.circle(150), color: color(255, 204, 0) }
      // { points: Shapes.star(0, 0, 30, 70, 5), color: color(50, 200, 100) }
    ]
    this.currentShape = 0

    // setup morph array
    const mostPoints = Math.max(
      ...this.shapes.map(shape => shape.points.length)
    )
    for (let i = 0; i < mostPoints; i++) {
      this.morph.push(new p5.Vector())
    }
  }

  recalc() {
    // We will keep how far the vertices are from their target
    let totalDistance = 0

    // Look at each vertex
    const points = this.shapes[this.currentShape].points
    for (let i = 0; i < points.length; i++) {
      // Are we lerping to the circle or square?
      let v1 = points[i]
      // Get the vertex we will draw
      let v2 = this.morph[i]
      // Lerp to the target
      v2.lerp(v1, 0.1)
      // Check how far we are from target
      totalDistance += p5.Vector.dist(v1, v2)
    }

    // If all the vertices are close, switch shape
    if (totalDistance < 0.1) {
      this.currentShape = (this.currentShape + 1) % this.shapes.length
    }
  }

  draw() {
    this.recalc()

    const color = this.shapes[this.currentShape].color
    const points = this.shapes[this.currentShape].points

    // Draw relative to center
    translate(width / 2, height / 2)
    strokeWeight(4)
    // Draw a polygon that makes up all the vertices
    beginShape()
    noFill()

    stroke(color)
    for (let i = 0; i < points.length; i++) {
      let v = this.morph[i]
      vertex(v.x, v.y)
    }

    endShape(CLOSE)
  }
}
