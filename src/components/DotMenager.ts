import Dot from "./Dot";
import DotMenagerInterface from "./Interfaces/DotMenagerInterface";
export default class DotMenager implements DotMenagerInterface {
  dotPreviewContainer: HTMLDivElement;
  dotArray: Dot[];
  dotsNumber: number;
  /**
   *
   * @param ContainerSelector query selector of preview
   * @param dotsNumber  dots number to be generated
   * @implements @interface DotMenagerInterface
   */
  constructor(ContainerSelector: string, dotsNumber: number) {
    this.dotPreviewContainer = document.querySelector(
      ContainerSelector
    ) as HTMLDivElement;
    this.dotArray = [];
    this.dotsNumber = dotsNumber;
  }
  //TODO przed sprawdzeniem daj do sprawdzenia
  /**
   * @description Allows to add specyfic dot number
   * @param dotNumber
   */
  addDots(): void {
    this.dotArray = [];
    this.dotPreviewContainer.innerHTML = "";
    for (let i: number = 0; i < this.dotsNumber; i++) {
      let dot: Dot = new Dot();
      this.dotArray.push(dot);
      this.dotPreviewContainer.appendChild(dot.createDot());
    }
  }

  /**
   * @description removes dot from HTML preview an returns dot array that has been generated with  @addDots
   * @returns array with dot
   * @interface Dot
   */
  releaseDots(): Array<Dot> {
    this.dotArray.forEach((e) => e.byeBye());
    return this.dotArray;
  }
}
