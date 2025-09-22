import { Card, Text, Title, Group, Container, Badge } from "@mantine/core";
import Link from "next/link";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export default function AboutSection() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-24">
      <Container size="md" className="text-center">
        <Title order={2} className="mb-6 text-4xl font-extrabold text-gray-900">
          About Me
        </Title>
        <Text className="mb-10 text-gray-700 text-lg leading-relaxed">
          Hi, I&apos;m{" "}
          <span className="font-semibold text-gray-900">Varun Sharma</span>, a{" "}
          <span className="font-medium text-indigo-600">
            Software Developer
          </span>{" "}
          passionate about building modern web applications and tools like this{" "}
          <span className="font-medium text-indigo-600">Resume Analyzer</span>{" "}
          to help users optimize their resumes for ATS and land more interview
          opportunities.
        </Text>

        <Card
          shadow="xl"
          radius="md"
          padding="xl"
          className="max-w-lg mx-auto bg-white transition-transform transform hover:-translate-y-2 hover:shadow-2xl"
        >
          <Text className="mb-6 text-gray-700 text-base">
            Connect with me on GitHub and LinkedIn to explore more of my work
            and projects.
          </Text>

          <Group position="center" spacing="md">
            <Link
              href="https://github.com/your-github-username"
              target="_blank"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <FaGithub size={24} color="#333" />
            </Link>
            <Link
              href="https://linkedin.com/in/your-linkedin-username"
              target="_blank"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              <FaLinkedin size={24} color="#0072b1" />
            </Link>
          </Group>
        </Card>
      </Container>
    </section>
  );
}
