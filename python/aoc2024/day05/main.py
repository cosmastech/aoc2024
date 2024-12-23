def find_middle(list_of_pages: list[int]) -> int:
    list_of_pages_middle = (len(list_of_pages) // 2)

    print("list of pages")
    print(list_of_pages)
    print("Middle index: " + str(list_of_pages_middle))
    el = list_of_pages[list_of_pages_middle]
    print("element: " + str(el))
    return list_of_pages[list_of_pages_middle]

def part1(input_str: str):
    page_ordering_rules, pages_to_produce = prepare_input(input_str)
    print(page_ordering_rules)
    print(pages_to_produce)

    accumulation = 0
    for list_of_pages_to_produce in pages_to_produce:
        """
        For each page, consult the ordering rules. Scan the tuples and find
        all rules where both members are pages in the list_of_pages_to_produce 
        """
        rules_to_consider = []
        for page_ordering_rule in page_ordering_rules:
            if (page_ordering_rule[0] not in list_of_pages_to_produce
                    or page_ordering_rule[1] not in list_of_pages_to_produce):
                continue
            rules_to_consider.append(page_ordering_rule)

        print(rules_to_consider)
        # we have the list of rules, now let's verify that the order works
        pages_produce_in_run = []
        count_of_pages_to_produce = len(list_of_pages_to_produce)
        found = False
        for i, page in enumerate(list_of_pages_to_produce):
            if i == (count_of_pages_to_produce - 1):
                # no more pages after this one
                continue
            rules_for_page = [rule for rule in rules_to_consider if rule[0] == page]
            pages_must_come_after = [single_rule[1] for single_rule in rules_for_page]
            remaining_pages = list_of_pages_to_produce[i+1:]
            all_match = all(p in pages_must_come_after for p in remaining_pages)
            if (all_match):
                print("All rules match")
                found = True
            else:
                print("Rule violation")
                print(pages_must_come_after)
                found = False
                break

        if found:
            p = find_middle(list_of_pages_to_produce)
            print("Add this up: " + str(p))
            accumulation += p

    print("Accumulation: " + str(accumulation))





def prepare_input(input_str: str) -> tuple[tuple[tuple[int, int], ...], list[list[int]]]:
    top, bottom = input_str.split("\n\n")
    lines = top.splitlines()
    page_ordering_rules = []
    for line in lines:
        p1, p2 = line.split("|")
        page_ordering_rules.append((int(p1), int(p2)))

    pages_to_produce = []
    for line in bottom.splitlines():
        pages_to_produce.append([int(x) for x in line.split(",")])

    return tuple(page_ordering_rules), pages_to_produce


if __name__ == '__main__':
    example_input = """47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47"""
    with open('input.txt', 'r') as file:
        input: str = file.read()
    part1(input)
