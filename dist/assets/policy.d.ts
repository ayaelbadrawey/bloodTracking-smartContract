/**
 * *** Exercise 02 > Part 4 > Step 2 ***
 */
/// <reference types="node" />
import { State } from '../ledger-api/state';
export declare enum PolicyType {
    THIRD_PARTY = "THIRD_PARTY",
    FIRE_AND_THEFT = "FIRE_AND_THEFT",
    FULLY_COMPREHENSIVE = "FULLY_COMPREHENSIVE"
}
export declare enum PolicyStatus {
    REQUESTED = "REQUESTED",
    ISSUED = "ISSUED"
}
/**
 * *** Exercise 02 > Part 4 > Step 3 ***
 */
export declare class Policy extends State {
    /**
     *
     * @param { id } policy ID
     * @param { vehicleNumber } vehicle number
     * @param { insurerId } insurer ID
     * @param { holderId } insurance holder ID
     * @param { policyType } insurance policy enum type
     * @param { startDate } insurance policy start date
     * @param { endDate } insurance policy end date
     */
    static createInstance(id: string, vehicleNumber: string, insurerId: string, holderId: string, policyType: PolicyType, startDate: number, endDate: number): Policy;
    static getClass(): string;
    readonly vehicleNumber: string;
    readonly startDate: number;
    readonly endDate: number;
    readonly insurerId: string;
    readonly holderId: string;
    status: PolicyStatus;
    private policyType;
    constructor(obj: any);
    toBuffer(): Buffer;
}
