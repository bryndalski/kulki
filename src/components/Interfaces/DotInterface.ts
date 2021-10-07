import CONFIGINTERFACE from "./CONFIG.INTERFACE";

export default interface DotInterface {
  readonly colors: Array<string>;
  isSelected: boolean;
  dot: HTMLDivElement;
  dotColor: string | null;
}
