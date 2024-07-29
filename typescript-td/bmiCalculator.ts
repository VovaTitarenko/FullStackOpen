interface Measurements {
  mass: number;
  mUnit: string;
  height: number;
  hUnit: string;
}

type European = {
  mass: number;
  mUnit: "kg";
  height: number;
  hUnit: "cm";
};

type American = {
  mass: number;
  mUnit: "lb";
  height: number;
  hUnit: "inch";
};

const parseArgs = (args: string[]): Measurements => {
  if (args.length < 6) {
    throw new Error("Not enough arguments");
  }
  if (args.length > 6) {
    throw new Error("Too many arguments");
  }

  if (
    !isNaN(Number(args[2])) &&
    typeof args[3] === "string" &&
    !isNaN(Number(args[4])) &&
    typeof args[5] === "string"
  ) {
    return {
      mass: Number(args[2]),
      mUnit: args[3],
      height: Number(args[4]),
      hUnit: args[5],
    };
  } else {
    throw new Error("Provided values are of wrong type!");
  }
};

const bmiCalculate = ({
  mass,
  mUnit,
  height,
  hUnit,
}: European | American): string => {
  let bmi = 0;
  switch (mUnit) {
    case "kg":
      if (hUnit === "cm") {
        bmi = mass / (height / 100) ** 2;
        break;
      } else {
        throw new Error("wrong mass unit for European measurements");
      }
    case "lb":
      if (hUnit === "inch") {
        bmi = (mass / height ** 2) * 703;
        break;
      } else {
        throw new Error("wrong mass unit for American measurements");
      }
    default:
      throw new Error("wrong inputs");
  }
  if (bmi < 25) {
    return `Your bmi is: ${bmi} (healthy)`;
  } else if (bmi > 35) {
    return `Your bmi is: ${bmi} (obese)`;
  } else {
    return `Your bmi is: ${bmi} (overweight)`;
  }
};

// console.log(process.argv);

try {
  const measurements = parseArgs(process.argv);
  console.log(bmiCalculate(measurements as European | American));
} catch (exception: unknown) {
  console.error(exception);
}

export const simpleBmiCalculate = (mass: number, height: number): string => {
  const bmi = mass / (height / 100) ** 2;
  if (bmi < 25) {
    return `Your bmi is ${bmi.toFixed(2)} (healthy)`;
  } else if (bmi > 35) {
    return `Your bmi is ${bmi.toFixed(2)} (obese)`;
  } else {
    return `Your bmi is ${bmi.toFixed(2)} (overweight)`;
  }
};
