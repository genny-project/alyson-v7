import { map, pick, compose, path, prop, mapObjIndexed } from 'ramda';

const getLinksFrom = ( key, frames ) =>
  compose(
    map( prop( 'code' )),
    path( [key, 'links'] )
  )( frames );

const getComponents = ({ frames, asks, themes }) =>
  mapObjIndexed(( frame, key, obj ) => prop( 'links' ), frames );

const getDrawerItems = ( frames, asks, themes ) => pick( getLinksFrom( 'FRM_SIDEBAR', frames ), frames );

const getAppBarItems = ( frames, asks, themes ) => pick( getLinksFrom( 'FRM_HEADER', frames ), frames );

export { getComponents, getDrawerItems, getLinksFrom, getAppBarItems };
