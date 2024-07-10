Forkjoin and combineLatest are used if we want to call a set of api calls or multiple http api calls or to execute set of observables.


ofObservable = of(1,2,3,4);
secondObservable = interval(3000);
constructor(){
combineLatest([this.ofObservable, this.secondObservable]).subscribe((result :any)=>{
console.log("Result", result);
})
}



CombineLatest will finish one observable ( i.e ofObservable ) and it will emit atleast one value and it will wait for the ‘secondObservable’ to emit atleast one value. If all the observables ( here both ‘ ofObservable’ and ‘ secondObservable’ ) will emit atlest one value each then it goes to the subscriber.


Output

Result  [4, 0]
Result  [4, 1]
Result  [4, 2]


In the output [4, 0], 4 is the latest value of the first observable  i.e of ofObservable ) and 0 is the value of second observable  (i.e. ‘ secondObservable’ ). Similarly, in the output [4, 1], 4 is the latest value of the first observable  i.e of ofObservable ) and 1 is the value of second observable and so on.



ofObservable = of(1,2,3,4);
secondObservable = interval(3000);
thirdObservable = interval(10000);
constructor(){
combineLatest([this.ofObservable, this.secondObservable, this.thirdObservable]).subscribe((result :any)=>{
console.log("Result", result);
})
}



Output

Result   [4, 2, 0]
Result   [4, 3, 0]
Result   [4, 4, 0]
Result   [4, 5, 0]
Result   [4, 5, 1]
Result   [4, 6, 1]
Result   [4, 7, 1]


In the output [4, 2, 0], 4 is the latest value of the first observable  i.e of ofObservable ) and 0 is the value of second observable  (i.e. ‘ secondObservable’ ). ThirdObservable is 0 and it has not yet started because ‘ thirdObservable = interval(10000) is given , so after every 10 miliseconds only the first value of the ‘ thirdObservable’ is emitted .

Similarly, in the output [4, 3, 0], 4 is the latest value of the first observable  i.e of ofObservable ) and 3 is the value of second observable ( i.e. ‘ secondObservable’  is emitted after every 3 miliseconds because secondObservable = interval(3000) is given) and ThirdObservable is 0 and it has not yet started because ‘ thirdObservable = interval(10000) is given , so after every 10 miliseconds only the first value of the ‘ thirdObservable’ is emitted and so on.





Forkjoin


ofObservable = of(1,2,3,4);
secondObservable = interval(3000);
thirdObservable = interval(10000);
constructor(){
forkJoin([this.ofObservable, this.secondObservable, this.thirdObservable]).subscribe((data:any)=>{
console.log("Data", data);
})
}


Here forkjoin will wait to emit all the values of ofObservable, secondObservable and thirdObservable then only it will go to the subscribe.  SecondObservable and  thirdObservable observables has to tell to subscribe that all the values has emitted then only it will subscribe.


http: HttpClient = inject(HttpClient);
constructor() {
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



combineLatest used when there is no continious emission and want to return the latest value.
ForkJoin used when there is no continuous emission and there is end up here till 4.          (i.e  this.http.get(`${base_url}/4`)  
Do not use forkJoin when there is contiouous emission of values, since subscribe would not be call subscribe until the last value is emitted. 



Output


Combine latest value 
    1. (4) [{…}, {…}, {…}, {…}]
        1. 0: {userId: 1, id: 1, title: 'delectus aut autem', completed: false}
        2. 1: {userId: 1, id: 2, title: 'quis ut nam facilis et officia qui', completed: false}
        3. 2: {userId: 1, id: 3, title: 'fugiat veniam minus', completed: false}
        4. 3: {userId: 1, id: 4, title: 'et porro tempora', completed: true}
        5. length: 4
        6. [[Prototype]]: Array(0)
Forkjoin value 
    1. (4) [{…}, {…}, {…}, {…}]
        1. 0: {userId: 1, id: 1, title: 'delectus aut autem', completed: false}
        2. 1: {userId: 1, id: 2, title: 'quis ut nam facilis et officia qui', completed: false}
        3. 2: {userId: 1, id: 3, title: 'fugiat veniam minus', completed: false}
        4. 3: {userId: 1, id: 4, title: 'et porro tempora', completed: true}
        5. length: 4
        6. [[Prototype]]: Array(0)

