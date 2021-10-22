import CoordsInterface from "./CoordsInterface";

export default interface PathFindingINterface {
  startPoint: CoordsInterface;
  endPoint: CoordsInterface;
  pathArray: Array<Array<Object | null>>;
  numberArry: Array<Array<Number | String>>;
}
