const FILE = "example.txt";

interface Coordinate {
  x: number;
  y: number;
  value: number;
}

const DIRECTIONS = {
  up: [0, -1],
  down: [0, 1],
  left: [-1, 0],
  right: [1, 0],
} as const;

type DirectionKey = keyof typeof DIRECTIONS;

class PuzzleSolver {
  readonly puzzle: Puzzle;
  paths: Coordinate[][] = [];

  constructor(puzzle: Puzzle) {
    this.puzzle = puzzle;
    this.paths = [];
  }

  solve(coordinate: Coordinate, pathTraversed: Coordinate[] = []) {
    for (
      const directionName of ["up", "down", "left", "right"] as DirectionKey[]
    ) {
      const direction = DIRECTIONS[directionName];
      const nextX = coordinate.x + direction[0];
      const nextY = coordinate.y + direction[1];

      if (nextX < 0 || nextX > this.puzzle.MAX_X) {
        continue;
      }

      if (nextY < 0 || nextY > this.puzzle.MAX_Y) {
        continue;
      }

      const nextValue = puzzle.grid[nextY][nextX];

      if (nextValue === (coordinate.value + 1)) {
        const nextCoordinate = {
          x: nextX,
          y: nextY,
          value: nextValue,
          direction: directionName,
        };
        if (nextValue === 9) {
          this.paths.push([...pathTraversed, coordinate, nextCoordinate]);
        } else {
          this.solve(nextCoordinate, [...pathTraversed, coordinate]);
        }
      }
    }
  }

  getUniqueEndPoints(): number {
    return new Set(
      this.paths.map(
        (path): string => {
          const coordinate = path[path.length - 1];
          return [coordinate.x, "_", coordinate.y].join("");
        },
      ),
    ).size;
  }
}

class Puzzle {
  readonly trailheads: Coordinate[];
  readonly grid: number[][];
  readonly MAX_X: number;
  readonly MAX_Y: number;

  constructor(trailheads: Coordinate[], grid: number[][]) {
    this.trailheads = trailheads;
    this.grid = grid;
    this.MAX_X = grid[0].length - 1;
    this.MAX_Y = grid.length - 1;
  }
}

function buildPuzzle(): Puzzle {
  const inputText = Deno.readTextFileSync(FILE);

  const lines = inputText.split("\n");

  const grid: number[][] = [];
  const trailheads: Coordinate[] = [];

  for (let y = 0; y < lines.length; y++) {
    grid.push([]);
    for (let x = 0; x < lines[y].length; x++) {
      const value = parseInt(lines[y][x], 10);

      if (value === 0) {
        trailheads.push({ x, y, value });
      }

      grid[y][x] = value;
    }
  }

  return new Puzzle(trailheads, grid);
}

const puzzle: Puzzle = buildPuzzle();

let sumOfTrailHeads = 0;
puzzle.trailheads.forEach((trailheadCoordinates, index) => {
  console.log(`trailhead ${index}:`, trailheadCoordinates);

  const solver = new PuzzleSolver(puzzle);
  solver.solve(trailheadCoordinates);

  console.log(`Trailheads found in ${index}: ${solver.getUniqueEndPoints()}`);
  sumOfTrailHeads += solver.getUniqueEndPoints();
});

console.log("total trailheads: " + sumOfTrailHeads);
