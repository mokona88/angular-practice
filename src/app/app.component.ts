import { Component } from '@angular/core';

/* DECORATION FUNCTIONS are adviced to be declared before @Component */

function funcDecoExmpl(target, name, descriptor) {
  const origin = descriptor.value;

  console.log(target);
  console.log(name);

  // decorated code for defined function here.
  descriptor.value = function(...args) {
    console.log(`Function with arguments: ${args}`);
    const result = origin.apply(this, args);
    console.log(`Final result: ${result}`);
    return result;
  }
}

function decorWithParams(numberToShow: number) {
  console.log(numberToShow);
  return function(constructor: Function) {
    console.log('Decoration with params invoked.');
    console.log(`${numberToShow} again`);
    console.log(`Decorate with params constructor - ${constructor}`);
    console.log(typeof constructor);
  }
}

function log(classTarget) {
  console.log(`Info for target: ${classTarget}`);
  console.log(typeof classTarget);
  // we no longer need to redefine function like this
  // return (...args) => {
  //   console.log(`Passed args to constructor: ${args}`);
  //   return new classTarget(...args);
  // }
}

@log
@decorWithParams(4)
class MyClassWithDecoratorExample {
  constructor(arg1: number, arg2: number) {
    console.log(`Constructor fired with arguments: ${arg1} - ${arg2}`);
  }
}

const myClass = new MyClassWithDecoratorExample(5, 10);

@Component({ // This is also class decorator
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
// @log // second class decorator. Nested decorator is supported.
export class AppComponent {
  title = 'angular-practice-app';

  constructor() {
    const finalResult = this.simpleTest(5, 7);
    console.log(`final result is: ${finalResult}`);
  }

  @funcDecoExmpl // member decorator
  simpleTest(a: number, b: number) {
    console.log('Function to decorate');
    return a*b;
  }
}
