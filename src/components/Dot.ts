import CONFIG from "../config";
import CoordsInterface from "./Interfaces/CoordsInterface";
import DotInterface from "./Interfaces/DotInterface";

export default class Dot implements DotInterface {
  readonly colors: Array<string>;
  isSelected: boolean;
  dot: HTMLDivElement;
  dotColor: string | null;
  /**
   * @description Single dot class
   * @bryndalski
   */
  constructor() {
    this.colors = CONFIG.colors;
    this.isSelected = false;
    this.dot = document.createElement("div");
    this.dotColor = null;
  }
  /**
   * @description creates single dot with random color from array
   * @method
   * @bryndalski
   * @return dot
   */
  createDot(): HTMLDivElement {
    this.dot.classList.add("game--dot");
    this.dotColor =
      this.colors[Math.floor(Math.random() * CONFIG.colors.length)];
    this.dot.style.backgroundColor = this.dotColor;
    return this.dot;
  }
  /**
   * @description Removes dot from HTML
   * @method
   * @public
   */
  public byeBye = (): void => {
    this.dot.remove();
  };

  /**
   * @description contains html dot element
   * @returns dot html element
   * @public
   */
  public guessWhoIsBack = (): HTMLDivElement => this.dot;

  /**
   *
   */
  select() {
    if (!this.isSelected) this.dot.classList.add("game--dotBIG");
    else this.dot.classList.remove("game--dotBIG");
    this.isSelected = !this.isSelected;
  }
}
