import CellInterface from "./Interfaces/CellInterface";
import ScoreMenagerInterface from "./Interfaces/ScoreMenagerInterface";
import CONFIG from "../config";
export default class ScoreMenager implements ScoreMenagerInterface {
  gameArray: CellInterface[][];
  HTMLDivBordArray: Array<Array<HTMLDivElement>>;
  constructor() {}

  public findToDestroy(gameArray: Array<Array<CellInterface>>) {
    console.clear();

    let toDestroy = gameArray.map((e) => e.map((f) => f.color));
    console.table(toDestroy);
    console.log("====Horyzontalne====");
    console.log(this.mapToKill(toDestroy, 1));
    console.log("===================");
    // console.log("===Vertical===");
    // console.log(this.destroyVertical(toDestroy));
    // console.log("==========");
    // console.log(toDestroy);
  }
  /**
   *
   * @param destroyArray
   * @param direcion
   * 1 - hoizontal
   * 2 - vertical
   * @description finds all availible and destroyable coords
   * @returns Array<[number,number]> returns array with coords to be destroy
   */
  private mapToKill(
    destroyArray: Array<Array<string | null>>,
    direction: number
  ): Array<[number, number]> {
    let coordsToDestroy = [];
    for (let y: number; y < CONFIG.size; y++) {
      let lastColor: string = "";
      let colorNumber: number = 0;
      let temporatyCoordsArray: Array<[number, number]> = [];

      for (let x: number; x < CONFIG.size; x++) {
        let f: string | null =
          destroyArray[direction ? x : y][direction ? y : x];
        console.log(f);

        console.log(
          (typeof f == "string" && lastColor === null) || lastColor == f
        ),
          x,
          y;
        if ((typeof f == "string" && lastColor === null) || lastColor == f) {
          // if color is null or has not changed
          console.log(f, colorNumber);

          lastColor = f;
          colorNumber++;
          temporatyCoordsArray.push([direction ? x : y, direction ? y : x]);
        } else {
          // if color has
          console.log("====================================");
          console.log(temporatyCoordsArray, f);
          console.log("====================================");
          if (colorNumber >= CONFIG.destroyNumber) {
            coordsToDestroy.push(...temporatyCoordsArray);
          }
          lastColor = null;
          colorNumber = 0;
          temporatyCoordsArray = [];
        }
      }
    }
    return coordsToDestroy;
  }
  /**
   *
   * @param destroyArray Array<Array<string | null>> array of colors or null
   * @description finds all dots to be destroyed horizontaly
   * @returns Array<[number,number]> returns array with coords to be destroy
   */
  private destroyHorizontal(
    destroyArray: Array<Array<string | null>>
  ): Array<[number, number]> {
    let CoordsToDestroy = [];
    destroyArray.forEach((e, x) => {
      let lastColor: string = "";
      let colorNumber: number = 1;
      let temporatyCoordsArray: Array<[number, number]> = [];
      if (temporatyCoordsArray.length >= CONFIG.destroyNumber) {
        CoordsToDestroy.push([...temporatyCoordsArray]);
      }
      e.forEach((f, y) => {
        if (f !== null)
          if (lastColor === null) {
            lastColor = f;
            colorNumber = 1;
          } else if (lastColor == f) {
            colorNumber++;
            temporatyCoordsArray.push([x, y]);
          } else {
            console.log(lastColor);
            console.log(colorNumber);
            if (temporatyCoordsArray.length >= CONFIG.destroyNumber) {
              CoordsToDestroy.push([...temporatyCoordsArray]);
            }
            console.log(temporatyCoordsArray);

            lastColor = f;
            colorNumber = 1;
          }
        else {
          console.log(temporatyCoordsArray);

          lastColor = null;
          if (temporatyCoordsArray.length >= CONFIG.destroyNumber) {
            CoordsToDestroy.push([...temporatyCoordsArray]);
          }
          colorNumber = 1;
        }
      });
    });
    return CoordsToDestroy;
  }
}
