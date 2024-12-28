const FILE_NAME = "input.txt";

type Op = "+" | "*";
const OP_OPTIONS: Op[] = ["+", "*"];

async function readInput(): Promise<string[]> {
  const input = await Bun.file(FILE_NAME).text();

  return input.split("\n");
}

interface Row {
  total: number;
  nums: number[];
}

function isValidRow(row: Row): boolean {
  const slots = row.nums.length - 1;
  for (let i = 0; i < 2 ** slots; i++) {
    let ops = intToOpArray(i, slots);
    if (row.total === computeRow(row.nums, ops)) {
      console.log("row is valid", row);
      return true;
    }
  }
  return false;
}

function intToOpArray(digit: number, slots: number): Op[] {
  let toReturn: Op[] = Array(slots).fill("+");

  digit
    .toString(2)
    .split("")
    .reverse()
    .forEach((val: string, i: number): void => {
      toReturn[i] = OP_OPTIONS[val as any as number];
    });

  return toReturn;
}

function computeRow(nums: number[], ops: Op[]): number {
  let accumulation = nums[0];
  let numberIndex = 1;
  let opIndex = 0;
  for (; numberIndex < nums.length; numberIndex++, opIndex++) {
    let opCode = ops[opIndex];
    accumulation = eval([accumulation, opCode, nums[numberIndex]].join(""));
  }

  console.log(nums, ops, accumulation);
  return accumulation;
}

async function main() {
  const lines = await readInput();

  let rows = lines.map((line: string): Row => {
    const [totalString, numsString] = line.split(": ");

    const total = parseInt(totalString);
    let nums: number[] = numsString.split(" ").map((s: string): number => {
      return parseInt(s, 10);
    });

    return { total, nums };
  });

  let accumulation = 0;
  rows.forEach((row) => {
    if (isValidRow(row)) {
      accumulation += row.total;
      console.log("accumulation: " + accumulation);
    }
  });
  console.log("final accumulation: " + accumulation);
}

await main();
