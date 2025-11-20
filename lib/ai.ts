import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";
import { ParsedAgentResult } from "@/lib/types";

const MODEL = process.env.GEMINI_MODEL ?? "gemini-1.5-pro";

const agentSchema = z.object({
  tasks: z
    .array(
      z.object({
        title: z.string(),
        description: z.string().optional().nullable(),
        dueAt: z.string().optional().nullable(),
        childName: z.string().optional().nullable(),
        source: z.enum(["email", "pdf", "manual"]).default("email")
      })
    )
    .default([]),
  events: z
    .array(
      z.object({
        title: z.string(),
        description: z.string().optional().nullable(),
        startsAt: z.string(),
        endsAt: z.string().optional().nullable(),
        location: z.string().optional().nullable(),
        childName: z.string().optional().nullable(),
        source: z.enum(["email", "pdf", "manual"]).default("email")
      })
    )
    .default([]),
  insights: z.array(z.string()).optional()
});

function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY");
  }
  return new GoogleGenerativeAI(apiKey);
}

export async function parseSchoolContent(args: {
  content: string;
  context?: string;
}): Promise<ParsedAgentResult> {
  const { content, context } = args;
  const genAI = getGenAI();
  const model = genAI.getGenerativeModel({
    model: MODEL,
    generationConfig: {
      responseMimeType: "application/json"
    }
  });

  const prompt = `
You are SchoolAgent, an AI assistant that extracts actionable items for parents from school communications.

Rules:
- Only include tasks or events that are relevant to school.
- Prefer ISO8601 for dates (ex: 2024-05-01T13:00:00-04:00).
- If a date is missing but a due day relative to now is provided, estimate.

Return JSON that matches this TypeScript type:
{
  "tasks": Array<{
    "title": string;
    "description"?: string;
    "dueAt"?: string;
    "childName"?: string;
    "source": "email" | "pdf" | "manual";
  }>;
  "events": Array<{
    "title": string;
    "description"?: string;
    "startsAt": string;
    "endsAt"?: string;
    "location"?: string;
    "childName"?: string;
    "source": "email" | "pdf" | "manual";
  }>;
  "insights"?: string[];
}

Context (optional):
${context ?? "none"}

Content:
${content}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  try {
    const parsed = JSON.parse(text);
    return agentSchema.parse(parsed);
  } catch (error) {
    console.warn("Failed to parse Gemini response", error);
    return { tasks: [], events: [], insights: [] };
  }
}

