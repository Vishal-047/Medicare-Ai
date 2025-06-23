"use client"
import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Mic,
  MicOff,
  Volume2,
  AlertCircle,
  CheckCircle,
  MapPin,
  Hospital,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Header from "@/components/Header"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import jsPDF from "jspdf"

// Define the SpeechRecognition types for broader browser support
interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult
  length: number
  item(index: number): SpeechRecognitionResult
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative
  isFinal: boolean
  length: number
  item(index: number): SpeechRecognitionAlternative
}

interface SpeechRecognitionAlternative {
  transcript: string
  confidence: number
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  onend: (() => void) | null
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null
  start(): void
  stop(): void
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList
  resultIndex: number
  error: string
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
}

interface CustomWindow extends Window {
  SpeechRecognition: {
    new (): SpeechRecognition
  }
  webkitSpeechRecognition: {
    new (): SpeechRecognition
  }
}
declare const window: CustomWindow

const LANGUAGES = [
  { code: "en-US", label: "English" },
  { code: "hi-IN", label: "Hindi" },
  { code: "mr-IN", label: "Marathi" },
  { code: "gu-IN", label: "Gujarati" },
  { code: "ta-IN", label: "Tamil" },
  { code: "te-IN", label: "Telugu" },
]

interface Message {
  role: "user" | "doctor"
  content: string
}

