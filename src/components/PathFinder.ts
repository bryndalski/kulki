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
    this.findNumber = 0;
    this.numberArry = [];
    this.pathArray = [];
    this.startPoint = { x: -1, y: -1 };
    this.endPoint = { x: -1, y: -1 };
    this.numberArry = [[]];
    this.lastNumberToFind = 1;
    this.canSearch = true;
  }
  lastNumberToFind: number;
  lastArray: string;
  canSearch: boolean;

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
   * Set path finding stop algoritm
   * @param x
   * @param y
   */
  setEnd(x: number, y: number): void {
    this.endPoint.x = x;
    this.endPoint.y = y;
    /**
     * //TODO DO MNIE JUTRO
     *
     * siema mordo mordeczko mordini
     * ogólnie to sytuacja jest taka że wszystko śmiga ale
     * musisz naprawić nadpisywanie tablicy
     * wstępnie plan jest na to że użyjesz tej stringowej ale jest
     * też 2 plan że tamtą clear też dasz na string
     * bo ogólnie chodzi o te wskaźniki i wgle
     *
     * ogólnie 2 rzecz do przekiny to pięky u wspaniały
     * start punkt
     * który musisz nadawać za każdym razem jak zmieniasz sobie punkt
     * końcowy bo zerujesz tablice
     *
     * pomysł jest taki że
     * → dodajesz  go  start/stop coords bo mozez
     * → przed nadaniem tamtego mapujesz tą tablice tak że wywalasz ENDY i to jest
     * cąłkiem spoko ale wyddaje się dziwnie nei działąjące ale wymyśl to jak
     * będziesz myślał
     *
     * to chyba tyle, dodaj te kulki po ruchu to dobry pomysł też
     *
     *
     *
     *
     *
     */

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
   * Finds path from A to B
   * @returns Array<[number,number] coordinates array
   */
  findPath(): Array<[number, number]> {
    if (this.numerize(this.startPoint.x, this.startPoint.y)) return []; //kordynaty wstępne
    console.table(this.numberArry);

    while (this.canSearch) {
      console.clear();
      this.findNumber = this.findNumber + 1;
      console.table(this.numberArry);
      console.log(this.findNumber);

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
    // console.log("===nastpęny while i tablica==");
    // console.table(this.numberArry);

    // console.log("================");

    return [];
  }
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
    console.log("a ja to co  ?");

    this.setStart(this.startPoint.x, this.startPoint.y, gameArray);
    this.findNumber = 0;
    if (x === this.startPoint.x && y === this.startPoint.y) return [];
    else {
      this.setEnd(x, y);
      console.log("==========Znaleziona ścieżka========");
      this.canSearch = true;
      console.log(this.findPath());
      console.log("====================================");
    }
  }

  numerize(x: number, y: number): boolean {
    console.log(x, y);

    const directions = [
      { x: -1, y: 0 }, //jeden w góre
      { x: 0, y: -1 }, //jeden w lewo
      { x: 0, y: 1 }, // jeden w prawo
      { x: 1, y: 0 }, //jeden w dół
    ];
    for (let i: number = 0; i < directions.length; i++) {
      try {
        let e = directions[i];
        console.log("====================================");
        console.log(this.numberArry[x + e.x][y + e.y], e);
        console.log("====================================");
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
        console.log(er);
      }
    }

    return false;
  }
}
