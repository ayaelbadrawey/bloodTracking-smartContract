/// <reference types="node" />
import { State } from '../ledger-api/state';
export declare enum DINSTATE {
    READY = "READY",
    UNDER_TRANSPORTATION = "UNDER_TRANSPORTATION",
    DELIEVERED = "DELIEVERED",
    USED = "USED"
}
export declare class Blood extends State {
    static createInstance(DIN: string, mm: string, type: string, date: string, expired: string, test: string, donorID: string, temperature: string): Blood;
    static getClass(): string;
    DIN: string;
    mm: string;
    type: string;
    date: string;
    expired: string;
    test: string;
    location: string;
    state: DINSTATE;
    donorID: string;
    patientID: string;
    temperature: string;
    constructor(obj: any);
    toBuffer(): Buffer;
}
