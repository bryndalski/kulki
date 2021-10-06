import SelectedCords from "../SelectedCords";
import CellInterface from "./CellInterface";

export default interface GameInterface {
  gameArray: Array<Array<CellInterface>>;
  defaultValue: CellInterface;
  nowSelected: SelectedCords;
}
