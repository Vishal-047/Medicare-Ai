"use client"
import { Button } from "./ui/button"
import { Activity } from "lucide-react"
import { useRouter } from "next/navigation"
import AuthModal from "./AuthModal"
import { useSession, signOut } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

import React from "react"

const Header = () => {
  const navigate = useRouter()
  const { data: session } = useSession()
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer" onClick={() => navigate.push("/")}>
            <Activity className="w-8 h-8 text-blue-600 mr-3" />
            <span className="text-2xl font-bold text-gray-900">
              MediCare AI
            </span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => navigate.push("/")}
              className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => navigate.push("/find-care")}
              className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
            >
              Find Care
            </button>
            <button
              onClick={() => navigate.push("/doctor-directory")}
              className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
            >
              Doctors
            </button>
            <button
              onClick={() => navigate.push("/medical-records")}
              className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
            >
              Records
            </button>
            <button
              onClick={() => navigate.push("/medical-schemes")}
              className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
            >
              Schemes
            </button>
            <button
              onClick={() => navigate.push("/join-us")}
              className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
            >
              Join Us
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            {session ? (
              <div className="flex items-center space-x-4">
                <span className="font-medium text-gray-900">
                  {session.user?.name}
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-10 w-10 rounded-full"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={session.user?.image ?? undefined}
                          alt={session.user?.name ?? "User Avatar"}
                        />
                        <AvatarFallback>
                          {session.user?.name?.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => signOut()}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <AuthModal defaultTab="signin">
                  <Button variant="outline">Sign In</Button>
                </AuthModal>
                <AuthModal defaultTab="signup">
                  <Button>Get Started</Button>
                </AuthModal>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
export default Header
