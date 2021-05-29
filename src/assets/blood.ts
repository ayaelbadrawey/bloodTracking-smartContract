
import { Object as ContractObject } from 'fabric-contract-api';
import { State } from '../ledger-api/state';

export enum DINSTATE {
    READY= 'READY',
    UNDER_TRANSPORTATION= 'UNDER_TRANSPORTATION',
    DELIEVERED='DELIEVERED',
    USED='USED'
}

@ContractObject()
export class Blood extends State {

    public static createInstance( DIN: string , mm: string , type: string , date: string , expired: string , test: string, donorID: string, temperature: string ) {
            return new Blood({DIN, mm, type, date, expired, test, donorID, temperature, location: 'Blood Bank', patientID: 'NONE', state: DINSTATE.READY});
        }

    public static getClass() {
        return 'org.vehiclelifecycle.vehicle';
     }

    public DIN: string;
    public mm: string;
    public type: string;
    public date: string;
    public expired: string;
    public test: string;
    public location: string;
    public state: DINSTATE;
    public donorID: string;
    public patientID: string;
    public temperature: string;
    
    constructor(obj) {
        super(Blood.getClass(), [obj.donorID, obj.type]);
        Object.assign(this, obj);

    }

     public toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }
}
