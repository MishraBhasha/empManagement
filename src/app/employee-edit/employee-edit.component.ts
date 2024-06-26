import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})

export class EmployeeEditComponent implements OnInit {
  empId: number = 0;
  employeeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.employeeForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const employeeId = +id;
      this.empId = employeeId;
      if (!isNaN(employeeId)) {
        this.employeeService.getEmployee(employeeId).subscribe(employee => {
          this.employeeForm.patchValue({
            first_name: employee.first_name,
            last_name: employee.last_name,
            email: employee.email,
            department: employee.department
          });
        });
      }
    }
  }
  updateEmployee(): void {
    if (this.employeeForm.valid) {
      this.employeeService.updateEmployee(this.empId, this.employeeForm.value).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}

