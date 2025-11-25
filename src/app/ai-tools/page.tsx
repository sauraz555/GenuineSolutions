"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FileText, CheckCircle, MessageSquare, ArrowRight, Sparkles, Zap } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const aiTools = [
  {
    id: "cv-analyzer",
    icon: FileText,
    title: "AI CV Analyzer",
    description: "Upload your resume and get instant AI-powered feedback with a professional score and detailed improvement suggestions.",
    features: [
      "Instant AI-powered analysis",
      "Professional scoring (0-100)",
      "Detailed improvement suggestions",
      "ATS optimization tips",
      "Industry-specific feedback",
    ],
    href: "/ai-tools/cv-analyzer",
    color: "eucalyptus",
    badge: "Most Popular",
  },
  {
    id: "visa-checker",
    icon: CheckCircle,
    title: "Visa Eligibility Checker",
    description: "Answer 8 simple questions to discover your Australian visa eligibility with AI-powered recommendations.",
    features: [
      "8-question assessment",
      "AI-powered eligibility analysis",
      "Visa type recommendations",
      "Next steps guidance",
      "Personalized action plan",
    ],
    href: "/ai-tools/visa-checker",
    color: "ocean",
    badge: "Quick Result",
  },
  {
    id: "chat-assistant",
    icon: MessageSquare,
    title: "AI Chat Assistant",
    description: "Get instant answers about Australian visas, recruitment, and migration services from our AI-powered assistant.",
    features: [
      "24/7 instant responses",
      "Visa & recruitment expertise",
      "Natural conversation",
      "Document guidance",
      "Expert knowledge base",
    ],
    href: "/ai-tools/chat",
    color: "wattle",
    badge: "New",
  },
];

export default function AIToolsPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-20 bg-gradient-to-br from-eucalyptus via-eucalyptus-dark to-ocean text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-wattle/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 -left-40 w-96 h-96 bg-ocean/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge variant="accent" className="mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Tools
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Smart AI Tools for Your Success
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Leverage cutting-edge artificial intelligence to analyze your CV,
              check visa eligibility, and get instant answers to your questions.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Choose Your <span className="text-gradient">AI Tool</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Free, instant, and powered by advanced AI technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {aiTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={tool.href}>
                  <Card className="h-full group cursor-pointer hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                    {tool.badge && (
                      <div className="absolute top-4 right-4">
                        <Badge variant="accent" className="text-xs">
                          {tool.badge}
                        </Badge>
                      </div>
                    )}

                    <CardHeader className="pb-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <tool.icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl group-hover:text-eucalyptus transition-colors mb-3">
                        {tool.title}
                      </CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        {tool.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <ul className="space-y-2">
                        {tool.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Zap className="h-4 w-4 text-wattle mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button variant="gradient" className="w-full group-hover:scale-105 transition-transform">
                        Try It Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>

                    <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10" />
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Card className="inline-block p-8 bg-muted/50 border-2 border-eucalyptus/20">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Sparkles className="h-6 w-6 text-eucalyptus" />
                <h3 className="text-2xl font-bold">100% Free to Use</h3>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md">
                All our AI tools are completely free. No credit card required,
                no hidden fees. Just powerful AI at your fingertips.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Badge variant="default">No Sign-up Required</Badge>
                <Badge variant="secondary">Instant Results</Badge>
                <Badge variant="accent">AI-Powered</Badge>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-muted/30 to-muted/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-6">
              Need Professional Help?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              While our AI tools provide instant insights, our expert team can
              deliver personalized, comprehensive solutions tailored to your needs.
            </p>
            <Button variant="gradient" size="lg" asChild>
              <Link href="/contact">
                Contact Our Experts
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
