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
var Vehicle_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehicle = exports.VinStatus = void 0;
const fabric_contract_api_1 = require("fabric-contract-api");
const state_1 = require("../ledger-api/state");
var VinStatus;
(function (VinStatus) {
    VinStatus["NOVALUE"] = "NOVALUE";
    VinStatus["REQUESTED"] = "REQUESTED";
    VinStatus["ISSUED"] = "ISSUED";
})(VinStatus = exports.VinStatus || (exports.VinStatus = {}));
let Vehicle = Vehicle_1 = class Vehicle extends state_1.State {
    constructor(obj) {
        super(Vehicle_1.getClass(), [obj.orderId, obj.model]);
        Object.assign(this, obj);
    }
    static createInstance(vin, orderId, owner, model, make, color) {
        return new Vehicle_1({ vin, orderId, owner, model, make, color, docType: 'vehicle', vinStatus: VinStatus.NOVALUE });
    }
    static getClass() {
        return 'org.vehiclelifecycle.Vehicle';
    }
    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }
};
Vehicle = Vehicle_1 = __decorate([
    fabric_contract_api_1.Object(),
    __metadata("design:paramtypes", [Object])
], Vehicle);
exports.Vehicle = Vehicle;
//# sourceMappingURL=vehicle.js.map