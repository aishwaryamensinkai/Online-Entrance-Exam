import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { environment } from "../../environments/environment";
import { Student } from "./student.model";
@Injectable({
  providedIn: "root",
})
export class StudentService {
  student: Student[];
  selectedStudent: Student = {
    fullName: "",
    gender: "",
    email: "",
    age: null,
    marks: null,
    address: "",
    contactno: null,
    qualification: "",
  };

  noAuthHeader = { headers: new HttpHeaders({ NoAuth: "True" }) };

  constructor(private http: HttpClient) {}

  //HttpMethods

  postStudent(student: Student) {
    return this.http.post(
      environment.apiBaseUrl + "/sregister",
      student,
      this.noAuthHeader
    );
  }

  getStudentProfile() {
    return this.http.get(environment.apiBaseUrl + "/studentProfile");
  }
}
