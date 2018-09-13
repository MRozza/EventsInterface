import {Injectable, Inject} from '@angular/core';
import {TRANSLATIONS} from './translation'; // import our opaque token

@Injectable()
export class TranslateService {
  private _currentLang: string;

  private PLACEHOLDER = '%'; // our placeholder

  public replace(word: string = '', words: any | any[] = '') {
    let translation: string = word;

    const values: string[] = [].concat(words);
    values.forEach((e, i) => {
      translation = translation.replace(this.PLACEHOLDER.concat(<any>i), e);
    });

    return translation;
  }

  public get currentLang() {
    return this._currentLang;
  }

  // inject our translations
  constructor( @Inject(TRANSLATIONS) private _translations: any) {
  }

  public use(lang: string): void {
    // set current language
    this._currentLang = lang;
  }

  private translateLang(key: string): string {
    // private perform translation
    const translation = key;
    if (this._translations[this.currentLang] && this._translations[this.currentLang][key]) {
      return this._translations[this.currentLang][key];
    }

    return translation;
  }

  public translate(key: string, ...args: any[]) { // add optional parameter
    const translation: string = this.translateLang(key);

    if (!args) {
      return translation;
    }
    return this.replace(translation, args); // call replace function
  }

  public instant(key: string, words?: any | any[]) { // add optional parameter
    const translation: string = this.translateLang(key);

    if (!words) {
      return translation;
    }
    return this.replace(translation, words); // call replace function
  }
}
