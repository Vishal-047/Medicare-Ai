"use client";
import React from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Clock, Users, Activity } from "lucide-react";
import { useRouter } from "next/navigation"

const Hero = () => {
  const navigate = useRouter();
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              AI-Powered
              <span className="text-blue-600 block">Medical Care</span>
              at Your Fingertips
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Get instant medical insights with speech recognition, find nearby
              healthcare providers, and manage your medical records with our
              advanced AI-powered platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => navigate.push("/speech-analysis")}
              >
                Start Voice Analysis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate.push("/find-care")}
              >
                Find Care Nearby
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-green-600" />
                <span className="text-sm font-medium text-gray-700">
                  DISHA Compliant
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-6 h-6 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">
                  24/7 Available
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="w-6 h-6 text-purple-600" />
                <span className="text-sm font-medium text-gray-700">
                  Expert Network
                </span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Activity className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Your Health Assistant
                </h3>
                <p className="text-gray-600">
                  Always ready to help with your medical needs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
