"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessList = void 0;
const statelist_1 = require("../ledger-api/statelist");
class ProcessList extends statelist_1.StateList {
    constructor(ctx, validTypes) {
        super(ctx, 'org.vehiclelifecycle.process');
        this.use(...validTypes);
    }
    async addProcess(process) {
        return this.add(process);
    }
    async getProcess(process) {
        return this.get(process);
    }
    async updateProcess(process) {
        return this.update(process);
    }
}
exports.ProcessList = ProcessList;
//# sourceMappingURL=processList.js.map