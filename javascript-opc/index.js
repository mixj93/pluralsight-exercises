/* 
  Object Literals
  Constructor Functions
  Classes
  Object Equality
  Merging Properties
  Immutability
 */

// ! Creating JavaScript Objects

// * create object using object literals
// let person = {
//   firstName: 'Jack',
//   lastName: 'Sparrow',
//   age: 29,
//   isAdult: function () {
//     return this.age >= 18
//   }
// }

// person.age = 29
// person.isAdult = function () {
//   return this.age >= 18
// }

// console.log(person.isAdult())

// * Object Literal Property Shorthand
function registerUser(firstName, lastName) {
  let person = {
    firstName,
    lastName,
    isAdult: function () {
      return this.age >= 18
    }
  }
  console.log(person)
}
// registerUser('Jack', 'Sparrow')

// * Object Literal Method Declaration Shorthand
let firstName = 'Jack'
let lastName = 'Sparrow'
let person = {
  firstName,
  lastName,
  age: 17,
  isAdult() {
    return this.age >= 18
  }
}
// console.log(person.isAdult())

// * Inspecting Object Properties with Object.keys() and for...in
let keys = Object.keys(person)
// console.log(keys)

for (const propertyName in person) {
  if (person.hasOwnProperty(propertyName)) {
    // console.log(propertyName)
  }
}

// * Object Equality and the Object.is() Function
// == Should be avoided. Useful only in rare cases.
// Not type-safe
// "42" == 42
// 0 == false
// null == undefined
// "" == 0
// [1,2] == "1,2"

// === Most common. Should be used in almost all cases.
// Type-safe
// Convenient/Concise
// NaN not equal to NaN
// +0 equals -0

// Object.is() Less common. Like === except for a few mathmatical differences.
// Type-safe
// Verbose
// NaN equals to NaN
// +0 does not equal -0

/*
let person1 = {
  firstName: 'Jack',
  lastName: 'Sparrow'
}

let person2 = {
  firstName: 'Jack',
  lastName: 'Sparrow'
}

person1 == person2 // true
person1 === person2 // false
Object.is(person1, person2) // true
*/

// * Object Assign and Immutability
// Function never mutate the object passed in.
let person1 = {
  firstName: 'Jack',
  lastName: 'Sparrow',
  age: 39,
  isAdult: function () {
    return this.age >= 18
  }
}
let person2 = {}
Object.assign(person2, person1)
// console.log(person2)
// console.log(person1 === person2) // false

let healthStats = {
  height: 68,
  weight: 150
}
let mergedPerson = Object.assign({}, person1, healthStats)
// console.log(mergedPerson)

// * Using Constructor Functions to Create Objects
function Person(firstName, lastName, age) {
  this.firstName = firstName
  this.lastName = lastName
  this.age = age
  this.isAdult = function () {
    return this.age >= 18
  }
}
let jack = new Person('Jack', 'Sparrow', 35)
let will = new Person('Will', 'Turner', 25)
// console.log('jack', jack)
// console.log('will', will)

// * Using Object.create()
let person3 = Object.create(Object.prototype, {
  firstName: {
    value: 'Jack',
    enumerable: true,
    writable: true,
    configurable: true
  },
  lastName: {
    value: 'Sparrow',
    enumerable: true,
    writable: true,
    configurable: true
  },
  age: {
    value: 35,
    enumerable: true,
    writable: true,
    configurable: true
  }
})
// console.log(person3)

// ! JavaScript Object Properties
// * Using Bracket Notation to Access JavaScript Properties
for (const key in person) {
  if (person.hasOwnProperty(key)) {
    // console.log(`${key}: ${person[key]}`)
  }
}

// * Modifying Properties with Property Descriptors
let desc = Object.getOwnPropertyDescriptor(person, 'firstName')
// console.log(desc)
/*
{
  configurable: true
  enumerable: true
  value: "Jack"
  writable: true
}
*/

// * Using the Writable Attribute
let person4 = {
  firstName: 'Jack',
  lastName: 'Sparrow',
  age: 39
}
Object.defineProperty(person4, 'firstName', { writable: false })
// console.log(Object.getOwnPropertyDescriptor(person4, 'firstName'))
// {
//   configurable: true
//   enumerable: true
//   value: 'Jack'
//   writable: false
// }
person4.firstName = 'Will' // Not changed