const SpeechAnalysis = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [conversation, setConversation] = useState<Message[]>([
    {
      role: "doctor",
      content:
        "Hello! I am your AI doctor. Please describe your symptoms in your preferred language.",
    },
  ])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [language, setLanguage] = useState("en-US")
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const wasRecordingRef = useRef(false)
  const [prescription, setPrescription] = useState("")
  const [showPrescription, setShowPrescription] = useState(false)
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      toast.error("Your browser does not support speech recognition.")
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = language

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = ""
      for (let i = 0; i < event.results.length; i++) {
        finalTranscript += event.results[i][0].transcript
      }
      setTranscript(finalTranscript)
    }

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      toast.error(`Speech recognition error: ${event.error}`)
      setIsRecording(false)
    }

    recognition.onend = () => {
      setIsRecording(false)
    }

    recognitionRef.current = recognition

    return () => {
      recognition.stop()
    }
  }, [language])

  useEffect(() => {
    if (transcript.trim() && wasRecordingRef.current) {
      handleSend(transcript)
      setTranscript("")
      wasRecordingRef.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript])

  const handleMicClick = () => {
    if (isRecording) {
      recognitionRef.current?.stop()
    } else {
      setTranscript("")
      wasRecordingRef.current = true
      recognitionRef.current?.start()
      setIsRecording(true)
    }
  }

  const handleSend = async (userMessage: string) => {
    if (!userMessage.trim()) return
    setConversation((prev) => [...prev, { role: "user", content: userMessage }])
    setIsAnalyzing(true)
    try {
      const response = await fetch("/api/analyze-symptoms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversation: [
            ...conversation,
            { role: "user", content: userMessage },
          ],
          language,
        }),
      })
      if (!response.ok)
        throw new Error("Failed to get analysis from the server.")
      const data = await response.json()
      setConversation((prev) => [
        ...prev,
        { role: "doctor", content: data.analysis },
      ])
    } catch (error) {
      toast.error("There was an error analyzing your symptoms.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  // Helper to format doctor's analysis (remove asterisks, add headings)
  function formatAnalysis(text: string) {
    return text
      .replace(/\*\*/g, "") // Remove bold markdown
      .replace(/\*/g, "") // Remove asterisks
      .replace(
        /(Possible Conditions:|Recommendations:|Red Flags:|Next Steps:|Disclaimer:)/g,
        "\n$1\n"
      )
      .replace(/\n{2,}/g, "\n\n") // Normalize line breaks
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Header />
      <div
        className={`max-w-5xl mx-auto px-4 py-8 flex ${
          showPrescription ? "flex-row gap-8" : "flex-col items-center"
        }`}
      >
        {/* Chat Section */}
        <div
          className={`bg-white rounded-lg shadow p-4 h-[600px] flex flex-col w-full ${
            showPrescription ? "max-w-2xl" : "max-w-2xl mx-auto"
          }`}
        >
          <div className="flex justify-end mb-4">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border rounded px-2 py-1"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {conversation.map((msg, idx) => (
              <div
                key={idx}
                className={msg.role === "user" ? "text-right" : "text-left"}
              >
                <div
                  className={
                    msg.role === "user"
                      ? "inline-block bg-blue-100 text-blue-900 rounded-lg px-4 py-2 max-w-[80%]"
                      : "inline-block bg-gray-100 text-gray-900 rounded-lg px-4 py-2 max-w-[80%]"
                  }
                >
                  {msg.role === "doctor" ? (
                    <pre className="whitespace-pre-wrap text-left">
                      {formatAnalysis(msg.content)}
                    </pre>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}
            {isAnalyzing && (
              <div className="text-left">
                <div className="inline-block bg-gray-100 text-gray-900 rounded-lg px-4 py-2 max-w-[80%]">
                  <span className="animate-pulse">Doctor is typing...</span>
                </div>
              </div>
            )}
          </div>
          <Button
            variant="default"
            className="w-full mb-4"
            onClick={async () => {
              setShowPrescription(true)
              setPrescription("")
              try {
                const response = await fetch(
                  "/api/analyze-symptoms/prescription",
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ conversation, language }),
                  }
                )
                if (!response.ok)
                  throw new Error("Failed to generate prescription.")
                const data = await response.json()
                setPrescription(data.prescription)
              } catch (e) {
                setPrescription("Failed to generate prescription.")
              }
            }}
            disabled={isAnalyzing || conversation.length < 2}
          >
            Generate AI recommended prescription
          </Button>
          <div className="flex items-center gap-2 mt-2">
            <Button
              size="lg"
              onClick={handleMicClick}
              className={`w-16 h-16 rounded-full relative flex items-center justify-center transition-shadow
                ${
                  isRecording
                    ? "bg-red-600 hover:bg-red-700 animate-pulse shadow-lg shadow-red-400/50"
                    : "bg-blue-600 hover:bg-blue-700 animate-mic-glow shadow-lg shadow-blue-400/50"
                }`}
              disabled={isAnalyzing}
            >
              <span
                className={`absolute inset-0 rounded-full pointer-events-none
                ${isRecording ? "animate-mic-pulse" : "animate-mic-glow"}`}
              />
              {isRecording ? (
                <MicOff className="w-8 h-8 z-10" />
              ) : (
                <Mic className="w-8 h-8 z-10" />
              )}
            </Button>
            <input
              type="text"
              className="flex-1 border rounded px-3 py-2"
              placeholder="Type your message or use the mic..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && inputValue.trim()) {
                  handleSend(inputValue)
                  setInputValue("")
                }
              }}
              disabled={isAnalyzing}
            />
            <Button
              onClick={() => {
                handleSend(inputValue)
                setInputValue("")
              }}
              disabled={!inputValue.trim() || isAnalyzing}
            >
              Send
            </Button>
          </div>
        </div>
        {/* Prescription Panel */}
        {showPrescription && (
          <div className="bg-white rounded-lg shadow p-6 h-[600px] w-full max-w-md flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold mb-4 text-center">
                AI Recommended Prescription
              </h2>
              <pre className="whitespace-pre-wrap text-left text-base overflow-y-auto max-h-[480px]">
                {prescription || "Generating prescription..."}
              </pre>
            </div>
            <Button
              className="mt-4 w-full"
              onClick={() => {
                const doc = new jsPDF()
                doc.setFontSize(12)
                doc.text(prescription || "No prescription generated.", 10, 20)
                doc.save("prescription.pdf")
              }}
              disabled={
                !prescription || prescription === "Generating prescription..."
              }
            >
              Download PDF
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SpeechAnalysis
