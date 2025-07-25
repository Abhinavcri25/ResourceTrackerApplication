import { Component } from '@angular/core';
import { employee } from '../app.component';
import { Router } from '@angular/router';
import { EmployeeServiceService } from '../services/employee-service.service';
import { CommonModule } from '@angular/common';
import { parseNumber } from '@progress/kendo-angular-intl';
// import { Router } from '@angular/router';
@Component({
  selector: 'app-hometable',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hometable.component.html',
  styleUrl: './hometable.component.scss'
})
export class HometableComponent {
  employeeList: employee[] = [];
  constructor(private empService: EmployeeServiceService, private router: Router) { }

  ngOnInit() {
    this.loadEmployeeList();
  }
  Showdetails(emp: employee) {
    const id = emp.EmpId;
    this.router.navigate([`/details/${id}`]);
  }

  editDetail(emp: employee) {
    this.empService.UpdateEmployee(parseInt(emp.EmpId), emp).subscribe({
      next: () => { },
      error: () => { }
    })
  };

  deleteEmployee(empId: string) {
    this.empService.DeleteEmployee(parseNumber(empId)).subscribe({
      next: () => { },
      error: () => { }
    })
  };

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


}
