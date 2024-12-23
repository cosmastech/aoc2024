const FILENAME = 'example.txt';

enum Direction {
    UP = 1,
    RIGHT,
    DOWN,
    LEFT
}

interface GameState {
    obstacleLocations: Location[],
    personLocation: Location,
    personDirection: Direction
}

interface Location {
    readonly x: number,
    readonly y: number
};

const convertToGrid = (str: string): GameState => {
    const obstacles: Location[] = [];
    let personLocation;
    const lines = str.split("\n");
    const WIDTH = lines[0].length;
    for (let y = 0; y < lines.length; y++) {
        let line = lines[y];
        for (let x = 0; x < WIDTH; x++) {
            let char = line.charAt(x);
            if (char === '.') {
                continue;
            }
            if (char === '#') {
                obstacles.push({ x, y });
            }
            else {
                personLocation = {x, y}
            }
        }
    }
    if (personLocation === undefined) {
        throw new Error("Could not find person!");
    }

    return {obstacleLocations: obstacles, personLocation: personLocation, personDirection: Direction.UP};
};

const file = Bun.file(FILENAME);
const text = await file.text();
let gamestate = convertToGrid(text);
console.log(gamestate);