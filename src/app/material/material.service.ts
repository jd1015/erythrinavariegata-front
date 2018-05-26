import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Material } from './material';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private http: HttpClient) { }
  //private baseUrl = 'http://localhost:8080/theme' // web APIのURL
  private baseUrl = 'http://192.168.2.201/theme' // web APIのURL

  /** IDによりマテリアルを取得する。見つからなかった場合は404を返却する。 */
  getMaterials(themeId: number): Observable<Material[]> {
    const url = `${this.baseUrl}/${themeId}/material`;
    return this.http.get<Material[]>(url).pipe(
      tap(_ => this.log(`fetched theme themeId=${themeId}`)),
      catchError(this.handleError<Material[]>(`getTheme themeId=${themeId}`))
    );
  }

  /** POST: サーバーに新しいマテリアルを登録する */
  addMaterial (material: Material): Observable<Material> {
    const url = `${this.baseUrl}/${material.themeId}/material`;
    return this.http.post<Material>(url, material, httpOptions).pipe(
      //tap((theme: Theme) => this.log(`added theme w/ id=${theme.themeId}`)),
      catchError(this.handleError<Material>('addTheme'))
    );
  }

  /** DELETE: サーバーからマテリアルを削除 */
  deleteMaterial (material: Material): Observable<Material> {
    const themeId = material.themeId;
    const materialId = material.materialId;
    const url = `${this.baseUrl}/${themeId}/material/${materialId}`;

    return this.http.delete<Material>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted material title=${material.title}`)),
      catchError(this.handleError<Material>('deleteMaterial'))
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
