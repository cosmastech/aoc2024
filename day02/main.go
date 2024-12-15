package main

import (
	"aoc2024/utils"
	"fmt"
	"strconv"
	"strings"
)

type Direction int

const (
	UNKNOWN Direction = iota
	INCREASING
	DECREASING
)

func main() {
	lines, err := utils.ReadFile("day02/example.txt")

	if err != nil {
		panic("Could not read input")
	}

	levelReports := prepareInput(lines)

	solvePart1(levelReports)

	solvePart2(levelReports)
}

func solvePart1(levels [][]int) {
	accumulation := 0
	for rowNumber, level := range levels {
		isSafe, _ := isLevelSafe(level)
		if isSafe {
			accumulation += 1
			fmt.Println("row number [" + strconv.Itoa(rowNumber) + "] is safe")
		} else {
			fmt.Println("row number [" + strconv.Itoa(rowNumber) + "] is UNSAFE")
		}
	}

	fmt.Println("Number of safe levels: ", accumulation)
}

func solvePart2(levelReports [][]int) {

}

func isLevelSafe(reports []int) (bool, int) {
	var movingDirection Direction = UNKNOWN

	for i := 1; i < len(reports); i++ {
		r1, r2 := reports[i-1], reports[i]
		diff := r1 - r2
		absDiff := utils.Abs(diff)

		if movingDirection == UNKNOWN {
			movingDirection = getDirection(diff)
		} else {
			currentDirection := getDirection(diff)
			if currentDirection != movingDirection {
				return false, i
			}
		}

		if absDiff < 1 || absDiff > 3 {
			return false, i
		}
	}

	return true, -1
}

func isPositive(a int) bool {
	return a > 0
}

func getDirection(a int) Direction {
	if isPositive(a) {
		return INCREASING
	}
	return DECREASING
}

func prepareInput(lines []string) [][]int {

	toReturn := make([][]int, len(lines))
	for lineNumber, line := range lines {
		lineStrings := strings.Split(line, " ")
		lineInts := make([]int, len(lineStrings))

		for i, toConvert := range lineStrings {
			converted, err := strconv.Atoi(toConvert)
			if err != nil {
				panic("Oh no! We couldn't convert on line number: " + string(lineNumber))
			}
			lineInts[i] = converted
		}
		toReturn[lineNumber] = lineInts
	}

	return toReturn
}
