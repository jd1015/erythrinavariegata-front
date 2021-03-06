import { Injectable } from '@angular/core';
import { Observable ,  of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Material } from './material';
import { Constant } from '../common/constant';
import { MaterialList } from './materialList';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private http: HttpClient) { }
  private baseUrl = Constant.API_URL + '/theme';  // Web APIのURL

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
      // tap((theme: Theme) => this.log(`added theme w/ id=${theme.themeId}`)),
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

  /** マテリアルを取得する。見つからなかった場合は404を返却する。 */
  getMaterial(themeId: number, materialId: number): Observable<Material> {
    const url = `${this.baseUrl}/${themeId}/material/${materialId}`;
    return this.http.get<Material>(url).pipe(
      tap(_ => this.log(`fetched theme themeId=${themeId}`)),
      catchError(this.handleError<Material>(`getTheme themeId=${themeId}`))
    );
  }

  /** マテリアルを更新する。 */
  putMaterial(material: Material): Observable<Material> {
    const themeId = material.themeId;
    const materialId = material.materialId;
    const url = `${this.baseUrl}/${themeId}/material/${materialId}`;
    return this.http.put<Material>(url, material, httpOptions).pipe(
      tap(_ => this.log(`fetched theme themeId=${themeId}`)),
      catchError(this.handleError<Material>(`getTheme themeId=${themeId}`))
    );
  }

  /** マテリアルListを更新する。 */
  putMaterialList(themeId: number, materialList: MaterialList): Observable<MaterialList> {
    const url = `${this.baseUrl}/${themeId}/material/list`;
    return this.http.put<MaterialList>(url, materialList, httpOptions).pipe(
      tap(_ => this.log(`fetched theme themeId=${themeId}`)),
      catchError(this.handleError<MaterialList>(`putMaterialList themeId=${themeId}`))
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
    // this.messageService.add('HeroService: ' + message);
  }

}
