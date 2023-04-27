import { widgetId, widgetTitle } from "./navigator";

export type WidgetItems = {
  [key: string]: string;
};

class Widget {
  title!: string;
  element!: HTMLDivElement;
  header!: HTMLSpanElement;
  offsetX = 0;
  offsetY = 0;
  pos: [number, number, number, number, boolean] = [0, 0, 0, 0, false];

  constructor(title: string, elements?: WidgetItems) {
    this.element = document.createElement("div");
    this.element.className = widgetId;
    this.element.style.top = "15px";
    this.element.style.left = "15px";
    this.title = title;
    this.clearElements();
    this.addElements(elements ?? {});
    window.addEventListener("resize", this.windowResize.bind(this));
    document.body.appendChild(this.element);
  }

  hide() {
    this.element.style.display = "none";
  }
  show() {
    this.element.style.display = "";
  }

  private mouseDown(e) {
    this.pos[2] = e.clientX;
    this.pos[3] = e.clientY;
    this.pos[4] = true;
  }
  private mouseUp() {
    this.pos[4] = false;
  }
  private mouseMove(e) {
    if(!this.pos[4]) return;
    this.pos[0] = this.pos[2] - e.clientX;
    this.pos[1] = this.pos[3] - e.clientY;
    this.pos[2] = e.clientX;
    this.pos[3] = e.clientY;
    this.element.style.top = Math.max(-1 * this.offsetY, this.element.offsetTop - this.pos[1]) + "px";
    this.element.style.left = Math.max(-1 * this.offsetX, this.element.offsetLeft - this.pos[0]) + "px";
    this.windowResize();
  }
  private windowResize() {
    if(window.innerWidth - this.offsetX < parseInt(this.element.style.left) + this.element.offsetWidth) this.element.style.left = ""; this.element.style.right = -1 * this.offsetX + "px";
    if(window.innerHeight - this.offsetY < parseInt(this.element.style.top) + this.element.offsetHeight) this.element.style.top = ""; this.element.style.bottom = -1 * this.offsetY + "px";
  }

  addElements(elements: WidgetItems) {
    for(const [key, text] of Object.entries(elements)) {
      const span = document.createElement("span");
      span.innerHTML = text;
      span.setAttribute("data-key", key);
      this.element.appendChild(span);
    }
  }
  updateElements(elements: WidgetItems) {
    for(const [key, text] of Object.entries(elements)) {
      const span = this.element.querySelector(`span[data-key="${key}"]`);
      if(span) span.innerHTML = text;
    }
  }
  removeElements(elements: WidgetItems) {
    for(const [key, text] of Object.entries(elements)) {
      const span = this.element.querySelector(`span[data-key="${key}"]`);
      if(span) span.remove();
    }
  }
  clearElements() {
    this.header = document.createElement("span");
    this.header.className = widgetTitle;
    this.header.innerHTML = this.title;
    this.element.innerHTML = "";
    this.element.appendChild(this.header);
    window.addEventListener("mouseup", this.mouseUp.bind(this));
    this.header.addEventListener("mousedown", this.mouseDown.bind(this));
    window.addEventListener("mousemove", this.mouseMove.bind(this));
  }
  destroy() {
    this.element.remove();
    window.removeEventListener("mouseup", this.mouseUp.bind(this));
    this.header.removeEventListener("mousedown", this.mouseDown.bind(this));
    window.removeEventListener("mousemove", this.mouseMove.bind(this));
    window.removeEventListener("resize", this.windowResize.bind(this));
  }
}

export default Widget;