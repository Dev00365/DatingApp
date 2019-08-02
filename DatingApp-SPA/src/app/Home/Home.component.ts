import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent implements OnInit {

  registerMode = false;
  values: any = {};

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.GetValues();
  }


  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  GetValues() {
    // this.http.get('http://localhost:5000/api/values').subscribe(Response => {
    //   this.values = Response;
    // }, error => {
    //   console.log(error);
    // });
  }

  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }



}
