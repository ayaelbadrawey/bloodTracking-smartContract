import { Context, Contract, Transaction, Returns } from 'fabric-contract-api';
import { Blood, DINSTATE } from '../assets/blood';
import { Process } from '../assets/process';
import { QueryResponse } from '../utils/queryResponse';
import { BloodContext } from '../utils/bloodContext';
import { BloodDetails } from '../utils/bloodDetails';
import { newLogger } from 'fabric-shim';

const logger = newLogger('VehicleContract');



export class BloodContract extends Contract {
    constructor() {
        super('org.vehiclelifecycle.vehicle');
    }

    public createContext() {
        return new BloodContext();
    }

    // init ledger function is executed at the chaincode instantiation
    @Transaction(true)
    public async initLedger(ctx: BloodContext) {
        logger.info('============= START : Initialize ledger ===========');
        const blood: Blood[] = new Array<Blood>();
        blood[0] = Blood.createInstance('BD58911', '100', 'B+', '2021-02-19', '2021-06-19', 'SAFE', 'd524', '2C' );
        blood[1] = Blood.createInstance('BD58912', '250', 'A+', '2021-02-20', '2021-06-20', 'SAFE', 'd525', '3C' );
        blood[2] = Blood.createInstance('BD58913', '400', 'AB+', '2021-02-21', '2021-06-21', 'SAFE', 'd526', '4C' );

        for (let i = 0; i < blood.length; i++) {
            await ctx.getBloodBagList().add(blood[i]);
            logger.info('Added <--> ', blood[i]);
        }

        const process: Process[] = new Array<Process>();
        process[0] = Process.createInstance('P4367', 'd524:B+','d524','H4657','B47745','donate');
        process[1] = Process.createInstance('P4347', 'd524:B+','r301','H4657','B47745','recieve');
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
    @Transaction(true)
    public async createBloodBag(ctx: BloodContext, mm: string, type: string, date: string, expired: string, test: string, donorID: string, temperature: string): Promise <Blood> {
 
        logger.info('============= START : Create Blood Bag  ===========');
        //await this.hasRole(ctx, ['Blood_Bank']);
        let blood: Blood;

        //check if this is a valid donor id
        if(donorID.startsWith("d")){
            blood = Blood.createInstance('', mm, type, date, expired, test, donorID, temperature);
            // Append blood asset to ledger
            await ctx.getBloodBagList().add(blood);
            logger.info('============= END : Add Blood Bag ===========');
            return blood;
        }
        else{
            throw new Error(`it's not a donor ID `);
        }

    }

    /**
     * @param { ctx } the smart contract transaction context
     * @param { bloodNumber } blood number to query
     */
    @Transaction(false)
    @Returns('Blood')
    public async queryBloodBag(ctx: BloodContext, bloodNumber: string): Promise<Blood> {

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
    @Transaction(false)
    @Returns('Blood[]')
     public async queryAllBloodBags(ctx: BloodContext): Promise<Blood[]> {

        // Return all blood asset from the ledger
        return await ctx.getBloodBagList().getAll();
    }

    @Transaction(true)
    //UNDER_TRANSPORTATION state
    public async underTransportBloodDIN(ctx: BloodContext, bloodNumber: string, DIN: string) {
    
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
        if(blood.location != "Blood Bank"){
            throw new Error(`Error location is not valid`);
        }

        //check if test is safe
        if(blood.test != "SAFE"){
            throw new Error(`Error this bag is not safe to be transported`);
        }

        // If state is not equal to ready
        if (blood.state !== DINSTATE.READY) {
            throw new Error(`Error blood bag state is not valid`);
        }
        // Change din state to "UNDER_TRANSPORTATION"
        blood.state = DINSTATE.UNDER_TRANSPORTATION;
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
    @Transaction(true)
    //DELIEVERED state
    public async delieveredBloodDIN(ctx: BloodContext, bloodNumber: string, DIN: string) {
        
        logger.info('============= START : delieveredBloodDIN ===========');
    
        //await this.hasRole(ctx, ['Regulator']);

        // Check if the blood bag exists
        if (! await ctx.getBloodBagList().exists(bloodNumber)) {
            throw new Error(`Error blood bag  ${bloodNumber} doesn't exists `);
        }

        // Get blood bag by blood number
        const blood = await ctx.getBloodBagList().get(bloodNumber);
        
        // Set blood bag DIN
        blood.DIN = DIN;

        //check if location is blood bank
        if(blood.location != "Transportation"){
            throw new Error(`Error location is not valid`);
        }
        // If state is not equal to UNDER_TRANSPORTATION
        if (blood.state !== DINSTATE.UNDER_TRANSPORTATION) {
            throw new Error(`Error state of blood bag is not valid`);
        }
        // Set din state to "Delievered"
        blood.state = DINSTATE.DELIEVERED;
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
    @Transaction(true)
    //USED state
    public async usedBloodDIN(ctx: BloodContext, bloodNumber: string, DIN: string, patientID: string) {
        logger.info('============= START : UsedBloodDIN ===========');
        //await this.hasRole(ctx, ['Hospital']);

        // Check if the Blood Bag exists
        if (! await ctx.getBloodBagList().exists(bloodNumber)) {
            throw new Error(`Error blood bag ${bloodNumber} doesn't exists `);
        }

        // Get blood by blood number
        const blood = await ctx.getBloodBagList().get(bloodNumber);

        // Set blood DIN
        blood.DIN = DIN;

        //check if location is blood bank
        if(blood.location != "Hospital"){
            throw new Error(`Error location is not valid`);
        }

        //check if patient id begins with r
        if(!patientID.startsWith("r")){
            throw new Error(`Error user id is not valid`);
        }

        blood.patientID = patientID;

        // If din state is not equal DELIEVERED
        if (blood.state !== DINSTATE.DELIEVERED) {
            throw new Error(`Error state of blood bag is not valid`);
        }
        // Set din state to "USED"
        blood.state = DINSTATE.USED;
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
    @Transaction(true)
    @Returns('Blood')
    public async changeBloodBagLocation(ctx: BloodContext, bloodNumber: string, location: string) {
     
        logger.info('============= START : Change Blood Bag Owner ===========');
        // Check if role === Hospital
        //await this.hasRole(ctx, ['Hospital']);

        // Get blood bag by blood number
        const blood = await ctx.getBloodBagList().get(bloodNumber);
        // Change blood bag owner
        blood.location = location;

        //check if location is transportation
        if(location == "Transportation"){
            if(blood.state !== DINSTATE.UNDER_TRANSPORTATION){
                throw new Error(`Error we can't change location`);
            }
        }
        //check if location is hospital
        if(location == "Hospital"){
            if(blood.state !== DINSTATE.DELIEVERED){
                throw new Error(`Error we can't change location`);
            }
        }
        //check if location is patient
        if(location == "Patient"){
            if(blood.state !== DINSTATE.USED){
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
    @Transaction(false)
    public async getHistoryForBloodBag(ctx: BloodContext, bloodNumber: string) {
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
    @Transaction(true)
    @Returns('Process')
    public async createProcess(ctx: BloodContext, processID: string, bloodNumber: string, userID: string, hospitalID: string, bloodBankID: string, type: string): Promise <Process> {
 
        logger.info('============= START : Create Process ===========');
        //await this.hasRole(ctx, ['Blood_Bank', 'Hospital']);

        // Check if the blood bag exists
        if (!await ctx.getBloodBagList().exists(bloodNumber)) {
            throw new Error(`Blood Bag with ID ${bloodNumber} doesn't exists`);
        }

        let process: Process;
        
        //check if process is donate that user id begins with "d"
        if(type == "donate"){
            if(!userID.startsWith("d")){
                throw new Error(`Error user id is not valid`);
            }
        }
        //check if process is recieve that user id begins with "r"
        if(type == "recieve"){
            if(!userID.startsWith("r")){
                throw new Error(`Error user id is not valid`);
            }
        }

        process = Process.createInstance(processID, bloodNumber, userID, hospitalID, bloodBankID, type);
        // Append process asset to ledger
        await ctx.getProcessList().add(process);
 
        logger.info('============= END : Add Process ===========');
        return process;
    }

    /**
     * @param { ctx } the smart contract transaction context
     */
    @Transaction(false)
    @Returns('Process[]')
     public async queryAllProcess(ctx: BloodContext): Promise<Process[]> {
        return await ctx.getProcessList().getAll();
    }

    /**
     * @param { ctx } the smart contract transaction context
     * @param { processNumber } blood number to query
     */
    @Transaction(false)
    @Returns('Process')
    public async queryProcess(ctx: BloodContext, processNumber: string): Promise<Process> {

        // Check if the process exists
        if (!await ctx.getProcessList().exists(processNumber)) {
            throw new Error(`Process with ID ${processNumber} doesn't exists`);
        }

        // Return blood asset from ledger
        return await ctx.getProcessList().get(processNumber);
    }
   
}
