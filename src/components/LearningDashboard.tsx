import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Clock, 
  Target, 
  TrendingUp, 
  Upload, 
  Brain,
  CheckCircle,
  Calendar,
  Award
} from "lucide-react";

const LearningDashboard = () => {
  const studyTopics = [
    { name: "Machine Learning", progress: 85, color: "bg-primary" },
    { name: "Data Structures", progress: 92, color: "bg-secondary" },
    { name: "Web Development", progress: 78, color: "bg-success" },
    { name: "Database Design", progress: 65, color: "bg-warning" }
  ];

  const recentActivity = [
    { type: "assessment", title: "ML Fundamentals Quiz", score: "85%", time: "2h ago" },
    { type: "document", title: "Neural Networks PDF", action: "Processed", time: "4h ago" },
    { type: "study", title: "Algorithm Practice", duration: "45min", time: "1d ago" },
    { type: "achievement", title: "Week Streak Milestone", badge: "7 Days", time: "2d ago" }
  ];

  const weeklyStats = [
    { day: "Mon", hours: 2.5 },
    { day: "Tue", hours: 3.2 },
    { day: "Wed", hours: 1.8 },
    { day: "Thu", hours: 4.1 },
    { day: "Fri", hours: 2.9 },
    { day: "Sat", hours: 3.7 },
    { day: "Sun", hours: 2.4 }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Welcome back, Sarah!</h1>
            <p className="text-muted-foreground">Ready to continue your learning journey?</p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Upload className="w-4 h-4" />
              Upload Document
            </Button>
            <Button className="gap-2 learning-gradient text-white">
              <Brain className="w-4 h-4" />
              AI Study Plan
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="learning-card hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Study Streak</p>
                  <p className="text-2xl font-bold">12 Days</p>
                  <div className="flex items-center gap-1 text-sm text-success">
                    <TrendingUp className="w-4 h-4" />
                    +2 from last week
                  </div>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="learning-card hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Completed Today</p>
                  <p className="text-2xl font-bold">4/6</p>
                  <div className="flex items-center gap-1 text-sm text-primary">
                    <Target className="w-4 h-4" />
                    67% progress
                  </div>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="learning-card hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Study Time</p>
                  <p className="text-2xl font-bold">3.2h</p>
                  <div className="flex items-center gap-1 text-sm text-secondary">
                    <Clock className="w-4 h-4" />
                    This week: 18.6h
                  </div>
                </div>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="learning-card hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Achievements</p>
                  <p className="text-2xl font-bold">24</p>
                  <div className="flex items-center gap-1 text-sm text-warning">
                    <Award className="w-4 h-4" />
                    +3 this month
                  </div>
                </div>
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Study Progress */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="learning-card">
              <CardHeader>
                <CardTitle className="text-xl">Current Learning Topics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {studyTopics.map((topic, index) => (
                  <div key={topic.name} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{topic.name}</span>
                      <Badge variant="secondary">{topic.progress}%</Badge>
                    </div>
                    <Progress value={topic.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Weekly Study Chart */}
            <Card className="learning-card">
              <CardHeader>
                <CardTitle className="text-xl">Weekly Study Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2 h-32">
                  {weeklyStats.map((stat, index) => (
                    <div key={stat.day} className="flex-1 flex flex-col items-center gap-2">
                      <div 
                        className="w-full bg-primary/20 rounded-t-sm relative overflow-hidden"
                        style={{ height: `${(stat.hours / 5) * 100}%` }}
                      >
                        <div 
                          className="absolute bottom-0 w-full bg-primary rounded-t-sm transition-all duration-500"
                          style={{ height: '100%' }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{stat.day}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="space-y-6">
            <Card className="learning-card">
              <CardHeader>
                <CardTitle className="text-xl">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      activity.type === 'assessment' ? 'bg-primary/10' :
                      activity.type === 'document' ? 'bg-secondary/10' :
                      activity.type === 'study' ? 'bg-success/10' : 'bg-warning/10'
                    }`}>
                      {activity.type === 'assessment' && <Target className="w-4 h-4 text-primary" />}
                      {activity.type === 'document' && <BookOpen className="w-4 h-4 text-secondary" />}
                      {activity.type === 'study' && <Clock className="w-4 h-4 text-success" />}
                      {activity.type === 'achievement' && <Award className="w-4 h-4 text-warning" />}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.score || activity.action || activity.duration || activity.badge} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="learning-card">
              <CardHeader>
                <CardTitle className="text-xl">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-3">
                  <Upload className="w-4 h-4" />
                  Process New Document
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3">
                  <Target className="w-4 h-4" />
                  Take Practice Quiz
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3">
                  <Brain className="w-4 h-4" />
                  Chat with AI Tutor
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3">
                  <BookOpen className="w-4 h-4" />
                  Review Flashcards
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningDashboard;