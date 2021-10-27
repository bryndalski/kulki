export function logger(
  target: Object,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<any>
) {
  // const originalMethod = descriptor.value;
  // console.clear();
  // descriptor.value = function (...args: any[]) {
  //   console.log("Argumetny " + JSON.stringify(args));
  //   const result = originalMethod.apply(this, args);
  //   console.log("Zwracane: " + result);
  //   return result;
  // };
  // return descriptor;
}

export function indexInit(constructor: Function) {
  console.log("XDDD");

  console.log(constructor);
}
