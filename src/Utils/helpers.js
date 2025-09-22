export const cleanResumeText = (text) => {
  let cleaned = text.toLowerCase();

  // Remove multiple spaces/newlines
  cleaned = cleaned.replace(/\n+/g, "\n"); // collapse multiple newlines
  cleaned = cleaned.replace(/[ \t]+/g, " "); // collapse multiple spaces/tabs

  // Remove common bullet points / symbols
  cleaned = cleaned.replace(/[•●▪■□◆◇▶-]/g, "");

  // Remove non-ascii characters
  cleaned = cleaned.replace(/[^\x00-\x7F]+/g, " ");

  // Normalize section headers
  cleaned = cleaned.replace(/education/gi, "\n\nEDUCATION\n");
  cleaned = cleaned.replace(/experience/gi, "\n\nEXPERIENCE\n");
  cleaned = cleaned.replace(/skills?/gi, "\n\nSKILLS\n");
  cleaned = cleaned.replace(/projects?/gi, "\n\nPROJECTS\n");
  cleaned = cleaned.replace(/certifications?/gi, "\n\nCERTIFICATIONS\n");

  // Trim leading/trailing whitespace
  cleaned = cleaned.trim();

  return cleaned;
};
