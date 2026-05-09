import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = environment.apiUrl;
  private productsUrl = `${this.baseUrl}/products`;
  private categoriesUrl = `${this.baseUrl}/categories`;

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  addProduct(productData: any): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, productData, {
      headers: this.getHeaders(),
    });
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.productsUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  getProductById(id: string): Observable<any> {
    return this.http.get(`${this.productsUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  updateProduct(id: string, productData: any): Observable<any> {
    return this.http.put(`${this.productsUrl}/${id}`, productData, {
      headers: this.getHeaders(),
    });
  }

  getAllCategories(): Observable<any> {
    return this.http.get(`${this.categoriesUrl}`);
  }
}
