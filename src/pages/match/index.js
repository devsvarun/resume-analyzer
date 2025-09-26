import { useEffect, useState } from "react";
import {
  Container,
  Title,
  Text,
  Loader,
  Card,
  Textarea,
  Button,
} from "@mantine/core";
import UploadFile from "@/Components/UploadFile";
import { notifications } from "@mantine/notifications";

export default function MatchPage() {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const handleAnalysis = async () => {
    let validFileType = file ? file.type.includes("application/pdf") : false;
    if (file && validFileType && text.length > 0) {
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
        const analyzeRes = await fetch("/api/match", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: cleanedText, jobDescription: text }),
        });
        const result = await analyzeRes.json();
        setAnalysis(result);
      } catch (err) {
        notifications.show({
          title: "Oops!",
          color: "red",
          message: "Some error occured, please try again later.",
        });
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
    } else if (text?.length <= 0) {
      notifications.show({
        title: "Oops!",
        color: "red",
        message: "Please enter a job description!",
      });
    }
  };
  const handleSetFileSelected = (file) => {
    setFile(file);
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
        <div className="flex flex-col gap-4 max-w-lg mx-auto mb-12">
          <UploadFile
            onFileSelected={handleSetFileSelected}
            disabled={loading}
          />
          <Textarea
            autosize
            value={text}
            onChange={(event) => {
              if (event.currentTarget.value.length <= 3000) {
                setText(event.currentTarget.value);
              }
            }}
            placeholder="Enter job description here..."
            label="Job description"
            radius="md"
            minRows={5}
            maxRows={10}
            maxLength={3000}
            required
            description={`${text.length}/3000 characters`}
            disabled={loading}
          />
          <div>
            <Button onClick={handleAnalysis} disabled={loading}>
              Match
            </Button>
          </div>
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
              <Title order={4}>Match Result</Title>
              <ul className="mt-2 text-gray-700 list-disc pl-6">
                <li className="font-semibold">
                  Overall Match Score: {analysis?.summary?.matchPercentage}%
                </li>
                <li>Overall Feedback {analysis?.summary?.overallFeedback}</li>
              </ul>
            </Card>

            {/* Skills */}
            <Card shadow="sm" padding="lg" radius="lg" className="bg-white">
              <Title order={4}>Skills Analysis</Title>
              <p className="mt-2">
                <strong>Skills Matched:</strong>{" "}
                {analysis?.skills?.matched?.join(", ") || "None"}
              </p>
              <p className="mt-2">
                <strong>Skills Missing:</strong>{" "}
                {analysis?.skills?.missing?.join(", ") || "None"}
              </p>
            </Card>

            {/* Experience */}
            <Card shadow="sm" padding="lg" radius="lg" className="bg-white">
              <Title order={4}>Experience Analysis</Title>
              <strong>Experience Matched:</strong>{" "}
              {analysis?.experience?.matched?.join(", ") || "None"}
              <strong>Experience Missing:</strong>{" "}
              {analysis?.experience?.missing?.join(", ") || "None"}
            </Card>

            {/* Education */}
            <Card shadow="sm" padding="lg" radius="lg" className="bg-white">
              <Title order={4}>Suggestions</Title>
              <p>{analysis?.suggestions?.join(", ") || "None"}</p>
            </Card>
          </div>
        )}
      </Container>
    </div>
  );
}
