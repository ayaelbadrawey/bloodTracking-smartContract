import { Contract } from 'fabric-contract-api';
import { Blood } from '../assets/blood';
import { Process } from '../assets/process';
import { BloodContext } from '../utils/bloodContext';
export declare class BloodContract extends Contract {
    constructor();
    createContext(): BloodContext;
    initLedger(ctx: BloodContext): Promise<void>;
    /**
     * @param { ctx } the smart contract transaction context.
     * @param { mm } blood mm.
     * @param { type } blood type.
     * @param { date } blood date.
     * @param { expired } blood expired.
     * @param { test } blood test.
     * @param { donorID } blood donorID.
     * @param { temperature } blood temperature.
     */
    createBloodBag(ctx: BloodContext, mm: string, type: string, date: string, expired: string, test: string, donorID: string, temperature: string): Promise<Blood>;
    /**
     * @param { ctx } the smart contract transaction context
     * @param { bloodNumber } blood number to query
     */
    queryBloodBag(ctx: BloodContext, bloodNumber: string): Promise<Blood>;
    /**
     * @param { ctx } the smart contract transaction context
     */
    queryAllBloodBags(ctx: BloodContext): Promise<Blood[]>;
    underTransportBloodDIN(ctx: BloodContext, bloodNumber: string, DIN: string): Promise<void>;
    /**
    * @param { ctx } the smart contract transaction context
    * @param { bloodNumber } blood number to issue DIN
    * @param { DIN } blood DIN
    */
    delieveredBloodDIN(ctx: BloodContext, bloodNumber: string, DIN: string): Promise<void>;
    /**
     * @param { ctx } the smart contract transaction context
     * @param { bloodNumber } blood number to issue DIN
     * @param { DIN } blood DIN
     * @param { patientID } blood patientID
     */
    usedBloodDIN(ctx: BloodContext, bloodNumber: string, DIN: string, patientID: string): Promise<void>;
    /**
     * @param { ctx } the smart contract transaction context
     * @param { bloodNumber } blood number
     * @param { location } blood location
     */
    changeBloodBagLocation(ctx: BloodContext, bloodNumber: string, location: string): Promise<Blood>;
    /**
    * @param  {BloodContext} ctx: Blood context.
    * @param  {string} bloodNumber: Blood number to return history for
    */
    getHistoryForBloodBag(ctx: BloodContext, bloodNumber: string): Promise<import("../ledger-api/state").IHistoricState<Blood>[]>;
    /**
    * @param { ctx } the smart contract transaction context.
    * @param { processID } process processID.
    * @param { userID } process userID.
    * @param { hospitalID } process hospitalID.
    * @param { bloodBankID } process bloodBankID.
    * @param { type } process type.
    */
    createProcess(ctx: BloodContext, processID: string, bloodNumber: string, userID: string, hospitalID: string, bloodBankID: string, type: string): Promise<Process>;
    /**
     * @param { ctx } the smart contract transaction context
     */
    queryAllProcess(ctx: BloodContext): Promise<Process[]>;
    /**
     * @param { ctx } the smart contract transaction context
     * @param { processNumber } blood number to query
     */
    queryProcess(ctx: BloodContext, processNumber: string): Promise<Process>;
}
