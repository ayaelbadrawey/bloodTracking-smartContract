"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolicyList = void 0;
// Import state list container for the collection of asset's states.
const statelist_1 = require("../ledger-api/statelist");
/*
The policy list class extends an application defined state list class which
is an abstraction of all list of states that the asset can have.
*/
class PolicyList extends statelist_1.StateList {
    /*
    The constructor function sets the namespace to the policy asset's namespace
    within the smart contract application and is passed the set of functions
    defined in the state interface to allow it to access the functions as its own.
    */
    constructor(ctx, validTypes) {
        super(ctx, 'org.vehiclelifecycle.policy');
        this.use(...validTypes);
    }
    // Utilitity functions to add policy assets to ledger
    async addPolicy(policy) {
        return this.add(policy);
    }
    // Utility functions to retrieve policy assets from ledger
    async getPolicy(policyKey) {
        return this.get(policyKey);
    }
}
exports.PolicyList = PolicyList;
//# sourceMappingURL=policyList.js.map