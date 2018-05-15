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

  getTheme(themeId: number): Observable<Theme> {
    // TODO: send the message _after_ fetching the hero
    // this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(THEME.find(theme => theme.themeId === themeId));
  }
}
