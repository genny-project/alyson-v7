import { compose, find, propEq, prop } from 'ramda';

const getActionData = ({ table, rowData: { targetCode }, actionCode }) =>
  compose(
    ({ questionCode, targetCode }) => ({ code: questionCode, targetCode }),
    find( propEq( 'attributeCode', actionCode )),
    prop( 'childAsks' ),
    find( propEq( 'targetCode', targetCode ))
  )( table );

export default getActionData;
