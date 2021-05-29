"use strict";
/**
 * *** Exercise 02 > Part 4 > Step 2 ***
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Policy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Policy = exports.PolicyStatus = exports.PolicyType = void 0;
/*
The following import statements imports the contract object module
from the fabric-contract-api node sdk and the state class from the
state definition file.
The state object contains the set of function to allow the smart
contract application to interact with the policy asset within the
ledger application
*/
const fabric_contract_api_1 = require("fabric-contract-api");
const state_1 = require("../ledger-api/state");
/*
Policy type and policy status enum objects. The first will enumerate
the insurance policy type, and the latter will enumerate the insurance
policy status for the policy asset.
*/
var PolicyType;
(function (PolicyType) {
    PolicyType["THIRD_PARTY"] = "THIRD_PARTY";
    PolicyType["FIRE_AND_THEFT"] = "FIRE_AND_THEFT";
    PolicyType["FULLY_COMPREHENSIVE"] = "FULLY_COMPREHENSIVE";
})(PolicyType = exports.PolicyType || (exports.PolicyType = {}));
var PolicyStatus;
(function (PolicyStatus) {
    PolicyStatus["REQUESTED"] = "REQUESTED";
    PolicyStatus["ISSUED"] = "ISSUED";
})(PolicyStatus = exports.PolicyStatus || (exports.PolicyStatus = {}));
/**
 * *** Exercise 02 > Part 4 > Step 3 ***
 */
/*
The "@ContractObject" modifier flags the policy class as an "object",
or an asset within the smart contract applications. The policy class
extends the state class, allowing the policy class to have access to
the set of business object functions and properties, such as the
generation of a composite key, the serialization or deserialization of
object into buffers, etc.
*/
let Policy = Policy_1 = class Policy extends state_1.State {
    /*
    Within the constructor function, the policy class creates a key (which is the policy id) when
    the policy object is created, this key will be used when accessing the ledger.
    */
    constructor(obj) {
        super(Policy_1.getClass(), [obj.id]);
        Object.assign(this, obj);
    }
    /**
     *
     * @param { id } policy ID
     * @param { vehicleNumber } vehicle number
     * @param { insurerId } insurer ID
     * @param { holderId } insurance holder ID
     * @param { policyType } insurance policy enum type
     * @param { startDate } insurance policy start date
     * @param { endDate } insurance policy end date
     */
    static createInstance(id, vehicleNumber, insurerId, holderId, policyType, startDate, endDate) {
        /*
        The function accepts the supplied parameters, sets status to "REQUESTED", and returns a new in-
        memory representation of a Policy state.
        */
        const status = PolicyStatus.REQUESTED;
        return new Policy_1({ id, vehicleNumber, insurerId, holderId, policyType, startDate, endDate, status });
    }
    // Helper function to get the namespace of the policy asset.
    static getClass() {
        return 'org.vehiclelifecycle.Policy';
    }
    // Returns a buffer representation of the policy JSON object.
    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }
};
Policy = Policy_1 = __decorate([
    fabric_contract_api_1.Object(),
    __metadata("design:paramtypes", [Object])
], Policy);
exports.Policy = Policy;
//# sourceMappingURL=policy.js.map