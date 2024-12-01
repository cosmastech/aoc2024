package utils

import (
	"os"
	"strings"
)

func ReadFile(filepath string) ([]string, error) {
	s, err := os.ReadFile(filepath)
	if err != nil {
		return nil, err
	}

	return strings.Split(string(s), "\n"), nil
}
