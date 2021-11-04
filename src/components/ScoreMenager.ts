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
   * @description Set div array
   * @param HTMLDivBordArray
   */
  protected setDivArray = (HTMLDivBordArray: Array<Array<HTMLDivElement>>) =>
    (this.HTMLDivArray = HTMLDivBordArray);

  /**
   *
   * @param gameArray
   * @description finds all coords for remove
   */
  public findToDestroy(
    gameArray: Array<Array<CellInterface>>
  ): Array<[number, number]> {
    this.destroyedDotsArray = [];
    console.log("nowa", this.destroyedDotsArray);

    let toDestroy = gameArray.map((e) => e.map((f) => f.color));
    //zabijane
    //TODO ODKOMENTUJ MNEI
    this.destroyedDotsArray.push(...this.mapToKill(toDestroy, false)); // dół -- góra
    this.destroyedDotsArray.push(...this.mapToKill(toDestroy, true)); // prawo -- lewo
    this.destroyedDotsArray.push(
      ...this.mapToKillAleNaSkos(
        this.rotateArray90deg(
          toDestroy.map((r, x) => r.map((e, y) => ({ color: e, x, y }))), // robi 1 połowe
          0
        ),
        true
      )
    );
    this.destroyedDotsArray.push(
      ...this.mapToKillAleNaSkos(
        this.rotateArray90deg(
          toDestroy.map((r, x) => r.map((e, y) => ({ color: e, x, y }))), // robi 1 połowe
          2
        ),
        true
      )
    );
    this.destroyedDotsArray.push(
      ...this.mapToKillAleNaSkos(
        this.rotateArray90deg(
          toDestroy.map((r, x) => r.map((e, y) => ({ color: e, x, y }))), // robi 1 połowe
          0
        ),
        false
      )
    );
    this.destroyedDotsArray.push(
      ...this.mapToKillAleNaSkos(
        this.rotateArray90deg(
          toDestroy.map((r, x) => r.map((e, y) => ({ color: e, x, y }))), // robi 1 połowe
          2
        ),
        false
      )
    );
    //do zabcia
    this.destroyedDotsArray = [
      ...new Set(this.destroyedDotsArray.map((e) => JSON.stringify(e))),
    ].map((e) => JSON.parse(e));
    //TODO fix me
    console.log("po wszystkim", this.destroyedDotsArray);

    this.setScore(this.destroyedDotsArray.length);
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
    // clear();
    // table(destroyArray);
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
   *
   * @param destroyArray game matrix containg
   * @extends
   * @param direction
   * true  - od lewego góry [0,0] do prawy dół [8,8]
   * false - od lewy dół [8,0] dp prawa góra [0,8]
   */

  private mapToKillAleNaSkos(
    destroyArray: Array<Array<{ color: string | null; x: number; y: number }>>,
    direction: boolean
  ): Array<[number, number]> {
    let coordsToDestroy: Array<[number, number]> = [];
    for (let x: number = 0; x < CONFIG.size; x++) {
      let lastColor: string = "";
      let temporatyCoordsArray: Array<[number, number]> = [];
      for (let y: number = x; y >= 0; y--) {
        let f: string | null =
          destroyArray[direction ? x - y : CONFIG.size - 1 - (x - y)][y].color;
        if (typeof f == "string" && (lastColor === null || lastColor == f)) {
          // if color is null or has not changed
          lastColor = f;
          temporatyCoordsArray.push([
            destroyArray[direction ? x - y : CONFIG.size - 1 - (x - y)][y].x,
            destroyArray[direction ? x - y : CONFIG.size - 1 - (x - y)][y].y,
          ]);
        } else if (
          typeof f == "string" &&
          lastColor !== null &&
          lastColor != f
        ) {
          if (temporatyCoordsArray.length >= CONFIG.destroyNumber) {
            coordsToDestroy.push(...temporatyCoordsArray);
          }
          lastColor = f;
          temporatyCoordsArray = [
            [
              destroyArray[direction ? x - y : CONFIG.size - 1 - (x - y)][y].x,
              destroyArray[direction ? x - y : CONFIG.size - 1 - (x - y)][y].y,
            ],
          ];
        } else {
          if (temporatyCoordsArray.length > 0)
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
   * @description rotates array
   * @param destroyArray
   * @param rotationNumber
   * @returns rotate array
   */
  private rotateArray90deg(
    destroyArray: Array<Array<{ color: string | null; x: number; y: number }>>,
    rotationNumber: number
  ) {
    let array = [...destroyArray];

    for (let i: number = 0; i < rotationNumber; i++) {
      for (let x = 0; x < CONFIG.size / 2; x++) {
        for (let y = x; y < CONFIG.size - x - 1; y++) {
          let temp = array[x][y];
          array[x][y] = array[y][CONFIG.size - 1 - x];
          array[y][CONFIG.size - 1 - x] =
            array[CONFIG.size - 1 - x][CONFIG.size - 1 - y];
          array[CONFIG.size - 1 - x][CONFIG.size - 1 - y] =
            array[CONFIG.size - 1 - y][x];
          array[CONFIG.size - 1 - y][x] = temp;
        }
      }
    }
    return array;
  }

  /**
   *
   * @param mark true - marks false -unmarks
   * @description marks and unmarks  destroyd dots
   *
   */
  public mark(mark: boolean): void {
    this.destroyedDotsArray.forEach((e) => {
      this.HTMLDivArray[e[0]][e[1]].style.backgroundColor = mark
        ? CONFIG.markedColor
        : CONFIG.unmarkedColor;
    });
  }
  /**
   *
   * @param gameArray
   * @description check if game is winavle maps all evailible coords
   * @example
   *  takes game array and find all availible coords
   */
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
   *@description improves score and sets score text
   * @param score
   */
  //TODO 2 dekorator
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
