import Dot from "../Dot";
import CoordsInterface from "./CoordsInterface";

//TODO SPTAWDŹ GDZI EI CZY POTRZEBNE 
export default interface SingleDot {
  coords: CoordsInterface;
  dot: Dot;
  color: string | null;
}
