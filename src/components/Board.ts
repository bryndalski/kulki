import Dot from "./Dot";
import BoardInterface from "./Interfaces/BoardInterface";

export default class Board implements BoardInterface {
  HTMLDivBordArray: HTMLDivElement[][];
  HTMLContainer: HTMLDivElement;

  constructor(containerTAG: string) {
    
    this.HTMLDivBordArray = [[]];
    this.HTMLContainer = document.querySelector(containerTAG) as HTMLDivElement;
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
      this.HTMLDivBordArray.push([]);
      for (let j = 0; j < size; j++) {
        let divCell: HTMLDivElement = document.createElement("div");
        this.HTMLDivBordArray[i].push(divCell);
        divCell.classList.add("game", "game--tile");
        divCell.addEventListener("click", () => {
          return this.tileClickListen(i, j);
        });
        //TODO REMOVE ME
        // divCell.style.color = "white";
        // divCell.innerText = `${i} x ${j}`;
        divRow.appendChild(divCell);
      }
      this.HTMLContainer.appendChild(divRow);
    }
  }

  /**
   * @override
   * @param x xCoord
   * @param y yCoord
   */
  tileClickListen = (x: number, y: number) => {};
}
