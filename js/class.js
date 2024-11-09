class Mamel {
  constructor(legs) {
    this.legs = legs;
  }
  eat() {
    console.log("eating...");
  }
  static count() {
    console.log("static count");
  }
}
class Dog extends Mamel {
  constructor(name, legs) {
    super(legs);
    this.name = name;
  }
  sleep() {
    super.eat();
    console.log("sleeepinggg");
  }
}
let d = new Dog("john", 2);
d.sleep();
d.eat();
console.log(d, "d");
