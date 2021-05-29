"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BloodContext = void 0;
const fabric_contract_api_1 = require("fabric-contract-api");
const blood_1 = require("../assets/blood");
const bloodList_1 = require("../lists/bloodList");
const process_1 = require("../assets/process");
const processList_1 = require("../lists/processList");
class BloodContext extends fabric_contract_api_1.Context {
    constructor() {
        super();
        this.bloodList = new bloodList_1.BloodList(this, [blood_1.Blood]);
        this.processList = new processList_1.ProcessList(this, [process_1.Process]);
    }
    getBloodBagList() {
        return this.bloodList;
    }
    getProcessList() {
        return this.processList;
    }
}
exports.BloodContext = BloodContext;
//# sourceMappingURL=bloodContext.js.map