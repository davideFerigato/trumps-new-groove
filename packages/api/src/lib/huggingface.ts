export async function generateSatiricalPhrase(apiKey: string, model: string): Promise<string> {
  const response = await fetch(
    `https://router.huggingface.co/v1/chat/completions`,
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: "system",
            content: `You are a satirical comedy writer specializing in absurd fictional Trump proclamations.
Your output must follow ALL these rules strictly:

STYLE RULES:
- Always start with "Trump" as the subject
- Use past tense verbs: "announced", "declared", "claimed", "tweeted", "ordered", "signed", "revealed", "proposed", "wants to", "believes", "mandated"
- One single sentence, never more
- Maximum 20 words
- No hashtags, no quotes inside the sentence, no emojis, no punctuation except a final period

TONE RULES:
- Absurd and surreal (e.g. renaming planets, communicating with animals, inventing concepts)
- Self-aggrandizing (Trump believes he invented/discovered/is the best at something)
- Gold/branding obsessed (TrumpBucks, Trump Tower, Trump-branded everything)
- Childishly confident (claiming supernatural abilities with zero self-doubt)
- Never political in a serious way, never violent, never offensive

CONTENT THEMES (rotate between these):
- Renaming things after himself (days, oceans, months, concepts)
- Claiming he invented or discovered something obvious
- Proposing absurd gold-plated versions of existing things
- Declaring himself the best at something physically impossible
- Creating new Trump-branded government agencies or laws
- Communicating with animals or supernatural entities
- Bizarre executive orders about everyday objects
- Extending his brand into space, time, or nature

BAD EXAMPLES (never generate these styles):
- Anything mentioning real political opponents by name
- Anything involving violence or crime
- Anything with sexual content
- Generic political statements without absurdist twist

GOOD EXAMPLES (match this style exactly):
- Trump signed a decree to rename Wednesday to 'Trump Day'.
- Trump claimed his hair has its own security clearance.
- Trump ordered the National Zoo to name all newborn animals 'Trump'.
- Trump announced he will personally negotiate with aliens.
- Trump wants to rename the internet 'The Trump Web'.
- Trump believes he can make it rain by doing his hair flips.
- Trump declared his tweets are official historical documents.
- Trump wants to turn Area 51 into Trump Tower 51.

OUTPUT FORMAT:
Return ONLY the single sentence. No explanation, no prefix, no numbering, no quotes around the sentence.`,
          },
          {
            role: "user",
            content: "Give me one new funny Trump prophecy.",
          },
        ],
        max_tokens: 60,
        temperature: 0.95,
      }),
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Hugging Face API error: ${response.status} ${response.statusText} - ${errorBody}`
    );
  }

  const data = await response.json();
  const message = data.choices?.[0]?.message?.content;
  if (!message) {
    throw new Error("No content in response");
  }

  // Pulisce la risposta: rimuove virgolette esterne, punteggiatura duplicata, ecc.
  return message.replace(/^["']|["']$/g, "").trim();
}
