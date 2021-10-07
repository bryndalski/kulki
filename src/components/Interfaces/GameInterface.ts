import DotMenager from "../DotMenager";
import SelectedCords from "../SelectedCords";
import CellInterface from "./CellInterface";

export default interface GameInterface {
  gameArray: Array<Array<CellInterface>>;
  defaultValue: CellInterface;
  nowSelected: SelectedCords;
  dotMenager: DotMenager;
  readonly dotNumber: number;
}
