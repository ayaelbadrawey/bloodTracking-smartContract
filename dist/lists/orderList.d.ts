import { Order } from '../assets/order';
import { IState } from '../ledger-api/state';
import { StateList } from '../ledger-api/statelist';
import { VehicleContext } from '../utils/vehicleContext';
export declare class OrderList<T extends Order> extends StateList<T> {
    constructor(ctx: VehicleContext, validTypes: Array<IState<T>>);
    addOrder(order: T): Promise<void>;
    getOrder(orderKey: any): Promise<T>;
    updateOrder(order: any): Promise<void>;
    /**
     * *** Exercise 03 > Part 4 ***
     * @param  {string} orderID
     * Return order history
     */
    getOrderHistory(orderID: string): Promise<import("../ledger-api/state").IHistoricState<T>[]>;
    /**
     * *** Exercise 03 > Part 4 ***
     * @param  {string} startkey
     * @param  {string} endkey
     */
    getOrdersByRange(startkey: string, endkey: string): Promise<T[]>;
    /**
     * *** Exercise 03 > Part 5 ***
     * @param  {string} queryString
     * @param  {number} pageSize
     * @param  {string} bookmark
     */
    queryStatusPaginated(queryString: string, pageSize: number, bookmark: string): Promise<import("../utils/queryPaginatedResponse").QueryPaginationResponse<T>>;
}
