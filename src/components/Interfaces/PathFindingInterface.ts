import CoordsInterface from "./CoordsInterface";

export default interface PathFindingINterface {
  startPoint: CoordsInterface;
  endPoint: CoordsInterface;
  pathArray: Array<Array<Array<[number, number]> | null>>;
  numberArry: Array<Array<Number | String>>;
  divArray: Array<Array<HTMLDivElement>>;
  findNumber: number;
  STOPLOOP:boolean
  lastArray: string;
}