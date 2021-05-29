"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleContext = void 0;
// vehicleContext
const fabric_contract_api_1 = require("fabric-contract-api");
const order_1 = require("../assets/order");
const vehicle_1 = require("../assets/vehicle");
const orderList_1 = require("../lists/orderList");
const vehicleList_1 = require("../lists/vehicleList");
/**
 * *** Exercise 02 > Part 4 > Step 6 ***
 */
/*
Import the policy and policy list class to the vehicle context to allow the
smart contract application to recognize and interact with the policy asset.
*/
const policy_1 = require("../assets/policy");
const policyList_1 = require("../lists/policyList");
/* Custom Context that extend chain code Context class
 Used to define
A smart contract transaction context allows smart contracts to define and maintain user variables across transaction invocations
https://hyperledger-fabric.readthedocs.io/en/latest/developapps/transactioncontext.html
*/
class VehicleContext extends fabric_contract_api_1.Context {
    constructor() {
        super();
        this.orderList = new orderList_1.OrderList(this, [order_1.Order]);
        this.vehicleList = new vehicleList_1.VehicleList(this, [vehicle_1.Vehicle]);
        // Create policy list upon context class construction
        this.policyList = new policyList_1.PolicyList(this, [policy_1.Policy]);
    }
    getOrderList() {
        return this.orderList;
    }
    getVehicleList() {
        return this.vehicleList;
    }
    /*
    Helper function to allow the vehicle context to
    retrieve policy list class and interact with its functions
    */
    getPolicyList() {
        return this.policyList;
    }
}
exports.VehicleContext = VehicleContext;
//# sourceMappingURL=vehicleContext.js.map