import CoordsInterface from "./CoordsInterface";

export default interface PathFindingINterface {
  startPoint: CoordsInterface;
  endPoint: CoordsInterface;
  pathArray: Array<Array<Array<[number, number]> | null>>;
  numberArry: Array<Array<Number | String>>;
  divArray: Array<Array<HTMLDivElement>>;
  findNumber: number;
  lastNumberToFind: number;
  lastArray: string;
  canSearch: boolean;
  divesToDraw: Array<[number, number]>;
  dotColor: string;
}
