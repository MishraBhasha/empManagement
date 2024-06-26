import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.scss']
})

export class EmployeeCreateComponent implements OnInit {
  userForm!: FormGroup;
  id: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      first_name: [''],
      last_name: [''],
      email: [''],
      phone_number: [''],
      date_of_birth: [''],
      department:[''],
      address: [''],
    });

    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.authService.getUserById(this.id).subscribe(
        data => {
          this.userForm.patchValue(data);
        },
        error => {
          console.error('Error fetching student', error);
        }
      );
    }
  }


  onSubmit(): void {
    if (this.id) {
      this.authService.updateEmp(this.id, this.userForm.value).subscribe(
        () => {
          this.router.navigate(['/user-list']);
        },
        error => {
          console.error('Error updating user', error);
        }
      );
    } else {
      this.authService.addEmp(this.userForm.value).subscribe(
        () => {
          this.router.navigate(['/user-list']);
        },
        error => {
          console.error('Error adding user', error);
        }
      );
    }
  }


}