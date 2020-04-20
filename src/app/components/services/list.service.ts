import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TheProductList } from "../productsData/proudct";

@Injectable()
export class ProductListService {
  private _url: string = "./assets/db.json";
  constructor(private http: HttpClient) {}

  getData(): Observable<TheProductList[]> {
    return this.http.get<TheProductList[]>(this._url);
  }
}
