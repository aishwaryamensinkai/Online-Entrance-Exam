import { Routes } from "@angular/router";
import { StudentComponent } from "./student/student.component";
import { ViewstudentsComponent } from "./viewstudents/viewstudents.component";
import { FirstpageComponent } from "./firstpage/firstpage.component";
export const appRoutes: Routes = [
  {
    path: "ssignup",
    component: StudentComponent,
  },
  {
    path: "viewstudents",
    component: ViewstudentsComponent,
  },
  {
    path: "firstpage",
    component: FirstpageComponent,
  },
  {
    path: "",
    redirectTo: "/firstpage",
    pathMatch: "full",
  },
];
