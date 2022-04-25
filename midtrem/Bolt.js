class Bolt {
  constructor(startPt, endPt, thickness) {
    this.start = startPt;
    this.end = endPt;
    this.thickness = thickness;
  }
  
  show() {
    stroke(255, 220);
    strokeWeight(this.thickness);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }
  
}