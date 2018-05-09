import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Theme } from './theme';
import { THEME } from './mock-theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  getThemes(): Observable<Theme[]> {
    return of(THEME);
  }
}
