"use client"

import { useResume } from "@/components/ResumeContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus, GripVertical } from "lucide-react"
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

function SortableEducationItem({ edu, index, removeEducation, updateEducation }: any) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: edu.id })

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
                    Education {index + 1}
                </CardTitle>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeEducation(edu.id)}
                    aria-label="Remove Education"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="space-y-4 px-6 pb-6 pt-4 bg-white/40">
                <div className="space-y-2">
                    <Label htmlFor={`school-${edu.id}`} className="text-[#3b2a1f] font-medium">School / University</Label>
                    <Input
                        id={`school-${edu.id}`}
                        placeholder="University of Technology"
                        value={edu.school}
                        onChange={(e) => updateEducation(edu.id, { school: e.target.value })}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor={`degree-${edu.id}`} className="text-[#3b2a1f] font-medium">Degree / Major</Label>
                        <Input
                            id={`degree-${edu.id}`}
                            placeholder="B.S. Computer Science"
                            value={edu.degree}
                            onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor={`year-${edu.id}`} className="text-[#3b2a1f] font-medium">Graduation Year</Label>
                        <Input
                            id={`year-${edu.id}`}
                            placeholder="2020 - 2024"
                            value={edu.year}
                            onChange={(e) => updateEducation(edu.id, { year: e.target.value })}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export function EducationForm() {
    const { resumeData, addEducation, updateEducation, removeEducation, reorderEducation } = useResume()
    const { education } = resumeData

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const handleDragEnd = (event: any) => {
        const { active, over } = event

        if (active.id !== over.id) {
            const oldIndex = education.findIndex((edu) => edu.id === active.id)
            const newIndex = education.findIndex((edu) => edu.id === over.id)
            reorderEducation(oldIndex, newIndex)
        }
    }

    return (
        <Card className="border-0 shadow-none bg-transparent">
            <CardHeader className="px-0 pt-0 pb-6 border-b border-black/5 mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-xl text-[#3b2a1f]">Education</CardTitle>
                        <CardDescription className="text-[#8a7360] font-medium mt-1">
                            Add your educational background.
                        </CardDescription>
                    </div>
                    <Button onClick={addEducation} size="sm" variant="outline" className="gap-2 cursor-pointer border-black/10 bg-white/60 hover:bg-white text-[#5a3e2b] rounded-xl hover:shadow-md transition-all">
                        <Plus className="h-4 w-4" />
                        Add Education
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="px-0">
                {education.length === 0 ? (
                    <div className="text-center py-10 text-[#8a7360] bg-white/40 border border-[#c9a27c]/30 border-dashed rounded-2xl glass-panel font-medium">
                        No education added yet. Click "Add Education" to start logging your academic history.
                    </div>
                ) : (
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={education.map((e) => e.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <div className="space-y-6">
                                {education.map((edu, index) => (
                                    <SortableEducationItem
                                        key={edu.id}
                                        edu={edu}
                                        index={index}
                                        removeEducation={removeEducation}
                                        updateEducation={updateEducation}
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
