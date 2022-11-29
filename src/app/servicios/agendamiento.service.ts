import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ciudad } from '../interfaces/ciudad.interface';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  url: string = "http://localhost:3000/ciudad";
  constructor(
    private http: HttpClient
    ) {}
    public get(): Observable<Ciudad[]> {
    return this.http.get<Ciudad[]>(this.url);
  }
  public post(ciudad:Ciudad): Observable<any>{
    return this.http.post(this.url,ciudad,{responseType:'text'})
  }
  public put(ciudad:Ciudad): Observable<any>{
    return this.http.put(this.url,ciudad,{responseType:'text'});
  }
  public delete(ciudad:Ciudad):Observable<any>{
                     //aqui esta el problema
return this.http.delete(`${this.url}/${ciudad.idciudad}`,{responseType:'text'})
  }
}
