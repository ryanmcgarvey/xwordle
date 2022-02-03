import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "text" ]
  static values = {
    highlighted: {type: Boolean, default: false},
    text: String, 
    index: Number,
  }

  connect() {
    console.log("Connecting " + this.indexValue)
    this.element[this.identifier] = this;
    this.highlightedValue = this.indexValue === 0
  } 

  textValueChanged() {
    this.textTarget.innerHTML = this.textValue
  }

  highlightedValueChanged() {
    console.log("highlight changed " + this.highlightedValue)
    if(this.highlightedValue === true) {
      this.highlight()
    }else{
      this.dim()
    }
  }

  highlight() {
    // console.log("highlighting: " + this.indexValue)
    this.element.classList.add("outline");
    this.element.classList.add("outline-4");
    this.element.classList.add("outline-blue-400");
  }
  
  dim() {
    // console.log("dimming: " + this.indexValue)
    this.element.classList.remove("outline");
    this.element.classList.remove("outline-4");
    this.element.classList.remove("outline-blue-400");
  }
}
