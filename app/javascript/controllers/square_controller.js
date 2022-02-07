import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["text", "bg"];
  static values = {
    highlighted: { type: Boolean, default: false },
    text: String,
    x: Number,
    y: Number,
    blank: {type: Boolean, default: false}
  };

  connect() {
    this.element[this.identifier] = this;
    console.log("connect square")
  }

  textValueChanged() {
    this.textTarget.innerHTML = this.textValue;
  }

  highlightedValueChanged() {
    if (this.highlightedValue === true) {
      this.highlight();
    } else {
      this.dim();
    }
  }

  highlight() {
    this.element.classList.add("outline");
    this.element.classList.add("outline-4");
    this.element.classList.add("outline-blue-400");
  }

  dim() {
    this.element.classList.remove("outline");
    this.element.classList.remove("outline-4");
    this.element.classList.remove("outline-blue-400");
  }

  setFullMatch() {
    this.bgTarget.classList.remove("bg-white")
    this.bgTarget.classList.add("bg-green-500")
  }

  setPartialMatch() {
    this.bgTarget.classList.remove("bg-white")
    this.bgTarget.classList.add("bg-yellow-300");
  }

  setMiss() {
    this.bgTarget.classList.remove("bg-white")
    this.bgTarget.classList.add("bg-slate-400");
  }

  setBlank(){
    this.blankValue = true
    this.bgTarget.classList.remove("bg-white")
    this.bgTarget.classList.add("bg-black");
  }
}
