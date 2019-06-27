const isDevMode = () => {
  if ( window ) {
    const devMode = localStorage.getItem( 'DEV_MODE' );

    if ( devMode !== null && ( devMode === 'true' || devMode === true )) {
      return true;
    }
  }

  return false;
};

export default isDevMode;
