import os
import re


def find_multiples(mult_str: str) -> tuple[int, int]:
    print('MULTIPLE: ' + mult_str)
    trimmed = mult_str.lstrip('mul(')
    trimmed = trimmed.rstrip(')')

    parts = trimmed.split(',')
    return int(parts[0]), int(parts[1])


def part1(input: str) -> int:
    matches = re.findall(r"mul\(\d{1,3},\d{1,3}\)", input)

    summation: int = 0

    for match in matches:
        op1, op2 = find_multiples(match)
        summation += op1 * op2

    return summation


def part2(input: str) -> int:
    exploded: list[str] = input.split("don't()")
    print(exploded[0])
    summation: int = part1(exploded[0])
    for part in exploded[1:]:
        print("* " + part)
        split = part.split("do()")
        if len(split) < 2:
            print("no do() in this group!")
            continue
        del split[0]
        for p in split:
            print('** ' + p)
            summation += part1(p)

    return summation


if __name__ == '__main__':
    with open('input.txt', 'r') as file:
        input: str = file.read()

    # print("Part 1: ", part1(input))

    print("Part 2: ", part2(input))
