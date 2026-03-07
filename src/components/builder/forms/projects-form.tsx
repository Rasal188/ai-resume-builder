"use client"

import { useState } from "react"
import { useResume } from "@/components/ResumeContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Trash2, Plus, Sparkles, Loader2, GripVertical, Link as LinkIcon } from "lucide-react"
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

function SortableProjectItem({ proj, index, removeProject, updateProject, generatingFor, handleEnhance }: any) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: proj.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 2 : 1,
        opacity: isDragging ? 0.8 : 1,
    }

    return (
        <Card ref={setNodeRef} style={style} className={`relative overflow-hidden group glass-panel border border-primary/5 transition-all duration-300 ${isDragging ? 'shadow-xl shadow-accent/20 scale-[1.02]' : 'shadow-sm mouse-tilt hover:shadow-md'}`}>
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent" />
            <CardHeader className="pt-4 pb-2 px-6 flex flex-row items-center justify-between space-y-0 border-b border-primary/5 bg-white/30">
                <CardTitle className="text-sm font-bold text-primary flex items-center gap-2">
                    <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-1.5 -ml-1 hover:bg-muted/50 rounded-md transition-colors text-secondary">
                        <GripVertical className="h-4 w-4" />
                    </div>
                    Project {index + 1}
                </CardTitle>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeProject(proj.id)}
                    aria-label="Remove Project"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="space-y-4 px-6 pb-6 pt-5 bg-card">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <Label htmlFor={`title-${proj.id}`} className="text-primary font-semibold">Project Name/Title</Label>
                        <Input
                            id={`title-${proj.id}`}
                            placeholder="E-commerce Platform"
                            value={proj.title}
                            onChange={(e) => updateProject(proj.id, { title: e.target.value })}
                            className="bg-white/60 border-primary/10 focus-visible:ring-accent rounded-xl"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor={`technologies-${proj.id}`} className="text-primary font-semibold">Technologies Used</Label>
                        <Input
                            id={`technologies-${proj.id}`}
                            placeholder="React, Node.js, PostgreSQL"
                            value={proj.technologies}
                            onChange={(e) => updateProject(proj.id, { technologies: e.target.value })}
                            className="bg-white/60 border-primary/10 focus-visible:ring-accent rounded-xl"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor={`link-${proj.id}`} className="text-primary font-semibold">Project Link (Optional)</Label>
                    <div className="relative">
                        <LinkIcon className="absolute left-3.5 top-3 h-4 w-4 text-secondary/60" />
                        <Input
                            id={`link-${proj.id}`}
                            placeholder="https://github.com/..."
                            value={proj.link || ""}
                            className="pl-10 bg-white/60 border-primary/10 focus-visible:ring-accent rounded-xl"
                            onChange={(e) => updateProject(proj.id, { link: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor={`description-${proj.id}`} className="text-primary font-semibold">Description</Label>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-3 text-xs text-primary hover:bg-accent/20 font-semibold rounded-full transition-all gap-1.5"
                            disabled={generatingFor === proj.id || (!proj.title && !proj.technologies)}
                            onClick={() => handleEnhance(proj.id)}
                        >
                            {generatingFor === proj.id ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                                <Sparkles className="h-3.5 w-3.5 text-secondary" />
                            )}
                            Generate w/ AI
                        </Button>
                    </div>
                    <Textarea
                        id={`description-${proj.id}`}
                        placeholder="Briefly describe the purpose of the project and its impact..."
                        value={proj.description}
                        onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                        className="min-h-[100px] border-primary/10 bg-white/60 focus-visible:ring-accent rounded-xl text-primary placeholder:text-secondary/60 transition-all font-medium"
                    />
                </div>
            </CardContent>
        </Card>
    )
}

export function ProjectsForm() {
    const { resumeData, addProject, updateProject, removeProject, reorderProject } = useResume()
    const { projects = [] } = resumeData
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
            const oldIndex = projects.findIndex((proj) => proj.id === active.id)
            const newIndex = projects.findIndex((proj) => proj.id === over.id)
            reorderProject(oldIndex, newIndex)
        }
    }

    const handleEnhance = async (id: string) => {
        const targetProject = projects.find(p => p.id === id)
        if (!targetProject) return

        if (!targetProject.title && !targetProject.technologies) {
            toast.error("Please provide a project title or technologies to generate a description.")
            return
        }

        setGeneratingFor(id)

        try {
            const response = await fetch("/api/generate-project-description", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: targetProject.title,
                    technologies: targetProject.technologies,
                    existingDescription: targetProject.description
                }),
            })

            if (!response.ok) {
                throw new Error("Failed to generate description")
            }

            const data = await response.json()
            updateProject(id, { description: data.description })
            toast.success("Project description generated successfully!")
        } catch (error) {
            console.error(error)
            toast.error("Failed to generate project description with AI.")
        } finally {
            setGeneratingFor(null)
        }
    }

    return (
        <Card className="border-0 shadow-none bg-transparent">
            <CardHeader className="px-0 pt-0 pb-6 border-b border-black/5 mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-xl text-[#3b2a1f]">Projects</CardTitle>
                        <CardDescription className="text-[#8a7360] font-medium mt-1">
                            Add relevant side projects or portfolio pieces.
                        </CardDescription>
                    </div>
                    <Button onClick={addProject} size="sm" variant="outline" className="gap-2 cursor-pointer border-black/10 bg-white/60 hover:bg-white text-[#5a3e2b] rounded-xl hover:shadow-md transition-all">
                        <Plus className="h-4 w-4" />
                        Add Project
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="px-0">
                {projects.length === 0 ? (
                    <div className="text-center py-10 text-[#8a7360] bg-white/40 border border-[#c9a27c]/30 border-dashed rounded-2xl glass-panel font-medium">
                        No projects added yet. Click "Add Project" to start building your portfolio.
                    </div>
                ) : (
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={projects.map(p => p.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <div className="space-y-6">
                                {projects.map((proj, index) => (
                                    <SortableProjectItem
                                        key={proj.id}
                                        proj={proj}
                                        index={index}
                                        removeProject={removeProject}
                                        updateProject={updateProject}
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
