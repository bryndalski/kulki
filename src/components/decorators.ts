export function logger(
  target: Object,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<any>
) {
  const originalMethod = descriptor.value;
  console.clear();
  descriptor.value = function (...args: any[]) {
    // console.log("Argumetny " + JSON.stringify(args));
    const result = originalMethod.apply(this, args);
    // console.log("Zwracane: " + result);
    return result;
  };
  return descriptor;
}
export function setArray(ob: Object, name: string, desc: PropertyDescriptor) {
  let oryg = desc.value;
  desc.value = function (...args: any[]) {
    for (let i: number = 0; i < 9; i++) {
      this.gameArray[i] = [];
      for (let j: number = 0; j < 9; j++) {
        this.gameArray[i].push(this.defaultValue);
      }
    }
    return oryg.apply(this, args);
  };
}

/**
 *
 * @todo
 * @description Adds container to set method one of 2 required decortors
 * @param ob
 * @param name
 * @param desc
 */
export function setContainer(
  ob: Object,
  name: string,
  desc: PropertyDescriptor
) {
  let oryg = desc.value;
  desc.value = function (...args: any[]) {
    this.container = document.querySelector(".score") as HTMLElement;
    return oryg.apply(this, args);
  };
}
