import React, { useState } from 'react';
import { Target } from 'lucide-react';

export interface TestCase {
  input: string;
  expected: string;
  description: string;
}

export interface Exercise {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  description: string;
  starterCode: string;
  testCases: TestCase[];
  hints: string[];
  solution: string;
}

interface ExerciseSystemProps {
  onSelectExercise: (exercise: Exercise) => void;
  selectedExercise: Exercise | null;
}

const SAMPLE_EXERCISES: Exercise[] = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Beginner',
    category: 'Arrays',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    starterCode: `def two_sum(nums, target):
    # Your code here
    pass`,
    testCases: [
      { input: '[2,7,11,15], 9', expected: '[0,1]', description: 'Basic case' },
      { input: '[3,2,4], 6', expected: '[1,2]', description: 'Different indices' }
    ],
    hints: [
      'Use a hash map to store values and their indices',
      'For each number, check if target - number exists in the map',
      'Return the indices when you find a match'
    ],
    solution: `def two_sum(nums, target):
    num_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    return []`
  },
  {
    id: 'reverse-string',
    title: 'Reverse String',
    difficulty: 'Beginner',
    category: 'Strings',
    description: 'Write a function that reverses a string. The input string is given as an array of characters.',
    starterCode: `def reverse_string(s):
    # Your code here
    pass`,
    testCases: [
      { input: '["h","e","l","l","o"]', expected: '["o","l","l","e","h"]', description: 'Basic reversal' }
    ],
    hints: ['Use two pointers', 'Swap characters from both ends', 'Move pointers towards center'],
    solution: `def reverse_string(s):
    left, right = 0, len(s) - 1
    while left < right:
        s[left], s[right] = s[right], s[left]
        left += 1
        right -= 1`
  },
  {
    id: 'fibonacci',
    title: 'Fibonacci Sequence',
    difficulty: 'Intermediate',
    category: 'Dynamic Programming',
    description: 'Calculate the nth Fibonacci number efficiently.',
    starterCode: `def fibonacci(n):
    # Your code here
    pass`,
    testCases: [
      { input: '10', expected: '55', description: '10th Fibonacci number' },
      { input: '0', expected: '0', description: 'Base case' }
    ],
    hints: ['Use dynamic programming', 'Store previous results', 'Consider iterative approach'],
    solution: `def fibonacci(n):
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b`
  }
];

const ExerciseSystem: React.FC<ExerciseSystemProps> = ({ onSelectExercise, selectedExercise }) => {
  const [filter, setFilter] = useState<string>('all');
  
  const filteredExercises = SAMPLE_EXERCISES.filter(exercise => 
    filter === 'all' || exercise.difficulty.toLowerCase() === filter
  );
  
  return (
    <div className="p-4 bg-card border rounded-lg learning-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Target size={20} />
          Coding Exercises
        </h3>
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-1 border rounded bg-background"
        >
          <option value="all">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>
      
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filteredExercises.map((exercise) => (
          <div
            key={exercise.id}
            onClick={() => onSelectExercise(exercise)}
            className={`p-3 border rounded-lg cursor-pointer transition-colors hover-lift ${
              selectedExercise?.id === exercise.id 
                ? 'border-primary bg-primary/5' 
                : 'hover:bg-muted/50'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-medium">{exercise.title}</h4>
              <span className={`px-2 py-1 text-xs rounded ${
                exercise.difficulty === 'Beginner' ? 'bg-success/10 text-success' :
                exercise.difficulty === 'Intermediate' ? 'bg-warning/10 text-warning' :
                'bg-destructive/10 text-destructive'
              }`}>
                {exercise.difficulty}
              </span>
            </div>
            <div className="text-sm text-muted-foreground mb-1">{exercise.category}</div>
            <div className="text-sm line-clamp-2">{exercise.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExerciseSystem;