import CellInterface from "./Interfaces/CellInterface";
import ScoreMenagerInterface from "./Interfaces/ScoreMenagerInterface";
import CONFIG from "../config";
export default class ScoreMenager implements ScoreMenagerInterface {
  score: number;
  gameArray: CellInterface[][];
  destroyedDotsArray: Array<[number, number]>;
  HTMLDivArray: Array<Array<HTMLDivElement>>;

  constructor() {
    this.score = 0;
    this.destroyedDotsArray = [];
    this.HTMLDivArray = [[]];
  }
  /**
   * Set div array
   * @param HTMLDivBordArray
   */
  setDivArray = (HTMLDivBordArray: Array<Array<HTMLDivElement>>) =>
    (this.HTMLDivArray = HTMLDivBordArray);

  public findToDestroy(
    gameArray: Array<Array<CellInterface>>
  ): Array<[number, number]> {
    let toDestroy = gameArray.map((e) => e.map((f) => f.color));
    //zabijane
    this.destroyedDotsArray.push(...this.mapToKill(toDestroy, false));
    this.destroyedDotsArray.push(...this.mapToKill(toDestroy, true));
    //do zabcia
    this.destroyedDotsArray = [...new Set(this.destroyedDotsArray)];
    //TODO fix me
    this.score += this.destroyedDotsArray.length;
    console.log(this.score);

    return this.destroyedDotsArray;
  }
  /**
   *
   * @param destroyArray
   * @param direcion <0,1>
   * false - hoizontal
   * true - vertical
   * @description finds all availible and destroyable coords
   * @returns Array<[number,number]> returns array with coords to be destroy
   */

  private mapToKill(
    destroyArray: Array<Array<string | null>>,
    direction: boolean
  ): Array<[number, number]> {
    console.clear();
    // console.table(destroyArray);
    let coordsToDestroy = [];
    for (let y: number = 0; y < CONFIG.size; y++) {
      let lastColor: string = "";
      let temporatyCoordsArray: Array<[number, number]> = [];
      for (let x: number = 0; x < CONFIG.size; x++) {
        let f: string | null =
          destroyArray[direction ? x : y][direction ? y : x];
        if (typeof f == "string" && (lastColor === null || lastColor == f)) {
          // if color is null or has not changed
          lastColor = f;
          temporatyCoordsArray.push([direction ? x : y, direction ? y : x]);
        } else if (
          typeof f == "string" &&
          lastColor !== null &&
          lastColor != f
        ) {
          if (temporatyCoordsArray.length >= CONFIG.destroyNumber) {
            coordsToDestroy.push(...temporatyCoordsArray);
          }
          lastColor = f;
          temporatyCoordsArray = [[direction ? x : y, direction ? y : x]];
        } else {
          if (temporatyCoordsArray.length != 0)
            if (temporatyCoordsArray.length >= CONFIG.destroyNumber) {
              coordsToDestroy.push(...temporatyCoordsArray);
            }
          lastColor = null;
          temporatyCoordsArray = [];
        }
      }
    }
    return coordsToDestroy;
  }

  /**
   *
   * @param mark marks or unmarks destroyed dots
   */
  mark(mark: boolean) {
    this.destroyedDotsArray.forEach((e) => {
      this.HTMLDivArray[e[0]][e[1]].style.backgroundColor = mark
        ? CONFIG.markedColor
        : CONFIG.unmarkedColor;
    });
    if (!mark) this.destroyedDotsArray = [];
  }

  setScore() {}
}
