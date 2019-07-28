class Shapes {
  static circle(size: number): p5.Vector[] {
    // Create a circle using vectors pointing from center
    const points = new Array<p5.Vector>()
    for (let angle = 0; angle < 360; angle += 9) {
      // Note we are not starting from 0 in order to match the
      // path of a circle.
      let v = p5.Vector.fromAngle(radians(angle - 135))
      v.mult(size)
      points.push(v)
    }

    return points
  }

  static square(size: number): p5.Vector[] {
    const points = new Array<p5.Vector>()
    // A square is a bunch of vertices along straight lines
    // Top of square
    for (let x = -size; x < size; x += 10) {
      points.push(createVector(x, -size))
    }
    // Right side
    for (let y = -size; y < size; y += 10) {
      points.push(createVector(size, y))
    }
    // Bottom
    for (let x = size; x > -size; x -= 10) {
      points.push(createVector(x, size))
    }
    // Left side
    for (let y = size; y > -size; y -= 10) {
      points.push(createVector(-size, y))
    }

    return points
  }

  // star(0, 0, 30, 70, 5);
  static star(
    x: number,
    y: number,
    radius1: number,
    radius2: number,
    npoints: number
  ): p5.Vector[] {
    let angle = TWO_PI / npoints
    let halfAngle = angle / 2.0

    const points = new Array<p5.Vector>()
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius2
      let sy = y + sin(a) * radius2
      points.push(createVector(sx, sy))
      sx = x + cos(a + halfAngle) * radius1
      sy = y + sin(a + halfAngle) * radius1
      points.push(createVector(sx, sy))
    }

    return points
  }
}
