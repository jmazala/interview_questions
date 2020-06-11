// https://www.facebookrecruiting.com/portal/coding_practice_question/?problem_id=623634548182866

class Node {
  constructor(x) {
    this.data = x;
    this.next = null;
  }
}

function reverse(head) {
  const dummyHead = new Node('DUMMY');
  dummyHead.next = head;
  let prev = dummyHead;

  while (head) {
    if (head.data % 2 === 1) {
      prev = head;
      head = head.next;
      continue;
    }

    if (!head.next.next) {
      prev.next = head.next;
      prev.next.next = head;
      head.next = null;
      head = head.next;
      continue;
    }

    let numSkipped = 0;
    while (head.data % 2 === 0 && head.next && head.next.data % 2 === 0) {
      head = head.next;
      numSkipped++;
    }

    // reverse
    let next;
    let current = prev.next;
    const tempPrevious = prev;

    while (numSkipped >= 0) {
      numSkipped--;
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    prev = tempPrevious.next;
    tempPrevious.next.next = current;
    tempPrevious.next = head;
    head = current;
  }

  return dummyHead.next;
}

// These are the tests we use to determine if the solution is correct.
// You can add your own at the bottom, but they are otherwise not editable!
let test_case_number = 1;

function printLinkedList(head) {
  let out = '[';
  while (head != null) {
    out += head.data;
    head = head.next;
    if (head != null) {
      out += ' ';
    }
  }
  out += ']';
  return out;
}

function check(expectedHead, outputHead) {
  let result = true;
  const tempExpectedHead = expectedHead;
  const tempOutputHead = outputHead;
  while (expectedHead != null && outputHead != null) {
    result &= expectedHead.data == outputHead.data;
    expectedHead = expectedHead.next;
    outputHead = outputHead.next;
  }
  if (!(expectedHead == null && outputHead == null)) result = false;

  const rightTick = '\u2713';
  const wrongTick = '\u2717';
  if (result) {
    var out = `${rightTick} Test #${test_case_number}`;
    console.log(out);
  } else {
    var out = '';
    out += `${wrongTick} Test #${test_case_number}: Expected `;
    out += printLinkedList(tempExpectedHead);
    out += ' Your output: ';
    out += printLinkedList(tempOutputHead);
    console.log(out);
  }
  test_case_number++;
}

function createLinkedList(arr) {
  let head = null;
  let tempHead = head;
  for (const v of arr) {
    if (head == null) {
      head = new Node(v);
      tempHead = head;
    } else {
      head.next = new Node(v);
      head = head.next;
    }
  }
  return tempHead;
}

const head_1 = createLinkedList([1, 2, 8, 9, 12, 16]);
const expected_1 = createLinkedList([1, 8, 2, 9, 16, 12]);
const output_1 = reverse(head_1);
check(expected_1, output_1);

const head_2 = createLinkedList([2, 18, 24, 3, 5, 7, 9, 6, 12]);
const expected_2 = createLinkedList([24, 18, 2, 3, 5, 7, 9, 12, 6]);
const output_2 = reverse(head_2);
check(expected_2, output_2);

const head_3 = createLinkedList([2, 18, 24, 26, 3, 5, 7, 9, 6, 12]);
const expected_3 = createLinkedList([26, 24, 18, 2, 3, 5, 7, 9, 12, 6]);
const output_3 = reverse(head_3);
check(expected_3, output_3);

const head_4 = createLinkedList([18, 24, 3, 6, 12]);
const expected_4 = createLinkedList([24, 18, 3, 12, 6]);
const output_4 = reverse(head_4);
check(expected_4, output_4);

const head_5 = createLinkedList([18, 24, 3, 10, 8, 6, 12]);
const expected_5 = createLinkedList([24, 18, 3, 12, 6, 8, 10]);
const output_5 = reverse(head_5);
check(expected_5, output_5);

const head_6 = createLinkedList([
  2,
  4,
  6,
  8,
  9,
  11,
  10,
  12,
  14,
  16,
  13,
  18,
  20,
  22,
  24,
]);
const expected_6 = createLinkedList([
  8,
  6,
  4,
  2,
  9,
  11,
  16,
  14,
  12,
  10,
  13,
  24,
  22,
  20,
  18,
]);
const output_6 = reverse(head_6);
check(expected_6, output_6);
