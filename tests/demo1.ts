let message1: string = "helloe";
message1 = "bye";
console.log(message1);

let age1: number = 20;
console.log(age1);

let isActive: boolean = false;
console.log(isActive);
let numberArray: number[] = [1, 2, 3];
console.log(numberArray);

let data: any = "this could be anything";

data = 42;
console.log(data);

// function

function add(a: number, b: number): number {
  return a + b;
}
add(2, 1);

// Objects

let user: {
  name: string,
  age: number,
  location:string
} = { name: "BOB", age: 23 ,location:"sangamner"};

user.location = "hyderabad";



