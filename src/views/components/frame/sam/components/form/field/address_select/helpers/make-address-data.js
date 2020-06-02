import { compose, prop, head, map, toString, mergeAll } from 'ramda';

const convertTypes = {
  street_number: 'street_number',
  route: 'street_name',
  administrative_area_level_3: 'suburb',
  political: 'suburb',
  administrative_area_level_1: 'state',
  political: 'state',
  country: 'country',
  political: 'country',
  postal_code: 'postal_code',
};

const makeType = types => convertTypes( head( types ));

const makeAddressData = compose(
  toString,
  mergeAll,
  map(({ long_name, types }) => ({ [makeType( types )]: long_name })),
  prop( 'address_components' ),
  head
);

export default makeAddressData;
