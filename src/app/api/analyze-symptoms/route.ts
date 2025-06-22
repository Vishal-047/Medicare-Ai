import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { transcript } = await req.json()

  if (!transcript) {
    return NextResponse.json(
      { error: "Transcript is required" },
      { status: 400 }
    )
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

    const prompt = `Analyze the following medical symptoms described by a user and provide a structured analysis. The user said: "${transcript}".
        
Your analysis should include:
1.  **Possible Conditions:** List potential medical conditions, indicating the most likely ones.
2.  **Recommendations:** Suggest immediate actions the user can take to alleviate symptoms.
3.  **When to seek immediate care:** Provide a clear list of "red flag" symptoms that require urgent medical attention.
4.  **Next Steps:** Advise on follow-up actions, like monitoring symptoms or scheduling a doctor's appointment.

IMPORTANT: Start your response with a clear disclaimer that this is an AI analysis and not a substitute for professional medical advice.
        `

    const result = await model.generateContent(prompt)
    const response = await result.response
    const analysis = await response.text()

    return NextResponse.json({ analysis })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed to analyze symptoms" },
      { status: 500 }
    )
  }
}
