export default class EdgeInsets {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;

  constructor({top, left, bottom, right}: EdgeInsets) {
    this.top = top;
    this.left = left;
    this.bottom = bottom;
    this.right = right;
  }

  static zero() {
    return this.all(0);
  }

  static only(edgeInsets: EdgeInsets) {
    return new EdgeInsets(edgeInsets);
  }

  static symmetric({
    vertical,
    horizontal,
  }: {
    vertical?: number;
    horizontal?: number;
  }) {
    return new EdgeInsets({
      top: vertical,
      left: horizontal,
      bottom: vertical,
      right: horizontal,
    });
  }

  static all(value: number) {
    return new EdgeInsets({
      top: value,
      left: value,
      bottom: value,
      right: value,
    });
  }
}
