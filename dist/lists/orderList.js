"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderList = void 0;
const statelist_1 = require("../ledger-api/statelist");
class OrderList extends statelist_1.StateList {
    constructor(ctx, validTypes) {
        super(ctx, 'org.vehiclelifecycle.order');
        this.use(...validTypes);
    }
    async addOrder(order) {
        return this.add(order);
    }
    async getOrder(orderKey) {
        return this.get(orderKey);
    }
    async updateOrder(order) {
        return this.update(order);
    }
    /**
     * *** Exercise 03 > Part 4 ***
     * @param  {string} orderID
     * Return order history
     */
    async getOrderHistory(orderID) {
        // Call the history function, which is defined in stateList.ts
        return this.getHistory(orderID);
    }
    /**
     * *** Exercise 03 > Part 4 ***
     * @param  {string} startkey
     * @param  {string} endkey
     */
    async getOrdersByRange(startkey, endkey) {
        // Call getAssetsByRange from stateList.ts
        return this.getAssetsByRange(startkey, endkey);
    }
    /**
     * *** Exercise 03 > Part 5 ***
     * @param  {string} queryString
     * @param  {number} pageSize
     * @param  {string} bookmark
     */
    async queryStatusPaginated(queryString, pageSize, bookmark) {
        // Call queryWithPagination, which is defined in stateList.ts
        return this.queryWithPagination(queryString, pageSize, bookmark);
    }
}
exports.OrderList = OrderList;
//# sourceMappingURL=orderList.js.map