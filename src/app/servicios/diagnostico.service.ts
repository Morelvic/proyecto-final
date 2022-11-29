import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Diagnostico } from '../interfaces/diagnostico.interface';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticoService {

  url: string = "http://localhost:3000/diagnostico";
  constructor(
    private http: HttpClient
    ) {}
    public get(): Observable<Diagnostico[]> {
    return this.http.get<Diagnostico[]>(this.url);
  }
  public post(diagnostico:Diagnostico): Observable<any>{
    return this.http.post(this.url,diagnostico,{responseType:'text'})
  }
  public put(diagnostico:Diagnostico): Observable<any>{
    return this.http.put(this.url,diagnostico,{responseType:'text'});
  }
  public delete(diagnostico:Diagnostico):Observable<any>{
                     //aqui esta el problema
return this.http.delete(`${this.url}/${diagnostico.iddiagnostico}`,{responseType:'text'})
  }
}
