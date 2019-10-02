import html2pdf from 'html2pdf.js';
import uuid from 'uuid';
import store from '../../redux/store';

const saveElementAsPdf = ( element, options = {}) => {
  const {
    fileName, // eslint-disable-line
    code,
  } = options;

  // const element = originalElement.cloneNode( true );

  if ( !element ) {
    console.warn( 'Error: Element not found' ); // eslint-disable-line

    return ;
  }

  let currentMinWidth = null;

  if ( element.style.minWidth !== 'fit-content' ) {
    currentMinWidth = element.style.minWidth;
    element.style.minWidth = 'fit-content';
  }

  const keycloakData = store.getState().keycloak.data;
  const project = keycloakData.realm;

  const opt = {
    filename: `${project}-${code}-${uuid()}.pdf`,
    jsPDF: { orientation: 'landscape' },
    html2canvas: {
      // backgroundColor: 'red',
      width: element.scrollWidth, // has to be a number!
      onclone: () => {
        if ( currentMinWidth !== null ) {
          element.style.minWidth = currentMinWidth;
        }
      },
    },
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
