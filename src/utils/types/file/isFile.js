const isFile = ( file, options = {}) => {
  const {
    withName, // eslint-disable-line
  } = options;

  /* Ensure a valid object (and not an array - thanks JS!) is given. */
  if (
    file == null ||
    typeof file !== 'object' ||
    !( file instanceof File ) ||
    file.name == null
  ) {
    return false;
  }

  return true;
};

export default isFile;
