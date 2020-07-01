// From the store get media-proxy url and replace its subpath for bridge url subpath. The
// media-proxy subpath is /public and bridge url subpath is /frontend for instance it would
// change like this https://internmatch-dev1.gada.io/public to https://internmatch-dev1.gada.io/frontend

const setInitSocketURL =({ENV_MEDIA_PROXY_URL: url, ENV_GENNY_BRIDGE_VERTEX: urlSubPath}) => (
  url.substring(0, (url.length - 7)).concat(urlSubPath)
);

export default setInitSocketURL;

