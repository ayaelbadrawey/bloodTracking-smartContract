"use strict";
/*
SPDX-License-Identifier: Apache-2.0
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
var State_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IHistoricState = exports.State = void 0;
const fabric_contract_api_1 = require("fabric-contract-api");
const fabric_shim_1 = require("fabric-shim");
const logger = fabric_shim_1.newLogger('STATE');
// Utility class for ledger state
/**
 * State class. States have a class, unique key, and a lifecycle current state
 * the current state is determined by the specific subclass (Vehicle , Order , ... )
 */
let State = State_1 = class State {
    constructor(stateClass, keyParts) {
        this.class = stateClass;
        this.key = State_1.makeKey(keyParts);
    }
    /**
     * Convert object to buffer containing JSON data serialization
     * Typically used before putState()ledger API
     * @param {Object} JSON object to serialize
     * @return {buffer} buffer with the data to store
     */
    static serialize(object) {
        return Buffer.from(JSON.stringify(object));
    }
    /**
     * Deserialize object into one of a set of supported JSON classes
     * i.e. Covert serialized data to JSON object
     * Typically used after getState() ledger API
     * @param {data} data to deserialize into JSON object
     * @param (supportedClasses) the set of classes data can be serialized to
     * @return {json} json with the data to store
     */
    static deserialize(data, supportedClasses) {
        const json = JSON.parse(data.toString());
        const objClass = supportedClasses.get(json.class);
        if (!objClass) {
            throw new Error(`Unknown class of ${json.class}`);
        }
        const object = new (objClass)(json);
        return object;
    }
    /**
     * Deserialize object into specific object class
     * Typically used after getState() ledger API
     * @param {data} data to deserialize into JSON object
     * @return {json} json with the data to store
     */
    static deserializeClass(data, objClass) {
        const json = JSON.parse(data.toString());
        const object = new (objClass)(json);
        return object;
    }
    /**
     * Join the keyParts to make a unififed string
     * @param (String[]) keyParts
     */
    static makeKey(keyParts) {
        return keyParts.join(':');
    }
    static splitKey(key) {
        return key.split(':');
    }
    getClass() {
        return this.class;
    }
    getSubClass() {
        return this.subClass;
    }
    getKey() {
        return this.key;
    }
    getSplitKey() {
        return State_1.splitKey(this.key);
    }
    serialize() {
        return State_1.serialize(this);
    }
};
State = State_1 = __decorate([
    fabric_contract_api_1.Object(),
    __metadata("design:paramtypes", [String, Array])
], State);
exports.State = State;
// tslint:disable:max-classes-per-file
// Container for returned result for getHistory for akey
let IHistoricState = class IHistoricState {
    constructor(timestamp, txId, value) {
        this.timestamp = timestamp;
        this.txId = txId;
        this.value = value;
    }
    serialize() {
        const obj = Object.assign(this, { value: JSON.parse(this.value.serialize().toString()) });
        return Buffer.from(JSON.stringify(obj));
    }
};
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], IHistoricState.prototype, "timestamp", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], IHistoricState.prototype, "txId", void 0);
IHistoricState = __decorate([
    fabric_contract_api_1.Object(),
    __metadata("design:paramtypes", [Number, String, Object])
], IHistoricState);
exports.IHistoricState = IHistoricState;
//# sourceMappingURL=state.js.map