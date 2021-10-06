import SelectedCordsInterface from "./Interfaces/SelectedCordsInterface";

export default class SelectedCords implements SelectedCordsInterface {
  isSelected: boolean;
  x: number | null;
  y: number | null;

  constructor() {
    (this.x = null), (this.y = null), (this.isSelected = false);
  }
  /**
   * Get all values from class to one object
   * @returns Object
   */
  readonly getInfo = (): Object => ({
    isSelected: this.isSelected,
    x: this.x,
    y: this.y,
  });
  /**
   * @description if one of coords is null returns true
   */
  readonly nullCordsCheck = (): boolean =>
    this.x === null || this.y === null ? true : false;

  /**
   * @description Clears all set coordinates and set is selected to false
   */
  clear(): void {
    this.isSelected = false;
    this.x = null;
    this.y = null;
  }
  /**
   * Allows user to set new coordinates
   * @param isSelected<Boolean>
   * @param x <number> x doord
   * @param y <number> y coord
   */
  setNew(isSelected: boolean, x: number, y: number): void {
    this.isSelected = isSelected;
    this.x = x;
    this.y = y;
  }
  /**
   * Returns X from coordinates
   */
  readonly getX = (): number | null => this.x;
  /**
   * Returns Y from coordinates
   */
  readonly getY = (): number | null => this.y;
}
