import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  // API base URL
  private apiUrl = 'http://localhost:8080'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  // Get all students
  getStudents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getAlls`);
  }

  // Get a single student by ID
  getStudentById(id: number|string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getBystudentId/${id}`);
  }

  // Add a new student
  addStudent(student: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/savestudent`, student);
  }

  // Update an existing student
  updateStudent(id: number|string, student: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateStudent/${id}`, student);
  }

  // Delete a student by ID
  deleteStudent(id: number|string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteStudent/${id}`);
  }
}
