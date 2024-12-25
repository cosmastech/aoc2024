const FILENAME = "input.txt";

enum Direction {
  UP,
  RIGHT,
  DOWN,
  LEFT,
}

interface GameState {
  personLocation: Location;
  personDirection: Direction;
  grid: ("#" | undefined)[][];
  spacesMoved: Set<string>;
}

interface Location {
  readonly x: number;
  readonly y: number;
}

const convertToGrid = (str: string): GameState => {
  let grid: ("#" | undefined)[][] = [];
  let personLocation;

  const lines = str.split("\n");
  const WIDTH = lines[0].length;

  for (let y = 0; y < lines.length; y++) {
    let line = lines[y];
    let currentRow: ("#" | undefined)[] = Array(WIDTH).fill(undefined);
    for (let x = 0; x < WIDTH; x++) {
      let char = line.charAt(x);
      if (char === ".") {
        continue;
      }
      if (char === "#") {
        currentRow[x] = "#";
      } else {
        personLocation = { x, y };
      }
    }
    grid.push(currentRow);
  }

  if (personLocation === undefined) {
    throw new Error("Could not find person!");
  }

  return {
    personLocation: personLocation,
    personDirection: Direction.UP,
    grid: grid,
    spacesMoved: new Set(),
  };
};

const file = Bun.file(FILENAME);
const text = await file.text();
let gamestate = convertToGrid(text);
console.log(gamestate);
findPath(gamestate);
console.log(gamestate.spacesMoved.size);

function findPath(gamestate: GameState) {
  const [dx, dy] = getDxDy(gamestate.personDirection);

  gamestate.spacesMoved.add(
    `${gamestate.personLocation.x}__${gamestate.personLocation.y}`,
  );
  let [nextX, nextY] = [
    gamestate.personLocation.x + dx,
    gamestate.personLocation.y + dy,
  ];
  // check if within bounds board bounds
  if (nextX >= gamestate.grid[0].length || nextX === -1) {
    // we won! let's bail
    return;
  }
  if (nextY >= gamestate.grid.length || nextY === -1) {
    return;
  }

  if (gamestate.grid[nextY][nextX] === undefined) {
    gamestate.personLocation = { x: nextX, y: nextY };
  } else {
    gamestate.personDirection = getNextDirection(gamestate.personDirection);
  }
  findPath(gamestate);
}

function getNextDirection(direction: Direction): Direction {
  switch (direction) {
    case Direction.UP:
      return Direction.RIGHT;
    case Direction.RIGHT:
      return Direction.DOWN;
    case Direction.DOWN:
      return Direction.LEFT;
    case Direction.LEFT:
      return Direction.UP;
  }
}

function getDxDy(direction: Direction): [number, number] {
  let dx = 0,
    dy = 0;
  switch (gamestate.personDirection) {
    case Direction.UP:
      dy = -1;
      break;
    case Direction.DOWN:
      dy = 1;
      break;
    case Direction.LEFT:
      dx = -1;
      break;
    case Direction.RIGHT:
      dx = 1;
      break;
  }
  return [dx, dy];
}
