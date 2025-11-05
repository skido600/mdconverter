---
layout: post
title: "Builder design pattern in TypeScript"
date: 2024-02-28 22:34:02 +0100
categories: design-patterns typescript
---

The builder pattern allows to easily create complex objects with different configurable properties.
I'd argue that there are better alternatives to create class instances in TypeScript. I'll present a few different approaches to use classes in TypeScript and give my opinions on them.

Let's start with a basic class:

```typescript
// 1st example: basic class
class Car {
  private color: string;
  private weight: number;
  private price: number;
  private brand: string;
  private productionYear: number;

  constructor(
    weight: number,
    price: number,
    brand: string,
    productionYear: number,
    color: string = "red"
  ) {
    this.weight = weight;
    this.price = price;
    this.brand = brand;
    this.productionYear = productionYear;
    this.color = color;
  }

  public getWeight() {
    return this.weight;
  }

  public getPrice() {
    return this.price;
  }

  public getBrand() {
    return this.brand;
  }

  public getProductionYear() {
    return this.productionYear;
  }

  public getColor() {
    return this.color;
  }
}

const car = new Car(2_000, 50_000, "Ford", 2013);
```

This code is a bit lenghty given its simplicity. Let's make it shorter using [parameter properties](https://www.typescriptlang.org/docs/handbook/2/classes.html#parameter-properties) syntax available in TypeScript.

```typescript
// 2nd example: class with parameter properties
class Car {
  constructor(
    private weight: number,
    private price: number,
    private brand: string,
    private productionYear: number,
    private color: string = "red"
  ) {}

  public getWeight() {
    return this.weight;
  }

  public getPrice() {
    return this.price;
  }

  public getBrand() {
    return this.brand;
  }

  public getProductionYear() {
    return this.productionYear;
  }

  public getColor() {
    return this.color;
  }
}

const car = new Car(2_000, 50_000, "Ford", 2013);
```

The next problem that we have is that there are a lot of parameters in the constructor, which is hard to read. Let's fix that.

```typescript
// 3rd example: class with all parameters packed into a single object
class Car {
  private color: string;
  private weight: number;
  private price: number;
  private brand: string;
  private productionYear: number;

  constructor({
    color = "red",
    weight,
    price,
    brand,
    productionYear,
  }: {
    color?: string;
    weight: number;
    price: number;
    brand: string;
    productionYear: number;
  }) {
    this.color = color;
    this.weight = weight;
    this.price = price;
    this.brand = brand;
    this.productionYear = productionYear;
  }

  public getWeight() {
    return this.weight;
  }

  public getPrice() {
    return this.price;
  }

  public getBrand() {
    return this.brand;
  }

  public getProductionYear() {
    return this.productionYear;
  }

  public getColor() {
    return this.color;
  }
}

const car = new Car({
  weight: 2_000,
  price: 50_000,
  brand: "Ford",
  productionYear: 2013,
});
```

The code has become lengthy again, but now the code for creating a new car is very readable. We can now also provide the parameters in any order we want which can be very handy.

```typescript
// this also works:
const car = new Car({
  brand: "Ford",
  weight: 2_000,
  productionYear: 2013,
  price: 50_000,
});
```

Let's now introduce one variation of the builder pattern. The builder pattern typically uses 2 separate classes: a builder class
and a base class. The builder class is usually a class with methods for adjusting the properties of the built object and a method for building the object.

```typescript
// 4th approach: builder class + class with parameter properties
class CarBuilder {
  private color?: string;
  private weight?: number;
  private price?: number;
  private brand?: string;
  private productionYear?: number;

  public setColor(color: string) {
    this.color = color;
    return this;
  }

  public setWeight(weight: number) {
    this.weight = weight;
    return this;
  }

  public setPrice(price: number) {
    this.price = price;
    return this;
  }

  public setBrand(brand: string) {
    this.brand = brand;
    return this;
  }

  public setProductionYear(productionYear: number) {
    this.productionYear = productionYear;
    return this;
  }

  public build() {
    if (this.weight === undefined)
      throw new Error("The weight parameter is required");
    if (this.price === undefined)
      throw new Error("The price parameter is required");
    if (this.brand === undefined)
      throw new Error("The brand parameter is required");
    if (this.productionYear === undefined)
      throw new Error("The productionYear parameter is required");

    return new Car(
      this.weight,
      this.price,
      this.brand,
      this.productionYear,
      this.color
    );
  }
}

// the exact same class from 2nd example:
class Car {
  constructor(
    private weight: number,
    private price: number,
    private brand: string,
    private productionYear: number,
    private color: string = "red"
  ) {}

  public getWeight() {
    return this.weight;
  }

  public getPrice() {
    return this.price;
  }

  public getBrand() {
    return this.brand;
  }

  public getProductionYear() {
    return this.productionYear;
  }

  public getColor() {
    return this.color;
  }
}

const carBuilder = new CarBuilder();
const car = carBuilder
  .setWeight(2_000)
  .setBrand("Ford")
  .setPrice(50_000)
  .setProductionYear(2013)
  .build();

console.log(car.getColor()); // red
```

The builder pattern typically uses method chaining which you might know from algorithms operating on arrays or strings.

```typescript
const client = clients
  .filter((client) => client.age >= 18)
  .sort((prev, next) => prev.name.localeCompare(next.name))
  .find((client) => client.country === "Poland");

const result = originalString
  .trim() // Remove leading and trailing whitespaces
  .toLowerCase() // Convert the string to lowercase
  .replace(",", "") // Remove commas
  .substring(0, 5); // Get the first 5 characters of the string
```

#### Method chaining

Both `Array.prototype.filter` and `Array.prototype.sort` return arrays, allowing for an indefinite chaining of array methods. Similarly, builder setters return an instance of a builder, allowing for an indefinite chaining of builder setters. Setter chaining is optional - the `return this` statement can be omitted and the builder can be accessed in such manner:

```typescript
carBuilder.setWeight(2_000);
carBuilder.setBrand("Ford");
carBuilder.setPrice(50_000);
carBuilder.setProductionYear(2013);
const car = carBuilder.build();
```

## Conclusions

The builder pattern might be useful in Java code, but it doesn't seem to be that useful in TypeScript code - it requires creating an additional class, preferably with additional error checking (which works only in runtime and won't show any errors during compilation time).
I recommend using approaches from 2nd or 3rd examples instead (which one you'd rather use will likely depend on number of constructor parameters).

### Extra notes

- `public` keyword is optional, I've added it to make the examples more understandable for developers with less TypeScript experience.
- getters can be created using `get` keyword (they are accessed a bit differently though).
