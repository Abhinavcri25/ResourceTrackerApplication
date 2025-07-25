// import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs';
// import { employee } from '../app.component'; 
// import { HttpClient } from '@angular/common/http';
// @Injectable({
//   providedIn: 'root'
// })
// export class EmployeeServiceService {

//   private employeeSubject = new Subject<employee>();
//   employee$ = this.employeeSubject.asObservable();

//   // constructor() {}

//   sendEmployee(emp: employee) {
//     this.employeeSubject.next(emp);
//   }

//   // *******************************************

//   constructor(private httpClient : HttpClient) { }
//   myUrl : string = "http://localhost:5174/api/Resource/";

//   GetAllEmployees(){
//     return this.httpClient.get(this.myUrl);
//   }

//   AddNewEployee(data : any){ // Details name, email,age, gender
//     return this.httpClient.post(this.myUrl ,data );
//   }

//   GetEmployee(empId : string){
//     return this.httpClient.get(this.myUrl + empId);
//   }
 
//   DeleteEmployee(empId : number){
//     return this.httpClient.delete(this.myUrl + empId);
//   }

//   UpdateEmployee(empId: number, data: any) {
//     return this.httpClient.put(this.myUrl + empId, data);
//   }
// }
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ApiDictionary } from './api-dictionary';
import { HttpParams } from '@angular/common/http';
 
@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  constructor(private api: ApiService) {}
 
  GetEmployee(empId: string) {
    const params = new HttpParams().set('id', empId);
    return this.api.get(ApiDictionary.GetEmployeeById.url, params);
  }
 
  AddNewEployee(data: any) {
    return this.api.post(ApiDictionary.AddEmployee.url, data);
  }
 
  GetAllEmployees() {
    return this.api.get(ApiDictionary.GetAllEmployees.url);
  }
 
  UpdateEmployee(empID: number, data: any ) {
    // const url = `${ApiDictionary.UpdateEmployee.url}/${empID}`;
    return this.api.put(`${ApiDictionary.UpdateEmployee.url}/${empID}`, data);
    // return this.api.put(ApiDictionary.UpdateEmployee.url, empID, data);
  }
 
  DeleteEmployee(empId: number) {
    // const url = `${ApiDictionary.DeleteEmployee.url}?id=${empId}`;
    return this.api.delete(`${ApiDictionary.DeleteEmployee.url}?id=${empId}`);
  }

  GetSkills(){
    return this.api.get(ApiDictionary.Skills.url);
  }

  GetDesignations(){
    return this.api.get(ApiDictionary.Designations.url);
  }

  GetLocations(){
    return this.api.get(ApiDictionary.Locations.url);
  }

}
