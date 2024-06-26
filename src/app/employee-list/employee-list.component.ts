import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  userList: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getUserList().subscribe(
      data => {
        this.userList = data;
        console.log(this.userList.length);
      },
      error => {
        console.error('Error fetching userList', error);
      }
    );
  }

  deleteStudent(id: number): void {
    this.authService.deleteStudent(id).subscribe(
      () => {
        this.userList = this.userList.filter((student: { id: number; }) => student.id !== id);
      },
      error => {
        console.error('Error deleting user', error);
      }
    );
  }

  editStudent(id: number): void {
    this.router.navigateByUrl(`/user-form/${id}`);
  }

}
