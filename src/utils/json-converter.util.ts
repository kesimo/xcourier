export class JsonConverter {
  public static convertToOneLevelArray(
    obj: any,
  ): Array<{ key: string; value: string | string[] }> {
    const result = new Array<any>();
    for (const key in Object.keys(obj)) {
      result.push({ key: key, value: obj[key] });
    }
    return result;
  }
}
