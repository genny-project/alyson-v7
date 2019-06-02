const trimAndAppendDots = ( string, number = 10 ) => {
  return `${string.substring( 0, number )}...`;
};

export default trimAndAppendDots;
