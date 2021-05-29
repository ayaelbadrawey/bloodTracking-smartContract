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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BloodContract = void 0;
const fabric_contract_api_1 = require("fabric-contract-api");
const blood_1 = require("../assets/blood");
const process_1 = require("../assets/process");
const bloodContext_1 = require("../utils/bloodContext");
const fabric_shim_1 = require("fabric-shim");
const logger = fabric_shim_1.newLogger('VehicleContract');
class BloodContract extends fabric_contract_api_1.Contract {
    constructor() {
        super('org.vehiclelifecycle.vehicle');
    }
    createContext() {
        return new bloodContext_1.BloodContext();
    }
    // init ledger function is executed at the chaincode instantiation
    async initLedger(ctx) {
        logger.info('============= START : Initialize ledger ===========');
        const blood = new Array();
        blood[0] = blood_1.Blood.createInstance('BD58911', '100', 'B+', '2021-02-19', '2021-06-19', 'SAFE', 'd524', '2C');
        blood[1] = blood_1.Blood.createInstance('BD58912', '250', 'A+', '2021-02-20', '2021-06-20', 'SAFE', 'd525', '3C');
        blood[2] = blood_1.Blood.createInstance('BD58913', '400', 'AB+', '2021-02-21', '2021-06-21', 'SAFE', 'd526', '4C');
        for (let i = 0; i < blood.length; i++) {
            await ctx.getBloodBagList().add(blood[i]);
            logger.info('Added <--> ', blood[i]);
        }
        const process = new Array();
        process[0] = process_1.Process.createInstance('P4367', 'd524:B+', 'd524', 'H4657', 'B47745', 'donate');
        process[1] = process_1.Process.createInstance('P4347', 'd524:B+', 'r301', 'H4657', 'B47745', 'recieve');
        //process[2] = Process.createInstance('P4369','U3774','H4657','B47745','donate');
        for (let i = 0; i < process.length; i++) {
            await ctx.getProcessList().add(process[i]);
            logger.info('Added <--> ', process[i]);
        }
        logger.info('============= END : Initialize ledger ===========');
    }
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
    async createBloodBag(ctx, mm, type, date, expired, test, donorID, temperature) {
        logger.info('============= START : Create Blood Bag  ===========');
        //await this.hasRole(ctx, ['Blood_Bank']);
        let blood;
        //check if this is a valid donor id
        if (donorID.startsWith("d")) {
            blood = blood_1.Blood.createInstance('', mm, type, date, expired, test, donorID, temperature);
            // Append blood asset to ledger
            await ctx.getBloodBagList().add(blood);
            logger.info('============= END : Add Blood Bag ===========');
            return blood;
        }
        else {
            throw new Error(`it's not a donor ID `);
        }
    }
    /**
     * @param { ctx } the smart contract transaction context
     * @param { bloodNumber } blood number to query
     */
    async queryBloodBag(ctx, bloodNumber) {
        // Check if the blood bag exists
        if (!await ctx.getBloodBagList().exists(bloodNumber)) {
            throw new Error(`Blood Bag with ID ${bloodNumber} doesn't exists`);
        }
        // Return blood asset from ledger
        return await ctx.getBloodBagList().get(bloodNumber);
    }
    /**
     * @param { ctx } the smart contract transaction context
     */
    async queryAllBloodBags(ctx) {
        // Return all blood asset from the ledger
        return await ctx.getBloodBagList().getAll();
    }
    async underTransportBloodDIN(ctx, bloodNumber, DIN) {
        logger.info('============= START : underTransportationBloodDIN ===========');
        // Check if role === Blood Bank
        //await this.hasRole(ctx, ['Blood_Bank']);
        // Check whether the blood bag exists
        if (!ctx.getBloodBagList().exists(bloodNumber)) {
            throw new Error(`Error blood bag ${bloodNumber} doesn't exists `);
        }
        // Get blood bag by blood number
        const blood = await ctx.getBloodBagList().get(bloodNumber);
        // Set blood bag DIN
        blood.DIN = DIN;
        //check if location is blood bank
        if (blood.location != "Blood Bank") {
            throw new Error(`Error location is not valid`);
        }
        //check if test is safe
        if (blood.test != "SAFE") {
            throw new Error(`Error this bag is not safe to be transported`);
        }
        // If state is not equal to ready
        if (blood.state !== blood_1.DINSTATE.READY) {
            throw new Error(`Error blood bag state is not valid`);
        }
        // Change din state to "UNDER_TRANSPORTATION"
        blood.state = blood_1.DINSTATE.UNDER_TRANSPORTATION;
        // Update state in ledger
        await ctx.getBloodBagList().updateBloodBag(blood);
        ctx.stub.setEvent('UNER_TRANSPORTATION_DIN', blood.toBuffer());
        logger.info('============= END : underTransportationBloodDIN ===========');
    }
    /**
    * @param { ctx } the smart contract transaction context
    * @param { bloodNumber } blood number to issue DIN
    * @param { DIN } blood DIN
    */
    async delieveredBloodDIN(ctx, bloodNumber, DIN) {
        logger.info('============= START : delieveredBloodDIN ===========');
        //await this.hasRole(ctx, ['Regulator']);
        // Check if the blood bag exists
        if (!await ctx.getBloodBagList().exists(bloodNumber)) {
            throw new Error(`Error blood bag  ${bloodNumber} doesn't exists `);
        }
        // Get blood bag by blood number
        const blood = await ctx.getBloodBagList().get(bloodNumber);
        // Set blood bag DIN
        blood.DIN = DIN;
        //check if location is blood bank
        if (blood.location != "Transportation") {
            throw new Error(`Error location is not valid`);
        }
        // If state is not equal to UNDER_TRANSPORTATION
        if (blood.state !== blood_1.DINSTATE.UNDER_TRANSPORTATION) {
            throw new Error(`Error state of blood bag is not valid`);
        }
        // Set din state to "Delievered"
        blood.state = blood_1.DINSTATE.DELIEVERED;
        // Update state in ledger
        await ctx.getBloodBagList().updateBloodBag(blood);
        ctx.stub.setEvent('DIN_DELIEVERED', blood.toBuffer());
        logger.info('============= END : delieverBloodDIN ===========');
    }
    /**
     * @param { ctx } the smart contract transaction context
     * @param { bloodNumber } blood number to issue DIN
     * @param { DIN } blood DIN
     * @param { patientID } blood patientID
     */
    async usedBloodDIN(ctx, bloodNumber, DIN, patientID) {
        logger.info('============= START : UsedBloodDIN ===========');
        //await this.hasRole(ctx, ['Hospital']);
        // Check if the Blood Bag exists
        if (!await ctx.getBloodBagList().exists(bloodNumber)) {
            throw new Error(`Error blood bag ${bloodNumber} doesn't exists `);
        }
        // Get blood by blood number
        const blood = await ctx.getBloodBagList().get(bloodNumber);
        // Set blood DIN
        blood.DIN = DIN;
        //check if location is blood bank
        if (blood.location != "Hospital") {
            throw new Error(`Error location is not valid`);
        }
        //check if patient id begins with r
        if (!patientID.startsWith("r")) {
            throw new Error(`Error user id is not valid`);
        }
        blood.patientID = patientID;
        // If din state is not equal DELIEVERED
        if (blood.state !== blood_1.DINSTATE.DELIEVERED) {
            throw new Error(`Error state of blood bag is not valid`);
        }
        // Set din state to "USED"
        blood.state = blood_1.DINSTATE.USED;
        // Update state in ledger
        await ctx.getBloodBagList().updateBloodBag(blood);
        ctx.stub.setEvent('DIN_USED', blood.toBuffer());
        logger.info('============= END : usedBloodDIN ===========');
    }
    /**
     * @param { ctx } the smart contract transaction context
     * @param { bloodNumber } blood number
     * @param { location } blood location
     */
    async changeBloodBagLocation(ctx, bloodNumber, location) {
        logger.info('============= START : Change Blood Bag Owner ===========');
        // Check if role === Hospital
        //await this.hasRole(ctx, ['Hospital']);
        // Get blood bag by blood number
        const blood = await ctx.getBloodBagList().get(bloodNumber);
        // Change blood bag owner
        blood.location = location;
        //check if location is transportation
        if (location == "Transportation") {
            if (blood.state !== blood_1.DINSTATE.UNDER_TRANSPORTATION) {
                throw new Error(`Error we can't change location`);
            }
        }
        //check if location is hospital
        if (location == "Hospital") {
            if (blood.state !== blood_1.DINSTATE.DELIEVERED) {
                throw new Error(`Error we can't change location`);
            }
        }
        //check if location is patient
        if (location == "Patient") {
            if (blood.state !== blood_1.DINSTATE.USED) {
                throw new Error(`Error we can't change location`);
            }
        }
        // Update state in ledger
        await ctx.getBloodBagList().updateBloodBag(blood);
        logger.info('============= END : changeBloodBagOwner ===========');
        return blood;
    }
    /**
    * @param  {BloodContext} ctx: Blood context.
    * @param  {string} bloodNumber: Blood number to return history for
    */
    async getHistoryForBloodBag(ctx, bloodNumber) {
        return await ctx.getBloodBagList().getBloodBagHistory(bloodNumber);
    }
    /**
    * @param { ctx } the smart contract transaction context.
    * @param { processID } process processID.
    * @param { userID } process userID.
    * @param { hospitalID } process hospitalID.
    * @param { bloodBankID } process bloodBankID.
    * @param { type } process type.
    */
    async createProcess(ctx, processID, bloodNumber, userID, hospitalID, bloodBankID, type) {
        logger.info('============= START : Create Process ===========');
        //await this.hasRole(ctx, ['Blood_Bank', 'Hospital']);
        // Check if the blood bag exists
        if (!await ctx.getBloodBagList().exists(bloodNumber)) {
            throw new Error(`Blood Bag with ID ${bloodNumber} doesn't exists`);
        }
        let process;
        //check if process is donate that user id begins with "d"
        if (type == "donate") {
            if (!userID.startsWith("d")) {
                throw new Error(`Error user id is not valid`);
            }
        }
        //check if process is recieve that user id begins with "r"
        if (type == "recieve") {
            if (!userID.startsWith("r")) {
                throw new Error(`Error user id is not valid`);
            }
        }
        process = process_1.Process.createInstance(processID, bloodNumber, userID, hospitalID, bloodBankID, type);
        // Append process asset to ledger
        await ctx.getProcessList().add(process);
        logger.info('============= END : Add Process ===========');
        return process;
    }
    /**
     * @param { ctx } the smart contract transaction context
     */
    async queryAllProcess(ctx) {
        return await ctx.getProcessList().getAll();
    }
    /**
     * @param { ctx } the smart contract transaction context
     * @param { processNumber } blood number to query
     */
    async queryProcess(ctx, processNumber) {
        // Check if the process exists
        if (!await ctx.getProcessList().exists(processNumber)) {
            throw new Error(`Process with ID ${processNumber} doesn't exists`);
        }
        // Return blood asset from ledger
        return await ctx.getProcessList().get(processNumber);
    }
}
__decorate([
    fabric_contract_api_1.Transaction(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bloodContext_1.BloodContext]),
    __metadata("design:returntype", Promise)
], BloodContract.prototype, "initLedger", null);
__decorate([
    fabric_contract_api_1.Transaction(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bloodContext_1.BloodContext, String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], BloodContract.prototype, "createBloodBag", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('Blood'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bloodContext_1.BloodContext, String]),
    __metadata("design:returntype", Promise)
], BloodContract.prototype, "queryBloodBag", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('Blood[]'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bloodContext_1.BloodContext]),
    __metadata("design:returntype", Promise)
], BloodContract.prototype, "queryAllBloodBags", null);
__decorate([
    fabric_contract_api_1.Transaction(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bloodContext_1.BloodContext, String, String]),
    __metadata("design:returntype", Promise)
], BloodContract.prototype, "underTransportBloodDIN", null);
__decorate([
    fabric_contract_api_1.Transaction(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bloodContext_1.BloodContext, String, String]),
    __metadata("design:returntype", Promise)
], BloodContract.prototype, "delieveredBloodDIN", null);
__decorate([
    fabric_contract_api_1.Transaction(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bloodContext_1.BloodContext, String, String, String]),
    __metadata("design:returntype", Promise)
], BloodContract.prototype, "usedBloodDIN", null);
__decorate([
    fabric_contract_api_1.Transaction(true),
    fabric_contract_api_1.Returns('Blood'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bloodContext_1.BloodContext, String, String]),
    __metadata("design:returntype", Promise)
], BloodContract.prototype, "changeBloodBagLocation", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bloodContext_1.BloodContext, String]),
    __metadata("design:returntype", Promise)
], BloodContract.prototype, "getHistoryForBloodBag", null);
__decorate([
    fabric_contract_api_1.Transaction(true),
    fabric_contract_api_1.Returns('Process'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bloodContext_1.BloodContext, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], BloodContract.prototype, "createProcess", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('Process[]'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bloodContext_1.BloodContext]),
    __metadata("design:returntype", Promise)
], BloodContract.prototype, "queryAllProcess", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('Process'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bloodContext_1.BloodContext, String]),
    __metadata("design:returntype", Promise)
], BloodContract.prototype, "queryProcess", null);
exports.BloodContract = BloodContract;
//# sourceMappingURL=VehicleContract.js.map