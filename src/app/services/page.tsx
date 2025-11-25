"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users,
  FileText,
  Award,
  Search,
  CheckSquare,
  Zap,
  ArrowRight,
  Clock,
  Shield,
  CheckCircle,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const services = [
  {
    id: "talent-acquisition",
    icon: Users,
    title: "Talent Acquisition",
    description:
      "Expert recruitment services connecting employers with skilled professionals across Australia.",
    longDescription:
      "We bridge the gap between employers seeking skilled employees and talented job seekers. Our comprehensive talent acquisition service ensures perfect workforce matches through rigorous screening, skills assessment, and cultural fit evaluation.",
    features: [
      "Comprehensive candidate screening",
      "Skills and qualifications verification",
      "Cultural fit assessment",
      "Post-placement support",
      "Replacement guarantee",
    ],
    deliveryTime: "5-7 business days",
    fastTrack: true,
    color: "eucalyptus",
  },
  {
    id: "cv-preparation",
    icon: FileText,
    title: "CV Preparation",
    description:
      "Professional resume services highlighting your skills and achievements for maximum impact.",
    longDescription:
      "Our expert team creates compelling, ATS-optimized CVs that showcase your unique value proposition. We work closely with you to highlight your skills, experience, and achievements in a format that resonates with Australian employers.",
    features: [
      "Professional formatting and design",
      "ATS optimization",
      "Personalized consultation",
      "Unlimited revisions",
      "Cover letter included",
    ],
    deliveryTime: "3-5 business days",
    fastTrack: true,
    color: "ocean",
  },
  {
    id: "407-visa",
    icon: Award,
    title: "407 Visa Training Plan",
    description:
      "Specialized training plans for temporary entry occupational training in Australia (up to 2 years).",
    longDescription:
      "Comprehensive 407 visa training plans designed for employers sponsoring overseas workers for occupational training. Our plans meet all Department of Home Affairs requirements and demonstrate genuine training outcomes.",
    features: [
      "Compliant training structure",
      "Detailed workplace training components",
      "Skills assessment alignment",
      "Training milestones and outcomes",
      "Free amendments within 30 days",
    ],
    deliveryTime: "7 business days",
    fastTrack: true,
    color: "wattle",
  },
  {
    id: "lmt",
    icon: Search,
    title: "Labour Market Testing",
    description:
      "Ensuring compliance with Australian hiring requirements before sponsoring foreign workers.",
    longDescription:
      "Mandatory labour market testing to demonstrate genuine efforts to hire qualified Australian workers. We manage the entire process including job advertisements, documentation, and compliance reporting.",
    features: [
      "Compliant job advertisements",
      "Multi-platform posting",
      "Candidate response management",
      "Comprehensive documentation",
      "DIBP-ready reports",
    ],
    deliveryTime: "28 days minimum",
    fastTrack: false,
    color: "eucalyptus",
  },
  {
    id: "gnp",
    icon: CheckSquare,
    title: "Genuine Need of a Position",
    description:
      "Demonstrating the necessity of hiring foreign workers for specific business roles.",
    longDescription:
      "Detailed business justification reports that prove the genuine need for a position and why it cannot be filled by an Australian worker. Essential for visa sponsorship applications.",
    features: [
      "Business case development",
      "Position justification report",
      "Market analysis",
      "Skills shortage evidence",
      "Department-ready documentation",
    ],
    deliveryTime: "5-7 business days",
    fastTrack: true,
    color: "ocean",
  },
  {
    id: "fast-track",
    icon: Zap,
    title: "Fast Track Services",
    description:
      "Expedited processing in 3-5 business days for urgent recruitment and visa needs.",
    longDescription:
      "Priority service for time-sensitive matters. Our fast track option ensures your urgent recruitment or visa documentation needs are handled with speed and precision without compromising quality.",
    features: [
      "3-5 day turnaround",
      "Dedicated account manager",
      "Priority support",
      "Same-day communication",
      "Weekend availability",
    ],
    deliveryTime: "3-5 business days",
    fastTrack: true,
    color: "wattle",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-20 bg-gradient-to-br from-eucalyptus via-eucalyptus-dark to-ocean text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge variant="accent" className="mb-6">
              Comprehensive Solutions
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Expert recruitment and visa consultancy services tailored to your
              business needs. From talent acquisition to visa processing, we've
              got you covered.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="scroll-mt-24"
              >
                <Card className="overflow-hidden">
                  <div className="grid lg:grid-cols-2 gap-8">
                    <CardHeader className="lg:p-12">
                      <div className="inline-flex w-16 h-16 rounded-2xl bg-gradient-primary items-center justify-center mb-6">
                        <service.icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex items-center gap-3 mb-4">
                        <CardTitle className="text-3xl">{service.title}</CardTitle>
                        {service.fastTrack && (
                          <Badge variant="accent">
                            <Zap className="w-3 h-3 mr-1" />
                            Fast Track
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="text-lg leading-relaxed mb-6">
                        {service.longDescription}
                      </CardDescription>

                      <div className="flex items-center gap-4 mb-8">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{service.deliveryTime}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Shield className="h-4 w-4" />
                          <span>Guaranteed Quality</span>
                        </div>
                      </div>

                      <Button variant="gradient" size="lg" asChild>
                        <Link href="/contact">
                          Get Started
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                    </CardHeader>

                    <CardContent className="lg:p-12 bg-muted/30 flex items-center">
                      <div>
                        <h4 className="font-semibold text-lg mb-4">
                          What's Included:
                        </h4>
                        <ul className="space-y-3">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-eucalyptus mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 text-center"
          >
            <Card className="inline-block p-8 bg-gradient-primary text-white">
              <h3 className="text-2xl font-bold mb-4">
                Need a Custom Solution?
              </h3>
              <p className="text-white/90 mb-6 max-w-md">
                We offer tailored packages combining multiple services to meet
                your specific needs.
              </p>
              <Button variant="accent" size="lg" asChild>
                <Link href="/contact">Contact Us Today</Link>
              </Button>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
