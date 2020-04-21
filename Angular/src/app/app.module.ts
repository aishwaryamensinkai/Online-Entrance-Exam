// built-in
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
// components
import { AppComponent } from "./app.component";
//routes
import { appRoutes } from "./routes";
import { StudentComponent } from "./student/student.component";
import { ViewstudentsComponent } from "./viewstudents/viewstudents.component";
import { FirstpageComponent } from './firstpage/firstpage.component';

@NgModule({
  declarations: [AppComponent, StudentComponent, ViewstudentsComponent, FirstpageComponent],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
