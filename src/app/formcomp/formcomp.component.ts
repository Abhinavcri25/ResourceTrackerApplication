import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HomeComponent } from '../home/home.component';
import { EmployeeServiceService } from '../services/employee-service.service'; // adjust path as needed
import { ActivatedRoute, Route, Router, Routes } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-formcomp',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,MatIconModule],
  templateUrl: './formcomp.component.html',
  styleUrl: './formcomp.component.scss'
})
export class FormcompComponent implements OnInit {
  check = 'form';
  len: number = 0;
  flag : number = 0;
  @Input() emp1: employee | null = null  //  @Input syntax
  @Output() submitForm = new EventEmitter<employee>();  
  @Output() Editformoutput = new EventEmitter<employee>();
  @Output() GoBack = new EventEmitter<void>();
  newForm!: FormGroup;

  // ************************************************************
  // ngOnInit() {
  //   this.newForm = new FormGroup({
  //     Name: new FormControl(this.emp?.Name || '', Validators.required),
  //     email: new FormControl(this.emp?.email || '', [Validators.required, Validators.email]),
  //     phone: new FormControl(this.emp?.phone || '', [Validators.required, Validators.minLength(5)])
  //   });
  // }
  // ********************************************************************

  constructor(
    private empService: EmployeeServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr : ChangeDetectorRef
  ) {}
  id: string = "";

  emp : employee | null = null;
  popupVisible: boolean = false;
  popupTitle: string = '';
  popupData: employee | null = null;

  ngOnInit() {
    this.newForm = new FormGroup({
      ResourceName: new FormControl('', Validators.required),
      Designation: new FormControl('', Validators.required),
      ReportingTo: new FormControl('', Validators.required),
      Billable: new FormControl('', Validators.required),
      TechnologySkill: new FormControl('', Validators.required),
      ProjectAllocation: new FormControl('', Validators.required),
      Location: new FormControl('', Validators.required),
      EmailId: new FormControl('', [Validators.required, Validators.email]),
      CteDoj: new FormControl('', Validators.required),
      Remarks: new FormControl('')
    });

    this.id = this.route.snapshot.paramMap.get('id')!;
    if(!this.id) return;
    this.empService.GetEmployee(this.id).subscribe((response:any) => {
      console.log(response);
      
      this.emp = {
        EmpId: response.empId,
        ResourceName: response.resourceName,
        Designation: response.designation,
        ReportingTo: response.reportingTo,
        Billable: response.billable,
        TechnologySkill: response.technologySkill,
        ProjectAllocation: response.projectAllocation,
        Location: response.location,
        EmailId: response.emailId,
        CteDoj: response.cteDoj,
        Remarks: response.remarks
      };

      this.newForm.patchValue({
        ResourceName: this.emp.ResourceName,
        Designation: this.emp.Designation,
        ReportingTo: this.emp.ReportingTo,
        Billable: this.emp.Billable ? 'Yes' : 'No',
        TechnologySkill: this.emp.TechnologySkill,
        ProjectAllocation: this.emp.ProjectAllocation,
        Location: this.emp.Location,
        EmailId: this.emp.EmailId,
        CteDoj: this.emp.CteDoj,
        Remarks: this.emp.Remarks
      });
    });
  }

  closePopup() {
    this.popupVisible = false;
    this.popupData = null;
    this.router.navigate(['/kendo']);
  }

  Submit() {
    if (this.newForm.valid) {
      // this.empService.sendEmployee(this.newForm.value);  // send data
      const formValue = this.newForm.value;
      if(this.emp){
        // this.popupTitle = '✏️ Employee Updated Successfully';
        const unqid = this.emp.EmpId;
        const resource = {
          EmpId: this.emp.EmpId,  //
          ResourceName: formValue.ResourceName,
          Designation: formValue.Designation,
          ReportingTo: formValue.ReportingTo,
          Billable: formValue.Billable == "Yes"? true : false,
          TechnologySkill: formValue.TechnologySkill,
          ProjectAllocation: formValue.ProjectAllocation,
          Location: formValue.Location,
          EmailId: formValue.EmailId,
          CteDoj: formValue.CteDoj,
          Remarks: formValue.Remarks
        };
        console.log(resource);
        this.empService.UpdateEmployee(+unqid, resource).subscribe(() => {
          this.popupTitle = '✏️ Employee Updated Successfully';
          this.popupData = {
            EmpId: unqid.toString(),
            ResourceName: resource.ResourceName,
            Designation: resource.Designation,
            ReportingTo: resource.ReportingTo,
            Billable: resource.Billable ? 'Yes' : 'No',
            TechnologySkill: resource.TechnologySkill,
            ProjectAllocation: resource.ProjectAllocation,
            Location: resource.Location,
            EmailId: resource.EmailId,
            CteDoj: resource.CteDoj,
            Remarks: resource.Remarks
          };
          this.popupVisible = true;
          console.log("Employee updated");
          this.submitForm.emit();
          // this.router.navigate(['/kendo']);
        });
        // this.popupVisible = true;
      }
      else{
        // this.popupTitle = '✅ Employee Added Successfully';
        const resource = {
          resourceName: formValue.ResourceName,
          designation: formValue.Designation,
          reportingTo: formValue.ReportingTo,
          billable: formValue.Billable == "Yes"? true : false,
          technologySkill: formValue.TechnologySkill,
          projectAllocation: formValue.ProjectAllocation,
          location: formValue.Location,
          emailId: formValue.EmailId,
          cteDoj: formValue.CteDoj,
          remarks: formValue.Remarks
        };
        console.log(resource);
        this.empService.AddNewEployee(resource).subscribe((res: any) => {
          this.popupTitle = '✅ Employee Added Successfully';
          this.popupData = {
            EmpId: '',
            ResourceName: resource.resourceName,
            Designation: resource.designation,
            ReportingTo: resource.reportingTo,
            Billable: resource.billable ? 'Yes' : 'No',
            TechnologySkill: resource.technologySkill,
            ProjectAllocation: resource.projectAllocation,
            Location: resource.location,
            EmailId: resource.emailId,
            CteDoj: resource.cteDoj,
            Remarks: resource.remarks
          };
          this.popupVisible = true;
        });
      }
      this.newForm.reset();
   }
  }
}
 interface employee {
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

