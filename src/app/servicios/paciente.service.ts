import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paciente } from '../interfaces/paciente.interface';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  url: string = "http://localhost:3000/paciente";
  constructor(
    private http: HttpClient
    ) {}
      
    public get(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.url);
  }
  public post(paciente:Paciente): Observable<any>{
    return this.http.post(this.url,paciente,{responseType:'text'})
  }
  public put(paciente:Paciente): Observable<any>{
    return this.http.put(this.url,paciente,{responseType:'text'});
  }
  public delete(paciente:Paciente):Observable<any>{
                     //aqui esta el problema
return this.http.delete(`${this.url}/${paciente.ci}`,{responseType:'text'})
  }
}
