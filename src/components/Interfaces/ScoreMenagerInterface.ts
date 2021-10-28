import CellInterface from "./CellInterface";

export default interface ScoreMenagerInterface {
  gameArray: Array<Array<CellInterface>>;
  score: number;
  destroyedDotsArray: Array<[number, number]>;
  HTMLDivArray: Array<Array<HTMLDivElement>>;
}
