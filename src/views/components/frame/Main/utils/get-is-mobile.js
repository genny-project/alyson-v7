import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const getIsMobile = () => useMediaQuery( useTheme().breakpoints.down( 'xs' ));

export default getIsMobile;
