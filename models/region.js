class Region {
  constructor(points) {
    this.points = points;
    this.length = points.length;
  }

  area() {
    let area = 0,
      i,
      j,
      point1,
      point2;

    for (i = 0, j = this.length - 1; i < this.length; j = i, i += 1) {
      point1 = this.points[i];
      point2 = this.points[j];
      area += point1[0] * point2[1];
      area -= point1[1] * point2[0];
    }

    return (area /= 2);
  }

  centroid() {
    let x = 0,
      y = 0,
      i,
      j,
      f,
      point1,
      point2;

    for (i = 0, j = this.length - 1; i < this.length; j = i, i += 1) {
      point1 = this.points[i];
      point2 = this.points[j];
      f = point1[0] * point2[1] - point2[0] * point1[1];
      x += (point1[0] + point2[0]) * f;
      y += (point1[1] + point2[1]) * f;
    }

    f = this.area() * 6;
    return [x / f, y / f];
  }
}

module.exports = Region;
