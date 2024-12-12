import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  studentForm:FormGroup;

  constructor(){
    this.studentForm=new FormGroup({
      studentName:new FormControl('',[Validators.required,Validators.maxLength(20)]),
      studentId:new FormControl('',[Validators.required,Validators.maxLength(20)]),
      studentNumber:new FormControl('',[Validators.required,Validators.pattern(/^[6-9]{1}[0-9]{9}$/)]),
      studentMail:new FormControl('',[Validators.required,Validators.email]),
      studentAddress:new FormControl('',[Validators.required,Validators.maxLength(100)]),
      guardianName:new FormControl('',[Validators.required,Validators.maxLength(20)]),
    })
  }

  async submitForm(){
    try{

    }
    catch(e){
      
    }
  }
}
