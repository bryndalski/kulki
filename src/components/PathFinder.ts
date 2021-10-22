import CoordsInterface from "./Interfaces/CoordsInterface";
import PathFindingINterface from "./Interfaces/PathFindingInterface";
import CellInterface from "./Interfaces/CellInterface";

export default class PathFinder implements PathFindingINterface {
  startPoint: CoordsInterface;
  endPoint: CoordsInterface;
  numberArry: (String | Number)[][];
  divArray: HTMLDivElement[][];
  pathArray: [number, number][][][];

  findNumber: number;
  constructor(divArray) {
    this.divArray = divArray;
    this.findNumber = 1;
    // this.startPoint = ;
  }
  lastArray: string;

  /**
   * Set path finding start algoritm
   * @param x
   * @param y
   */
  setStart(x: number, y: number): void {
    this.startPoint.x = x;
    this.startPoint.y = y;
    // this.numberArry[x][y] = "START";
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
        this.pathArray[c][ic] = null;
        return ie.empty ? 0 : "X";
      });
    });
    this.lastArray = JSON.stringify(this.numberArry);
  }

  /**
   * Finds path from A to B
   * @returns Array<[number,number] coordinates array
   */
  findPath(): Array<[number, number]> {
    /**
     * Drogi ja któty będziesz czytał to jutro
     * nie wiem co tu napisałem ale ogólnie działa to tak
     * że robi ci jebuntnie tablice i dodaje ic coraz większe mniejsze tablice
     * w których są koordynaty poprzednich współtzędnych
     *
     * Powinno działać ale jesli komp zacznie mi
     * robić spagetti z wykresków to wiedz że zjebałeś
     * naprawdę nie wiem już co może to być ale to tak
     *
     *
     */
    this.numerize(this.startPoint.x, this.startPoint.y);
    while (this.lastArray != JSON.stringify(this.numberArry)) {
      this.lastArray = JSON.stringify(this.numberArry);
      for (let c = 0; c < this.numberArry.length; c++) {
        for (let ic = 0; ic < this.numberArry[c].length; ic++) {
          if (this.numberArry[c][ic] === this.findNumber)
            if (this.numerize(c, ic)) return this.pathArray[c][ic];
        }
      }
    }
    return [];
  }
  /**
   * Handles live path finding with returns etc
   * @param x
   * @param y
   * @param gameArray
   */
  findLive(x: number, y: number, gameArray: Array<Array<CellInterface>>) {
    this.findNumber = 1;
    if (x === this.startPoint.x && y === this.startPoint.y) return [];
    else {
      this.setFindingArray(gameArray);
      this.setEnd(x, y);
      console.log(this.findPath());
    }
  }

  numerize(x: number, y: number): boolean {
    const directions = [
      { x: -1, y: 0 }, //jeden w góre
      { x: 0, y: -1 }, //jeden w lewo
      { x: 0, y: 1 }, // jeden w prawo
      { x: 1, y: 0 }, //jeden w dół
    ];
    try {
      for (let i: number = 0; i < directions.length; i++) {
        let e = directions[i];
        if (this.numberArry[x + e.x][y + e.y] == "END") return true;
        else if (this.numberArry[x + e.x][y + e.y] !== null) {
          this.numberArry[x + e.x][y + e.y] = this.findNumber + 1;
          this.pathArray[x + e.x][y + e.y] = [
            ...this.pathArray[x][y],
            [x + e.x, y + e.y],
          ];
        }
      }
    } catch (er) {
      //TODO zakomentuj mnie
      console.log(er);
    }
    return false;
  }
}
