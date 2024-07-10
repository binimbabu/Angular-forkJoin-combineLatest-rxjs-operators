import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { combineLatest, forkJoin, interval, of } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  ofObservable = of(1, 2, 3, 4);
  secondObservable = interval(3000);
  thirdObservable = interval(10000);
  http: HttpClient = inject(HttpClient);
  constructor() {
    // combineLatest([this.ofObservable, this.secondObservable, this.thirdObservable]).subscribe((result :any)=>{
    //   console.log("Result", result);
    // })

    // forkJoin([this.ofObservable, this.secondObservable, this.thirdObservable]).subscribe((data:any)=>{
    //   console.log("Data", data);
    // })
    const base_url = `https://jsonplaceholder.typicode.com/todos`;
    const httpUrl =
      [
        this.http.get(`${base_url}/1`),
        this.http.get(`${base_url}/2`),
        this.http.get(`${base_url}/3`),
        this.http.get(`${base_url}/4`)
    ];
    combineLatest(httpUrl).subscribe((value:any)=>{
      console.log("Combine latest value", value);
    })
    forkJoin(httpUrl).subscribe((value:any)=>{
      console.log("Forkjoin value", value);
    })
  }
}
