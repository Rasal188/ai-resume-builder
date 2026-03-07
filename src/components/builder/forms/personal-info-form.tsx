"use client"

import { useResume } from "@/components/ResumeContext"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function PersonalInfoForm() {
    const { resumeData, updatePersonalInfo } = useResume()
    const { personalInfo } = resumeData

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        updatePersonalInfo({ [name]: value })
    }

    return (
        <Card className="border-0 shadow-none bg-transparent">
            <CardHeader className="px-0 pt-0 pb-6 border-b border-black/5 mb-6">
                <CardTitle className="text-xl text-[#3b2a1f]">Personal Information</CardTitle>
                <CardDescription className="text-[#8a7360] font-medium mt-1">
                    Enter your contact details and current role.
                </CardDescription>
            </CardHeader>
            <CardContent className="px-0 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-[#3b2a1f] font-medium">First Name</Label>
                        <Input
                            id="firstName"
                            name="firstName"
                            placeholder="John"
                            value={personalInfo.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-[#3b2a1f] font-medium">Last Name</Label>
                        <Input
                            id="lastName"
                            name="lastName"
                            placeholder="Doe"
                            value={personalInfo.lastName}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="jobTitle" className="text-[#3b2a1f] font-medium">Job Title</Label>
                    <Input
                        id="jobTitle"
                        name="jobTitle"
                        placeholder="Full Stack Developer"
                        value={personalInfo.jobTitle}
                        onChange={handleChange}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-[#3b2a1f] font-medium">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john.doe@example.com"
                            value={personalInfo.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone" className="text-[#3b2a1f] font-medium">Phone</Label>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            value={personalInfo.phone}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="location" className="text-[#3b2a1f] font-medium">Location</Label>
                    <Input
                        id="location"
                        name="location"
                        placeholder="San Francisco, CA"
                        value={personalInfo.location}
                        onChange={handleChange}
                    />
                </div>
            </CardContent>
        </Card>
    )
}
