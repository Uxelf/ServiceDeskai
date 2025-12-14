
export async function geocodeLocation(location){
    const prompt = `
You are a geocoding API.

Given a location string, return ONLY a valid JSON object with this exact format:

{
  "latitude": number,
  "longitude": number,
  "confidence": number
}

Rules:
- confidence must be between 0 and 1
- If the location is vague, fake, or not a real place, set confidence < 0.5
- Do NOT include explanations
- Do NOT include markdown
- Do NOT include text outside the JSON

Location: "${location}"`;

  const url = `https://text.pollinations.ai/${encodeURIComponent(prompt)}?model=openai&temperature=1.0`;

  try {
    const response = await fetch(url);
    const text = await response.text();

    let data;
    console.log(text);
    try {
      data = JSON.parse(text);
    } catch {
      return null;
    }

    if (
      typeof data.latitude !== "number" ||
      typeof data.longitude !== "number" ||
      typeof data.confidence !== "number"
    ) {
      return null;
    }

    if (data.confidence < 0.6) {
      return null;
    }

    return {
      latitude: data.latitude,
      longitude: data.longitude,
    };
  } catch {
    return null;
  }
}