"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, CheckCircle, AlertCircle, Loader2, Download, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useSessionId } from "@/hooks/use-session-id";

interface AnalysisResult {
  overall_score: number;
  ats_score: number;
  keyword_score: number;
  format_score: number;
  feedback: {
    strengths: string[];
    improvements: string[];
    ats_tips: string[];
  };
}

export default function CVAnalyzerPage() {
  const [file, setFile] = React.useState<File | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [analysis, setAnalysis] = React.useState<AnalysisResult | null>(null);
  const sessionId = useSessionId();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && isValidFile(droppedFile)) {
      setFile(droppedFile);
    } else {
      toast.error("Please upload a PDF or Word document (max 5MB)");
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && isValidFile(selectedFile)) {
      setFile(selectedFile);
    } else {
      toast.error("Please upload a PDF or Word document (max 5MB)");
    }
  };

  const isValidFile = (file: File): boolean => {
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const maxSize = 5 * 1024 * 1024;

    return validTypes.includes(file.type) && file.size <= maxSize;
  };

  const analyzeCV = async () => {
    if (!file || !sessionId) return;

    setIsAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("sessionId", sessionId);

      const response = await fetch("/api/analyze-cv", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Analysis failed");
      }

      const result = await response.json();
      setAnalysis(result);
      toast.success("Analysis complete!");
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error("Failed to analyze CV. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setFile(null);
    setAnalysis(null);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-eucalyptus";
    if (score >= 60) return "text-wattle";
    return "text-terracotta";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Work";
  };

  return (
    <div className="min-h-screen">
      <section className="relative py-20 bg-gradient-to-br from-eucalyptus via-eucalyptus-dark to-ocean text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/ai-tools"
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to AI Tools
            </Link>
            <div className="max-w-3xl">
              <Badge variant="accent" className="mb-6">
                <FileText className="w-4 h-4 mr-2" />
                AI-Powered Analysis
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                CV Analyzer
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Upload your CV and get instant AI-powered feedback with a professional
                score and detailed improvement suggestions.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <AnimatePresence mode="wait">
            {!analysis ? (
              <motion.div
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Card className="mb-8">
                  <CardContent className="pt-6">
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                        isDragging
                          ? "border-eucalyptus bg-eucalyptus/5"
                          : "border-border hover:border-eucalyptus/50"
                      }`}
                    >
                      <input
                        type="file"
                        id="cv-upload"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileSelect}
                        disabled={isAnalyzing}
                      />

                      {!file ? (
                        <>
                          <Upload className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                          <h3 className="text-xl font-semibold mb-2">
                            Drop your CV here
                          </h3>
                          <p className="text-muted-foreground mb-6">
                            or click to browse (PDF, DOC, DOCX - max 5MB)
                          </p>
                          <Button
                            variant="gradient"
                            onClick={() => document.getElementById("cv-upload")?.click()}
                          >
                            Select File
                          </Button>
                        </>
                      ) : (
                        <>
                          <FileText className="h-16 w-16 mx-auto mb-4 text-eucalyptus" />
                          <h3 className="text-xl font-semibold mb-2">{file.name}</h3>
                          <p className="text-muted-foreground mb-6">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                          <div className="flex gap-4 justify-center">
                            <Button
                              variant="gradient"
                              onClick={analyzeCV}
                              disabled={isAnalyzing}
                              loading={isAnalyzing}
                            >
                              {isAnalyzing ? "Analyzing..." : "Analyze CV"}
                            </Button>
                            <Button
                              variant="outline"
                              onClick={reset}
                              disabled={isAnalyzing}
                            >
                              Change File
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CheckCircle className="h-8 w-8 text-eucalyptus mb-2" />
                      <CardTitle className="text-lg">Instant Results</CardTitle>
                      <CardDescription>
                        Get your CV score and feedback in seconds
                      </CardDescription>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader>
                      <FileText className="h-8 w-8 text-ocean mb-2" />
                      <CardTitle className="text-lg">ATS Optimized</CardTitle>
                      <CardDescription>
                        Ensure your CV passes applicant tracking systems
                      </CardDescription>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader>
                      <AlertCircle className="h-8 w-8 text-wattle mb-2" />
                      <CardTitle className="text-lg">Expert Tips</CardTitle>
                      <CardDescription>
                        Get actionable suggestions to improve your CV
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <Card className="bg-gradient-to-br from-eucalyptus via-eucalyptus-dark to-ocean text-white">
                  <CardContent className="pt-8 pb-8 text-center">
                    <div className="mb-4">
                      <Badge variant="accent" className="mb-4">
                        {getScoreBadge(analysis.overall_score)}
                      </Badge>
                    </div>
                    <div className="text-7xl font-bold mb-2">
                      {analysis.overall_score}
                      <span className="text-4xl">/100</span>
                    </div>
                    <p className="text-xl text-white/90">Overall CV Score</p>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className={`text-4xl font-bold mb-2 ${getScoreColor(analysis.ats_score)}`}>
                        {analysis.ats_score}
                      </div>
                      <p className="text-sm text-muted-foreground">ATS Score</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className={`text-4xl font-bold mb-2 ${getScoreColor(analysis.keyword_score)}`}>
                        {analysis.keyword_score}
                      </div>
                      <p className="text-sm text-muted-foreground">Keyword Optimization</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className={`text-4xl font-bold mb-2 ${getScoreColor(analysis.format_score)}`}>
                        {analysis.format_score}
                      </div>
                      <p className="text-sm text-muted-foreground">Format & Structure</p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-eucalyptus">
                      <CheckCircle className="h-6 w-6" />
                      Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.feedback.strengths.map((strength, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-eucalyptus mt-0.5 flex-shrink-0" />
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-wattle">
                      <AlertCircle className="h-6 w-6" />
                      Areas for Improvement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.feedback.improvements.map((improvement, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-wattle mt-0.5 flex-shrink-0" />
                          <span>{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-ocean">
                      <FileText className="h-6 w-6" />
                      ATS Optimization Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.feedback.ats_tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <FileText className="h-5 w-5 text-ocean mt-0.5 flex-shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <div className="flex gap-4 justify-center">
                  <Button variant="gradient" size="lg" onClick={reset}>
                    Analyze Another CV
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/contact">Get Professional Help</Link>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
