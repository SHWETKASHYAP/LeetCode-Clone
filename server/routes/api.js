const express = require('express');
const router = express.Router();

const problems = [
  {
    id: 1,
    title: 'Two Sum',
    description: 'Write a function that takes in an array of numbers and a target number. Return the indices of the two numbers that add up to the target number.',
    inputs: ['nums', 'target'],
    testCases: [
      {input: [[2, 7, 11, 15], 9], output: [0, 1]},
      {input: [[3, 2, 4], 6], output: [1, 2]},
      {input: [[3, 3], 6], output: [0, 1]}
    ]
  },
  {
    id: 2,
    title: 'Three Sum',
    description: 'Write a function that takes in an array of numbers and a target number. Return all triplets that add up to the target number.',
    inputs: ['nums', 'target'],
    testCases: [
      {input: [[-1,0,1,2,-1,-4], 0], output: [[-1,-1,2],[-1,0,1]]},
      {input: [[0, 1, 0], 0], output: []},
      {input: [[-1, 2, 1, 0], 0], output: [[-1, 0, 1]]}
    ]
  },
  {
    id: 3,
    title: 'Longest Substring Without Repeating Characters',
    description: 'Write a function that takes in a string and returns the length of the longest substring without repeating characters.',
    inputs: ['s'],
    testCases: [
      {input: ['abcabcbb'], output: 3},
      {input: ['bbbbb'], output: 1},
      {input: ['pwwkew'], output: 3}
    ]
  },
  {
    id: 4,
    title: 'Median of Two Sorted Arrays',
    description: 'Write a function that takes in two sorted arrays and returns the median of the two arrays.',
    inputs: ['nums1', 'nums2'],
    testCases: [
      {input: [[1, 3], [2]], output: 2.0},
      {input: [[1, 2], [3, 4]], output: 2.5},
      {input: [[0, 0], [0, 0]], output: 0.0}
    ]
  },
  {
    id: 5,
    title: 'Longest Palindromic Substring',
    description: 'Write a function that takes in a string and returns the longest palindromic substring.',
    inputs: ['s'],
    testCases: [
      {input: ['babad'], output: 'bab'},
      {input: ['cbbd'], output: 'bb'},
      {input: ['a'], output: 'a'}
    ]
  },
  {
    id: 6,
    title: 'Reemove Nth Node From End of List',
    description: 'Write a function that takes in a linked list and an integer and removes the nth node from the end of the list.',
    inputs: ['head', 'n'],
    testCases: [
      {input: [[1,2,3,4,5], 2], output: [1,2,3,5]},
      {input: [[1], 1], output: []},
      {input: [[1,2], 1], output: [1]}
    ]
  },
  {
    id: 7,
    title: 'Reverse Integer',
    description: 'Write a function that takes in an integer and returns the integer in reverse.',
    inputs: ['x'],
    testCases: [
      {input: [123], output: 321},
      {input: [-123], output: -321},
      {input: [120], output: 21}
    ]
  },
  {
    id: 8,
    title: 'String to Integer (atoi)',
    description: 'Write a function that takes in a string and converts it to an integer after removing all unnecessary characters.',
    inputs: ['str'],
    testCases: [
      {input: ['42'], output: 42},
      {input: ['   -42'], output: -42},
      {input: ['4193 with words'], output: 4193}
    ]
  },
  {
    id: 9,
    title: 'Palindrome Number',
    description: 'Write a function that takes in an integer and returns true if it is a palindrome.',
    inputs: ['x'],
    testCases: [
      {input: [121], output: true},
      {input: [-121], output: false},
      {input: [10], output: false}
    ]
  },
  {
    id: 10,
    title: 'Regular Expression Matching',
    description: 'Write a function that takes in a string and a pattern and returns true if the string matches the pattern.',
    inputs: ['s', 'p'],
    testCases: [
      {input: ['aa', 'a'], output: false},
      {input: ['aa', 'a*'], output: true},
      {input: ['ab', '.*'], output: true}
    ]
  }
]

router.get('/', (req, res) => {
  res.send('API works');
});

router.get('/problems', (req, res) => {
  res.json(problems);
});

router.get('/problems/:id', (req, res) => {
  const id = req.params.id;
  const problem = problems.find(problem => problem.id == id);
  res.json(problem);
});

router.post('/code', (req, res) => {
    const {code,id} = req.body
    const problem = problems.find(p=>p.id == id)
    
    const execute = `(function(){
      ${code}
      const results = []
      const testCases = ${JSON.stringify(problem.testCases)}
      testCases.forEach(test=>{
        const output = outputFunction(...test.input)
        results.push(output === test.output)
      })
      return results
      })()`
    const result = eval(execute)
    console.log(result)
    res.json(result)
})

module.exports = router;