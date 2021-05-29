"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleList = void 0;
const statelist_1 = require("../ledger-api/statelist");
class VehicleList extends statelist_1.StateList {
    constructor(ctx, validTypes) {
        super(ctx, 'org.vehiclelifecycle.vehicle');
        this.use(...validTypes);
    }
    async addVehicle(vehicle) {
        return this.add(vehicle);
    }
    async getVehicle(vehicle) {
        return this.get(vehicle);
    }
    async updateVehicle(vehicle) {
        return this.update(vehicle);
    }
    /**
     * *** Exercise 03 > Part 4 ***
     * @param  {string} vehicleNumber vehicle number to return history for
     * get history for vehicle as provenance of changes over vehicle
     */
    async getVehicleHistory(vehicleNumber) {
        // call function defined in statelist.ts
        return this.getHistory(vehicleNumber);
    }
}
exports.VehicleList = VehicleList;
//# sourceMappingURL=vehicleList.js.map