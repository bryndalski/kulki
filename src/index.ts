import Board from "./components/Board";
import Dot from "./components/Dot";
import CoordsInterface from "./components/Interfaces/CoordsInterface";
import CellInterface from "./components/Interfaces/CellInterface";
import GameInterface from "./components/Interfaces/GameInterface";
import SelectedCords from "./components/SelectedCords";
import DotMenager from "./components/DotMenager";
import CONFIG from "./config";

class Game extends Board implements GameInterface {
  gameArray: Array<Array<CellInterface>>;
  defaultValue: CellInterface;
  nowSelected: SelectedCords;
  dotMenager: DotMenager;
  readonly dotNumber: number;
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

    //!!!! TO ZAWSZE OSTATNIE
    this.init();
  }
  /**
   * Inits whole class
   */
  init() {
    this.createContainer(9);
    for (let i: number = 0; i < 9; i++) {
      this.gameArray[i] = [];
      for (let j: number = 0; j < 9; j++) {
        this.gameArray[i].push(this.defaultValue);
      }
    }

    this.addDots();
  }
  /**
   * Allows to add dot numbe
   *
   */
  addDots(): void {
    console.log(this, this.dotMenager);

    for (let i: number = 0; i < this.dotNumber; i++) {
      let coords: CoordsInterface = {
        x: Math.floor(Math.random() * 9),
        y: Math.floor(Math.random() * 9),
      };
      if (this.gameArray[coords.x][coords.y].empty) {
        let dot: Dot =
          this.dotMenager.dotArray.length === 0
            ? new Dot()
            : this.dotMenager.dotArray[i];
        if (this.dotMenager.dotArray.length === 0) dot.createDot();
        this.HTMLDivBordArray[coords.x][coords.y].appendChild(
          dot.guessWhoIsBack()
        );

        this.gameArray[coords.x][coords.y] = {
          empty: false,
          color: dot.dotColor,
          dot,
        };
      } else {
        i--;
      }
    }
    console.log(this.dotMenager);

    this.dotMenager.releaseDots();
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
      this.moveDot(x, y);
      this.nowSelected.clear();
    }

    if (!this.gameArray[x][y].empty) {
      if (this.nowSelected.isSelected)
        if (!this.nowSelected.nullCordsCheck())
          this.gameArray[this.nowSelected.getX()][
            this.nowSelected.getY()
          ].dot.select();
      this.gameArray[x][y].dot.select();
      this.nowSelected.setNew(true, x, y);
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
  }
}

new Game();
