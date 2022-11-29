import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../interfaces/doctor.interface';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  url: string = "http://localhost:3000/doctor";
  constructor(
    private http: HttpClient
    ) {}
    public get(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.url);
  }
  public post(doctor:Doctor): Observable<any>{
    return this.http.post(this.url,doctor,{responseType:'text'})
  }
  public put(doctor:Doctor): Observable<any>{
    return this.http.put(this.url,doctor,{responseType:'text'});
  }
  public delete(doctor:Doctor):Observable<any>{
                     //aqui esta el problema
return this.http.delete(`${this.url}/${doctor.ci}`,{responseType:'text'})
  }
}
