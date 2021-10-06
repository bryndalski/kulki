export default interface DotInterface {
  readonly colors: ["orange", "green", "blue"];
  isSelected: boolean;
  dot: HTMLDivElement;
  dotColor: string | null;
}
