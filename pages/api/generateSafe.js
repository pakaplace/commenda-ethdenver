import { useSession, getSession } from 'next-auth/react';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { PDFNet } from '@pdftron/pdfnet-node';
import path from 'path';

const extraSpaces = (string, targetSize) => ' '.repeat(Math.max(0, targetSize - string.length));

const generateSafe = async (req, res) => {
  try {
    const sessionFuture = getSession({ req });
    console.log('Got session:');
    const fs = require('fs');
    console.log(process.env);
    // TODO: Consider accelerating this by caching template on startup.
    fs.readFile(process.env.SAFE_TEMPLATE_PATH, 'binary', (err, safe_template) => {
      if (err) {
        console.error(`Error reading file: ${err}`);
        return res.status(500).json({ error: error.message || error.toString() });
      }
      console.log('Read File:');
      sessionFuture.then((session) => {
        if (!session) {
          console.log('Unauthenticated:');
          return res.status(403).json({ error: 'Unauthenticated' });
        }

        const zip = new PizZip(safe_template);

        const safe = new Docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true,
        });

        safe.render({
          companyName: req.body.companyName,
          stateOfIncorporation: req.body.stateOfIncorporation,
          incorporationDate: req.body.incorporationDate,
          companyAddress: req.body.companyAddress,

          purchaseDate: req.body.purchaseDate,
          purchaseAmount: req.body.purchaseAmount,
          valuationCap: req.body.valuationCap,

          // Underlined lines need to have the line continue to the end of the page:
          investorName: req.body.investorName + extraSpaces(req.body.investorName, 61),
          investorTitle: req.body.investorTitle + extraSpaces(req.body.investorTitle.length, 62),
          investorEmail: req.body.investorEmail + extraSpaces(req.body.investorEmail.length, 40),
          investorAddress: req.body.investorAddress,

          companyRepresentativeName: req.body.companyRepresentativeName,
          companyRepresentativeTitle: req.body.companyRepresentativeTitle,
          companyRepresentativeEmail: req.body.companyRepresentativeEmail + extraSpaces(req.body.investorEmail.length, 40),

        });

        const buf = safe.getZip().generate({
          type: 'nodebuffer',
          // compression: DEFLATE adds a compression step.
          // For a 50MB output document, expect 500ms additional CPU time
          compression: 'DEFLATE',
        });

        console.log('Converted File:');
        // buf is a nodejs Buffer, you can either write it to a file or res.send it with express for example.
        // fs.writeFileSync(path.resolve(__dirname, "output.docx"), buf,);
        fs.writeFileSync(process.env.SAFE_OUTPUT_PATH, buf);
        console.log('Wrote Out File:');

        // TODO: Find a better way to do this.
        // safe_template = safe_template.replace(/{companyName}/g, req.body.companyName);
        // safe_template = safe_template.replace(/{companyAddress}/g, req.body.companyAddress);
        // safe_template = safe_template.replace(/{stateOfIncorporation}/g, req.body.stateOfIncorporation);
        // safe_template = safe_template.replace(/{incorporationDate}/g, req.body.incorporationDate);
        // safe_template = safe_template.replace(/{c}/g, req.body.investorName);
        // safe_template = safe_template.replace(/{investorTitle}/g, req.body.investorTitle);
        // safe_template = safe_template.replace(/{investorEmail}/g, req.body.investorEmail);
        // safe_template = safe_template.replace(/{investorAddress}/g, req.body.investorAddress);
        // safe_template = safe_template.replace(/{companyRepresentativeName}/g, req.body.companyRepresentativeName);
        // safe_template = safe_template.replace(/{companyRepresentativeTitle}/g, req.body.companyRepresentativeTitle);
        // safe_template = safe_template.replace(/{companyRepresentativeEmail}/g, req.body.companyRepresentativeEmail);
        // safe_template = safe_template.replace(/{purchaseDate}/g, req.body.purchaseDate);

        // if (req.body.valuationCap != null) {
        //     safe_template = safe_template.replace(/{valuationCap}/g, req.body.valuationCap);
        // }

        return res.status(201).setHeader('location', '/');
      });
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() });
  }
};

export default generateSafe;
