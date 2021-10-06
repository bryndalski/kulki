import Dot from "../Dot";
import CoordsInterface from "./CoordsInterface";

export default interface SingleDot {
  coords: CoordsInterface;
  dot: Dot;
  color: string | null;
}

export default interface DotMenagerInterface {
  dotArray: Array<SingleDot>;
}
