
export async function describeImageWithPollinations(fileBuffer) {
  const imageBase64 = fileBuffer.toString("base64");

  const payload = {
    model: "openai",
    messages: [{
      role: "user",
      content: [
        {
          type: "text", text: `You are a system that analyzes images of broken or damaged objects for maintenance reporting. 

            For the image provided, generate:

            1. A concise title (2-5 words) summarizing the main issue.
            2. A clear description explaining what is broken, damaged, or needs repair.

            Return the response in JSON format like this:

            {
            "title": "...",
            "description": "..."
            }`
        },
        { type: "image_url", image_url: { url: `data:image/jpeg;base64,${imageBase64}` } }
      ]
    }],
    max_tokens: 500
  };

  const response = await fetch("https://text.pollinations.ai/openai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const json = await response.json();
  return extractTitleAndDescription(json.choices[0].message.content);
}

async function extractTitleAndDescription(aiResponse) {
  try {
    const parsed = JSON.parse(aiResponse);
    return {
      title: parsed.title || "",
      description: parsed.description || ""
    };
  } catch (err) {
    const titleMatch = aiResponse.match(/"title"\s*:\s*"(.+?)"/);
    const descriptionMatch = aiResponse.match(/"description"\s*:\s*"(.+?)"/);

    return {
      title: titleMatch ? titleMatch[1] : "",
      description: descriptionMatch ? descriptionMatch[1] : aiResponse
    };
  }
}
