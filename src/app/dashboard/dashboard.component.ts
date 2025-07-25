// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { EmployeeServiceService } from '../services/employee-service.service';
// import { NgxChartsModule } from '@swimlane/ngx-charts'; 
// @Component({
//   selector: 'app-dashboard',
//   standalone: true,
//   imports: [CommonModule,NgxChartsModule],
//   templateUrl: './dashboard.component.html',
//   styleUrl: './dashboard.component.scss'
// })
// export class DashboardComponent implements OnInit {
//   totalEmployees = 0;
//   totalManagers = 0;
//   totalProjects = 0;
//   totalLocations = 0;
//   billablePercent = 0;

//   allEmployees: employee[] = [];

//   managerGroups: { [key: string]: employee[] } = {};
//   projectGroups: { [key: string]: employee[] } = {};
//   locationGroups: { [key: string]: employee[] } = {};

//   skillChartData: any[] = [];

//   constructor(private empService: EmployeeServiceService) {}

//   ngOnInit(): void {
//     this.loadDashboard();
//   }

//   loadDashboard() {
//     this.empService.GetAllEmployees().subscribe((employees: employee[]) => {
//       this.allEmployees = employees;
//       this.totalEmployees = employees.length;

//       // Count unique managers
//       const managerSet = new Set(employees.map(e => e.reportingTo));
//       this.totalManagers = managerSet.size;

//       // Count unique projects
//       const projectSet = new Set(employees.map(e => e.projectAllocation));
//       this.totalProjects = projectSet.size;

//       // Count unique locations
//       const locationSet = new Set(employees.map(e => e.location));
//       this.totalLocations = locationSet.size;

//       // Billable %
//       const billableCount = employees.filter(e => e.billable === 'Yes').length;
//       this.billablePercent = Math.round((billableCount / employees.length) * 100);

//       // Groupings
//       this.managerGroups = this.groupBy(employees, 'reportingTo');
//       this.projectGroups = this.groupBy(employees, 'projectAllocation');
//       this.locationGroups = this.groupBy(employees, 'location');

//       // Skill Distribution Chart
//       const skillMap = new Map<string, number>();
//       employees.forEach(emp => {
//         if (emp.technologySkill) {
//           emp.technologySkill.split(',').forEach((s: string) => {
//             const skill = s.trim();
//             skillMap.set(skill, (skillMap.get(skill) || 0) + 1);
//           });
//         }
//       });
//       this.skillChartData = Array.from(skillMap.entries()).map(([name, value]) => ({ name, value }));
//     });
//   }

//   groupBy(arr: employee[], key: keyof employee): { [key: string]: employee[] } {
//     return arr.reduce((acc, obj) => {
//       const groupKey = obj[key] || 'Unassigned';
//       if (!acc[groupKey]) acc[groupKey] = [];
//       acc[groupKey].push(obj);
//       return acc;
//     }, {} as { [key: string]: employee[] });
//   }
// }

// export interface employee {
//   empId: string;
//   resourceName: string;
//   designation: string;
//   reportingTo: string;
//   billable: string;
//   technologySkill: string;
//   projectAllocation: string;
//   location: string;
//   emailId: string;
//   cteDoj: string;
//   remarks: string;
// }
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeServiceService } from '../services/employee-service.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgxChartsModule,MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  totalEmployees = 0;
  totalManagers = 0;
  totalProjects = 0;
  totalLocations = 0;
  billablePercent = 0;

  allEmployees: employee[] = [];

  managerGroups: { [key: string]: employee[] } = {};
  projectGroups: { [key: string]: employee[] } = {};
  locationGroups: { [key: string]: employee[] } = {};

  skillChartData: any[] = [];

  constructor(private empService: EmployeeServiceService) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard() {
    this.empService.GetAllEmployees().subscribe((data: any[]) => {
      // 🌟 Map backend response to frontend employee model
      const employees: employee[] = data.map((item: any) => ({
        empId: item.empId,
        resourceName: item.resourceName,
        designation: item.designation,
        reportingTo: item.reportingTo,
        billable: item.billable ? 'YES' : 'NO',
        technologySkill: item.technologySkill,
        projectAllocation: item.projectAllocation,
        location: item.location,
        emailId: item.emailId,
        cteDoj: item.cteDoj,
        remarks: item.remarks
      }));

      this.allEmployees = employees;
      this.totalEmployees = employees.length;

      // 👨‍💼 Count unique managers
      const managerSet = new Set(employees.map(e => e.reportingTo));
      this.totalManagers = managerSet.size;

      // 💼 Count unique projects
      const projectSet = new Set(employees.map(e => e.projectAllocation));
      this.totalProjects = projectSet.size;

      // 📍 Count unique locations
      const locationSet = new Set(employees.map(e => e.location));
      this.totalLocations = locationSet.size;

      // 💰 Billable percentage
      const billableCount = employees.filter(e => e.billable === 'YES').length;
      this.billablePercent = Math.round((billableCount / employees.length) * 100);

      // 🔃 Groupings
      this.managerGroups = this.groupBy(employees, 'reportingTo');
      this.projectGroups = this.groupBy(employees, 'projectAllocation');
      this.locationGroups = this.groupBy(employees, 'location');

      // 📊 Skill chart data
      const skillMap = new Map<string, number>();
      employees.forEach(emp => {
        if (emp.technologySkill) {
          emp.technologySkill.split(',').forEach((s: string) => {
            const skill = s.trim();
            if (skill) {
              skillMap.set(skill, (skillMap.get(skill) || 0) + 1);
            }
          });
        }
      });
      this.skillChartData = Array.from(skillMap.entries()).map(([name, value]) => ({ name, value }));
    });
  }

  groupBy(arr: employee[], key: keyof employee): { [key: string]: employee[] } {
    return arr.reduce((acc, obj) => {
      const groupKey = obj[key] || 'Unassigned';
      if (!acc[groupKey]) acc[groupKey] = [];
      acc[groupKey].push(obj);
      return acc;
    }, {} as { [key: string]: employee[] });
  }
}

export interface employee {
  empId: string;
  resourceName: string;
  designation: string;
  reportingTo: string;
  billable: string;
  technologySkill: string;
  projectAllocation: string;
  location: string;
  emailId: string;
  cteDoj: string;
  remarks: string;
}
