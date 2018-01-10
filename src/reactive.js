import Rx from 'rxjs/Rx';	
import { throttleTime } from 'rxjs/operator/throttleTime';
var button=document.querySelector('button');
var observer = {
	next:(value)=>{
  	console.log(value)
  },
  error:(error)=>{
	console.log(error);
},
complete:()=>{
console.log("Data emssion is completed")
}
	
}
Rx.Observable.fromEvent(button,'click').map((data)=>{
	throttleTime(1000);
	return data.clientY;
}).subscribe((event)=>{
	console.log(event)
})
var RxObservable = Rx.Observable.create((obs)=>{
	button.onclick=function(event){
		obs.next(event)
	}
}).subscribe(observer);
setTimeout(()=>{
	console.log("5 seconds is completed");
	RxObservable.unsubscribe();
},5000);
Rx.Observable.create((obs)=>{
obs.next("Value is emited");
obs.error("Value is emited");
obs.complete("Value is emited");
}).subscribe(observer);	

// Now below example is a real time example created for expoloring power of the Rxjs
//debouncing and throttle are two concepts that throttle wait until time is elapsed and you can write in between but in dounbce if you change input
//and the time gets reseted.
var input=document.querySelector('input');
var inputObservable=Rx.Observable.fromEvent(input,'input');
inputObservable.map((event)=>event.target.value).debounceTime(500).distinctUntilChanged().subscribe((value)=>{
	console.log("hello world your seraching for "+value);
})
//scan and  reduce 


var numberObservable=Rx.Observable.of(1,2,3,4);

numberObservable.reduce((sum,value)=>sum+value,0).subscribe((value)=>{
	console.log(value);
})
var ScannumberObservable=Rx.Observable.of(1,2,3,4);

ScannumberObservable.scan((sum,value)=>sum+value,0).subscribe((value)=>{
	console.log(value);
})

// Merge 

// var clicks = Rx.Observable.fromEvent(document, 'click');
// var timer = Rx.Observable.interval(1000);
// var clicksOrTimer = Rx.Observable.merge(clicks, timer);
// clicksOrTimer.subscribe(x => console.log(x));