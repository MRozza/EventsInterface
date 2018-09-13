import {Pipe, PipeTransform} from '@angular/core';
import {TranslateService} from './service'; // our translate service

@Pipe({
  name: 'lang',
})

export class TranslatePipe implements PipeTransform {

  constructor(private _translate: TranslateService) {}

  transform(value: string, args: string | string[]): any { // args can be string or string array
    if (!value) {
      return null;
    }
    return this._translate.instant(value, args); // pass in args
  }
}
