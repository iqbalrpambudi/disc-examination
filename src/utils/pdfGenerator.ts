import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Configure html2canvas to ignore unsupported color functions
const html2canvasOptions = {
  scale: 2, // Higher scale for better quality
  useCORS: true,
  logging: false,
  backgroundColor: "#ffffff",
};

export async function generatePDF(elementId: string): Promise<string> {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with ID ${elementId} not found`);
    }

    // Create canvas from the element
    const canvas = await html2canvas(element, html2canvasOptions);

    // A4 dimensions and margins
    const pageWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const margin = 20; // 20mm margins on all sides
    const contentWidth = pageWidth - margin * 2; // Available width for content
    const contentHeight = pageHeight - margin * 2; // Available height for content

    // Calculate dimensions to maintain aspect ratio within margins
    const imgHeight = (canvas.height * contentWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = margin; // Start position with top margin

    // Create PDF with A4 dimensions
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", margin, position, contentWidth, imgHeight);
    heightLeft -= contentHeight;

    // Add new pages if content overflows
    while (heightLeft >= 0) {
      position = margin - heightLeft; // Adjust position for new page with margin
      pdf.addPage();
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", margin, position, contentWidth, imgHeight);
      heightLeft -= contentHeight;
    }

    // Return as base64 string
    return pdf.output("datauristring").split(",")[1];
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
}

export async function generatePDFFromHTML(htmlContent: string): Promise<string> {
  try {
    // Create a temporary container element
    const tempContainer = document.createElement("div");
    tempContainer.innerHTML = htmlContent;
    tempContainer.style.position = "absolute";
    tempContainer.style.left = "-9999px";
    tempContainer.style.top = "0";
    tempContainer.style.width = "900px"; // Match the max-width from the template
    document.body.appendChild(tempContainer);

    // Create canvas from the temporary element
    const canvas = await html2canvas(tempContainer, html2canvasOptions);

    // A4 dimensions and margins
    const pageWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const margin = 20; // 20mm margins on all sides
    const contentWidth = pageWidth - margin * 2; // Available width for content
    const contentHeight = pageHeight - margin * 2; // Available height for content

    // Calculate dimensions to maintain aspect ratio within margins
    const imgHeight = (canvas.height * contentWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = margin; // Start position with top margin

    // Create PDF with A4 dimensions
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", margin, position, contentWidth, imgHeight);
    heightLeft -= contentHeight;

    // Add new pages if content overflows
    while (heightLeft >= 0) {
      position = margin - heightLeft; // Adjust position for new page with margin
      pdf.addPage();
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", margin, position, contentWidth, imgHeight);
      heightLeft -= contentHeight;
    }

    // Clean up temporary element
    document.body.removeChild(tempContainer);

    // Return as base64 string
    return pdf.output("datauristring").split(",")[1];
  } catch (error) {
    console.error("Error generating PDF from HTML:", error);
    throw error;
  }
}

export async function downloadPDFFromHTML(htmlContent: string, filename: string): Promise<void> {
  try {
    // Create a temporary container element
    const tempContainer = document.createElement("div");
    tempContainer.innerHTML = htmlContent;
    tempContainer.style.position = "absolute";
    tempContainer.style.left = "-9999px";
    tempContainer.style.top = "0";
    tempContainer.style.width = "900px"; // Match the max-width from the template
    document.body.appendChild(tempContainer);

    // Create canvas from the temporary element
    const canvas = await html2canvas(tempContainer, html2canvasOptions);

    // A4 dimensions and margins
    const pageWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const margin = 20; // 20mm margins on all sides
    const contentWidth = pageWidth - margin * 2; // Available width for content
    const contentHeight = pageHeight - margin * 2; // Available height for content

    // Calculate dimensions to maintain aspect ratio within margins
    const imgHeight = (canvas.height * contentWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = margin; // Start position with top margin

    // Create PDF
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", margin, position, contentWidth, imgHeight);
    heightLeft -= contentHeight;

    // Add new pages if content overflows
    while (heightLeft >= 0) {
      position = margin - heightLeft; // Adjust position for new page with margin
      pdf.addPage();
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", margin, position, contentWidth, imgHeight);
      heightLeft -= contentHeight;
    }

    // Clean up temporary element
    document.body.removeChild(tempContainer);

    // Download the PDF
    pdf.save(filename);
  } catch (error) {
    console.error("Error downloading PDF from HTML:", error);
    throw error;
  }
}

export async function downloadPDF(elementId: string, filename: string): Promise<void> {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with ID ${elementId} not found`);
    }

    // Create canvas from the element
    const canvas = await html2canvas(element, html2canvasOptions);

    // A4 dimensions and margins
    const pageWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const margin = 20; // 20mm margins on all sides
    const contentWidth = pageWidth - margin * 2; // Available width for content
    const contentHeight = pageHeight - margin * 2; // Available height for content

    // Calculate dimensions to maintain aspect ratio within margins
    const imgHeight = (canvas.height * contentWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = margin; // Start position with top margin

    // Create PDF
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", margin, position, contentWidth, imgHeight);
    heightLeft -= contentHeight;

    // Add new pages if content overflows
    while (heightLeft >= 0) {
      position = margin - heightLeft; // Adjust position for new page with margin
      pdf.addPage();
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", margin, position, contentWidth, imgHeight);
      heightLeft -= contentHeight;
    }

    // Download the PDF
    pdf.save(filename);
  } catch (error) {
    console.error("Error downloading PDF:", error);
    throw error;
  }
}
