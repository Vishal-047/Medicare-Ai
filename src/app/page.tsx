"use client"
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, Brain, MapPin, FileText, Users, Activity } from "lucide-react"
import FeatureCard from "@/components/FeatureCard"
import { useRouter } from "next/navigation"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import React from "react"
import Footer from "@/components/Footer"

const Home = () => {
  const navigate = useRouter()
  const features = [
    {
      icon: <Mic className="w-8 h-8 text-blue-600" />,
      title: "Speech Recognition",
      description:
        "Describe your symptoms using voice commands for instant AI analysis",
      path: "/speech-analysis",
    },
    {
      icon: <Brain className="w-8 h-8 text-purple-600" />,
      title: "AI Medical Analysis",
      description:
        "Get intelligent health insights and preliminary assessments",
      path: "/ai-analysis",
    },
    {
      icon: <MapPin className="w-8 h-8 text-green-600" />,
      title: "Find Nearby Care",
      description:
        "Locate hospitals and doctors in your area with ratings and reviews",
      path: "/find-care",
    },
    {
      icon: <FileText className="w-8 h-8 text-orange-600" />,
      title: "Medical Records",
      description:
        "Securely store and manage your medical history and documents",
      path: "/medical-records",
    },
    {
      icon: <Users className="w-8 h-8 text-red-600" />,
      title: "Doctor Directory",
      description: "Browse qualified healthcare professionals by specialty",
      path: "/doctor-directory",
    },
    {
      icon: <Activity className="w-8 h-8 text-teal-600" />,
      title: "Health Monitoring",
      description:
        "Track your health metrics and receive personalized insights",
      path: "/health-monitoring",
    },
  ]

  return (
    <div>
      <Header />
      <Hero />

      {/* feature section  */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Healthcare Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of healthcare with our AI-powered platform
            designed to make medical care more accessible and efficient.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              onClick={() => navigate.push(feature.path)}
            />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home
