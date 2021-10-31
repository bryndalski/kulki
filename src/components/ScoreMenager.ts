import CellInterface from "./Interfaces/CellInterface";
import ScoreMenagerInterface from "./Interfaces/ScoreMenagerInterface";
import CONFIG from "../config";
import CoordsInterface from "./Interfaces/CoordsInterface";
import { setContainer } from "./decorators";

export default class ScoreMenager implements ScoreMenagerInterface {
  score: number;
  gameArray: CellInterface[][];
  destroyedDotsArray: Array<[number, number]>;
  HTMLDivArray: Array<Array<HTMLDivElement>>;
  container: HTMLElement;
  constructor() {
    this.score = 0;
    this.destroyedDotsArray = [];
    this.HTMLDivArray = [[]];
  }
  /**
   * Set div array
   * @param HTMLDivBordArray
   */
  protected setDivArray = (HTMLDivBordArray: Array<Array<HTMLDivElement>>) =>
    (this.HTMLDivArray = HTMLDivBordArray);

  public findToDestroy(
    gameArray: Array<Array<CellInterface>>
  ): Array<[number, number]> {
    console.clear();
    let toDestroy = gameArray.map((e) => e.map((f) => f.color));
    //zabijane
    //TODO ODKOMENTUJ MNEI
    // this.destroyedDotsArray.push(...this.mapToKill(toDestroy, false));
    // this.destroyedDotsArray.push(...this.mapToKill(toDestroy, true));
    this.destroyedDotsArray.push(
      ...this.mapToKillAleNaSkos(
        this.rotateArray90deg(
          toDestroy.map((r, x) => r.map((e, y) => ({ color: e, x, y }))), // robi 1 połowe
          0
        )
      )
    ); // góra doł

    // this.destroyedDotsArray.push(...this.mapToKillAleNaSkos(toDestroy, false));

    //do zabcia
    this.destroyedDotsArray = [...new Set(this.destroyedDotsArray)];
    //TODO fix me
    this.setScore(this.destroyedDotsArray.length);
    return this.destroyedDotsArray;
  }
  /**this.scor
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
    // console.clear();
    // console.table(destroyArray);
    let coordsToDestroy: Array<[number, number]> = [];
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
      if (temporatyCoordsArray.length >= CONFIG.destroyNumber) {
        coordsToDestroy.push(...temporatyCoordsArray);
      }
    }
    return coordsToDestroy;
  }

  /**
   * Jak zbija
   * 00
   *
   * 01 10
   *
   * 02 11 30
   *
   * 03 12 21 30
   *
   * == W 2 strone
   *
   * 80
   *
   * 70 81
   *
   * 60 71 82
   *
   *
   */

  /**
   *
   * @param destroyArray
   * @param direction
   * true  - od lewego góry [0,0] do prawy dół [8,8]
   * false - od lewy dół [8,0] dp prawa góra [0,8]
   */

