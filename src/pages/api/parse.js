const formidable = require("formidable");
import pdf from "pdf-parse";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Formidable error:", err);
      return res.status(500).json({ error: "Form parsing failed" });
    }

    try {
      const file = files.file[0];
      const buffer = fs.readFileSync(file.filepath);
      const data = await pdf(buffer);
      res.status(200).json({ text: data.text });
    } catch (err) {
      console.error("PDF parsing failed:", err);
      res.status(500).json({ error: "PDF parsing failed" });
    }
  });
}
