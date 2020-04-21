import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { StudentService } from "../shared/student.service";
import { Student } from "../shared/student.model";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-student",
  templateUrl: "./student.component.html",
  styleUrls: ["./student.component.css"],
})
export class StudentComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  contactnoRegex = /^\d{3}\d{3}\d{4}$/;
  showSucessMessage: boolean;
  serverErrorMessages: string;

  constructor(public studentService: StudentService, private router: Router) {}

  ngOnInit() {}

  refreshStudentsList() {
    this.studentService.getStudentProfile().subscribe((res) => {
      this.studentService.student = res as Student[];
    });
  }

  onSubmit(form: NgForm) {
    this.studentService.postStudent(form.value).subscribe(
      (res) => {
        this.showSucessMessage = true;
        setTimeout(() => (this.showSucessMessage = false), 10000);
        this.resetForm(form);
      },
      (err) => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join("<br/>");
        } else this.serverErrorMessages = "Something went wrong.";
      }
    );
  }

  resetForm(form: NgForm) {
    this.studentService.selectedStudent = {
      fullName: "",
      gender: "",
      email: "",
      age: null,
      marks: null,
      address: "",
      contactno: null,
      qualification: "",
    };
    form.resetForm();
    this.serverErrorMessages = "";
  }
}
