package main

import (
	"aoc2024/utils"
	"fmt"
	"sort"
	"strconv"
	"strings"
)

func main() {
	file_contents, err := utils.ReadFile("day01/input.txt")
	if err != nil {
		panic(err)
	}
	//solvePart1(file_contents)
	solvePart2(file_contents)
}

func solvePart2(file_contents []string) {
	list1, list2 := getInputArrays(file_contents)

	list2_map := make(map[int]int)

	for _, list2_value := range list2 {
		list2_map[list2_value] += 1
	}

	accumulation := 0
	for _, val := range list1 {
		accumulation += (val * list2_map[val])
	}

	fmt.Println(accumulation)
}

func solvePart1(file_contents []string) {
	list1, list2 := getInputArrays(file_contents)

	sort.Ints(list1)
	sort.Ints(list2)

	diff_accumulation := 0
	for i := 0; i < len(list1); i++ {
		diff := list1[i] - list2[i]

		diff_accumulation += max(diff, -diff)
	}

	fmt.Print("diff accumulation: ")
	fmt.Print(diff_accumulation)
}

func getInputArrays(file_contents []string) ([]int, []int) {
	line_count := len(file_contents)
	var list1 []int = make([]int, line_count)
	var list2 []int = make([]int, line_count)
	for i, line := range file_contents {
		nums := strings.Split(line, "   ")
		v1, err := strconv.Atoi(nums[0])
		if err != nil {
			fmt.Println("invalid input on " + string(i))
			panic("invalid input")
		}
		list1[i] = v1

		v2, err := strconv.Atoi(nums[1])
		if err != nil {
			fmt.Println("invalid input on " + string(i))
			panic("invalid input")
		}

		list2[i] = v2
	}

	return list1, list2
}
