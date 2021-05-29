
import { Object as ContractObject } from 'fabric-contract-api';
import { State } from '../ledger-api/state';

@ContractObject()
export class Process extends State {

    public static createInstance( processID: string , bloodNumber:string, userID: string , hospitalID: string , bloodBankID: string , type: string) {
            return new Process({processID, bloodNumber, userID, hospitalID, bloodBankID, type});
        }

    public static getClass() {
        return 'org.vehiclelifecycle.process';
     }

    public processID: string;
    public bloodNumber: string;
    public userID: string;
    public hospitalID: string;
    public bloodBankID: string;
    public type: string;

    
    constructor(obj) {
        super(Process.getClass(), [obj.processID, obj.type]);
        Object.assign(this, obj);

    }

     public toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }
}
