"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight, ArrowLeft, CheckCircle, User, Briefcase, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  company: z.string().optional(),
  serviceType: z.string().min(1, "Please select a service"),
  message: z.string().min(20, "Message must be at least 20 characters"),
  consent: z.boolean().refine((val) => val === true, "You must agree to continue"),
});

type FormData = z.infer<typeof formSchema>;

const serviceOptions = [
  "Talent Acquisition",
  "CV Preparation",
  "407 Visa Training Plan",
  "Labour Market Testing",
  "Genuine Need of Position",
  "Fast Track Services",
  "Other",
];

const steps = [
  { id: 1, name: "Personal Info", icon: User },
  { id: 2, name: "Service Details", icon: Briefcase },
  { id: 3, name: "Your Message", icon: MessageSquare },
];

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];

    if (currentStep === 1) {
      fieldsToValidate = ["fullName", "email", "phone"];
    } else if (currentStep === 2) {
      fieldsToValidate = ["serviceType", "company"];
    }

    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Form Data:", data);

      toast.success("Thank you! We'll contact you within 24 hours.", {
        duration: 5000,
      });

      setCurrentStep(1);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto p-8">
      <div className="mb-10">
        <div className="flex justify-between items-center mb-8">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center flex-1">
                <motion.div
                  initial={false}
                  animate={{
                    backgroundColor:
                      currentStep >= step.id
                        ? "hsl(145, 50%, 36%)"
                        : "hsl(214, 32%, 91%)",
                    scale: currentStep === step.id ? 1.1 : 1,
                  }}
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors"
                >
                  <step.icon
                    className={`h-6 w-6 ${
                      currentStep >= step.id ? "text-white" : "text-muted-foreground"
                    }`}
                  />
                </motion.div>
                <span
                  className={`text-xs font-medium ${
                    currentStep >= step.id ? "text-eucalyptus" : "text-muted-foreground"
                  }`}
                >
                  {step.name}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 h-0.5 bg-border mx-2 mt-[-30px]">
                  <motion.div
                    initial={false}
                    animate={{
                      width: currentStep > step.id ? "100%" : "0%",
                    }}
                    className="h-full bg-eucalyptus"
                    transition={{ duration: 0.3 }}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name <span className="text-terracotta">*</span>
                </label>
                <Input
                  {...register("fullName")}
                  placeholder="John Smith"
                  error={errors.fullName?.message}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address <span className="text-terracotta">*</span>
                </label>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="john@example.com"
                  error={errors.email?.message}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Phone Number <span className="text-terracotta">*</span>
                </label>
                <Input
                  {...register("phone")}
                  type="tel"
                  placeholder="+61 4XX XXX XXX"
                  error={errors.phone?.message}
                />
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium mb-2">
                  Service Needed <span className="text-terracotta">*</span>
                </label>
                <select
                  {...register("serviceType")}
                  className="flex h-12 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent hover:border-eucalyptus/50"
                >
                  <option value="">Select a service...</option>
                  {serviceOptions.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
                {errors.serviceType && (
                  <p className="mt-1.5 text-xs text-terracotta font-medium">
                    {errors.serviceType.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Company Name (Optional)
                </label>
                <Input {...register("company")} placeholder="Your Company Pty Ltd" />
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Message <span className="text-terracotta">*</span>
                </label>
                <Textarea
                  {...register("message")}
                  placeholder="Tell us about your requirements..."
                  className="min-h-[150px]"
                  error={errors.message?.message}
                />
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  {...register("consent")}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-eucalyptus focus:ring-eucalyptus"
                />
                <label className="text-sm text-muted-foreground">
                  I agree to be contacted by Genuine Solutions regarding my inquiry
                  and consent to the processing of my personal data.{" "}
                  <span className="text-terracotta">*</span>
                </label>
              </div>
              {errors.consent && (
                <p className="text-xs text-terracotta font-medium">
                  {errors.consent.message}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between mt-8">
          {currentStep > 1 ? (
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              size="lg"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Previous
            </Button>
          ) : (
            <div />
          )}

          {currentStep < steps.length ? (
            <Button type="button" variant="gradient" onClick={nextStep} size="lg">
              Next
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          ) : (
            <Button
              type="submit"
              variant="gradient"
              disabled={isSubmitting}
              loading={isSubmitting}
              size="lg"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
              {!isSubmitting && <CheckCircle className="ml-2 h-5 w-5" />}
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}
