export class JsonConverter {
  public static convertToOneLevelArray(
    obj: any,
  ): Array<{ key: string; value: string | string[]; isEven: boolean }> {
    const result = new Array<any>();
    Object.keys(obj).forEach((key, index) => {
      result.push({
        key: key,
        value: obj[key],
        isEven: index % 2 === 0,
        isArray: Array.isArray(obj[key]),
      });
    });
    return result;
  }
}
