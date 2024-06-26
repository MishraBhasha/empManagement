import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data, { withCredentials: true }).pipe(
      map((response: any) => {
        localStorage.setItem('jwt', response.jwt);
        return response;
      })
    );
  }

  getUser(): Observable<any> {
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/user`, { headers });
  }

  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {}, { withCredentials: true }).pipe(
      map(response => {
        localStorage.removeItem('jwt');
        return response;
      })
    );
  }

  getUserList(): Observable<any> {
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/employees/`, { headers });
  }

  getUserById(id: number): Observable<any> {
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.baseUrl}/employees/${id}`, { headers });
  }
  
  addEmp(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/employees/`, data,);
  }

  updateEmp(id: number, data: any): Observable<any> {
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.baseUrl}/employees/${id}/`, data, { headers });
  }

  deleteStudent(id: number): Observable<any> {
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.baseUrl}/employees/${id}`, { headers });
  }

}
