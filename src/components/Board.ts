import Dot from "./Dot";
import BoardInterface from "./Interfaces/BoardInterface";
import ScoreMenager from "./ScoreMenager";

export default class Board extends ScoreMenager implements BoardInterface {
  HTMLDivBordArray: HTMLDivElement[][];
  HTMLContainer: HTMLDivElement;
  mouseOverEnable: boolean;
  /**
   *
   * @param containerTAG container uery selector
   * @extends ScoreMenager
   * @interface BordInterface
   * @description class to menagement HTML game board
   */
  constructor(containerTAG: string) {
    super();
    this.HTMLDivBordArray = [[]];
    this.HTMLContainer = document.querySelector(containerTAG) as HTMLDivElement;
    this.mouseOverEnable = false;
  }
  /** Creates path dashbord
   *
   * @name createContainer
   * @function
   * @global
   * @param {Number} size size of container path ex: 4x4
   * @see createContainer
   * kierunek tablicy :
   *      0
   *      ↓
   *      8
   */
  protected createContainer(size: number): void {
    for (let i = 0; i < size; i++) {
      let divRow: HTMLDivElement = document.createElement("div");
      divRow.classList.add("game--row");
      this.HTMLDivBordArray.push([]);
      for (let j = 0; j < size; j++) {
        let divCell: HTMLDivElement = document.createElement("div");
        this.HTMLDivBordArray[i].push(divCell);
        divCell.classList.add("game", "game--tile");
        divCell.addEventListener("click", () => {
          return this.tileClickListen(i, j);
        });
        divCell.addEventListener("mouseover", () => {
          return this.tileMouseOverListener(i, j);
        });
        divRow.appendChild(divCell);
      }
      this.HTMLContainer.appendChild(divRow);
    }
    this.setDivArray(this.HTMLDivBordArray);
  }

  /**
   * @override ScoreMenager
   * @param x xCoord
   * @param y yCoord
   * @description function that handles tile click event'
   *
   */
  public tileClickListen = (x: number, y: number) => {};

  /**
   * @override ScoreMenager
   * @param x xCoord
   * @param y yCoord
   * @description function that handles mouse over event
   */
  public tileMouseOverListener = (x: number, y: number) => {};
}
