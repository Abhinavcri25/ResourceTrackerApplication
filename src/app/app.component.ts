import { Component } from '@angular/core';
import { NavigationEnd, RouterLink, RouterOutlet } from '@angular/router';
import { MyComponentComponent } from './my-component/my-component.component';
import { FormcompComponent } from "./formcomp/formcomp.component";
import { CommonModule } from '@angular/common';
import { DetailsComponent } from "./details/details.component";
import { EmployeeServiceService } from './services/employee-service.service'; 
import { Router } from '@angular/router';
import { NavigationCancellationCode } from '@angular/router';
import { KendoComponentComponent } from './kendo-component/kendo-component.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MyComponentComponent, FormcompComponent, CommonModule, DetailsComponent,RouterLink,KendoComponentComponent,GridModule,ButtonsModule,MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'MyProject';
  viewmode : 'grid' | 'form' | 'details' | null = 'grid';
  employeeList : employee[] = [];
  get employee_list() : employee[] {
    return this.employeeList;
  }
  showtable : boolean | null = true;
  selecteduser : employee | null = null;
  edituser : employee | null = null;
  showform(){
    this.showtable = false;
    this.router.navigate(['/form']);
  }
  homebutton(){
    this.showtable = true;
    this.viewmode = null;
    this.router.navigate(['/']);
  }
  showdetails(emp : employee){
    // this.selecteduser = emp;
    // this.viewmode = 'details';
    this.showtable = false;
    const id = emp.EmpId;
    this.router.navigate(['/details',id]);
  }
  AddFunc(){
    this.viewmode = 'form';
    this.selecteduser = null;
  }
  GoHome(){
    this.viewmode = 'grid';
  }
  editformtabel(){
    this.viewmode = 'form';
    // this.showtable = false;
    // this.router.navigate(['/form']);
  }
  EditForm(data : employee){
    this.selecteduser = data;
    this.viewmode = 'form';
    this.showtable = false;
    // const index = this.employeeList.indexOf(data);
  }
  delete(data : employee){
    this.empService.DeleteEmployee(+data.EmpId).subscribe(()=>{
      console.log("delted");
      this.loadEmployeeList();
    })
  }
  constructor(private empService: EmployeeServiceService,private router: Router) {}
  ngOnInit(){
    this.loadEmployeeList();
    console.log("hello");
    this.router.events.subscribe((event)=>{
      if(event instanceof NavigationEnd && event.urlAfterRedirects === '/'){
        this.loadEmployeeList();
        // this.employeeList = [...this.employeeList];
        this.showtable = true;
        this.viewmode = null;
        console.log("comming");
      }
    })
  }
loadEmployeeList() {
  console.log("Calling GetAllEmployees()");
  this.empService.GetAllEmployees().subscribe((data: any) => {
    this.employeeList = data.map((item: any) => ({
      EmpId: item.empId,
      ResourceName: item.resourceName,
      Designation: item.designation,
      ReportingTo: item.reportingTo,
      Billable: item.billable,
      TechnologySkill: item.technologySkill,
      ProjectAllocation: item.projectAllocation,
      Location: item.location,
      EmailId: item.emailId,
      CteDoj: item.cteDoj,
      Remarks: item.remarks
    }));
  });
}

  // *************************************************
  // getIndex(data: employee): number {
  //   const index = this.employeeList.findIndex(e => 
  //     e.Name === data.Name &&
  //     e.email === data.email &&
  //     e.phone === data.phone
  //   );
  //   return index;
  // }
  // **************************************************

getIndex(data: employee): number {
  return this.employeeList.findIndex(e =>
    e.EmpId === data.EmpId &&
    e.ResourceName === data.ResourceName &&
    e.Designation === data.Designation &&
    e.ReportingTo === data.ReportingTo &&
    e.Billable === data.Billable &&
    e.TechnologySkill === data.TechnologySkill &&
    e.ProjectAllocation === data.ProjectAllocation &&
    e.Location === data.Location &&
    e.EmailId === data.EmailId &&
    e.CteDoj === data.CteDoj &&
    e.Remarks === data.Remarks
  );
}



  Addemp(data : employee){
    // const index = this.employeeList.findIndex(emp => (emp.email === data.email && emp.Name === data.Name && emp.phone === data.phone ));
    // const index = this.getIndex(data);
    // if(this.selecteduser){
    //   this.employeeList[this.getIndex(this.selecteduser)] = data;
    // }
    // else if(index === -1){
    //   this.employeeList.push(data);
    // }
    // else{
    //   this.employeeList[index] = data;
    // }
    // this.viewmode = null;
    // this.viewmode = 'grid';
    // this.router.navigate(['/']);
    // console.log(this.employeeList); 
    this.showtable = true;
    this.viewmode  = null;
    this.loadEmployeeList();
  }
  changing : employee[] = [];
  ngOnchanges(){
    this.employeeList = [...this.employeeList];
    this.loadEmployeeList();
  }
  BackDetails(){
    this.viewmode = 'grid';
  }

  // public gridData = [
  //   { id: 1, name: 'Abhinav', role: 'Developer', email: 'abhinav@example.com' },
  //   { id: 2, name: 'Ravi', role: 'Tester', email: 'ravi@example.com' },
  //   { id: 3, name: 'Sara', role: 'Manager', email: 'sara@example.com' }
  // ];
}

// *******************************************

// interface employee{
//     Name : string,
//     email : string,
//     phone : string,
// }

// **********************************************

export interface employee {
  EmpId: string;
  ResourceName: string;
  Designation: string;
  ReportingTo: string;
  Billable: string;
  TechnologySkill: string;
  ProjectAllocation: string;
  Location: string;
  EmailId: string;
  CteDoj: string;
  Remarks: string;
}