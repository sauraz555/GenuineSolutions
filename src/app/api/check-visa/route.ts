import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { answers, sessionId } = body;

    if (!answers || !sessionId) {
      return NextResponse.json(
        { error: "Missing answers or session ID" },
        { status: 400 }
      );
    }

    let score = 50;

    if (answers.age === "18_29" || answers.age === "30_39") score += 15;
    else if (answers.age === "40_49") score += 5;

    if (["healthcare", "it", "engineering"].includes(answers.occupation)) score += 10;

    if (["phd", "masters"].includes(answers.qualification)) score += 15;
    else if (answers.qualification === "bachelor") score += 10;

    if (["5_8", "8_plus"].includes(answers.experience)) score += 10;
    else if (answers.experience === "3_5") score += 5;

    if (["native", "advanced"].includes(answers.english)) score += 15;
    else if (answers.english === "intermediate") score += 5;

    if (["yes_sponsor", "yes_offer"].includes(answers.sponsor)) score += 20;

    if (answers.funds === "yes") score += 5;
    if (answers.health === "yes") score += 5;

    const recommendedVisas = [];

    if (score >= 70) {
      recommendedVisas.push({
        name: "Skilled Independent Visa",
        code: "Subclass 189",
        likelihood: "High",
        description: "Points-based permanent residency visa for skilled workers without employer sponsorship.",
      });
      recommendedVisas.push({
        name: "Employer Nomination Scheme",
        code: "Subclass 186",
        likelihood: "High",
        description: "Permanent residency for skilled workers nominated by their Australian employer.",
      });
    }

    if (score >= 50 || answers.sponsor !== "no") {
      recommendedVisas.push({
        name: "Temporary Skill Shortage Visa",
        code: "Subclass 482",
        likelihood: score >= 70 ? "High" : "Moderate",
        description: "Temporary work visa for skilled workers sponsored by an approved Australian employer.",
      });
    }

    if (answers.occupation === "healthcare" || answers.occupation === "education") {
      recommendedVisas.push({
        name: "Training Visa",
        code: "Subclass 407",
        likelihood: "Moderate",
        description: "For occupational training or professional development in your field.",
      });
    }

    if (recommendedVisas.length === 0) {
      recommendedVisas.push({
        name: "Visitor Visa",
        code: "Subclass 600",
        likelihood: "High",
        description: "Consider visiting Australia first to explore opportunities and network.",
      });
    }

    const nextSteps = [
      "Get your qualifications assessed by the relevant Australian assessing authority",
      "Take an English language test (IELTS, PTE, or TOEFL) if you haven't already",
      "Research employers in your field who offer visa sponsorship",
      "Prepare a professional Australian-style CV highlighting your skills and experience",
      "Consider engaging a registered migration agent for personalized guidance",
    ];

    if (score < 60) {
      nextSteps.unshift("Improve your English language proficiency to increase your chances");
      nextSteps.unshift("Consider gaining more work experience in your field");
    }

    const result = {
      eligibility_score: Math.min(score, 100),
      recommended_visas: recommendedVisas,
      next_steps: nextSteps,
    };

    const supabase = await createClient();

    await supabase.from("visa_eligibility_checks").insert({
      session_id: sessionId,
      responses: answers,
      eligibility_result: score >= 70 ? "strong" : score >= 50 ? "moderate" : "limited",
      recommended_visas: recommendedVisas.map((v) => v.code),
      next_steps: nextSteps.join("\n"),
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Visa check error:", error);
    return NextResponse.json(
      { error: "Failed to process visa check" },
      { status: 500 }
    );
  }
}
