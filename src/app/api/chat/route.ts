import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const knowledgeBase = {
  visas: {
    "189": "Skilled Independent Visa (Subclass 189) is a points-based permanent residency visa for skilled workers who are not sponsored by an employer, state, or family member.",
    "186": "Employer Nomination Scheme (Subclass 186) allows Australian employers to sponsor skilled workers for permanent residency.",
    "482": "Temporary Skill Shortage Visa (Subclass 482) is for skilled workers sponsored by an approved Australian employer for temporary work.",
    "407": "Training Visa (Subclass 407) allows people to participate in workplace-based occupational training to improve skills for their job.",
  },
  services: {
    talent: "We provide comprehensive talent acquisition services, connecting employers with skilled professionals. Our process includes candidate screening, skills assessment, and cultural fit evaluation.",
    cv: "Our CV preparation service typically takes 3-5 business days. We offer professional formatting, ATS optimization, and unlimited revisions. Fast track service available in 3 days.",
    lmt: "Labour Market Testing (LMT) is a process to demonstrate that no suitable Australian workers are available before sponsoring foreign workers. It requires advertising the position for at least 28 days.",
    gnp: "Genuine Need of Position involves demonstrating why your business requires a particular role and why it cannot be filled by an Australian worker. This is essential for visa sponsorship.",
  },
};

function generateResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes("189") || lowerMessage.includes("skilled independent")) {
    return knowledgeBase.visas["189"];
  }

  if (lowerMessage.includes("186") || lowerMessage.includes("employer nomination")) {
    return knowledgeBase.visas["186"];
  }

  if (lowerMessage.includes("482") || lowerMessage.includes("tss") || lowerMessage.includes("temporary skill")) {
    return knowledgeBase.visas["482"];
  }

  if (lowerMessage.includes("407") || lowerMessage.includes("training visa")) {
    return knowledgeBase.visas["407"];
  }

  if (lowerMessage.includes("talent") || lowerMessage.includes("recruitment") || lowerMessage.includes("hiring")) {
    return knowledgeBase.services.talent;
  }

  if (lowerMessage.includes("cv") || lowerMessage.includes("resume") || lowerMessage.includes("curriculum vitae")) {
    return knowledgeBase.services.cv;
  }

  if (lowerMessage.includes("labour market") || lowerMessage.includes("lmt")) {
    return knowledgeBase.services.lmt;
  }

  if (lowerMessage.includes("genuine need") || lowerMessage.includes("gnp")) {
    return knowledgeBase.services.gnp;
  }

  if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("fee")) {
    return "Our pricing varies depending on the service and complexity. For detailed pricing information, please contact us through our contact page or call +61 2 8317 3775. We offer competitive rates and fast track options.";
  }

  if (lowerMessage.includes("fast track") || lowerMessage.includes("urgent") || lowerMessage.includes("quick")) {
    return "Yes! We offer fast track services with 3-5 business day turnaround for most services including CV preparation, 407 visa training plans, and Genuine Need assessments. Contact us to discuss your urgent requirements.";
  }

  if (lowerMessage.includes("contact") || lowerMessage.includes("phone") || lowerMessage.includes("email")) {
    return "You can reach us at:\n\nEmail: info@genuinesolutions.com.au\nPhone: +61 2 8317 3775\nLocation: Sydney, Australia\nBusiness Hours: Mon-Fri, 9 AM - 5 PM AEST\n\nFeel free to use our contact form for detailed inquiries!";
  }

  if (lowerMessage.includes("how long") || lowerMessage.includes("timeline") || lowerMessage.includes("duration")) {
    return "Service timelines:\n\n• CV Preparation: 3-5 business days\n• 407 Visa Training Plan: 7 business days\n• Talent Acquisition: 5-7 business days\n• Labour Market Testing: 28+ days (minimum requirement)\n• Genuine Need Assessment: 5-7 business days\n\nFast track options available for 3-5 day delivery!";
  }

  if (lowerMessage.includes("eligibility") || lowerMessage.includes("qualify") || lowerMessage.includes("eligible")) {
    return "Visa eligibility depends on several factors including:\n\n• Age (points-based)\n• Occupation and skills\n• Qualifications and education\n• English proficiency\n• Work experience\n• Employer sponsorship\n• Health and character\n\nTry our free AI Visa Eligibility Checker for a personalized assessment!";
  }

  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
    return "Hello! I'm here to help with questions about Australian visas, recruitment services, and migration. What would you like to know?";
  }

  if (lowerMessage.includes("thank")) {
    return "You're welcome! If you have any more questions, feel free to ask. For personalized assistance, you can always contact our expert team.";
  }

  return "I'd be happy to help you with that! For specific information about your situation, I recommend:\n\n1. Using our AI tools:\n   • CV Analyzer for resume feedback\n   • Visa Eligibility Checker for personalized assessment\n\n2. Contacting our expert team at info@genuinesolutions.com.au or +61 2 8317 3775\n\n3. Visiting our Services page to learn more about what we offer\n\nIs there a specific service or visa type you'd like to know more about?";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, sessionId, history } = body;

    if (!message || !sessionId) {
      return NextResponse.json(
        { error: "Missing message or session ID" },
        { status: 400 }
      );
    }

    const response = generateResponse(message);

    const supabase = await createClient();

    await supabase.from("chat_conversations").insert({
      session_id: sessionId,
      messages: [
        ...(history || []),
        { role: "user", content: message, timestamp: new Date().toISOString() },
        { role: "assistant", content: response, timestamp: new Date().toISOString() },
      ],
    });

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { error: "Failed to process chat message" },
      { status: 500 }
    );
  }
}
