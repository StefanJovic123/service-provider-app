class Cache {
  constructor() {
    this.items = {};
  }

  setItem(id, value) {
    this.items[id] = value;
  }

  getItem(id) {
    return this.items[id];
  }
}

export default Cache;
