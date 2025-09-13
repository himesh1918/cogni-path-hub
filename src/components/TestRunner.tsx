import React, { useState } from 'react';
import { Play, RotateCcw, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Exercise } from './ExerciseSystem';

interface TestRunnerProps {
  exercise: Exercise;
  code: string;
}

interface TestResult {
  passed: boolean;
  output: string;
}

const TestRunner: React.FC<TestRunnerProps> = ({ exercise, code }) => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [running, setRunning] = useState(false);
  
  const runTests = async () => {
    setRunning(true);
    // Mock test execution - In real app, this would execute code safely
    setTimeout(() => {
      const results = exercise.testCases.map((testCase, idx) => ({
        passed: Math.random() > 0.3, // 70% pass rate for demo
        output: `Test ${idx + 1}: ${Math.random() > 0.3 ? 'PASS' : 'FAIL - Expected ' + testCase.expected}`
      }));
      setTestResults(results);
      setRunning(false);
    }, 2000);
  };
  
  return (
    <Card className="learning-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Play size={20} />
            Test Runner
          </CardTitle>
          <Button
            onClick={runTests}
            disabled={running || !code.trim()}
            variant="outline"
            className="gap-2"
          >
            {running ? <RotateCcw className="animate-spin" size={16} /> : <Play size={16} />}
            {running ? 'Running Tests...' : 'Run Tests'}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-2">
        {exercise.testCases.map((testCase, idx) => (
          <div key={idx} className="p-3 border rounded">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Test Case {idx + 1}</span>
              {testResults[idx] && (
                <div className={`flex items-center gap-1 ${
                  testResults[idx].passed ? 'text-success' : 'text-destructive'
                }`}>
                  {testResults[idx].passed ? <CheckCircle size={16} /> : <XCircle size={16} />}
                  {testResults[idx].passed ? 'PASS' : 'FAIL'}
                </div>
              )}
            </div>
            <div className="text-sm text-muted-foreground mb-1">{testCase.description}</div>
            <div className="text-sm">
              <span className="font-medium">Input:</span> {testCase.input}
            </div>
            <div className="text-sm">
              <span className="font-medium">Expected:</span> {testCase.expected}
            </div>
            {testResults[idx] && (
              <div className="text-sm mt-1">
                <span className="font-medium">Output:</span> {testResults[idx].output}
              </div>
            )}
          </div>
        ))}
        
        {testResults.length > 0 && (
          <div className="mt-4 p-3 bg-muted/50 rounded">
            <div className="flex items-center gap-2">
              <span className="font-medium">Results:</span>
              <span className={`${testResults.every(r => r.passed) ? 'text-success' : 'text-destructive'}`}>
                {testResults.filter(r => r.passed).length}/{testResults.length} tests passed
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TestRunner;