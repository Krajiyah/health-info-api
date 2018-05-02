// DEPENDENCIES
const PDFDocument = require("pdfkit");
const fs = require("fs");

// CONSTANTS
const tmpFile = "/tmp/medicalInfo.pdf";
const coverPageFontSize = 30;
const imageMargin = 150;
const imageWidth = 100;
const imageHeight = 100;
const titleFontSize = 25;
const titleMargin = 70;
const textFontSize = 14;
const paragraphMargin = 25;
const centerX = 250;
const topY = 50;
const textX = 100;

// PROTOTYPES
PDFDocument.prototype.addTitlePage = function(imageFile, text) {
  this.image(imageFile, centerX, topY, {
    fit: [imageWidth, imageHeight]
  });
  this.fontSize(coverPageFontSize).text(text, textX, topY + imageMargin);
}

PDFDocument.prototype.addFormattedPage = function(title, paragraphs) {
  let doc = this.addPage();
  doc.fontSize(titleFontSize).text(title, centerX, topY);
  let currY = topY + titleMargin;
  paragraphs.forEach((p, i, arr) => {
    let f = doc.fontSize(textFontSize)
    if (i == 0) f.text(p, textX, currY);
    else f.text(p);
    doc.moveDown();
  });
}

// STATICS
PDFDocument.genFormattedDoc = (appIcon, coverPageText, pages) => {
  let doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(tmpFile));
  doc.addTitlePage(appIcon, coverPageText);
  pages.forEach(page => doc.addFormattedPage(page.title, page.paragraphs));
  doc.end()
  return tmpFile;
}

// EXPORTS
module.exports = PDFDocument;
