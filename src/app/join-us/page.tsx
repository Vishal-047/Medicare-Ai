"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from '@/components/ui/checkbox';

export default function JoinUsPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    // Verification
    medicalCouncilRegistrationNumber: '',
    mbbsCertificate: null,
    pgDegree: null,
    superSpecialtyDegree: null,
    governmentId: null,
    professionalHeadshot: null,
    // Public Profile
    fullName: '',
    primarySpecialty: '',
    yearsOfExperience: '',
    clinicName: '',
    clinicAddress: '',
    clinicContact: '',
    consultationTimings: '',
    consultationFees: '',
    servicesOffered: '',
    professionalBio: '',
    languagesSpoken: '',
    // Admin & Financial
    professionalEmail: '',
    privateContactNumber: '',
    panNumber: '',
    bankAccountNumber: '',
    ifscCode: '',
    agreedToTerms: false,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    }
  };
  
  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, agreedToTerms: checked }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.agreedToTerms) {
        toast({
            title: "Agreement Required",
            description: "You must agree to the Terms of Service to proceed.",
            variant: "destructive",
        });
        setLoading(false);
        return;
    }

    // Simulate API call for form submission. In a real app, this would be a multipart/form-data POST request.
    console.log('Submitting new doctor credentials for verification:', formData);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay

    setLoading(false);
    toast({
      title: "Submission Successful!",
      description: "Thank you for submitting your credentials. Our team will review them and get back to you within 3-5 business days.",
    });

    // Reset form
    setFormData({
        medicalCouncilRegistrationNumber: '', mbbsCertificate: null, pgDegree: null, superSpecialtyDegree: null, governmentId: null, professionalHeadshot: null,
        fullName: '', primarySpecialty: '', yearsOfExperience: '', clinicName: '', clinicAddress: '', clinicContact: '', consultationTimings: '', consultationFees: '', servicesOffered: '', professionalBio: '', languagesSpoken: '',
        professionalEmail: '', privateContactNumber: '', panNumber: '', bankAccountNumber: '', ifscCode: '', agreedToTerms: false,
    });
    // You might need to manually reset the file input fields if the browser doesn't do it automatically
    (e.target as HTMLFormElement).reset();
  };

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">Join Our Team of Healthcare Professionals</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Submit your credentials for verification to begin your journey with MediCare AI.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Doctor Verification Form</CardTitle>
            <CardDescription>Please provide accurate information. Fields marked with an asterisk (*) are mandatory.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* 1. Essential for Verification */}
              <fieldset className="space-y-4">
                <legend className="text-xl font-semibold border-b pb-2 w-full">1. Essential for Verification*</legend>
                <div>
                  <label htmlFor="medicalCouncilRegistrationNumber">Medical Council Registration Number*</label>
                  <Input id="medicalCouncilRegistrationNumber" name="medicalCouncilRegistrationNumber" value={formData.medicalCouncilRegistrationNumber} onChange={handleChange} required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="mbbsCertificate">MBBS Certificate*</label>
                    <Input id="mbbsCertificate" name="mbbsCertificate" type="file" onChange={handleFileChange} required className="pt-2" />
                  </div>
                  <div>
                    <label htmlFor="pgDegree">Post-Graduate Degree (MD/MS/DNB)*</label>
                    <Input id="pgDegree" name="pgDegree" type="file" onChange={handleFileChange} required className="pt-2" />
                  </div>
                  <div>
                    <label htmlFor="superSpecialtyDegree">Super-Specialty Degree (DM/MCh) (if applicable)</label>
                    <Input id="superSpecialtyDegree" name="superSpecialtyDegree" type="file" onChange={handleFileChange} className="pt-2" />
                  </div>
                  <div>
                    <label htmlFor="governmentId">Government-Issued Photo ID (Aadhaar/PAN)*</label>
                    <Input id="governmentId" name="governmentId" type="file" onChange={handleFileChange} required className="pt-2" />
                  </div>
                   <div>
                    <label htmlFor="professionalHeadshot">Professional Headshot*</label>
                    <Input id="professionalHeadshot" name="professionalHeadshot" type="file" onChange={handleFileChange} required className="pt-2" />
                  </div>
                </div>
              </fieldset>

              {/* 2. For Their Public Profile */}
              <fieldset className="space-y-4">
                <legend className="text-xl font-semibold border-b pb-2 w-full">2. For Your Public Profile</legend>
                 <div>
                    <label htmlFor="fullName">Full Name (e.g., Dr. First Last)*</label>
                    <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="primarySpecialty">Primary Specialty*</label>
                    <Input id="primarySpecialty" name="primarySpecialty" placeholder="e.g., Cardiologist" value={formData.primarySpecialty} onChange={handleChange} required />
                  </div>
                  <div>
                    <label htmlFor="yearsOfExperience">Years of Experience*</label>
                    <Input id="yearsOfExperience" name="yearsOfExperience" type="number" value={formData.yearsOfExperience} onChange={handleChange} required />
                  </div>
                </div>
                <div>
                  <label htmlFor="clinicAddress">Primary Clinic / Hospital Name & Address*</label>
                  <Textarea id="clinicAddress" name="clinicAddress" value={formData.clinicAddress} onChange={handleChange} required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="consultationTimings">Consultation Timings*</label>
                        <Input id="consultationTimings" name="consultationTimings" placeholder="e.g., Mon-Fri, 10am-5pm" value={formData.consultationTimings} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="consultationFees">Consultation Fees (INR)*</label>
                        <Input id="consultationFees" name="consultationFees" type="number" value={formData.consultationFees} onChange={handleChange} required />
                    </div>
                </div>
                <div>
                    <label htmlFor="servicesOffered">Services Offered*</label>
                    <Textarea id="servicesOffered" name="servicesOffered" placeholder="List key services, e.g., Acne Treatment, ECG, Pediatric Vaccinations" value={formData.servicesOffered} onChange={handleChange} required />
                </div>
                <div>
                  <label htmlFor="professionalBio">Professional Biography*</label>
                  <Textarea id="professionalBio" name="professionalBio" value={formData.professionalBio} onChange={handleChange} required />
                </div>
                <div>
                  <label htmlFor="languagesSpoken">Languages Spoken*</label>
                  <Input id="languagesSpoken" name="languagesSpoken" placeholder="e.g., Hindi, English, Marathi" value={formData.languagesSpoken} onChange={handleChange} required />
                </div>
              </fieldset>

              {/* 3. Administrative & Financial Information */}
              <fieldset className="space-y-4">
                <legend className="text-xl font-semibold border-b pb-2 w-full">3. Administrative & Financial Information</legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="professionalEmail">Professional Email Address*</label>
                    <Input id="professionalEmail" name="professionalEmail" type="email" value={formData.professionalEmail} onChange={handleChange} required />
                  </div>
                  <div>
                    <label htmlFor="privateContactNumber">Private Contact Number*</label>
                    <Input id="privateContactNumber" name="privateContactNumber" value={formData.privateContactNumber} onChange={handleChange} required />
                  </div>
                  <div>
                    <label htmlFor="panNumber">PAN Card Number*</label>
                    <Input id="panNumber" name="panNumber" value={formData.panNumber} onChange={handleChange} required />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="bankAccountNumber">Bank Account Number*</label>
                    <Input id="bankAccountNumber" name="bankAccountNumber" value={formData.bankAccountNumber} onChange={handleChange} required />
                  </div>
                  <div>
                    <label htmlFor="ifscCode">IFSC Code*</label>
                    <Input id="ifscCode" name="ifscCode" value={formData.ifscCode} onChange={handleChange} required />
                  </div>
                </div>
              </fieldset>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" checked={formData.agreedToTerms} onCheckedChange={handleCheckboxChange} />
                <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  I agree to the Terms of Service and confirm that the information provided is accurate.
                </label>
              </div>

              <Button type="submit" className="w-full text-lg py-6" disabled={loading}>
                {loading ? 'Submitting for Verification...' : 'Submit Application'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  );
} 