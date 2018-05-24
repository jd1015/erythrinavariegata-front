import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Theme } from './theme';
import { THEME } from './mock-theme';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private http: HttpClient) { }
  private themesUrl = 'http://192.168.2.201/theme';  // Web APIのURL
  //private themesUrl = 'http://localhost:8080/theme';  // Web APIのURL

  getThemes(): Observable<Theme[]> {
    return this.http.get<Theme[]>(this.themesUrl)
      .pipe(
        tap(heroes => this.log(`fetched themes`)),
        catchError(this.handleError('getThemes', []))
      );
  }

  /** IDによりテーマを取得する。見つからなかった場合は404を返却する。 */
  getTheme(themeId: number): Observable<Theme> {
    const url = `${this.themesUrl}/${themeId}`;
    return this.http.get<Theme>(url).pipe(
      tap(_ => this.log(`fetched theme themeId=${themeId}`)),
      catchError(this.handleError<Theme>(`getTheme themeId=${themeId}`))
    );
  }

  /** PUT: サーバー上でテーマを更新 */
  updateTheme (theme: Theme): Observable<any> {
    const url = `${this.themesUrl}/${theme.themeId}`;
    return this.http.put(url, theme, httpOptions).pipe(
      tap(_ => this.log(`updated theme themeId=${theme.themeId}`)),
      catchError(this.handleError<any>('updateTheme'))
    );
  }

  /** POST: サーバーに新しいテーマを登録する */
  addTheme (theme: Theme): Observable<Theme> {
    return this.http.post<Theme>(this.themesUrl, theme, httpOptions).pipe(
      //tap((theme: Theme) => this.log(`added theme w/ id=${theme.themeId}`)),
      catchError(this.handleError<Theme>('addTheme'))
    );
  }

  /** DELETE: サーバーからテーマを削除 */
  deleteTheme (theme: Theme | number): Observable<Theme> {
    const themeId = typeof theme === 'number' ? theme : theme.themeId;
    const url = `${this.themesUrl}/${themeId}`;

    return this.http.delete<Theme>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted theme themeId=${themeId}`)),
      catchError(this.handleError<Theme>('deleteTheme'))
    );
  }

  /**
   * 失敗したHttp操作を処理します。
   * アプリを持続させます。
   * @param operation - 失敗した操作の名前
   * @param result - observableな結果として返す任意の値
  */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: リモート上のロギング基盤にエラーを送信する
      console.error(error); // かわりにconsoleに出力

      // TODO: ユーザーへの開示のためにエラーの変換処理を改善する
      this.log(`${operation} failed: ${error.message}`);

      // 空の結果を返して、アプリを持続可能にする
      return of(result as T);
    };
  }
  /** HeroServiceのメッセージをMessageServiceを使って記録 */
  private log(message: string) {
    //this.messageService.add('HeroService: ' + message);
  }

}
