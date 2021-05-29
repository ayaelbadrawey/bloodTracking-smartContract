/// <reference types="node" />
import { State } from '../ledger-api/state';
export declare enum VinStatus {
    NOVALUE = "NOVALUE",
    REQUESTED = "REQUESTED",
    ISSUED = "ISSUED"
}
export declare class Vehicle extends State {
    static createInstance(vin: string, orderId: string, owner: string, model: string, make: string, color: string): Vehicle;
    static getClass(): string;
    vin: string;
    vinStatus: VinStatus;
    docType?: string;
    color: string;
    make: string;
    model: string;
    owner: string;
    orderId: string;
    constructor(obj: any);
    toBuffer(): Buffer;
}
