export type Operation = "add" | "multiply" | "divide";

export const calculate = (
  a: number,
  b: number,
  operation: Operation
): number => {
  switch (operation) {
    case "add":
      console.log(a + b);
      return a + b;
    case "multiply":
      console.log(a * b);
      return a * b;
    case "divide":
      if (b === 0) {
        throw new Error("can't divide by 0");
      }
      console.log(a / b);
      return a / b;
    default:
      throw new Error("Wrong operation provided.");
  }
};

const c: number = Number(process.argv[2]);
const d: number = Number(process.argv[3]);

try {
  console.log(calculate(c, d, "divide"));
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}

// console.log(process.argv);
