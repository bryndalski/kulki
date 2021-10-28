import Board from "./components/Board";
import Dot from "./components/Dot";
import CoordsInterface from "./components/Interfaces/CoordsInterface";
import CellInterface from "./components/Interfaces/CellInterface";
import GameInterface from "./components/Interfaces/GameInterface";
import SelectedCords from "./components/SelectedCords";
import DotMenager from "./components/DotMenager";
import CONFIG from "./config";
import PathFinder from "./components/PathFinder";
class Game extends Board implements GameInterface {
  gameArray: Array<Array<CellInterface>>;
  defaultValue: CellInterface;
  nowSelected: SelectedCords;
  dotMenager: DotMenager;
  readonly dotNumber: number;
  pathFinder: PathFinder;

  constructor() {
    super(".game--board");
    this.defaultValue = {
      empty: true,
      color: null,
      dot: null,
    };
    //TODO tutaj zmieniaj ilość kropków
    this.dotNumber = CONFIG.dotNumber;
    this.gameArray = [];
    this.nowSelected = new SelectedCords();
    this.dotMenager = new DotMenager(".dotPreview", this.dotNumber);
    this.pathFinder = new PathFinder(this.HTMLDivBordArray);
    //!!!! TO ZAWSZE OSTATNIE
    this.init();
  }
  /**
   * Inits whole class
   */
  private init(): void {
    this.createContainer(9);
    for (let i: number = 0; i < 9; i++) {
      this.gameArray[i] = [];
      for (let j: number = 0; j < 9; j++) {
        this.gameArray[i].push(this.defaultValue);
      }
    }
    this.dotMenager.addDots();

    this.addDots();
  }
  /**
   * Allows to add dot numbe
   *
   */
  addDots(): void {
    let possibleCoords: Array<CoordsInterface> = this.winable(this.gameArray);
    if (possibleCoords.length >= CONFIG.dotNumber) {
      this.dotMenager.releaseDots().forEach((e: Dot) => {
        let coordNumber: number = Math.floor(
          Math.random() * possibleCoords.length
        );
        this.gameArray[possibleCoords[coordNumber].x][
          possibleCoords[coordNumber].y
        ] = {
          empty: false,
          color: e.dotColor,
          dot: e,
        };
        this.HTMLDivBordArray[possibleCoords[coordNumber].x][
          possibleCoords[coordNumber].y
        ].appendChild(e.guessWhoIsBack());
        possibleCoords.splice(coordNumber, 1);
      });
      this.dotMenager.addDots();
      this.OMGTheyKilledKenny(this.findToDestroy(this.gameArray));
    } else this.endGame(this.gameArray);
  }
  /**
   * Handles hod clicking
   * @description Overwrittes method from Board
   * @event
   * @click
   * @override Bord
   * @param x
   * @param y
   */
  tileClickListen = (x: number, y: number): void => {
    if (this.gameArray[x][y].empty && this.nowSelected.isSelected) {
      // handle move click
      this.gameArray[this.nowSelected.getX()][
        this.nowSelected.getY()
      ].dot.select();
      this.mouseOverEnable = false;
      if (this.pathFinder.canBeMoved) this.moveDot(x, y);
      else this.pathFinder.decolorize();
      this.nowSelected.clear();
      this.mouseOverEnable = false;
    } else if (
      // handle 2X click
      !this.nowSelected.nullCordsCheck() &&
      x === this.nowSelected.getX() &&
      y === this.nowSelected.getY()
    ) {
      this.gameArray[this.nowSelected.getX()][
        this.nowSelected.getY()
      ].dot.select();
      this.nowSelected.clear();
      this.mouseOverEnable = false;
    } else if (!this.gameArray[x][y].empty) {
      // handle move to hades
      if (this.nowSelected.isSelected)
        if (!this.nowSelected.nullCordsCheck())
          this.gameArray[this.nowSelected.getX()][
            this.nowSelected.getY()
          ].dot.select();
      this.gameArray[x][y].dot.select();
      this.nowSelected.setNew(true, x, y);
      this.pathFinder.setColor(this.gameArray[x][y].color);
      this.pathFinder.setStart(x, y, this.gameArray);
      this.mouseOverEnable = true;
    }
  };
  /**
   * Moves dot from one place to another :p
   * @param x
   * @param y
   */
  moveDot(x: number, y: number) {
    let temporatyBox =
      this.gameArray[this.nowSelected.getX()][this.nowSelected.getY()];
    this.gameArray[this.nowSelected.getX()][
      this.nowSelected.getY()
    ].dot.byeBye();
    this.gameArray[this.nowSelected.getX()][this.nowSelected.getY()] =
      this.defaultValue;

    this.gameArray[x][y] = temporatyBox;
    this.HTMLDivBordArray[x][y].appendChild(
      this.gameArray[x][y].dot.guessWhoIsBack()
    );
    this.pathFinder.stopFinding();
    this.pathFinder.darkColorize();
    this.addDots();
    this.OMGTheyKilledKenny(this.findToDestroy(this.gameArray));
  }

  /**
   * Handle mouse move at each div
   * @param x
   * @param y
   */
  tileMouseOverListener = (x: number, y: number): void => {
    if (this.mouseOverEnable) {
      this.pathFinder.stopFinding();
      this.pathFinder.decolorize();
      if (this.gameArray[x][y].empty) {
        this.mark(false);
        this.pathFinder.findLive(x, y, this.gameArray);
      }
    }
  };

  /**
   * @description removes dots from game array and game
   */
  OMGTheyKilledKenny(destroyArray: Array<[number, number]>) {
    destroyArray.forEach((e) => {
      /**
       * Ogólnie to nie mam zielonego pojęcia
       * dlaczego to raz działa raz nie
       * ale jakoś nie wiem
       * poświęce koze może zacznei działać
       *
       */
      try {
        this.gameArray[e[0]][e[1]].dot.byeBye();
        this.gameArray[e[0]][e[1]] = this.defaultValue;
      } catch (e) {}
    });
    this.mark(true);
  }
}

new Game();