let person5 = {
  name: {
    firstName: 'Jack',
    lastName: 'Sparrow'
  },
  age: 29
}
Object.defineProperty(person5, 'name', { writable: false })
// person5.name = {
//   firstName: 'Will',
//   lastName: 'Turner'
// } // Not changed
Object.freeze(person5.name)
person5.name.firstName = 'Will' // Changed
// console.log(person5)

// * Using the Enumerable Attribute
let person6 = {
  firstName: 'Jack',
  lastName: 'Sparrow',
  age: 39
}
Object.defineProperty(person6, 'firstName', { enumerable: false })
for (const key in person6) {
  if (person6.hasOwnProperty(key)) {
    // console.log(`${key}: ${person6[key]}`)
  }
}
/*
lastName: Sparrow
age: 39
*/
// console.log(Object.keys(person6)) // ["lastName", "age"]
// console.log(JSON.stringify(person6)) // {"lastName":"Sparrow","age":39}

// * Using the Configurable Attribute
let person7 = {
  firstName: 'Jack',
  lastName: 'Sparrow',
  age: 39
}
Object.defineProperty(person7, 'firstName', { configurable: false })
// Object.defineProperty(person7, 'firstName', { enumerable: false }) // Uncaught TypeError: Cannot redefine property: firstName
// Object.defineProperty(person7, 'firstName', { configurable: true }) // Uncaught TypeError: Cannot redefine property: firstName
delete person7.firstName // cannot delete
// Object.defineProperty(person7, 'firstName', { writable: false }) // No error

// * Creating Property Getters and Setters
let person8 = {
  name: {
    first: 'Jack',
    last: 'Sparrow'
  },
  age: 39
}
Object.defineProperty(person8, 'fullName', {
  get: function () {
    return `${this.name.first} ${this.name.last}`
  },
  set: function (fullName) {
    const nameParts = fullName.split(' ')
    this.name.first = nameParts[0]
    this.name.last = nameParts[1]
  }
})
// console.log(person8.fullName) // Jack Sparrow
person8.fullName = 'Will Turner'
// console.log(person8.name) // {first: "Will", last: "Turner"}

// ! JavaScript Prototypes and Interfaces
// * What Is a Prototype?
// a prototype is a function exists on every function in JavaScript.
let myFunction = function () {}
// console.log(myFunction.prototype) // an object
let myPerson = { firstName: 'Jack' }
// console.log(myPerson.prototype) // undefined
// console.log(myPerson.__proto__) // an object
// A Function's Prototype
// A function's prototype is the object instance that will become the prototype for all objects created using this function as a constructor.
// An Object's Prototype
// An object's prototype is the object instance from which the object is inherited.
function Person1(firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName
}
Person1.prototype.age = 29
let jack1 = new Person1('Jack', 'Sparrow')
let will1 = new Person1('Will', 'Turner')
will1.__proto__.age = 19
// Person1.prototype === jack1.__proto__ === will1.__proto__ // true

// * Instance vs. Prototype Properties
// console.log(jack1.age) // 19
// console.log(will1.age) // 19
// console.log(will1.hasOwnProperty('age')) // false
will1.age = 25
// console.log(will1.hasOwnProperty('age')) // true
// console.log(jack1.age) // 19
// console.log(will1.age) // 25
// console.log(will1.__proto__.age) // 19

// * A Graphical Overview of Prototypes
// https://s1.ax1x.com/2020/04/29/Jovu2n.png

// * Changing a Functions Prototype
// https://s1.ax1x.com/2020/04/29/JTp6mt.png
Person1.prototype = { age: 5 }
let kate = new Person1('Kate', 'Kane')
// console.log(Person1.prototype) // {age:5}
// console.log(jack1.age) // 19
// console.log(kate.age) // 5

// * Multiple Levels of Inheritance
// Prototype chain
// console.log(jack1.__proto__) // Person {age: 19}
// console.log(jack1.__proto__.__proto__) // Object {}
// console.log(jack1.__proto__.__proto__.__proto__) // null

