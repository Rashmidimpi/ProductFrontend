import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  storeproduct(data): Observable<any>{
    return this.http.post('http://127.0.0.1:8000/api/storeproduct',data);
  }
  getproduct(): Observable<any>{
    return this.http.get('http://127.0.0.1:8000/api/getproduct');
  }

  getfilterproduct(data): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/getfilteredproduct',data);
  }
}
