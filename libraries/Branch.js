class Branch {
  constructor(begin, end) {
    this.begin = begin;
    this.end = end;
    this.finished = false;
  }

  show() {
    stroke(255);
    strokeWeight(4);
    line(this.begin.x, this.begin.y, this.end.x, this.end.y);
  }

  branch(angle) {
    let dir = p5.Vector.sub(this.end, this.begin);
    // make rotate a variable and randomize
    dir.rotate(angle);
    dir.mult(0.67);
    let newEnd = p5.Vector.add(this.end, dir);

    return new Branch(this.end, newEnd);
  }
}
