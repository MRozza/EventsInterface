import {InjectionToken} from '@angular/core';
import {LANG_AR_NAME, LANG_AR_TRANS} from './resourses/lang-ar';
import {LANG_EN_NAME, LANG_EN_TRANS} from './resourses/lang-en';
export const TRANSLATIONS = new InjectionToken<any>('translations');

export const dictionary = {
  'ar': LANG_AR_TRANS,
  'en': LANG_EN_TRANS,
};

export const TRANSLATION_PROVIDERS = [
  {provide: TRANSLATIONS, useValue: dictionary},
];
