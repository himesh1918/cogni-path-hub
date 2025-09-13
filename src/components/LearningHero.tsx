import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Brain, ChartBar, Users } from "lucide-react";
import heroImage from "@/assets/hero-learning.jpg";

const LearningHero = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description: "Personalized study paths adapted to your learning style"
    },
    {
      icon: BookOpen,
      title: "Smart Content",
      description: "Auto-generate assessments from any document"
    },
    {
      icon: ChartBar,
      title: "Progress Analytics",
      description: "Track learning with detailed performance insights"
    },
    {
      icon: Users,
      title: "Collaborative Tools",
      description: "Study groups and peer learning features"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-glow"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-glow"></div>
      
      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Brain className="w-4 h-4" />
                AI-Powered Education Platform
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                Learn Smarter with
                <span className="bg-gradient-to-r from-secondary to-secondary-glow bg-clip-text text-transparent">
                  {" "}AI Guidance
                </span>
              </h1>
              
              <p className="text-xl text-white/80 leading-relaxed max-w-lg">
                Transform your learning experience with AI-powered assessments, personalized study plans, and intelligent progress tracking.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold px-8">
                Start Learning Free
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Watch Demo
              </Button>
            </div>
            
            <div className="flex items-center gap-8 text-white/60">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50K+</div>
                <div className="text-sm">Active Learners</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">95%</div>
                <div className="text-sm">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">4.9/5</div>
                <div className="text-sm">User Rating</div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Hero Image */}
          <div className="relative animate-scale-in">
            <div className="relative rounded-2xl overflow-hidden learning-shadow">
              <img 
                src={heroImage} 
                alt="AI Learning Platform Interface" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            
            {/* Floating Cards */}
            <Card className="absolute -top-4 -left-4 p-4 glass-effect animate-bounce-in">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
                  <ChartBar className="w-5 h-5 text-success-foreground" />
                </div>
                <div>
                  <div className="font-semibold">Progress: 85%</div>
                  <div className="text-sm text-muted-foreground">This Week</div>
                </div>
              </div>
            </Card>
            
            <Card className="absolute -bottom-4 -right-4 p-4 glass-effect animate-bounce-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-secondary-foreground" />
                </div>
                <div>
                  <div className="font-semibold">AI Tutor Active</div>
                  <div className="text-sm text-muted-foreground">Ready to Help</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        
        {/* Features Grid */}
        <div className="mt-24 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="p-6 learning-card hover-lift cursor-pointer animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningHero;