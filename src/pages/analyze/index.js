import { useState } from "react";
import { Container, Title, Text, Loader, Card } from "@mantine/core";
import UploadFile from "@/Components/UploadFile";
import { notifications } from "@mantine/notifications";

export default function AnalyzePage() {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleAnalysis = async (file) => {
    let validFileType = file ? file.type.includes("application/pdf") : false;
    if (file && validFileType) {
      setLoading(true);
      setAnalysis(null);
      try {
        // Delegate to UploadFile logic
        const formData = new FormData();
        formData.append("file", file);

        // Step 1: Parse resume
        const parseRes = await fetch("/api/parse", {
          method: "POST",
          body: formData,
        });
        const parsed = await parseRes.json();

        // Step 2: Clean and analyze
        const cleanedText = parsed?.text; // your cleanResumeText helper can go here
        const analyzeRes = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: cleanedText }),
        });
        const result = await analyzeRes.json();
        setAnalysis(result);
      } catch (err) {
        console.error("Error analyzing resume:", err);
      } finally {
        setLoading(false);
      }
    } else if (!file) {
      notifications.show({
        title: "Oops!",
        color: "red",
        message: "Please upload your resume!",
      });
    } else if (file && !validFileType) {
      notifications.show({
        title: "Oops!",
        color: "red",
        message: "Please upload a valid PDF file!",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <Container size="md">
        {/* Page Title */}
        <Title order={2} className="text-3xl font-bold text-center mb-4">
          Upload & Analyze Your Resume
        </Title>
        <Text size="md" className="text-gray-600 text-center mb-12">
          Get ATS score, keyword matches, and improvement suggestions in
          seconds.
        </Text>
        {/* Upload Section */}
        <div className="max-w-lg mx-auto mb-12">
          <UploadFile onFileSelected={handleAnalysis} disabled={loading} />
        </div>
        {/* Loader */}
        {loading && (
          <div className="flex justify-center items-center mt-12">
            <Loader color="blue" size="lg" />
          </div>
        )}
        {/* Analysis Results */}
        {analysis && (
          <div className="mt-12 space-y-6">
            {/* ATS Scores */}
            <Card shadow="sm" padding="lg" radius="lg" className="bg-white">
              <Title order={4}>ATS Scores</Title>
              <ul className="mt-2 text-gray-700 list-disc pl-6">
                <li>Skills Match: {analysis.scores.skills_match}%</li>
                <li>Experience Match: {analysis.scores.experience_match}%</li>
                <li>Education Match: {analysis.scores.education_match}%</li>
                <li className="font-semibold">
                  Overall ATS: {analysis.scores.overall_ats}%
                </li>
              </ul>
            </Card>

            {/* Skills */}
            <Card shadow="sm" padding="lg" radius="lg" className="bg-white">
              <Title order={4}>Skills Analysis</Title>
              <p className="mt-2">
                <strong>Skills:</strong> {analysis.skills?.join(", ") || "None"}
              </p>
            </Card>

            {/* Experience */}
            <Card shadow="sm" padding="lg" radius="lg" className="bg-white">
              <Title order={4}>Experience Analysis</Title>
              {analysis.experience_analysis?.map((exp, i) => (
                <div key={i} className="mb-3">
                  <p className="font-semibold">{exp.role}</p>
                  <p>Score: {exp.score}%</p>
                  <p className="text-gray-600">{exp.feedback}</p>
                </div>
              ))}
            </Card>

            {/* Education */}
            <Card shadow="sm" padding="lg" radius="lg" className="bg-white">
              <Title order={4}>Education Feedback</Title>
              <p>{analysis.education_feedback || "No issues detected."}</p>
            </Card>

            {/* Formatting */}
            <Card shadow="sm" padding="lg" radius="lg" className="bg-white">
              <Title order={4}>Formatting Checks</Title>
              <ul className="mt-2 text-gray-700 list-disc pl-6">
                <li>
                  Bullet points:{" "}
                  {analysis.formatting?.has_bullet_points ? "✅" : "❌"}
                </li>
                <li>
                  Font consistency:{" "}
                  {analysis.formatting?.font_consistency ? "✅" : "❌"}
                </li>
                <li>
                  Readability score: {analysis.formatting?.readability_score}
                </li>
                <li>
                  ATS red flags 🚩:{" "}
                  {analysis.formatting?.ats_red_flags?.join(", ") || "None"}
                </li>
                <li>
                  Sections detected:{" "}
                  {analysis.formatting?.sections_detected?.join(", ") || "None"}
                </li>
              </ul>
            </Card>

            {/* Feedback Summary */}
            <Card shadow="sm" padding="lg" radius="lg" className="bg-white">
              <Title order={4}>Overall Feedback</Title>
              <p className="mt-2 text-gray-700">{analysis.feedback}</p>
            </Card>
          </div>
        )}
      </Container>
    </div>
  );
}
