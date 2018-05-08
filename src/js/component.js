export default class Component {
  constructor(element) {
    this.element = element;
  }

  on(eventType, callback, element = this.element) {
    const cbWrap = event => callback(event.detail);
    element.addEventListener(eventType, cbWrap);
  }

  emit(eventType, data, element = this.element) {
    const event = new CustomEvent(eventType, { detail: data });
    element.dispatchEvent(event);
  }

  static bindTo(selector) {
    let element = selector;
    if (typeof selector === 'string') {
      element = document.querySelector(selector);
    }

    if (!(element instanceof HTMLElement || element instanceof HTMLDocument)) {
      throw new Error('cannot bound component');
    }

    (new this(element)).init();
  }

  // eslint-disable-next-line class-methods-use-this
  init() {
    throw new Error('Must be implemented!');
  }
}
