"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MultiStepForm } from "@/components/contact/multi-step-form";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    value: "info@genuinesolutions.com.au",
    href: "mailto:info@genuinesolutions.com.au",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+61 2 8317 3775",
    href: "tel:+61283173775",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    value: "Sydney, Australia",
    href: "https://maps.google.com",
  },
  {
    icon: Clock,
    title: "Business Hours",
    value: "Mon-Fri: 9 AM - 5 PM AEST",
    href: null,
  },
];

export default function ContactPage() {
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
              Get In Touch
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Ready to get started? Fill out the form below and we'll get back to
              you within 24 hours. For urgent matters, please call us directly.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {info.href ? (
                  <a
                    href={info.href}
                    target={info.href.startsWith("http") ? "_blank" : undefined}
                    rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="block p-6 rounded-2xl bg-muted/50 hover:bg-muted transition-colors duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <info.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                    <p className="text-muted-foreground">{info.value}</p>
                  </a>
                ) : (
                  <div className="p-6 rounded-2xl bg-muted/50">
                    <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
                      <info.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                    <p className="text-muted-foreground">{info.value}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <MultiStepForm />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-2 bg-wattle/10 border border-wattle/20 rounded-full px-6 py-3">
              <Clock className="h-5 w-5 text-wattle" />
              <span className="text-sm font-medium">
                Need urgent assistance? We offer{" "}
                <span className="text-wattle font-bold">3-5 day fast track</span>{" "}
                services
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
