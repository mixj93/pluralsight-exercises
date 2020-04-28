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

// ! JavaScript Classes

// ! Using Built-in JavaScript Objects
