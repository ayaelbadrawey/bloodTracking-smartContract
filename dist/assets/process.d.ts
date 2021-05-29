/// <reference types="node" />
import { State } from '../ledger-api/state';
export declare class Process extends State {
    static createInstance(processID: string, bloodNumber: string, userID: string, hospitalID: string, bloodBankID: string, type: string): Process;
    static getClass(): string;
    processID: string;
    bloodNumber: string;
    userID: string;
    hospitalID: string;
    bloodBankID: string;
    type: string;
    constructor(obj: any);
    toBuffer(): Buffer;
}
