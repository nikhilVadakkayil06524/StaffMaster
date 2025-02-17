import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../Models/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'https://localhost:5001/api/Employee';


  constructor(private http: HttpClient) {}  // ✅ Inject HttpClient properly

  addEmployees(data: any): Observable<any> {
    return this.http.post<Employee>(this.apiUrl, data);

  }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }
}
