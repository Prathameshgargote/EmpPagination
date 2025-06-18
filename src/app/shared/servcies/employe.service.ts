import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeService {
  BASE_URL: string = environment.Base_url;
  EmpployeUrl: string = `${(this, this.BASE_URL)}/table.json`;

  constructor(private _http: HttpClient) {}

  fetchAlldata(): Observable<any> {
    return this._http.get<any>(this.EmpployeUrl).pipe(
      map((data: any) => {
        let empArr: any[] = [];
        for (const key in data) {
          empArr.push({ ...data[key], Id: key });
        }
        return empArr;
      })
    );
  }

  AddEmplyee(emp: any): Observable<any> {
    return this._http.post<any>(this.EmpployeUrl, emp);
  }

  updateEmp(emp: any): Observable<any> {
    let UPDATE_URL = `${this.BASE_URL}/table/${emp.Id}.json`;
    return this._http.patch<any>(UPDATE_URL, emp);
  }
  RemoveEmp(emp: any): Observable<any> {
    let REMOVE_URL = `${this.BASE_URL}/table/${emp.Id}.json`;
    return this._http.delete<any>(REMOVE_URL);
  }
}
