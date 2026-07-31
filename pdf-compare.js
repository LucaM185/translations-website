import * as pdfjsLib from "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.min.mjs";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs";

const PDFS = {
  en: "assets/industrial_machine_translation_stress_test_final.pdf",
  it: "assets/industrial_machine_translation_stress_test_final_Italiano.pdf",
};

const SCALE = 1.35;
const PAGES = [3, 4, 5];

async function renderPage(pdf, pageNum, scale) {
  const page = await pdf.getPage(pageNum);
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  await page.render({ canvasContext: ctx, viewport }).promise;
  return canvas;
}

async function loadPdf(url) {
  const task = pdfjsLib.getDocument(url);
  return task.promise;
}

function pageFigure(canvas) {
  const figure = document.createElement("figure");
  figure.className = "pdf-compare__page";
  figure.appendChild(canvas);
  return figure;
}

async function initPdfCompare() {
  const container = document.getElementById("pdf-compare-rows");
  if (!container) return;

  try {
    const [pdfEn, pdfIt] = await Promise.all([
      loadPdf(PDFS.en),
      loadPdf(PDFS.it),
    ]);

    container.replaceChildren();

    for (const i of PAGES) {
      if (i > pdfEn.numPages && i > pdfIt.numPages) continue;

      const row = document.createElement("div");
      row.className = "pdf-compare__row";

      const [canvasEn, canvasIt] = await Promise.all([
        i <= pdfEn.numPages ? renderPage(pdfEn, i, SCALE) : null,
        i <= pdfIt.numPages ? renderPage(pdfIt, i, SCALE) : null,
      ]);

      if (canvasEn) row.appendChild(pageFigure(canvasEn));
      else row.appendChild(document.createElement("div"));

      if (canvasIt) row.appendChild(pageFigure(canvasIt));
      else row.appendChild(document.createElement("div"));

      container.appendChild(row);
    }
  } catch (err) {
    console.error(err);
    container.innerHTML =
      '<p class="pdf-compare__error">Could not load the comparison documents.</p>';
  }
}

initPdfCompare();
