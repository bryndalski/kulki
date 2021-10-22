import DotMenager from "../DotMenager";
import SelectedCords from "../SelectedCords";
import CellInterface from "./CellInterface";
import PathFinder from "../PathFinder";

export default interface GameInterface {
  gameArray: Array<Array<CellInterface>>;
  defaultValue: CellInterface;
  nowSelected: SelectedCords;
  dotMenager: DotMenager;
  pathFinder: PathFinder;
  readonly dotNumber: number;
}
