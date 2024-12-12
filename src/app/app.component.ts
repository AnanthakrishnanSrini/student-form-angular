import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StudentService } from './student.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'student-form';

  studentForm: FormGroup;
  students: any[] = [];

  currentId: string = ''; // Store current student ID for editing

  constructor(private studentService: StudentService) {
    // Initialize the form group with validation
    this.studentForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', [Validators.required, Validators.pattern(/^[6-9]{1}[0-9]{9}$/)]),
      address: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    });
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    console.log("intiated")
    this.studentService.getStudents().subscribe((data: any) => {
      this.students = data;
    });
  }

  addStudent() {
    if (this.studentForm.valid) {
      const request = {
        name: this.studentForm.get('name')?.value,
        email: this.studentForm.get('email')?.value,
        mobile: this.studentForm.get('mobile')?.value,
        address: this.studentForm.get('address')?.value,
      };
      this.studentService.addStudent(request).subscribe(() => {
        this.loadStudents();
        window.location.reload();
      });
    }
  }

  // Set form values when editing a student
  editStudent() {
    if (this.studentForm.valid) {
      const request = {
        name: this.studentForm.get('name')?.value,
        email: this.studentForm.get('email')?.value,
        mobile: this.studentForm.get('mobile')?.value,
        address: this.studentForm.get('address')?.value,
      };
      this.studentService.updateStudent(this.currentId, request).subscribe(() => {
        window.location.reload();
      });
    }
  }

  deleteStudent(id: number) {
    this.studentService.deleteStudent(id).subscribe(() => {
      window.location.reload();
    });
  }

  // Set current student ID for editing
  editEditRecord(id: string) {
    this.currentId = id;
    this.studentService.getStudentById(id).subscribe((student: any) => {
      // Populate form with existing student data
      this.studentForm.setValue({
        name: student.name,
        email: student.email,
        mobile: student.mobile,
        address: student.address
      });
    });
  }

  getSubmitButtonLabel() {
    return this.currentId ? 'Update Student' : 'Add Student';
  }
}
