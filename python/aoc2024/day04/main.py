import dataclasses
import typing
from enum import Enum
from typing import Optional


def extract_game_board_from_string(input: str):
    game_board = []
    for line in input.splitlines():
        if line == "":
            continue
        game_board_line = []

        for c in line:
            game_board_line.append(c)

        game_board.append(game_board_line)
    return game_board


class SearchDirection(Enum):
    HORIZONTAL = 1
    VERTICAL = 2
    DIAGONAL_RIGHT = 3
    DIAGONAL_LEFT = 4


@dataclasses.dataclass
class WordSearch:
    game_board: list[list[str]]

    def search(
            self,
            start_y: int,
            start_x: int,
            direction: SearchDirection
    ) -> Optional[list[tuple[int, int]]]:
        # gather the four letters from the game_board, based on the direction
        letters: str = self.game_board[start_y][start_x]

        coordinates: list[tuple[int, int]] = []

        y, x = start_y, start_x
        coordinates.append((y, x))
        for i in range(1, 4):
            match direction:
                case SearchDirection.HORIZONTAL:
                    x += 1
                case SearchDirection.VERTICAL:
                    y += 1
                case SearchDirection.DIAGONAL_RIGHT:
                    x += 1
                    y += 1
                case SearchDirection.DIAGONAL_LEFT:
                    x -= 1
                    y += 1
            if (y < 0 or x < 0):
                print ("x or y is out of range")
                return None
            if y >= len(self.game_board) or (x >= len(self.game_board[y] or (x < 0))):
                return None
            letters += self.game_board[y][x]
            coordinates.append((y, x))

        if letters != "XMAS" and letters != "SAMX":
            return None

        return sorted(coordinates)

    def view_result_board(self, coordinates: list[list[tuple[int, int]]]) -> None:
        output_board: list[list[str]] = []

        for y in range(0, len(self.game_board)):
            output_board.append(
                ['.' for x in range(0, len(self.game_board[y]))]
            )

        for coordinate_set in coordinates:
            for (coordinate_y, coordinate_x) in coordinate_set:
                output_board[coordinate_y][coordinate_x] = self.game_board[coordinate_y][coordinate_x]

        o = ""
        for l in output_board:
            o += str("").join([c for c in l])
            o += "\n"
        print(o)



def part1(input: str):
    game_board = extract_game_board_from_string(input)
    word_search = WordSearch(game_board)
    matches: set[tuple[int, int], tuple[int, int], tuple[int, int], tuple[int,int]] = set()

    for y, row in enumerate(game_board):
        for x, letter in enumerate(row):
            if letter != 'X' and letter != 'S':
                continue
            for d in SearchDirection:
                o = word_search.search(y, x, d)
                if not o:
                    continue
                matches.add((o[0], o[1], o[2], o[3]))

    print(f"Number of matches: {len(matches)}")
    word_search.view_result_board(matches)


if __name__ == '__main__':
    example_input = """
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
"""
    with open('input.txt', 'r') as file:
        input: str = file.read()
    part1(input)
