import debounce from 'lodash.debounce';

import { Bridge } from '../../../../../../../utils/vertx/index';

const debouncedSearch = debounce(config => Bridge.sendFormattedAnswer(config), 1000);

const makeSearch = meta => value => debouncedSearch({ ...meta, value });

export default makeSearch;
