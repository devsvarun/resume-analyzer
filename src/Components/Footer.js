import { Button, Card, Container, Grid, Text, Title } from "@mantine/core";
export default function Footer() {
  return (
    <footer className="py-8 bg-white border-t">
      <Container size="lg" className="text-center">
        <Text size="sm" className="text-gray-500">
          © {new Date().getFullYear()} Resume Analyzer. All rights reserved.
        </Text>
      </Container>
    </footer>
  );
}
