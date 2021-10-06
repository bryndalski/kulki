import CoordsInterface from "./Interfaces/CoordsInterface";
import DotInterface from "./Interfaces/DotInterface";

export default class Dot implements DotInterface {
  colors: ["orange", "green", "blue"];
  isSelected: boolean;
  dot: HTMLDivElement;
  dotColor: string | null;
  /**
   * @description Single dot class
   * @bryndalski
   */
  constructor() {
    this.colors = ["orange", "green", "blue"];
    this.isSelected = false;
    this.dot = document.createElement("div");
    this.dotColor = null;
  }
  /**
   * @description creates single dot with random color from array
   * @method
   * @bryndalski
   * @return dot<HTMLDivElement> dot
   */
  createDot() {
    this.dot.classList.add("game--dot");
    this.dotColor = this.colors[Math.floor(Math.random() * 3)];
    this.dot.style.backgroundColor = this.dotColor;
    return this.dot;
  }
  /**
   * Removes dot from HTML
   */
  byeBye = ():void => {
    this.dot.remove();
  };

  /**
   * Adds dot to HTML
   */
  guessWhoIsBack = ():HTMLDivElement => this.dot;

  select() {
    if (!this.isSelected) this.dot.classList.add("game--dotBIG");
    else this.dot.classList.remove("game--dotBIG");
    this.isSelected = !this.isSelected;
  }
}
