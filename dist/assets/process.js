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
var Process_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Process = void 0;
const fabric_contract_api_1 = require("fabric-contract-api");
const state_1 = require("../ledger-api/state");
let Process = Process_1 = class Process extends state_1.State {
    constructor(obj) {
        super(Process_1.getClass(), [obj.processID, obj.type]);
        Object.assign(this, obj);
    }
    static createInstance(processID, bloodNumber, userID, hospitalID, bloodBankID, type) {
        return new Process_1({ processID, bloodNumber, userID, hospitalID, bloodBankID, type });
    }
    static getClass() {
        return 'org.vehiclelifecycle.process';
    }
    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }
};
Process = Process_1 = __decorate([
    fabric_contract_api_1.Object(),
    __metadata("design:paramtypes", [Object])
], Process);
exports.Process = Process;
//# sourceMappingURL=process.js.map