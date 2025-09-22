import { Button, Card, Container, Grid, Text, Title } from "@mantine/core";

export default function LandingPage() {
  return (
    <div className="flex flex-col pb-10">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 text-center px-6 py-20 bg-gradient-to-b from-white to-gray-50">
        <Title order={1} className="text-4xl md:text-6xl font-bold mb-4">
          Smarter Resume Insights in Seconds
        </Title>
        <Text size="lg" className="text-gray-600 mb-8 max-w-2xl">
          Upload your resume, get ATS score, keyword matches, and actionable
          improvement suggestions — all in one place.
        </Text>
        <Button
          size="lg"
          radius="xl"
          className="bg-blue-600 hover:bg-blue-700 text-white mt-4"
          component="a"
          href="/analyze"
        >
          Get Your Free Analysis
        </Button>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <Container size="lg">
          <Title order={2} className="text-3xl font-semibold text-center mb-12 p-4">
            How It Works
          </Title>
          <Grid gutter="lg">
            {[
              { step: "1", title: "Upload", desc: "Drag & drop your resume." },
              {
                step: "2",
                title: "Analyze",
                desc: "Our AI scans and scores it instantly.",
              },
              {
                step: "3",
                title: "Improve",
                desc: "Get suggestions and keyword matches.",
              },
            ].map((item, i) => (
              <Grid.Col key={i} span={{ base: 12, md: 4 }}>
                <Card
                  shadow="sm"
                  padding="xl"
                  radius="lg"
                  className="h-full text-center"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mx-auto mb-4 text-xl font-bold">
                    {item.step}
                  </div>
                  <Title order={4} className="mb-2">
                    {item.title}
                  </Title>
                  <Text size="sm" className="text-gray-600">
                    {item.desc}
                  </Text>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <Container size="lg">
          <Title order={2} className="text-3xl font-semibold text-center mb-12 p-4">
            Features
          </Title>
          <Grid gutter="lg">
            {[
              {
                title: "ATS Score",
                desc: "See how recruiters’ software views your resume.",
              },
              {
                title: "Keyword Match",
                desc: "Compare against job descriptions easily.",
              },
              {
                title: "Formatting Check",
                desc: "Fix structure, fonts, and readability issues.",
              },
              {
                title: "Skill Gaps",
                desc: "Identify missing skills for your dream role.",
              },
            ].map((item, i) => (
              <Grid.Col key={i} span={{ base: 12, sm: 6, md: 3 }}>
                <Card
                  shadow="sm"
                  padding="lg"
                  radius="lg"
                  className="h-full text-center"
                >
                  <Title order={4} className="mb-2">
                    {item.title}
                  </Title>
                  <Text size="sm" className="text-gray-600">
                    {item.desc}
                  </Text>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </section>
    </div>
  );
}