// * Creating Your Own Prototypal Inheritance Chains
function Person2(firstName, lastName, age) {
  this.firstName = firstName
  this.lastName = lastName
  this.age = age
  Object.defineProperty(this, 'fullName', {
    get: function () {
      return `${this.firstName} ${this.lastName}`
    },
    enumerable: true
  })
}
function Student(firstName, lastName, age) {
  Person2.call(this, firstName, lastName, age)
  this._enrolledCourses = []
  this.enroll = function (courseId) {
    this._enrolledCourses.push(courseId)
  }
  this.getCourses = function () {
    return `${this.fullName}'s enrolled courses are:
${this._enrolledCourses.join(', ')}`
  }
}
Student.prototype = Object.create(Person2.prototype)
Student.prototype.constructor = Student
Student.fromPerson = function (person) {
  return new Student(person.firstName, person.lastName, person.age)
}
let ellie = new Student('Ellie', 'Johnson', 14)
ellie.enroll('CS50')
ellie.enroll('MA40')
// console.log(ellie)
// console.log(ellie.__proto__)
// console.log(ellie.__proto__.__proto__)
// console.log(ellie.getCourses())

// ! JavaScript Classes
// syntax sugar to do constructor functions
// * Creating Objects with Classes
// From ES6, cannot use in IE
class Person3 {
  constructor(firstName, lastName, age) {
    this.firstName = firstName
    this.lastName = lastName
    this.age = age
  }
  static adultAge = 18
  // * Creating Getters and Setters with Classes
  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }
  set fullName(fullName) {
    const nameParts = fullName.split(' ')
    this.firstName = nameParts[0]
    this.lastName = nameParts[1]
  }
  // * Adding Functions to Classes
  isAdult() {
    return this.age >= 18
  }
}
let jake = new Person3('Jake', 'London', 30)
// console.log(jake)
jake.fullName = 'Jax Pane'
// console.log(jake)
// console.log(jake.isAdult()) // true

// * Modifying Property Descriptors on Classes
Object.defineProperty(Person3.prototype, 'fullName', { enumerable: true })

// * Using Inheritance with Javascript Classes
class Student2 extends Person {
  constructor(firstName, lastName, age) {
    super(firstName, lastName, age)
    this._enrolledCourses = []
  }
  static fromPerson(person) {
    return new Student(person.firstName, person.lastName, person.age)
  }
  enroll(courseId) {
    this._enrolledCourses.push(courseId)
  }
  getCourses() {
    return `${this.fullName}'s enrolled courses are:
${this._enrolledCourses.join(', ')}`
  }
}
let john = new Student2('John', 'Watson', 34)
john.enroll('CS50')
// console.log(john)
// console.log(john.__proto__)

// * Using Static Properties and Methods
let jakeStudent = Student2.fromPerson(jake)
// console.log(jakeStudent)
// console.log(Person3.adultAge)

// ! Using Built-in JavaScript Objects
// * Using the JavaScript Math Object
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math
// console.log(Math.PI)
// console.log(Math.max(2, 24))
// console.log(Math.round(2.94))

// * Managing Dates with the Date Object
//https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date
let date = new Date(0) // Unix epoch time, milliseconds since 1970.1.1
// console.log(date)
let date2 = new Date('2050-03-25T13:01:02Z') // ISO 8601 string
// console.log(date2)
let date3 = new Date(2050, 2, 25, 21, 1, 2, 55) // month is zero based
// console.log(date3)
// console.log(date3 - date2) // 55

// * Validating Strings with the RegExp.test() Function
function checkPasswordComplexity(password) {
  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
  return regex.test(password)
}
// console.log(checkPasswordComplexity('1234')) // false
// console.log(checkPasswordComplexity('Test1234')) // true
// * Searching Strings with the RegExp.exec() Function
function findAlerts(logData) {
  let regex = /ERROR(.*?):(.*?);/g
  let result = regex.exec(logData)
  while (result !== null) {
    console.log(result[1])
    console.log(result[2])
    console.log('---------------')
    result = regex.exec(logData)
  }
}
let logoData =
  'INFO:ok;ERROR(HIGH):something broke;ERROR(LOW):something fishy;ERROR(HIGH):something broke;'
let result = findAlerts(logoData)
console.log(result)
// console.log(result[0])
// console.log(result.index)
// console.log(result.input)
