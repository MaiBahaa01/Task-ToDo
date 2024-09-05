import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivetodoService {
  private apiUrl = ' https://localhost:7151/api/LiveTodo'; 
 
  constructor(private http: HttpClient) {}

  getTodos(pageNumber: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<any>(this.apiUrl, { params });
  }
}
