import React, { useState, useEffect } from 'react';
import { 
  Code, 
  Target, 
  Brain, 
  Bug, 
  BookOpen, 
  User, 
  Settings, 
  Lightbulb,
  Zap,
  Trophy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CodeEditor from './CodeEditor';
import ExerciseSystem, { Exercise } from './ExerciseSystem';
import AIAnalysis from './AIAnalysis';
import TestRunner from './TestRunner';

interface UserProgress {
  xp: number;
  level: number;
  streak: number;
  completedExercises: string[];
  achievements: string[];
}

const CodeLearningPlatform: React.FC = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [theme, setTheme] = useState('vs-dark');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [showHints, setShowHints] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [userProgress] = useState<UserProgress>({
    xp: 1250,
    level: 5,
    streak: 7,
    completedExercises: ['two-sum', 'reverse-string'],
    achievements: ['First Steps', 'Problem Solver']
  });
  
  // Auto-save functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (code) {
        console.log('Auto-saving code...');
      }
    }, 30000);
    
    return () => clearInterval(interval);
  }, [code]);
  
  // Load exercise starter code
  useEffect(() => {
    if (selectedExercise) {
      setCode(selectedExercise.starterCode);
      setHintIndex(0);
      setShowHints(false);
    }
  }, [selectedExercise]);
  
  const handleExerciseSelect = (exercise: Exercise) => {
    setSelectedExercise(exercise);
  };
  
  const showNextHint = () => {
    if (selectedExercise && hintIndex < selectedExercise.hints.length - 1) {
      setHintIndex(hintIndex + 1);
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Code className="text-primary-foreground" size={20} />
            </div>
            <h1 className="text-xl font-bold">Code Learning Assistant</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Zap size={16} className="text-warning" />
              <span>{userProgress.xp} XP</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Trophy size={16} className="text-warning" />
              <span>Level {userProgress.level}</span>
            </div>
            <Button variant="ghost" size="sm">
              <Settings size={20} />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="p-6">
        <Tabs defaultValue="editor" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="editor" className="flex items-center gap-2">
              <Code size={16} />
              Editor
            </TabsTrigger>
            <TabsTrigger value="exercises" className="flex items-center gap-2">
              <Target size={16} />
              Exercises
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center gap-2">
              <Brain size={16} />
              AI Analysis
            </TabsTrigger>
            <TabsTrigger value="debug" className="flex items-center gap-2">
              <Bug size={16} />
              Debugger
            </TabsTrigger>
            <TabsTrigger value="learn" className="flex items-center gap-2">
              <BookOpen size={16} />
              Learning
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <User size={16} />
              Dashboard
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="editor" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <select 
                  value={language} 
                  onChange={(e) => setLanguage(e.target.value)}
                  className="px-3 py-2 border rounded bg-background"
                >
                  <option value="python">Python</option>
                  <option value="javascript">JavaScript</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                </select>
                
                <select 
                  value={theme} 
                  onChange={(e) => setTheme(e.target.value)}
                  className="px-3 py-2 border rounded bg-background"
                >
                  <option value="vs-dark">VS Code Dark</option>
                  <option value="light">Light</option>
                </select>
              </div>
              
              {selectedExercise && (
                <Button
                  onClick={() => setShowHints(!showHints)}
                  variant="outline"
                  className="gap-2"
                >
                  <Lightbulb size={16} />
                  {showHints ? 'Hide Hints' : 'Show Hints'}
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <CodeEditor
                  code={code}
                  onChange={setCode}
                  language={language}
                  theme={theme}
                />
              </div>
              
              <div className="space-y-4">
                {selectedExercise && (
                  <Card className="learning-card">
                    <CardHeader>
                      <CardTitle>{selectedExercise.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {selectedExercise.description}
                      </p>
                      
                      {showHints && (
                        <div className="p-3 bg-warning/10 rounded mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">Hint {hintIndex + 1}</h4>
                            {hintIndex < selectedExercise.hints.length - 1 && (
                              <Button
                                onClick={showNextHint}
                                variant="link"
                                size="sm"
                              >
                                Next Hint
                              </Button>
                            )}
                          </div>
                          <p className="text-sm">{selectedExercise.hints[hintIndex]}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
                
                {selectedExercise && (
                  <TestRunner exercise={selectedExercise} code={code} />
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="exercises">
            <ExerciseSystem 
              onSelectExercise={handleExerciseSelect} 
              selectedExercise={selectedExercise} 
            />
          </TabsContent>
          
          <TabsContent value="analysis">
            <AIAnalysis code={code} />
          </TabsContent>
          
          <TabsContent value="debug">
            <Card className="learning-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bug size={20} />
                  Code Debugger
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border-l-4 border-destructive bg-destructive/5">
                  <div className="font-medium text-destructive">Error detected on line 5</div>
                  <div className="text-sm text-muted-foreground">SyntaxError: invalid syntax</div>
                  <Button className="mt-2" size="sm" variant="outline">
                    Fix Automatically
                  </Button>
                </div>
                
                <div className="p-4 border-l-4 border-warning bg-warning/5">
                  <div className="font-medium text-warning">Warning on line 12</div>
                  <div className="text-sm text-muted-foreground">Unused variable 'result'</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="learn">
            <Card className="learning-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen size={20} />
                  Interactive Learning
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Algorithm Visualization</h4>
                  <div className="bg-muted p-8 rounded text-center">
                    <div className="text-muted-foreground">Interactive algorithm visualizer would go here</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="dashboard">
            <Card className="learning-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User size={20} />
                  Student Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{userProgress.level}</div>
                    <div className="text-sm text-muted-foreground">Level</div>
                  </div>
                  <div className="text-center p-4 bg-success/10 rounded-lg">
                    <div className="text-2xl font-bold text-success">{userProgress.xp}</div>
                    <div className="text-sm text-muted-foreground">XP Points</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CodeLearningPlatform;