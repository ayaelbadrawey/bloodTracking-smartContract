"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BloodList = void 0;
const statelist_1 = require("../ledger-api/statelist");
class BloodList extends statelist_1.StateList {
    constructor(ctx, validTypes) {
        super(ctx, 'org.vehiclelifecycle.vehicle');
        this.use(...validTypes);
    }
    async addBloodBag(blood) {
        return this.add(blood);
    }
    async getBloodBag(blood) {
        return this.get(blood);
    }
    async updateBloodBag(blood) {
        return this.update(blood);
    }
    /**
     *
     * @param  {string} bloodNumber blood number to return history for
     *
     */
    async getBloodBagHistory(bloodNumber) {
        // call function defined in statelist.ts
        return this.getHistory(bloodNumber);
    }
}
exports.BloodList = BloodList;
//# sourceMappingURL=bloodList.js.map