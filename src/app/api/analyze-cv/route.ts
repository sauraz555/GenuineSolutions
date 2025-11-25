import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const sessionId = formData.get("sessionId") as string;

    if (!file || !sessionId) {
      return NextResponse.json(
        { error: "Missing file or session ID" },
        { status: 400 }
      );
    }

    const fileName = file.name;
    const fileSize = file.size;

    const mockAnalysis = {
      overall_score: Math.floor(Math.random() * 30) + 65,
      ats_score: Math.floor(Math.random() * 30) + 65,
      keyword_score: Math.floor(Math.random() * 30) + 60,
      format_score: Math.floor(Math.random() * 30) + 70,
      feedback: {
        strengths: [
          "Clear and professional formatting with consistent fonts and spacing",
          "Strong action verbs used throughout work experience section",
          "Quantifiable achievements with specific metrics and results",
          "Relevant skills section aligned with industry requirements",
          "Professional summary effectively highlights key qualifications",
        ],
        improvements: [
          "Add more industry-specific keywords to improve ATS compatibility",
          "Expand on leadership experiences with concrete examples",
          "Include certifications and professional development courses",
          "Consider adding a projects section to showcase practical experience",
          "Ensure consistent date formatting throughout the document",
        ],
        ats_tips: [
          "Use standard section headings like 'Work Experience' and 'Education'",
          "Avoid using tables, text boxes, or columns that confuse ATS systems",
          "Include keywords from the job description naturally in your content",
          "Save your CV as both .docx and .pdf formats for maximum compatibility",
          "Keep formatting simple with standard fonts like Arial or Calibri",
        ],
      },
    };

    const supabase = await createClient();

    await supabase.from("cv_analyses").insert({
      session_id: sessionId,
      file_name: fileName,
      file_size: fileSize,
      overall_score: mockAnalysis.overall_score,
      ats_score: mockAnalysis.ats_score,
      keyword_score: mockAnalysis.keyword_score,
      format_score: mockAnalysis.format_score,
      feedback: mockAnalysis.feedback,
    });

    return NextResponse.json(mockAnalysis);
  } catch (error) {
    console.error("CV Analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze CV" },
      { status: 500 }
    );
  }
}
