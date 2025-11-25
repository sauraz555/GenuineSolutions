"use client";

import { motion } from "framer-motion";
import { CheckCircle, Users, Target, Award, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const stats = [
  { number: "100+", label: "Trusted Clients" },
  { number: "50+", label: "Migrants Placed" },
  { number: "5+", label: "Years Experience" },
  { number: "100%", label: "Satisfaction Rate" },
];

const values = [
  {
    icon: CheckCircle,
    title: "Expert Knowledge",
    description: "Specialized in recruitment and Australian migration law with real-world experience.",
  },
  {
    icon: Users,
    title: "Customized Services",
    description: "Tailored solutions that meet your specific business and workforce needs.",
  },
  {
    icon: Target,
    title: "Integrity & Transparency",
    description: "Honest processes with no hidden fees. What you see is what you get.",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description: "Maximum 7 business days standard, with 3-5 day fast track available.",
  },
];

const team = [
  {
    name: "Migration Law Specialists",
    role: "University Graduates in Migration Law",
    description: "Expert knowledge in Australian immigration regulations and compliance.",
  },
  {
    name: "Legal Professionals",
    role: "Bachelor of Laws",
    description: "Strong legal foundation ensuring all documentation meets requirements.",
  },
  {
    name: "Industry Veterans",
    role: "5+ Years Combined Experience",
    description: "Real-world experience across IT, Healthcare, and Construction sectors.",
  },
  {
    name: "Native English Writers",
    role: "Full-Time Content Team",
    description: "Professional documentation that meets Australian business standards.",
  },
];

export default function AboutPage() {
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
              About Us
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Your Trusted Partner in Recruitment & Visa Services
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Established in 2024, we've quickly become Australia's go-to partner
              for recruitment and visa consultancy services.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-gradient mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-20"
          >
            <h2 className="text-4xl font-bold mb-6">
              Our <span className="text-gradient">Mission</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              To simplify workforce management and recruitment by providing expert,
              efficient services that connect talent with opportunity while ensuring
              full compliance with Australian migration law.
            </p>
          </motion.div>

          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-4">
                Our <span className="text-gradient">Values</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
                        <value.icon className="h-7 w-7 text-white" />
                      </div>
                      <CardTitle className="text-2xl mb-2">{value.title}</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        {value.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Our <span className="text-gradient">Team</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Expert professionals dedicated to your success
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center mb-4">
                        <Award className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl mb-1">{member.name}</CardTitle>
                      <div className="text-sm text-eucalyptus font-semibold mb-3">
                        {member.role}
                      </div>
                      <CardDescription className="leading-relaxed">
                        {member.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
