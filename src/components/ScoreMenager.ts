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
    let toDestroy = gameArray.map((e) => e.map((f) => f.color));
    //zabijane
    this.destroyedDotsArray.push(...this.mapToKill(toDestroy, false));
    this.destroyedDotsArray.push(...this.mapToKill(toDestroy, true));
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
      if (temporatyCoordsArray.length >= CONFIG.destroyNumber) {
        coordsToDestroy.push(...temporatyCoordsArray);
      }
    }
    return coordsToDestroy;
  }
  // /**
  //  *
  //  * @param destroyArray
  //  * @description Marks all dots to destroy from game from left 0,0 to right bottom
  //  */
  // private mapToKillButSlant(destroyArray: Array<Array<string | null>>) {
  //   let coordsToDestroy = [];

  //   for (let l: number; l < destroyArray.length; l++) {
  //     let lastColor: string = "";
  //     let temporatyCoordsArray: Array<[number, number]> = [];
  //     for (let x: number = l; l >= 0; l--) {
  //       let f: string | null = destroyArray[l][l];
  //       if (typeof f == "string" && (lastColor === null || lastColor == f)) {
  //         // if color is null or has not changed
  //         lastColor = f;
  //         temporatyCoordsArray.push([l, l]);
  //       } else if (
  //         typeof f == "string" &&
  //         lastColor !== null &&
  //         lastColor != f
  //       ) {
  //         if (temporatyCoordsArray.length >= CONFIG.destroyNumber) {
  //           coordsToDestroy.push(...temporatyCoordsArray);
  //         }
  //         lastColor = f;
  //         temporatyCoordsArray = [[l,l]];
  //       } else {
  //         if (temporatyCoordsArray.length != 0)
  //           if (temporatyCoordsArray.length >= CONFIG.destroyNumber) {
  //             coordsToDestroy.push(...temporatyCoordsArray);
  //           }
  //         lastColor = null;
  //         temporatyCoordsArray = [];
  //       }
  //     }
  //     if (temporatyCoordsArray.length >= CONFIG.destroyNumber) {
  //       coordsToDestroy.push(...temporatyCoordsArray);
  //     }
  //   }
  //   return coordsToDestroy;
  // }

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
