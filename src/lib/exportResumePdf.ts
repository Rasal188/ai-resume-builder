"use client"

export async function exportResumePdf() {
    try {
        const html2canvas = (await import("html2canvas")).default
        const { jsPDF } = await import("jspdf")

        const element = document.getElementById("resume-preview")

        if (!element) {
            alert("Resume preview not found")
            return
        }

        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true
        })

        const imgData = canvas.toDataURL("image/png")

        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "px",
            format: [canvas.width, canvas.height]
        })

        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height)

        pdf.save("resume.pdf")

    } catch (error) {
        console.error("PDF export failed:", error)
        alert("Failed to export PDF")
    }
}