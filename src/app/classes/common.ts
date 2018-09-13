export class Common {
  public static getQuillModel(): any {
    let result: any = {
      toolbar: [
        ['clean', 'video', 'image', 'link', {direction: 'rtl'}, {background: []}, {color: []}, 'strike', 'underline', 'italic', 'bold']
      ]
    };
    return result;
  }
}
