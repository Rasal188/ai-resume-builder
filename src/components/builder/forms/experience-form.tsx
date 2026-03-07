"use client"

import { useState } from "react"
import { useResume } from "@/components/ResumeContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Trash2, Plus, Sparkles, Loader2, GripVertical } from "lucide-react"
import { toast } from "sonner"
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core"
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

function SortableExperienceItem({ exp, index, removeExperience, updateExperience, generatingFor, handleEnhance }: any) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: exp.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 2 : 1,
        opacity: isDragging ? 0.8 : 1,
    }

    return (
        <Card ref={setNodeRef} style={style} className={`relative overflow-hidden group glass-panel border border-black/5 transition-all ${isDragging ? 'shadow-xl shadow-[#c9a27c]/20 scale-[1.02]' : 'shadow-sm mouse-tilt'}`}>
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#c9a27c]" />
            <CardHeader className="pt-4 pb-2 px-6 flex flex-row items-center justify-between space-y-0 bg-[#f5f1e8]/50 border-b border-black/5">
                <CardTitle className="text-sm font-bold text-[#3b2a1f] flex items-center gap-2">
                    <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-1.5 -ml-1 hover:bg-black/5 rounded-md transition-colors">
                        <GripVertical className="h-4 w-4 text-[#8a7360]" />
                    </div>
                    Experience {index + 1}
                </CardTitle>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeExperience(exp.id)}
                    aria-label="Remove Experience"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="space-y-4 px-6 pb-6 pt-4 bg-white/40">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor={`jobTitle-${exp.id}`} className="text-[#3b2a1f] font-medium">Job Title</Label>
                        <Input
                            id={`jobTitle-${exp.id}`}
                            placeholder="Senior Developer"
                            value={exp.jobTitle}
                            onChange={(e) => updateExperience(exp.id, { jobTitle: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor={`company-${exp.id}`} className="text-[#3b2a1f] font-medium">Company</Label>
                        <Input
                            id={`company-${exp.id}`}
                            placeholder="Tech Corp Inc."
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor={`startDate-${exp.id}`} className="text-[#3b2a1f] font-medium">Start Date</Label>
                        <Input
                            id={`startDate-${exp.id}`}
                            type="month"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor={`endDate-${exp.id}`} className="text-[#3b2a1f] font-medium">End Date</Label>
                        <Input
                            id={`endDate-${exp.id}`}
                            type="month"
                            value={exp.endDate}
                            onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor={`description-${exp.id}`} className="text-[#3b2a1f] font-medium">Description</Label>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-3 text-xs text-[#5a3e2b] hover:bg-[#c9a27c]/20 font-medium rounded-full transition-all gap-1.5"
                            disabled={generatingFor === exp.id || !exp.description}
                            onClick={() => handleEnhance(exp.id, exp.description, exp.jobTitle)}
                        >
                            {generatingFor === exp.id ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                                <Sparkles className="h-3.5 w-3.5 text-[#c9a27c]" />
                            )}
                            Enhance w/ AI
                        </Button>
                    </div>
                    <Textarea
                        id={`description-${exp.id}`}
                        placeholder="Briefly describe what you did..."
                        value={exp.description}
                        onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                        className="min-h-[100px] border-black/5 bg-white/80 focus-visible:ring-[#c9a27c] focus-visible:border-[#c9a27c] rounded-xl text-[#3b2a1f] placeholder:text-[#8a7360] transition-all"
                    />
                </div>
            </CardContent>
        </Card>
    )
}


export function ExperienceForm() {
    const { resumeData, addExperience, updateExperience, removeExperience, reorderExperience } = useResume()
    const { experience } = resumeData
    const [generatingFor, setGeneratingFor] = useState<string | null>(null)

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const handleDragEnd = (event: any) => {
        const { active, over } = event

        if (active.id !== over.id) {
            const oldIndex = experience.findIndex((exp) => exp.id === active.id)
            const newIndex = experience.findIndex((exp) => exp.id === over.id)
            reorderExperience(oldIndex, newIndex)
        }
    }

    const handleEnhance = async (id: string, description: string, jobTitle: string) => {
        if (!description || description.trim().length < 10) {
            toast.error("Please provide a basic description (at least 10 characters) to enhance.")
            return
        }

        setGeneratingFor(id)

        try {
            const response = await fetch("/api/enhance-description", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ description, jobTitle }),
            })

            if (!response.ok) {
                throw new Error("Failed to enhance description")
            }

            const data = await response.json()
            updateExperience(id, { description: data.enhanced })
            toast.success("Description enhanced successfully!")
        } catch (error) {
            console.error(error)
            toast.error("Failed to enhance description with AI.")
        } finally {
            setGeneratingFor(null)
        }
    }

    return (
        <Card className="border-0 shadow-none bg-transparent">
            <CardHeader className="px-0 pt-0 pb-6 border-b border-black/5 mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-xl text-[#3b2a1f]">Work Experience</CardTitle>
                        <CardDescription className="text-[#8a7360] font-medium mt-1">
                            Add your relevant professional experience.
                        </CardDescription>
                    </div>
                    <Button onClick={addExperience} size="sm" variant="outline" className="gap-2 cursor-pointer border-black/10 bg-white/60 hover:bg-white text-[#5a3e2b] rounded-xl hover:shadow-md transition-all">
                        <Plus className="h-4 w-4" />
                        Add Experience
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="px-0">
                {experience.length === 0 ? (
                    <div className="text-center py-10 text-[#8a7360] bg-white/40 border border-[#c9a27c]/30 border-dashed rounded-2xl glass-panel font-medium">
                        No experience added yet. Click "Add Experience" to start outlining your career history.
                    </div>
                ) : (
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={experience.map(e => e.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <div className="space-y-6">
                                {experience.map((exp, index) => (
                                    <SortableExperienceItem
                                        key={exp.id}
                                        exp={exp}
                                        index={index}
                                        removeExperience={removeExperience}
                                        updateExperience={updateExperience}
                                        generatingFor={generatingFor}
                                        handleEnhance={handleEnhance}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                )}
            </CardContent>
        </Card>
    )
}
