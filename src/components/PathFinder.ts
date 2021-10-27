import CoordsInterface from "./Interfaces/CoordsInterface";
import PathFindingINterface from "./Interfaces/PathFindingInterface";
import CellInterface from "./Interfaces/CellInterface";
import CONFIG from "../config";

export default class PathFinder implements PathFindingINterface {
  startPoint: CoordsInterface;
  endPoint: CoordsInterface;
  numberArry: (String | Number)[][];
  divArray: HTMLDivElement[][];
  pathArray: [number, number][][][];
  lastNumberToFind: number;
  lastArray: string;
  canSearch: boolean;
  findNumber: number;
  divesToDraw: [number, number][];
  dotColor: string;

  constructor(divArray) {
    this.divArray = divArray;
    this.findNumber = 0;
    this.numberArry = [];
    this.pathArray = [];
    this.startPoint = { x: -1, y: -1 };
    this.endPoint = { x: -1, y: -1 };
    this.numberArry = [[]];
    this.lastNumberToFind = 1;
    this.canSearch = true;
    this.divesToDraw = [];
    this.dotColor = "";
  }

  /**
   * Set path finding start algoritm
   * @param x
   * @param y
   */
  setStart(x: number, y: number, gameArray: Array<Array<CellInterface>>): void {
    this.startPoint.x = x;
    this.startPoint.y = y;
    this.setFindingArray(gameArray);
    this.numberArry[x][y] = "START";
  }
  /**
   * Set dot color
   * @param color strign color
   */
  setColor(color: string): void {
    this.dotColor = color;
    console.log(this.dotColor);
  }

  /**
   * Set path finding stop algoritm
   * @param x
   * @param y
   */
  setEnd(x: number, y: number): void {
    this.endPoint.x = x;
    this.endPoint.y = y;
    this.numberArry[x][y] = "END";
  }
  /**
   * Converts div array to normal array
   * @param gameArray
   */
  setFindingArray(gameArray: Array<Array<CellInterface>>): void {
    this.numberArry = gameArray.map((e, c) => {
      this.pathArray[c] = [];
      return e.map((ie, ic) => {
        this.pathArray[c][ic] = [];
        return ie.empty ? 0 : "X";
      });
    });
    this.lastArray = JSON.stringify(this.numberArry);
  }

  /**
   * @function
   * @description Finds path from A to B
   * @returns Array<[number,number]> coordinates array
   */
  findPath(): Array<[number, number]> {
    if (this.numerize(this.startPoint.x, this.startPoint.y)) return [];
    while (this.canSearch) {
      this.findNumber = this.findNumber + 1;
      for (let c = 0; c < this.numberArry.length; c++) {
        for (let ic = 0; ic < this.numberArry[c].length; ic++) {
          if (this.numberArry[c][ic] === this.findNumber)
            if (this.numerize(c, ic)) return this.pathArray[c][ic];
        }
      }
      if (JSON.stringify(this.numberArry) != this.lastArray) {
        this.lastArray = JSON.stringify(this.numberArry);
      } else break;
    }
    return [];
  }
  /**
   * @description Changes search availibility to disable
   */
  stopFinding() {
    this.canSearch = false;
  }
  /**
   * Handles live path finding with returns etc
   * @param x
   * @param y
   * @param gameArray
   */
  findLive(x: number, y: number, gameArray: Array<Array<CellInterface>>) {
    this.setStart(this.startPoint.x, this.startPoint.y, gameArray);
    this.findNumber = 0;
    if (x === this.startPoint.x && y === this.startPoint.y) return [];
    else {
      this.setEnd(x, y);
      this.canSearch = true;
      this.colorize(this.findPath());
    }
  }
  /**
   * @function
   * @param x number  coords of x
   * @param y number
   * @returns boolean
   * @description assigns number to all near by coords
   *
   * @example for cords (3,2) and number 3 assigns :
   *  - for point x:2 y:2 - 4
   *  - for point x:3 y:1 - 4
   *  - for point x:3 y:3 - 4
   *  - for point x:4 y:2 - 4
   * if one of them is marked as "END" returns true
   * else returns false
   *
   */
  numerize(x: number, y: number): boolean {
    const directions = [
      { x: -1, y: 0 }, //jeden w góre
      { x: 0, y: -1 }, //jeden w lewo
      { x: 0, y: 1 }, // jeden w prawo
      { x: 1, y: 0 }, //jeden w dół
    ];
    for (let i: number = 0; i < directions.length; i++) {
      try {
        let e = directions[i];
        if (this.numberArry[x + e.x][y + e.y] == "END") return true;
        else if (this.numberArry[x + e.x][y + e.y] === 0) {
          this.numberArry[x + e.x][y + e.y] = this.findNumber + 1;
          this.pathArray[x + e.x][y + e.y] = [
            ...this.pathArray[x][y],
            [x + e.x, y + e.y],
          ];
        }
      } catch (er) {
        //TODO zakomentuj mnie
      }
    }

    return false;
  }
  /**
   * Assign activeTile class to all found div
   * @function
   * @param coordsArray
   * @description Paints path from A to B using div array and aclass `game-title-active`
   */
  colorize(coordsArray: Array<[number, number]>): void {
    this.divesToDraw = [
      ...coordsArray,
      [this.startPoint.x, this.startPoint.y],
      [this.endPoint.x, this.endPoint.y],
    ];

    this.divesToDraw.forEach((e) => {
      this.divArray[e[0]][e[1]].style.backgroundColor = this.convertColor(
        this.dotColor,
        CONFIG.trackOpacity
      );
      this.divArray[e[0]][e[1]].style.borderColor = this.dotColor;
    });
  }
  /**
   * Removes unused colors
   */
  decolorize() {
    this.divesToDraw.forEach((e) => {
      this.divArray[e[0]][e[1]].style.borderColor = "";
      this.divArray[e[0]][e[1]].style.background = "";
    });
  }
  /**
   * Creates colors for used path
   */
  darkColorize() {
    this.decolorize();
    this.divesToDraw.forEach((e) => {
      this.divArray[e[0]][e[1]].style.backgroundColor = this.convertColor(
        this.dotColor,
        CONFIG.usedTrackOpacity
      );
      this.divArray[e[0]][e[1]].style.borderColor = CONFIG.borderColor;
    });
  }

  convertColor(color: string, opacity: number): string {
    let colorArray = color.split(",");
    colorArray[3] = `${opacity})`;
    return colorArray.join(",");
  }
}
