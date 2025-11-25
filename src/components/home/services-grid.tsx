"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Users, FileText, Award, Search, CheckSquare, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Users,
    title: "Talent Acquisition",
    description:
      "Bridging the gap between employers and skilled job seekers for perfect workforce matches.",
    href: "/services#talent-acquisition",
    color: "text-eucalyptus",
  },
  {
    icon: FileText,
    title: "CV Preparation",
    description:
      "Professional resume services highlighting your skills and achievements for career success.",
    href: "/services#cv-preparation",
    color: "text-ocean",
  },
  {
    icon: Award,
    title: "407 Visa Training Plan",
    description:
      "Specialized training plans for temporary entry occupational training in Australia.",
    href: "/services#407-visa",
    color: "text-wattle",
  },
  {
    icon: Search,
    title: "Labour Market Testing",
    description:
      "Ensuring compliance with Australian hiring requirements before sponsoring foreign workers.",
    href: "/services#lmt",
    color: "text-eucalyptus",
  },
  {
    icon: CheckSquare,
    title: "Genuine Need Position",
    description:
      "Demonstrating the necessity of hiring foreign workers for specific business roles.",
    href: "/services#gnp",
    color: "text-ocean",
  },
  {
    icon: Award,
    title: "Fast Track Services",
    description:
      "Expedited processing in 3-5 business days for urgent recruitment and visa needs.",
    href: "/services#fast-track",
    color: "text-wattle",
  },
];

export function ServicesGrid() {
  return (
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Comprehensive <span className="text-gradient">Solutions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From recruitment to visa processing, we provide end-to-end services
            tailored to your business needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={service.href}>
                <Card className="h-full group cursor-pointer hover:shadow-2xl transition-all duration-300">
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="group-hover:text-eucalyptus transition-colors">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-eucalyptus font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Button variant="gradient" size="lg" asChild>
            <Link href="/services">
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
