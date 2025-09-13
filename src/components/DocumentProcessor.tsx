import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  FileText, 
  Brain, 
  CheckCircle, 
  Clock,
  Download,
  Eye,
  Sparkles
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DocumentProcessor = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processedDocs, setProcessedDocs] = useState([
    {
      id: 1,
      name: "Machine Learning Fundamentals.pdf",
      size: "2.4 MB",
      status: "completed",
      summary: "Comprehensive overview of ML algorithms, supervised and unsupervised learning techniques, with practical examples.",
      questionsGenerated: 15,
      processedAt: "2 hours ago"
    },
    {
      id: 2,
      name: "Data Structures & Algorithms.docx",
      size: "1.8 MB", 
      status: "completed",
      summary: "In-depth coverage of arrays, linked lists, trees, graphs, and sorting algorithms with complexity analysis.",
      questionsGenerated: 22,
      processedAt: "1 day ago"
    }
  ]);
  
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsProcessing(true);
    setUploadProgress(0);

    // Simulate upload and processing
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          toast({
            title: "Document Processed Successfully!",
            description: "AI analysis complete. Assessment questions generated.",
          });
          
          // Add new processed document
          const newDoc = {
            id: Date.now(),
            name: files[0].name,
            size: `${(files[0].size / (1024 * 1024)).toFixed(1)} MB`,
            status: "completed",
            summary: "AI-generated summary will appear here after processing completes.",
            questionsGenerated: Math.floor(Math.random() * 20) + 10,
            processedAt: "Just now"
          };
          setProcessedDocs(prev => [newDoc, ...prev]);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Document Processing Center</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Upload your study materials and let AI extract key concepts, generate summaries, and create personalized assessments.
        </p>
      </div>

      {/* Upload Area */}
      <Card className="learning-card">
        <CardContent className="p-8">
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Upload Learning Materials</h3>
              <p className="text-muted-foreground">
                Supports PDF, DOCX, PPT files up to 10MB each
              </p>
            </div>
            
            <div className="flex gap-4 justify-center">
              <label htmlFor="file-upload">
                <Button className="cursor-pointer">
                  Browse Files
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf,.docx,.ppt,.pptx"
                  multiple
                  onChange={handleFileUpload}
                />
              </label>
              <Button variant="outline">
                Import from URL
              </Button>
            </div>
            
            {isProcessing && (
              <div className="space-y-3 mt-6">
                <div className="flex items-center justify-center gap-2 text-primary">
                  <Brain className="w-5 h-5 animate-spin" />
                  Processing with AI...
                </div>
                <Progress value={uploadProgress} className="max-w-xs mx-auto" />
                <p className="text-sm text-muted-foreground">
                  {uploadProgress < 30 ? "Extracting text..." :
                   uploadProgress < 60 ? "Generating summary..." :
                   uploadProgress < 90 ? "Creating questions..." : "Finalizing..."}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Processed Documents */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Processed Documents</h2>
          <Badge variant="secondary" className="gap-1">
            <FileText className="w-3 h-3" />
            {processedDocs.length} documents
          </Badge>
        </div>

        <div className="grid gap-6">
          {processedDocs.map((doc) => (
            <Card key={doc.id} className="learning-card hover-lift">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{doc.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{doc.size} • {doc.processedAt}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="gap-1 text-success">
                      <CheckCircle className="w-3 h-3" />
                      Completed
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* AI Summary */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-secondary" />
                    <h4 className="font-semibold">AI-Generated Summary</h4>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{doc.summary}</p>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{doc.questionsGenerated}</div>
                    <div className="text-sm text-muted-foreground">Questions</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-secondary">3</div>
                    <div className="text-sm text-muted-foreground">Key Topics</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-success">8</div>
                    <div className="text-sm text-muted-foreground">Flashcards</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-warning">15min</div>
                    <div className="text-sm text-muted-foreground">Read Time</div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  <Button size="sm" className="gap-2">
                    <Eye className="w-4 h-4" />
                    View Content
                  </Button>
                  <Button size="sm" variant="outline" className="gap-2">
                    <Brain className="w-4 h-4" />
                    Start Quiz
                  </Button>
                  <Button size="sm" variant="outline" className="gap-2">
                    <Download className="w-4 h-4" />
                    Export PDF
                  </Button>
                  <Button size="sm" variant="outline" className="gap-2">
                    <Sparkles className="w-4 h-4" />
                    Study Plan
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Processing Stats */}
      <Card className="learning-card">
        <CardHeader>
          <CardTitle>Processing Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold">247</div>
              <div className="text-sm text-muted-foreground">Documents Processed</div>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <Brain className="w-6 h-6 text-secondary" />
              </div>
              <div className="text-2xl font-bold">3,421</div>
              <div className="text-sm text-muted-foreground">Questions Generated</div>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6 text-success" />
              </div>
              <div className="text-2xl font-bold">2.3s</div>
              <div className="text-sm text-muted-foreground">Avg Processing Time</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentProcessor;