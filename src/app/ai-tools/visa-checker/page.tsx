"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useSessionId } from "@/hooks/use-session-id";

interface Question {
  id: string;
  question: string;
  options: { value: string; label: string }[];
}

const questions: Question[] = [
  {
    id: "age",
    question: "What is your age?",
    options: [
      { value: "under_18", label: "Under 18" },
      { value: "18_29", label: "18-29" },
      { value: "30_39", label: "30-39" },
      { value: "40_49", label: "40-49" },
      { value: "50_plus", label: "50 or above" },
    ],
  },
  {
    id: "occupation",
    question: "What is your occupation?",
    options: [
      { value: "healthcare", label: "Healthcare Professional" },
      { value: "it", label: "IT/Technology" },
      { value: "engineering", label: "Engineering" },
      { value: "trades", label: "Skilled Trades" },
      { value: "business", label: "Business/Management" },
      { value: "education", label: "Education" },
      { value: "other", label: "Other" },
    ],
  },
  {
    id: "qualification",
    question: "What is your highest qualification?",
    options: [
      { value: "phd", label: "PhD/Doctorate" },
      { value: "masters", label: "Master's Degree" },
      { value: "bachelor", label: "Bachelor's Degree" },
      { value: "diploma", label: "Diploma/Certificate" },
      { value: "none", label: "No formal qualification" },
    ],
  },
  {
    id: "experience",
    question: "Years of work experience in your field?",
    options: [
      { value: "less_1", label: "Less than 1 year" },
      { value: "1_3", label: "1-3 years" },
      { value: "3_5", label: "3-5 years" },
      { value: "5_8", label: "5-8 years" },
      { value: "8_plus", label: "8+ years" },
    ],
  },
  {
    id: "english",
    question: "What is your English proficiency level?",
    options: [
      { value: "native", label: "Native/Fluent" },
      { value: "advanced", label: "Advanced" },
      { value: "intermediate", label: "Intermediate" },
      { value: "basic", label: "Basic" },
      { value: "none", label: "No English" },
    ],
  },
  {
    id: "sponsor",
    question: "Do you have an Australian sponsor or job offer?",
    options: [
      { value: "yes_sponsor", label: "Yes, I have a sponsor" },
      { value: "yes_offer", label: "Yes, I have a job offer" },
      { value: "no", label: "No" },
    ],
  },
  {
    id: "funds",
    question: "Do you have sufficient funds (min AUD $15,000)?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
      { value: "unsure", label: "Not sure" },
    ],
  },
  {
    id: "health",
    question: "Are you in good health with no medical conditions?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
      { value: "minor", label: "Minor conditions only" },
    ],
  },
];

interface AssessmentResult {
  eligibility_score: number;
  recommended_visas: Array<{
    name: string;
    code: string;
    likelihood: string;
    description: string;
  }>;
  next_steps: string[];
}

export default function VisaCheckerPage() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [result, setResult] = React.useState<AssessmentResult | null>(null);
  const sessionId = useSessionId();

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [questions[currentStep].id]: value });
    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitAssessment = async () => {
    if (Object.keys(answers).length !== questions.length) {
      toast.error("Please answer all questions");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/check-visa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, sessionId }),
      });

      if (!response.ok) throw new Error("Assessment failed");

      const data = await response.json();
      setResult(data);
      toast.success("Assessment complete!");
    } catch (error) {
      console.error("Assessment error:", error);
      toast.error("Failed to process assessment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
  };

  const progress = ((currentStep + 1) / questions.length) * 100;
  const currentQuestion = questions[currentStep];
  const isLastQuestion = currentStep === questions.length - 1;

  return (
    <div className="min-h-screen">
      <section className="relative py-20 bg-gradient-to-br from-ocean via-ocean-dark to-eucalyptus text-white overflow-hidden">
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
                <Sparkles className="w-4 h-4 mr-2" />
                8 Quick Questions
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Visa Eligibility Checker
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Answer 8 simple questions to discover your Australian visa eligibility
                with AI-powered recommendations.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key="quiz"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Question {currentStep + 1} of {questions.length}
                    </span>
                    <span className="text-sm font-medium text-eucalyptus">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="text-2xl">{currentQuestion.question}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {currentQuestion.options.map((option) => (
                      <motion.button
                        key={option.value}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnswer(option.value)}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                          answers[currentQuestion.id] === option.value
                            ? "border-eucalyptus bg-eucalyptus/5"
                            : "border-border hover:border-eucalyptus/50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{option.label}</span>
                          {answers[currentQuestion.id] === option.value && (
                            <CheckCircle className="h-5 w-5 text-eucalyptus" />
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </CardContent>
                </Card>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={goBack}
                    disabled={currentStep === 0}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  {isLastQuestion && answers[currentQuestion.id] && (
                    <Button
                      variant="gradient"
                      onClick={submitAssessment}
                      disabled={isSubmitting}
                      loading={isSubmitting}
                      className="flex-1"
                    >
                      {isSubmitting ? "Processing..." : "Get Results"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
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
                <Card className="bg-gradient-to-br from-ocean via-ocean-dark to-eucalyptus text-white">
                  <CardContent className="pt-8 pb-8 text-center">
                    <Badge variant="accent" className="mb-4">
                      Your Eligibility Score
                    </Badge>
                    <div className="text-7xl font-bold mb-2">
                      {result.eligibility_score}
                      <span className="text-4xl">/100</span>
                    </div>
                    <p className="text-xl text-white/90">
                      {result.eligibility_score >= 70
                        ? "Strong Eligibility"
                        : result.eligibility_score >= 50
                        ? "Moderate Eligibility"
                        : "Limited Eligibility"}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recommended Visa Options</CardTitle>
                    <CardDescription>
                      Based on your responses, here are the visa types you may be eligible for
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {result.recommended_visas.map((visa, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl border-2 border-border hover:border-eucalyptus/50 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-lg">{visa.name}</h4>
                            <p className="text-sm text-muted-foreground">{visa.code}</p>
                          </div>
                          <Badge
                            variant={
                              visa.likelihood === "High"
                                ? "default"
                                : visa.likelihood === "Moderate"
                                ? "accent"
                                : "outline"
                            }
                          >
                            {visa.likelihood} Likelihood
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{visa.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Next Steps</CardTitle>
                    <CardDescription>
                      Follow these recommendations to improve your chances
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {result.next_steps.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-eucalyptus mt-0.5 flex-shrink-0" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <div className="flex gap-4 justify-center">
                  <Button variant="gradient" size="lg" onClick={reset}>
                    Take Assessment Again
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/contact">Get Expert Consultation</Link>
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
