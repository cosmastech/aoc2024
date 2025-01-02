const getInputString = (): string => {
  const FILEPATH = Deno.args[0] || "input.txt";

  console.log(`Using input from: ${FILEPATH}`);

  return Deno.readTextFileSync(FILEPATH);
};

const convertStringToDiskMap = (inputString: string): DiskMap => {
  console.log(`inputString: ${inputString}`);
  const digits = inputString.split("");

  const diskMap = new DiskMap();
  let fileId = 0;

  for (let i = 0; i < digits.length; i++) {
    const digit = parseInt(digits[i]);
    if (i % 2 === 0) {
      for (let fileSize = 0; fileSize < digit; fileSize++) {
        diskMap.data.push({ id: fileId });
      }
      fileId++;
    } else {
      diskMap.data.push(...Array(digit).fill(undefined));
      diskMap.countOfFreeBlocks += digit;
    }
  }

  return diskMap;
};

interface File {
  id: number;
}

type Unit = File | undefined;

class DiskMap {
  data: Unit[];
  firstFreeSpaceIndex: number;
  countOfFreeBlocks: number = 0;
  constructor() {
    this.data = [];
    this.firstFreeSpaceIndex = -1;
  }

  getLastNonFreeUnit(): Unit {
    while (true) {
      const lastEl = this.data.pop();
      if (lastEl !== undefined) {
        return lastEl;
      }
      this.countOfFreeBlocks--;
    }
  }

  setFirstFreeSpaceIndex(): void {
    this.firstFreeSpaceIndex = this.data.findIndex((u: Unit) =>
      u === undefined
    );
  }
}

function moveData(diskMap: DiskMap): void {
  while (diskMap.countOfFreeBlocks > 0) {
    const unitToAdd = diskMap.getLastNonFreeUnit();
    diskMap.setFirstFreeSpaceIndex();
    if (diskMap.firstFreeSpaceIndex === -1) {
      diskMap.data.push(unitToAdd);
      break;
    }
    diskMap.data[diskMap.firstFreeSpaceIndex] = unitToAdd;
    diskMap.countOfFreeBlocks--;
  }
}

function computeCheckSum(diskMap: DiskMap): bigint {
  let accumulation = 0n;
  console.log(diskMap.data.slice(-10));
  diskMap.data.forEach((u: Unit, index: number) => {
    if (u === undefined) {
      return;
    }
    accumulation += BigInt(u.id * index);
  });

  return accumulation;
}
function main(): void {
  const diskMap = convertStringToDiskMap(getInputString());
  moveData(diskMap);
  console.log(diskMap);
  const checkSum = computeCheckSum(diskMap);
  console.log("Checksum: " + checkSum);
}

main();
