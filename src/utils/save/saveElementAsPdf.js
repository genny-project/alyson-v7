import html2pdf from 'html2pdf.js';
import uuid from 'uuid';

const saveElementAsPdf = ( element, options = {}) => {
  const {
    fileName, // eslint-disable-line
  } = options;

  if ( !element ) {
    console.warn( 'Error: Element not found' ); // eslint-disable-line

    return ;
  }

  const opt = {
    filename: `internmatch-${uuid()}.pdf`,
    jsPDF: { orientation: 'landscape' },
  };

  html2pdf().set( opt ).from( element ).save();

    // html2pdf().from( element ).toPdf().outputImg( 'img' )
    //   .then(( pdf ) => {
    //     var file = pdf;

    //             // The PDF has been converted to a Data URI string and passed to this function.
    //             // Use pdfAsString however you like (send as email, etc)! For instance:
    //     console.log({ file });
    //   });
    // .save();
} ;

export default saveElementAsPdf;
