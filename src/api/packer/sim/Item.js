export const RotationType_WHD = 0;
export const RotationType_HWD = 1;
export const RotationType_HDW = 2;
export const RotationType_DHW = 3;
export const RotationType_DWH = 4;
export const RotationType_WDH = 5;

export const WidthAxis = 0;
export const HeightAxis = 1;
export const DepthAxis = 2;

export const StartPosition = [0, 0, 0];

export const RotationTypeStrings = {
  [RotationType_WHD]: 'xyz',
  [RotationType_HWD]: 'yxz',
  [RotationType_HDW]: 'yzx',
  [RotationType_DHW]: 'zyx',
  [RotationType_DWH]: 'zxy',
  [RotationType_WDH]: 'xzy',
};

export default class Item {

  constructor(name, w, h, d, wg) {
    this.name = name || '';
    this.width = w || 0;
    this.height = h || 0;
    this.depth = d || 0;
    this.weight = wg || 0;
    this.rotationType = RotationType_WHD;
    this.position = []; // x, y, z
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  getDepth() {
    return this.depth;
  }

  getWeight() {
    return this.weight;
  }

  getRotationType() {
    return this.rotationType;
  }

  getRotationTypeString() {
    return RotationTypeStrings[this.getRotationType()];
  }

  getDimension() {
    let d;
    switch (this.rotationType) {
      case RotationType_WHD:
        d = [this.getWidth(), this.getHeight(), this.getDepth()];
        break;
      case RotationType_HWD:
        d = [this.getHeight(), this.getWidth(), this.getDepth()];
        break;
      case RotationType_HDW:
        d = [this.getHeight(), this.getDepth(), this.getWidth()];
        break;
      case RotationType_DHW:
        d = [this.getDepth(), this.getHeight(), this.getWidth()];
        break;
      case RotationType_DWH:
        d = [this.getDepth(), this.getWidth(), this.getHeight()];
        break;
      case RotationType_WDH:
        d = [this.getWidth(), this.getDepth(), this.getHeight()];
        break;
    }
    return d;
  }

  intersect(i2) {
    return rectIntersect(this, i2, WidthAxis, HeightAxis) &&
        rectIntersect(this, i2, HeightAxis, DepthAxis) &&
        rectIntersect(this, i2, WidthAxis, DepthAxis);
  }

  getVolume() {
    return this.getWidth() * this.getHeight() * this.getDepth();
  }
}

export const rectIntersect = (i1, i2, x, y) => {
  let d1, d2, cx1, cy1, cx2, cy2, ix, iy;

  d1 = i1.getDimension();
  d2 = i2.getDimension();

  cx1 = i1.position[x] + d1[x] / 2;
  cy1 = i1.position[y] + d1[y] / 2;
  cx2 = i2.position[x] + d2[x] / 2;
  cy2 = i2.position[y] + d2[y] / 2;

  ix = Math.max(cx1, cx2) - Math.min(cx1, cx2);
  iy = Math.max(cy1, cy2) - Math.min(cy1, cy2);

  return ix < (d1[x] + d2[x]) / 2 && iy < (d1[y] + d2[y]) / 2;
};