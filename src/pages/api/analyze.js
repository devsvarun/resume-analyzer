import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  const resume_text = req.body.text;

  try {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    const prompt = `You are an ATS and career coach.

Instructions:
1. Extract key entities: name, email, phone, skills, experience, education, certifications.
2. Evaluate the resume for ATS compatibility and career readiness.
3. Provide scores (0–100) for:
   - Skills
   - Experience
   - Education
   - Overall ATS
4. Provide detailed sub-sections:
   - Skills Analysis: list all detected skills, highlight missing core skills for target roles.
   - Experience Analysis: analyze each role separately with impact, technologies used, achievements, and suggestions for improvement.
   - Education Feedback: mention gaps, missing degrees, or recommendations for improving relevance.
   - Formatting Checks: list all detected sections, bullet points, headers, font consistency, readability, and any ATS red flags.
5. Overall Feedback: provide a detailed paragraph suggesting improvements, emphasizing action items for each section.

Output strictly in JSON:
{
  "name": "",
  "contact": { "email": "", "phone": "" },
  "skills": [],
  "experience": "",
  "education": [],
  "certifications": [],
  "scores": {
    "skills_match": 0,
    "experience_match": 0,
    "education_match": 0,
    "overall_ats": 0
  },
  "skills_analysis": {
    "detected_skills": [],
    "missing_skills": []
  },
  "experience_analysis": [
    { "role": "", "score": 0, "feedback": "" }
  ],
  "education_feedback": "",
  "formatting": {
    "has_bullet_points": true,
    "sections_detected": [],
    "font_consistency": true,
    "readability_score": 0,
    "ats_red_flags": []
  },
  "feedback": ""
}

### Resume:
${resume_text}
`;

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
