"use client"

import { useResume } from "@/components/ResumeContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2, GripVertical } from "lucide-react"

export function CertificationsForm() {
    const { resumeData, addCertification, updateCertification, removeCertification } = useResume()
    const { certifications } = resumeData

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                {certifications?.map((cert, index) => (
                    <Card key={cert.id} className="relative group border border-black/5 shadow-sm bg-white/40 overflow-hidden rounded-2xl transition-all hover:shadow-md hover:bg-white/60">
                        <div className="absolute left-0 top-0 bottom-0 w-8 bg-black/5 flex items-center justify-center cursor-move text-black/20 group-hover:bg-[#c9a27c]/10 group-hover:text-[#c9a27c] transition-colors">
                            <GripVertical className="h-4 w-4" />
                        </div>
                        <CardContent className="p-5 pl-12 space-y-4">
                            <div className="flex justify-between items-start">
                                <h4 className="font-semibold text-sm text-[#8a7360] uppercase tracking-wider">Certification {index + 1}</h4>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeCertification(cert.id)}
                                    className="h-8 w-8 text-red-400 hover:text-red-500 hover:bg-red-50 -mt-2 -mr-2 rounded-xl"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5 col-span-2">
                                    <label className="text-sm font-medium text-[#5a3e2b]">Certificate Name</label>
                                    <Input
                                        value={cert.name}
                                        onChange={(e) => updateCertification(cert.id, { name: e.target.value })}
                                        placeholder="e.g. AWS Certified Solutions Architect"
                                        className="bg-white/60 border-black/5 focus-visible:ring-[#c9a27c]"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-[#5a3e2b]">Organization</label>
                                    <Input
                                        value={cert.organization}
                                        onChange={(e) => updateCertification(cert.id, { organization: e.target.value })}
                                        placeholder="e.g. Amazon Web Services"
                                        className="bg-white/60 border-black/5 focus-visible:ring-[#c9a27c]"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-[#5a3e2b]">Year</label>
                                    <Input
                                        value={cert.year}
                                        onChange={(e) => updateCertification(cert.id, { year: e.target.value })}
                                        placeholder="e.g. 2024"
                                        className="bg-white/60 border-black/5 focus-visible:ring-[#c9a27c]"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Button
                onClick={addCertification}
                variant="outline"
                className="w-full h-12 border-dashed border-2 border-primary/20 bg-transparent hover:bg-primary/5 text-primary hover:text-primary transition-all rounded-2xl font-semibold shadow-sm"
            >
                <Plus className="mr-2 h-5 w-5" />
                Add Certification
            </Button>
        </div>
    )
}
