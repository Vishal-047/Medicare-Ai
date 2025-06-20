"use client";
import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Clock, Star, Navigation, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";

const FindCare = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const hospitals = [
    {
      id: 1,
      name: "City General Hospital",
      type: "General Hospital",
      rating: 4.8,
      distance: "1.2 miles",
      address: "123 Medical Center Drive, City, ST 12345",
      phone: "(555) 123-4567",
      hours: "24/7 Emergency",
      specialties: ["Emergency", "Cardiology", "Orthopedics", "ICU"],
      waitTime: "15 min"
    },
    {
      id: 2,
      name: "Advanced Cardiac Center",
      type: "Specialty Hospital",
      rating: 4.9,
      distance: "2.1 miles",
      address: "456 Heart Avenue, City, ST 12345",
      phone: "(555) 234-5678",
      hours: "Mon-Fri 8AM-6PM",
      specialties: ["Cardiology", "Cardiac Surgery", "Vascular"],
      waitTime: "30 min"
    },
    {
      id: 3,
      name: "Community Health Clinic",
      type: "Clinic",
      rating: 4.5,
      distance: "0.8 miles",
      address: "789 Community Street, City, ST 12345",
      phone: "(555) 345-6789",
      hours: "Mon-Sat 8AM-8PM",
      specialties: ["Family Medicine", "Pediatrics", "Urgent Care"],
      waitTime: "20 min"
    },
    {
      id: 4,
      name: "Regional Cancer Institute",
      type: "Specialty Hospital",
      rating: 4.7,
      distance: "3.5 miles",
      address: "321 Hope Boulevard, City, ST 12345",
      phone: "(555) 456-7890",
      hours: "Mon-Fri 7AM-7PM",
      specialties: ["Oncology", "Radiation Therapy", "Chemotherapy"],
      waitTime: "45 min"
    }
  ];

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Family Medicine",
      rating: 4.9,
      distance: "1.5 miles",
      hospital: "City General Hospital",
      phone: "(555) 111-2222",
      nextAvailable: "Today 2:30 PM",
      experience: "15 years"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Cardiology",
      rating: 4.8,
      distance: "2.1 miles",
      hospital: "Advanced Cardiac Center",
      phone: "(555) 222-3333",
      nextAvailable: "Tomorrow 10:00 AM",
      experience: "20 years"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrics",
      rating: 4.9,
      distance: "0.8 miles",
      hospital: "Community Health Clinic",
      phone: "(555) 333-4444",
      nextAvailable: "Today 4:15 PM",
      experience: "12 years"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Healthcare Near You</h1>
          <p className="text-xl text-gray-600">Locate hospitals, clinics, and healthcare providers in your area</p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Input
                placeholder="Enter your location or zip code"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Type of care" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="hospital">Hospitals</SelectItem>
                <SelectItem value="clinic">Clinics</SelectItem>
                <SelectItem value="urgent">Urgent Care</SelectItem>
                <SelectItem value="specialty">Specialty Centers</SelectItem>
              </SelectContent>
            </Select>
            <Button className="w-full">
              <MapPin className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Hospitals Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Nearby Hospitals</h2>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            <div className="space-y-4">
              {hospitals.map((hospital) => (
                <Card key={hospital.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{hospital.name}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <Badge variant="secondary" className="mr-2">{hospital.type}</Badge>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span className="text-sm">{hospital.rating}</span>
                          </div>
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-blue-600">{hospital.distance}</div>
                        <div className="text-xs text-gray-500">Wait: {hospital.waitTime}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {hospital.address}
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        {hospital.phone}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {hospital.hours}
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="text-xs text-gray-500 mb-2">Specialties:</div>
                      <div className="flex flex-wrap gap-1">
                        {hospital.specialties.map((specialty, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button size="sm" className="flex-1">
                        <Navigation className="w-4 h-4 mr-2" />
                        Directions
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Doctors Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Available Doctors</h2>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            <div className="space-y-4">
              {doctors.map((doctor) => (
                <Card key={doctor.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{doctor.name}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <Badge variant="secondary" className="mr-2">{doctor.specialty}</Badge>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span className="text-sm">{doctor.rating}</span>
                          </div>
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-blue-600">{doctor.distance}</div>
                        <div className="text-xs text-gray-500">{doctor.experience}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {doctor.hospital}
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        {doctor.phone}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        Next available: {doctor.nextAvailable}
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button size="sm" className="flex-1">
                        Book Appointment
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindCare;
