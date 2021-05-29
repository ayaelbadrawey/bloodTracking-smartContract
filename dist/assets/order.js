"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Order_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.OrderStatus = void 0;
const fabric_contract_api_1 = require("fabric-contract-api");
const state_1 = require("../ledger-api/state");
// Order Status
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["ISSUED"] = "ISSUED";
    OrderStatus["PENDING"] = "PENDING";
    OrderStatus["INPROGRESS"] = "INPROGRESS";
    OrderStatus["DELIVERED"] = "DELIVERED";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
let Order = Order_1 = 
// Order Asset
class Order extends state_1.State {
    constructor(obj) {
        super(Order_1.getClass(), [obj.orderId]);
        Object.assign(this, obj);
    }
    static fromBuffer(buffer) {
        return Order_1.deserialize(Buffer.from(JSON.parse(buffer)));
    }
    /**
     * Deserialize a state data to commercial paper
     * @param {Buffer} data to form back into the object
     */
    static deserialize(data) {
        return state_1.State.deserializeClass(data, Order_1);
    }
    static getClass() {
        return 'org.vehiclelifecycle.order';
    }
    static createInstance(orderId, owner, orderStatus, vehicleDetails) {
        return new Order_1({ orderId, owner, orderStatus, vehicleDetails });
    }
    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }
    setIssued() {
        this.orderStatus = OrderStatus.ISSUED;
    }
};
Order = Order_1 = __decorate([
    fabric_contract_api_1.Object()
    // Order Asset
    ,
    __metadata("design:paramtypes", [Object])
], Order);
exports.Order = Order;
//# sourceMappingURL=order.js.map