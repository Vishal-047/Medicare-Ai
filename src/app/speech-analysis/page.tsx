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

const SpeechAnalysis = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [analysis, setAnalysis] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  // A ref to track if a recording was in progress to trigger analysis
  const wasRecordingRef = useRef(false)

  // Setup the recognition instance
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      toast.error("Your browser does not support speech recognition.")
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = "en-US"

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = ""
      for (let i = 0; i < event.results.length; i++) {
        finalTranscript += event.results[i][0].transcript
      }
      setTranscript(finalTranscript)
    }

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      toast.error(`Speech recognition error: ${event.error}`)
      setIsRecording(false) // Ensure we stop on error
    }

    recognition.onend = () => {
      setIsRecording(false) // Sync state when recognition ends
    }

    recognitionRef.current = recognition

    return () => {
      recognition.stop()
    }
  }, [])

  const analyzeSymptoms = useCallback(async () => {
    if (!transcript.trim()) {
      toast.info("No transcript to analyze.")
      return
    }
    setIsAnalyzing(true)
    try {
      const response = await fetch("/api/analyze-symptoms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript }),
      })

      if (!response.ok) {
        throw new Error("Failed to get analysis from the server.")
      }

      const data = await response.json()
      setAnalysis(data.analysis)
    } catch (error) {
      toast.error("There was an error analyzing your symptoms.")
    } finally {
      setIsAnalyzing(false)
    }
  }, [transcript])

  // This effect triggers the analysis when recording stops
  useEffect(() => {
    if (wasRecordingRef.current && !isRecording) {
      analyzeSymptoms()
    }
    wasRecordingRef.current = isRecording
  }, [isRecording, analyzeSymptoms])

  const handleMicClick = () => {
    if (isRecording) {
      recognitionRef.current?.stop()
    } else {
      setTranscript("")
      setAnalysis("")
      recognitionRef.current?.start()
      setIsRecording(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Speech Analysis
          </h1>
          <p className="text-xl text-gray-600">
            Describe your symptoms using voice commands for instant medical
            insights
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recording Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mic className="w-6 h-6 mr-2 text-blue-600" />
                Voice Recording
              </CardTitle>
              <CardDescription>
                Click the microphone to start describing your symptoms
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-6">
                <Button
                  size="lg"
                  onClick={handleMicClick}
                  className={`w-32 h-32 rounded-full ${
                    isRecording
                      ? "bg-red-600 hover:bg-red-700 animate-pulse"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isRecording ? (
                    <MicOff className="w-12 h-12" />
                  ) : (
                    <Mic className="w-12 h-12" />
                  )}
                </Button>
              </div>

              <p className="text-gray-600 mb-4">
                {isRecording
                  ? "Listening... Click to stop"
                  : "Click to start recording"}
              </p>

              {transcript && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Volume2 className="w-4 h-4 mr-2" />
                    Transcript:
                  </h4>
                  <p className="text-gray-700 text-left">{transcript}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Analysis Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="w-6 h-6 mr-2 text-purple-600" />
                AI Analysis
              </CardTitle>
              <CardDescription>
                Medical insights based on your described symptoms
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isAnalyzing ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Analyzing your symptoms...</p>
                </div>
              ) : analysis ? (
                <div className="space-y-4">
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      Analysis complete. Please note this is for informational
                      purposes only and does not replace professional medical
                      advice.
                    </AlertDescription>
                  </Alert>
                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                      {analysis}
                    </pre>
                  </div>
                  <div className="flex space-x-4 mt-6">
                    <Button variant="outline" className="flex-1">
                      Save to Records
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Start recording to get AI-powered medical insights</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Emergency Alert */}
        <Alert className="mt-8 border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Emergency:</strong> If you are experiencing a medical
            emergency, please call 108 or go to the nearest emergency room
            immediately.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}

export default SpeechAnalysis
