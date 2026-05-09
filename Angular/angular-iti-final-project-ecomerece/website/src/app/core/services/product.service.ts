import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ApiResponse, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<ApiResponse>(this.apiUrl).pipe(map((response) => response.data));
  }
  getProductById(id: string): Observable<Product> {
    return this.http
      .get<{ data: Product }>(`${this.apiUrl}/${id}`)
      .pipe(map((response) => response.data));
  }
}
