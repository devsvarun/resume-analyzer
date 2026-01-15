import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  const resume_text = req.body.text;
  const job_description = req.body.jobDescription;

  try {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    const prompt = `You are an AI career assistant. Your task is to analyze the resume text provided and compare it with the given job description. Provide feedback in a structured and clear way. 

Instructions:
1. Identify **key skills, qualifications, and experience** in the job description.
2. Highlight which skills and experiences from the resume **match the job description**.
3. Highlight the **missing or weak areas** in the resume compared to the job requirements.
4. Provide a **summary score or match percentage** (optional).
5. Offer **actionable suggestions** for improving the resume for this role.
6. Keep your response **structured with headings**: 
   - Summary
   - Skills Match
   - Experience Match
   - Gaps / Missing
   - Suggestions

Do not add unrelated information or filler content.

Output strictly in JSON:
{
  "summary": {
    "matchPercentage": 75,
    "overallFeedback": "Resume matches most of the required skills but lacks cloud experience."
  },
  "skills": {
    "matched": ["Python", "React", "SQL"],
    "missing": ["Docker", "AWS"]
  },
  "experience": {
    "matched": ["3 years backend development"],
    "missing": ["Frontend projects", "Team collaboration examples"]
  },
  "suggestions": [
    "Add AWS and Docker projects.",
    "Highlight teamwork and project outcomes in your experience section.",
    "Include relevant certifications if any."
  ]
}

### Resume:
${resume_text}

### Job Description:
${job_description}`;

    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
    });

    // Ensure valid JSON output
    let parsed;
    try {
      let rawText = response.text;
      rawText = rawText.replaceAll("```json", "");
      rawText = rawText.replaceAll("```", "");
      parsed = JSON.parse(rawText);
    } catch (err) {
      console.error("Failed to parse Gemini response:", err);
      return res.status(500).json({ error: "Invalid AI response" });
    }

    res.status(200).json(parsed);
  } catch (err) {
    console.error("Analyzing failed:", err);
    res.status(500).json({ error: "Analyzing failed" });
  }
}
