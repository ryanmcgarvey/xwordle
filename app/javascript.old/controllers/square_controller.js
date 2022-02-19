import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["text", "bg"];
  static values = {
    x: Number,
    y: Number,
    guess: String,
    answer: { type: String, default: "" },
    highlighted: { type: Boolean, default: false },
    focused: { type: Boolean, default: false },
    status: { type: String, default: "none" },
  };

  get match() {
    return this.answerValue === this.guessValue && this.statusValue === "match";
  }

  connect() {
    this.element[this.identifier] = this;
    console.log("connected square");
  }

  guessValueChanged() {
    this.textTarget.innerHTML = this.guessValue;
  }

  highlightedValueChanged() {
    if (this.highlightedValue === true) {
      this.highlight();
    } else {
      this.dim();
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

  focusedValueChanged() {
    if (this.focusedValue === true) {
      this.focus();
    } else {
      this.blur();
    }
  }

  get focusClasses() {
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

  statusValueChanged() {
    switch (this.statusValue) {
      case "none":
        this.removeStatus();
        break;
      case "match":
        this.setFullMatch();
        break;
      case "partial":
        this.setPartialMatch();
        break;
      case "miss":
        this.setMiss();
        break;
    }
  }

  removeAllStatus(){
    ["bg-green-500", "bg-yellow-300", "bg-slate-400", "bg-white"].forEach((c) => {
      this.bgTarget.classList.remove(c);
    });
  }

  removeStatus() {
    this.removeAllStatus();
    this.bgTarget.classList.add("bg-white");
  }

  setFullMatch() {
    this.removeAllStatus();
    this.bgTarget.classList.add("bg-green-500");
  }

  setPartialMatch() {
    this.removeAllStatus();
    this.bgTarget.classList.add("bg-yellow-300");
  }

  setMiss() {
    this.removeAllStatus();
    this.bgTarget.classList.add("bg-slate-400");
  }
}
