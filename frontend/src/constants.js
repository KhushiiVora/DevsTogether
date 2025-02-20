const LANGUAGES = {
  c: "C",
  cpp: "C++",
  csharp: "C#",
  java: "Java",
  python: "Python",
  // javascript: "JavaScript",
  typescript: "TypeScript",
};

const LANGUAGE_VERSIONS = {
  c: "10.2.0",
  cpp: "10.2.0",
  csharp: "6.12.0",
  java: "15.0.2",
  python: "3.10.0",
  typescript: "5.0.3",
};

const LANGUAGE_TEMPLATES = {
  c: `#include <stdio.h>

int main() {
    printf("Hello, World!");
    return 0;
}`,
  cpp: `#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`,
  csharp: `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}`,
  java: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  python: `print("Hello, World!")`,
  typescript: `let message: string = "Hello, World!";
console.log(message);`,
};

export { LANGUAGES, LANGUAGE_TEMPLATES, LANGUAGE_VERSIONS };
