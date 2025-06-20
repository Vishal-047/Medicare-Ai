"use client"
import { Button } from "./ui/button"
import { Activity } from "lucide-react"
import {useRouter} from "next/navigation";
import AuthModal from "./AuthModal";
import React from "react"

const Header = () => {
  const navigate = useRouter();
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Activity className="w-8 h-8 text-blue-600 mr-3" />
            <span className="text-2xl font-bold text-gray-900">
              MediCare AI
            </span>
          </div>
                    <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => navigate.push("/")}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => navigate.push("/find-care")}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Find Care
            </button>
            <button 
              onClick={() => navigate.push("/doctors")}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Doctors
            </button>
            <button 
              onClick={() => navigate.push("/medical-records")}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Records
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <AuthModal defaultTab="signin">
              <Button variant="outline">Sign In</Button>
            </AuthModal>
            <AuthModal defaultTab="signup">
              <Button>Get Started</Button>
            </AuthModal>
          </div>
        </div>
      </div>
    </header>
  )
}
export default Header
