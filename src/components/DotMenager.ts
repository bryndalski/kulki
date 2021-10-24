import Dot from "./Dot";
import DotMenagerInterface from "./Interfaces/DotMenagerInterface";
export default class DotMenager implements DotMenagerInterface {
  dotPreviewContainer: HTMLDivElement;
  dotArray: Dot[];
  dotsNumber: number;

  constructor(ContainerSelector: string, dotsNumber: number) {
    this.dotPreviewContainer = document.querySelector(
      ContainerSelector
    ) as HTMLDivElement;
    this.dotArray = [];
    this.dotsNumber = dotsNumber;
  }

  /**
   * Allows to add specyfic dot number
   * @param dotNumber
   */
  addDots(): void {
    for (let i: number = 0; i < this.dotsNumber; i++) {
      let dot: Dot = new Dot();
      this.dotArray.push(dot);
      this.dotPreviewContainer.appendChild(dot.createDot());
    }
  }

  releaseDots(): void {
    this.dotArray.forEach((e) => e.byeBye());
    this.addDots();
  }

  renderDot() {}
}