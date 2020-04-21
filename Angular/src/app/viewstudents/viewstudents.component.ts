import { Component, OnInit } from "@angular/core";
import { Student } from "../shared/student.model";
import { StudentService } from "../shared/student.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-viewstudents",
  templateUrl: "./viewstudents.component.html",
  styleUrls: ["./viewstudents.component.css"],
})
export class ViewstudentsComponent implements OnInit {
  constructor(public studentService: StudentService, private router: Router) {}

  ngOnInit() {
    this.refreshStudentsList();
  }

  refreshStudentsList() {
    this.studentService.getStudentProfile().subscribe((res) => {
      this.studentService.student = res as Student[];
    });
  }

  Back() {
    this.router.navigate(["./function"]);
  }
}
