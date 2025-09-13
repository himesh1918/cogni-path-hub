import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import LearningHero from "@/components/LearningHero";
import LearningDashboard from "@/components/LearningDashboard";
import DocumentProcessor from "@/components/DocumentProcessor";
import CodeLearningPlatform from "@/components/CodeLearningPlatform";
import { Home, BookOpen, Upload, BarChart3, Settings, User, Code } from "lucide-react";

const Index = () => {
  const [currentView, setCurrentView] = useState<"hero" | "dashboard" | "processor" | "analytics" | "code">("hero");

  const navigation = [
    { id: "hero", label: "Home", icon: Home },
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "processor", label: "Documents", icon: Upload },
    { id: "code", label: "Code Lab", icon: Code },
    { id: "analytics", label: "Analytics", icon: BookOpen },
  ];

  const renderCurrentView = () => {
    switch (currentView) {
      case "hero":
        return <LearningHero />;
      case "dashboard":
        return <LearningDashboard />;
      case "processor":
        return <DocumentProcessor />;
      case "code":
        return <CodeLearningPlatform />;
      case "analytics":
        return (
          <div className="min-h-screen bg-background p-6 flex items-center justify-center">
            <Card className="p-8 text-center space-y-4 learning-card">
              <BookOpen className="w-16 h-16 text-primary mx-auto" />
              <h2 className="text-2xl font-bold">Analytics Coming Soon</h2>
              <p className="text-muted-foreground">Advanced learning analytics and performance insights will be available here.</p>
            </Card>
          </div>
        );
      default:
        return <LearningHero />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      {currentView !== "hero" && (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-lg">LearnAI</span>
              </div>
              
              <div className="flex items-center gap-6">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setCurrentView(item.id as any)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                        currentView === item.id 
                          ? "bg-primary text-primary-foreground" 
                          : "hover:bg-muted"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  );
                })}
              </div>
              
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <User className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </nav>
      )}
      
      {/* Main Content */}
      <main className={currentView !== "hero" ? "pt-20" : ""}>
        {renderCurrentView()}
      </main>
      
      {/* Demo Navigation (only show on hero) */}
      {currentView === "hero" && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <Card className="p-4 glass-effect">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-white">Try the demo:</span>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => setCurrentView("dashboard")} className="bg-white text-primary hover:bg-white/90">
                  Dashboard
                </Button>
                <Button size="sm" variant="outline" onClick={() => setCurrentView("code")} className="border-white/20 text-white hover:bg-white/10">
                  Code Lab
                </Button>
                <Button size="sm" variant="outline" onClick={() => setCurrentView("processor")} className="border-white/20 text-white hover:bg-white/10">
                  Documents
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Index;
