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
var Blood_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blood = exports.DINSTATE = void 0;
const fabric_contract_api_1 = require("fabric-contract-api");
const state_1 = require("../ledger-api/state");
var DINSTATE;
(function (DINSTATE) {
    DINSTATE["READY"] = "READY";
    DINSTATE["UNDER_TRANSPORTATION"] = "UNDER_TRANSPORTATION";
    DINSTATE["DELIEVERED"] = "DELIEVERED";
    DINSTATE["USED"] = "USED";
})(DINSTATE = exports.DINSTATE || (exports.DINSTATE = {}));
let Blood = Blood_1 = class Blood extends state_1.State {
    constructor(obj) {
        super(Blood_1.getClass(), [obj.donorID, obj.type]);
        Object.assign(this, obj);
    }
    static createInstance(DIN, mm, type, date, expired, test, donorID, temperature) {
        return new Blood_1({ DIN, mm, type, date, expired, test, donorID, temperature, location: 'Blood Bank', patientID: 'NONE', state: DINSTATE.READY });
    }
    static getClass() {
        return 'org.vehiclelifecycle.vehicle';
    }
    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }
};
Blood = Blood_1 = __decorate([
    fabric_contract_api_1.Object(),
    __metadata("design:paramtypes", [Object])
], Blood);
exports.Blood = Blood;
//# sourceMappingURL=blood.js.map