  private mapToKillAleNaSkos(
    destroyArray: Array<Array<{ color: string | null; x: number; y: number }>>
  ): Array<[number, number]> {
    let coordsToDestroy: Array<[number, number]> = [];
    console.table(destroyArray);
    for (let x: number = 0; x < CONFIG.size; x++) {
      let lastColor: string = "";
      let temporatyCoordsArray: Array<[number, number]> = [];
      for (let y: number = x; y >= 0; y--) {
        let f: string | null = destroyArray[x - y][y].color;
        if (typeof f == "string" && (lastColor === null || lastColor == f)) {
          // if color is null or has not changed
          lastColor = f;
          temporatyCoordsArray.push([
            destroyArray[x - y][y].x,
            destroyArray[x - y][y].y,
          ]);
          // if (temporatyCoordsArray.length > 0)
          // console.log(
          //   "Warunek 1 ",
          //   temporatyCoordsArray,
          //   "dla x = ",
          //   x,
          //   "y = ",
          //   y
          // );
        } else if (
          typeof f == "string" &&
          lastColor !== null &&
          lastColor != f
        ) {
          // if (temporatyCoordsArray.length > 0)
          // console.log(
          //   "Warunek 2 przed",
          //   temporatyCoordsArray,
          //   "dla x = ",
          //   x,
          //   "y = ",
          //   y
          // );

          if (temporatyCoordsArray.length >= CONFIG.destroyNumber) {
            coordsToDestroy.push(...temporatyCoordsArray);
          }
          lastColor = f;
          temporatyCoordsArray = [
            [destroyArray[x - y][y].x, destroyArray[x - y][y].y],
          ];

          // if (temporatyCoordsArray.length > 0)
          // console.log(
          //   "Warunek 2 po",
          //   temporatyCoordsArray,
          //   "dla x = ",
          //   x,
          //   "y = ",
          //   y
          // );
        } else {
          if (temporatyCoordsArray.length > 0)
            if (temporatyCoordsArray.length != 0)
              if (temporatyCoordsArray.length >= CONFIG.destroyNumber) {
                // console.log(
                //   "Warunek 3",
                //   temporatyCoordsArray,
                //   "dla x = ",
                //   x,
                //   "y = ",
                //   y
                // );

                coordsToDestroy.push(...temporatyCoordsArray);
              }
          lastColor = null;
          temporatyCoordsArray = [];
        }
      }

      if (temporatyCoordsArray.length >= CONFIG.destroyNumber) {
        coordsToDestroy.push(...temporatyCoordsArray);
      }
    }
    return coordsToDestroy;
  }

  private rotateArray90deg(
    destroyArray: Array<Array<{ color: string | null; x: number; y: number }>>,
    rotationNumber: number
  ) {
    for (let i: number; i < rotationNumber; i++)
      for (let x = 0; x < CONFIG.size / 2; x++) {
        for (let y = x; y < CONFIG.size - x - 1; y++) {
          let temp = destroyArray[x][y];
          destroyArray[x][y] = destroyArray[y][CONFIG.size - 1 - x];
          destroyArray[y][CONFIG.size - 1 - x] =
            destroyArray[CONFIG.size - 1 - x][CONFIG.size - 1 - y];
          destroyArray[CONFIG.size - 1 - x][CONFIG.size - 1 - y] =
            destroyArray[CONFIG.size - 1 - y][x];
          destroyArray[CONFIG.size - 1 - y][x] = temp;
        }
      }
    return destroyArray;
  }

  /**
   *
   * @param mark true - marks false -unmarks
   * @description
   *
   */
  public mark(mark: boolean) {
    this.destroyedDotsArray.forEach((e) => {
      this.HTMLDivArray[e[0]][e[1]].style.backgroundColor = mark
        ? CONFIG.markedColor
        : CONFIG.unmarkedColor;
    });
    if (!mark) this.destroyedDotsArray = [];
  }

  public winable(
    gameArray: Array<Array<CellInterface>>
  ): Array<CoordsInterface> {
    let coordsToFindArray: Array<CoordsInterface> = [];
    gameArray.forEach((e, x) =>
      e.forEach((ie, y) => {
        if (ie.empty) coordsToFindArray.push({ x, y });
      })
    );
    return coordsToFindArray;
  }

  /**
   *
   * @param score
   */
  @setContainer
  private setScore(score: number): void {
    this.score += score;
    this.container.innerText = `Twój wynik to ${this.score}`;
  }
  /**
   * @description hehe thanos
   * @param gameArray
   */
  public endGame(gameArray: Array<Array<CellInterface>>) {
    alert(`your score is: ${this.score}`);
    alert("I'm Inavitable");
    alert("*snaps*");
    let pastaLaVista = [];
    gameArray.forEach((e, c) =>
      e.forEach((x, sc) => {
        if (c % 2 == 0 ? sc % 2 == 0 : sc % 2 == 1)
          if (!x.empty) pastaLaVista.push(x);
      })
    );
    pastaLaVista.forEach((e) => e.dot.byeBye());
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
}
