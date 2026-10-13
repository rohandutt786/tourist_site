/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as fs from "node:fs";
import * as path from "node:path";
import * as handlebars from "handlebars";

type FileNameMap = "inquiry" | "user-thankyou";

type FileName = `${FileNameMap}.hbs` | FileNameMap;

export function renderTemplate(
  fileName: FileName,
  data: Record<string, any>
): string {
  const validFileName = fileName.endsWith(".hbs")
    ? fileName
    : `${fileName}.hbs`;

  const possiblePaths = [
    path.join(process.cwd(), "src/nodemailer/templates", validFileName),
    path.join(process.cwd(), "templates", validFileName),
    path.join(__dirname, "templates", validFileName),
    path.join(__dirname, validFileName),
  ];

  let filePath = "";
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      filePath = p;
      break;
    }
  }

  if (!filePath) {
    throw new Error(
      `Template not found: ${validFileName}. Checked paths: ${possiblePaths.join(", ")}`
    );
  }

  const source = fs.readFileSync(filePath, "utf-8");
  const template = handlebars.compile(source, {
    noEscape: true,
  });

  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://namohtourism.com"
  ).replace(/\/$/, "");

  return template({
    logoUrl: `${siteUrl}/images/logo.png`,
    currentYear: new Date().getFullYear(),
    ...data,
  });
}
