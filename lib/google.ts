import { google } from "googleapis";
import { SCHOOL_KEYWORDS } from "@/lib/constants";

function getOAuthClient() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !redirectUri || !refreshToken) {
    throw new Error("Missing Google OAuth environment variables");
  }

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
  oauth2Client.setCredentials({ refresh_token: refreshToken });
  return oauth2Client;
}

export async function listSchoolEmails(options?: { maxResults?: number }) {
  const auth = getOAuthClient();
  const gmail = google.gmail({ version: "v1", auth });
  const response = await gmail.users.messages.list({
    userId: "me",
    q: SCHOOL_KEYWORDS.map((keyword) => `"${keyword}"`).join(" OR "),
    maxResults: options?.maxResults ?? 20
  });

  const messages = response.data.messages ?? [];
  if (!messages.length) return [];

  const detailed = await Promise.all(
    messages.map(async (message) => {
      if (!message.id) return null;
      const detail = await gmail.users.messages.get({ userId: "me", id: message.id });
      return detail.data;
    })
  );

  return detailed.filter(Boolean);
}

export async function insertCalendarEvents(
  events: Array<{
    title: string;
    description?: string | null;
    startsAt: string;
    endsAt?: string | null;
    location?: string | null;
  }>
) {
  const auth = getOAuthClient();
  const calendar = google.calendar({ version: "v3", auth });
  const created = [];

  for (const event of events) {
    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: {
        summary: event.title,
        description: event.description ?? undefined,
        location: event.location ?? undefined,
        start: {
          dateTime: event.startsAt
        },
        end: {
          dateTime: event.endsAt ?? event.startsAt
        }
      }
    });
    created.push(response.data);
  }

  return created;
}

