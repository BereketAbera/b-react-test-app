import { Endpoint } from '@rest-hooks/endpoint';
import { getMockItems } from '../mock';

/**
 * Call mock api to get items
 * @param {*} q
 * @returns
 */
const fetchItems = (q) => getMockItems(q).then((res) => res);

export const restFetchItems = new Endpoint(fetchItems);
