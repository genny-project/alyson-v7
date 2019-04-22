const objectMerge = ( sourceObject, mergeObject ) => {
  const sourceObjectKeys = Object.keys( sourceObject );
  const mergeObjectKeys = Object.keys( mergeObject );

  const allKeys = sourceObjectKeys.concat( mergeObjectKeys );

  const resultant = {};

  // console.log( 'keys', sourceObjectKeys, mergeObjectKeys );

  allKeys.forEach( key => {
    resultant[key] = {
      ...sourceObject[key] ? sourceObject[key] : {},
      ...mergeObject[key] ? mergeObject[key] : {},
    };
  });

  // console.log( 'allKeys', allKeys );

  return resultant;
};

export default objectMerge;
