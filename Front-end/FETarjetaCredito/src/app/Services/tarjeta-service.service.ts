import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaServiceService {

  constructor(private http: HttpClient) { }

  public getTarjetas(): Observable<any>{
    return this.http.get<any>(`${environment.HOST}`);
  }

  public deleteTarjeta(id: number): Observable<any>{
    return this.http.delete(`${environment.HOST}` + `/` + id);
  } 

  public addTarjeta(tarjeta: any): Observable<any>{
    return this.http.post(`${environment.HOST}` + `/`, tarjeta);
  }

  public putTarjeta(id: number, tarjeta: any): Observable<any>{
    return this.http.put(`${environment.HOST}/ ${id}`, tarjeta);
  }
}
