import Dot from "../Dot";

export default interface CellInterface {
  empty: boolean;
  color: string | null;
  dot: Dot;
}
