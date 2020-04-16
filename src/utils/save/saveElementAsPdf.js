import html2pdf from 'html2pdf.js';
import uuid from 'uuid';
// import { Dimensions } from 'react-native-web';
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

  // let currentMinWidth = null;

  // if ( element.style.minWidth !== 'fit-content' ) {
  //   currentMinWidth = element.style.minWidth;
  //   element.style.minWidth = 'fit-content';
  // }

  const keycloakData = store.getState().keycloak.data;
  const project = keycloakData.realm;

  // const windowDimensions = Dimensions.get( 'window' );

  const opt = {
    filename: `${project}-${code}-${uuid()}.pdf`,
    jsPDF: {
      orientation: 'landscape',
      // orientation: 'portrait',
      unit: 'in',
      format: 'letter',
    },
    html2canvas: {
      scale: 2,
      // backgroundColor: 'red',
      // width: element.scrollWidth, // has to be a number!
      // onclone: ( arg ) => {
      //   console.log({ arg, element, style: element.style });

      //   console.warn({
      //     element: {
      //       minWidth: element.style.minWidth,
      //       maxWidth: element.style.maxWidth,
      //       width: element.style.width,
      //     },
      //     window: {
      //       width: windowDimensions.width,
      //     },
      //   });

      //   // if ( currentMinWidth !== null ) {
      //   //   element.style.minWidth = currentMinWidth;
      //   // }
      // },
    },
  };

  html2pdf().set( opt ).from( element ).save();
} ;

export default saveElementAsPdf;
