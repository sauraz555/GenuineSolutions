"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-primary" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center text-white"
        >
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
            <Zap className="h-4 w-4" />
            <span className="text-sm font-semibold">Fast Track Available</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Build Your Dream Team?
          </h2>

          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Get expert recruitment and visa services with guaranteed results.
            Start your journey today with a free consultation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="accent"
              size="xl"
              className="shadow-2xl hover:shadow-3xl"
              asChild
            >
              <Link href="/contact">
                Get Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-eucalyptus backdrop-blur-sm"
              asChild
            >
              <Link href="/ai-tools">Try AI Tools</Link>
            </Button>
          </div>

          <div className="mt-12 pt-12 border-t border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">100%</div>
                <div className="text-white/80">Satisfaction Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-white/80">Support Available</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">3-5 Days</div>
                <div className="text-white/80">Fast Track Delivery</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-wattle/20 rounded-full blur-3xl" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-ocean/20 rounded-full blur-3xl" />
    </section>
  );
}
