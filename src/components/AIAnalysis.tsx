import React, { useState } from 'react';
import { Brain, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CodeIssue {
  line: number;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

interface CodeAnalysis {
  quality: number;
  issues: CodeIssue[];
  suggestions: string[];
  explanation: string;
  complexity: string;
}

interface AIAnalysisProps {
  code: string;
}

const AIAnalysis: React.FC<AIAnalysisProps> = ({ code }) => {
  const [analysis, setAnalysis] = useState<CodeAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  
  const analyzeCode = async () => {
    if (!code.trim()) return;
    
    setLoading(true);
    // Mock AI analysis - In real app, this would call your AI API
    setTimeout(() => {
      const mockAnalysis: CodeAnalysis = {
        quality: Math.floor(Math.random() * 40) + 60,
        issues: [
          { line: 2, message: 'Consider using more descriptive variable names', severity: 'warning' },
          { line: 5, message: 'This could be optimized with a hash map', severity: 'info' }
        ],
        suggestions: [
          'Add input validation',
          'Consider edge cases',
          'Add documentation'
        ],
        explanation: 'This code implements a basic algorithm with room for optimization. The logic is sound but could benefit from better variable naming and error handling.',
        complexity: 'Time: O(n²), Space: O(1)'
      };
      setAnalysis(mockAnalysis);
      setLoading(false);
    }, 1500);
  };
  
  return (
    <Card className="learning-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Brain size={20} />
            AI Code Analysis
          </CardTitle>
          <Button
            onClick={analyzeCode}
            disabled={loading || !code.trim()}
            variant="outline"
            className="gap-2"
          >
            {loading ? <RotateCcw className="animate-spin" size={16} /> : <Brain size={16} />}
            {loading ? 'Analyzing...' : 'Analyze Code'}
          </Button>
        </div>
      </CardHeader>
      
      {analysis && (
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className={`text-2xl font-bold ${
                analysis.quality >= 80 ? 'text-success' : 
                analysis.quality >= 60 ? 'text-warning' : 'text-destructive'
              }`}>
                {analysis.quality}
              </div>
              <div className="text-sm text-muted-foreground">Quality Score</div>
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium mb-1">Code Complexity</div>
              <div className="text-sm text-muted-foreground">{analysis.complexity}</div>
            </div>
          </div>
          
          {analysis.issues.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Issues Found:</h4>
              <div className="space-y-2">
                {analysis.issues.map((issue, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2 bg-muted/50 rounded">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      issue.severity === 'error' ? 'bg-destructive' : 
                      issue.severity === 'warning' ? 'bg-warning' : 'bg-primary'
                    }`} />
                    <div>
                      <div className="text-sm font-medium">Line {issue.line}</div>
                      <div className="text-sm text-muted-foreground">{issue.message}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div>
            <h4 className="font-medium mb-2">Suggestions:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {analysis.suggestions.map((suggestion, idx) => (
                <li key={idx}>{suggestion}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Explanation:</h4>
            <p className="text-sm text-muted-foreground">{analysis.explanation}</p>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default AIAnalysis;