import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Agendamiento } from '../interfaces/agendamiento.interface';

@Injectable({
  providedIn: 'root'
})
export class AgendamientoService {

  url: string = "http://localhost:3000/agendamiento";
  constructor(
    private http: HttpClient
    ) {}
    public get(): Observable<Agendamiento[]> {
    return this.http.get<Agendamiento[]>(this.url);
  }
  public post(agendamiento:Agendamiento): Observable<any>{
    return this.http.post(this.url,agendamiento,{responseType:'text'})
  }
  public put(agendamiento:Agendamiento): Observable<any>{
    return this.http.put(this.url,agendamiento,{responseType:'text'});
  }
  public delete(agendamiento:Agendamiento):Observable<any>{
                     //aqui esta el problema
return this.http.delete(`${this.url}/${agendamiento.idagendamiento}`,{responseType:'text'})
  }
}
