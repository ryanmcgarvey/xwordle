import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["text", "bg"];
  static values = {
    highlighted: { type: Boolean, default: false },
    text: String,
    x: Number,
    y: Number,
    focused: { type: Boolean, default: false },
    blank: { type: Boolean, default: false },
  };

  connect() {
    this.element[this.identifier] = this;
    // console.log("connect square");
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
  
  focusedValueChanged() {
    if (this.focusedValue === true) {
      this.focus();
    } else {
      this.blur();
    }
  }

  get outlineClasses() {
    return ["outline", "outline-4", "outline-blue-400"];
  }

  highlight() {
    this.outlineClasses.forEach((c) => {
      this.element.classList.add(c);
    });
  }

  dim() {
    this.outlineClasses.forEach((c) => {
      this.element.classList.remove(c);
    });
  }
  
  get focusClasses() {
    // return ["ring-yellow-100", "ring-offset-8", "ring-2", "shadow-xl"];
    return ["shadow-xl"];
  }

  focus() {
    this.focusClasses.forEach((c) => {
      this.element.classList.add(c);
    });
  }

  blur() {
    this.focusClasses.forEach((c) => {
      this.element.classList.remove(c);
    });
  }

  setFullMatch() {
    this.bgTarget.classList.remove("bg-white");
    this.bgTarget.classList.add("bg-green-500");
  }

  setPartialMatch() {
    this.bgTarget.classList.remove("bg-white");
    this.bgTarget.classList.add("bg-yellow-300");
  }

  setMiss() {
    this.bgTarget.classList.remove("bg-white");
    this.bgTarget.classList.add("bg-slate-400");
  }

  setBlank() {
    this.blankValue = true;
    this.bgTarget.classList.remove("bg-white");
    this.bgTarget.classList.add("bg-black");
  }
}
