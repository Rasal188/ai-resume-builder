import puppeteer from "puppeteer";

export async function POST(req: Request) {
    try {
        const { html } = await req.json();

        if (!html) {
            return new Response(JSON.stringify({ error: "No HTML provided" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        const browser = await puppeteer.launch({
            headless: true
        });

        const page = await browser.newPage();

        await page.setContent(html, {
            waitUntil: "networkidle0"
        });

        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true
        });

        await browser.close();

        return new Response(Buffer.from(pdfBuffer), {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": "attachment; filename=resume.pdf"
            }
        });
    } catch (error: any) {
        console.error("PDF Export Error:", error);
        return new Response(JSON.stringify({ error: "Failed to generate PDF" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
