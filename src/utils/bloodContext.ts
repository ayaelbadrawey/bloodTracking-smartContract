import { Context, Contract } from 'fabric-contract-api';
import { Blood } from '../assets/blood';
import { BloodList } from '../lists/bloodList';
import { Process } from '../assets/process';
import { ProcessList } from '../lists/processList';


export class BloodContext extends Context {
    private bloodList: BloodList<Blood>;
    private processList: ProcessList<Process>;
    constructor() {
        super();

        this.bloodList = new BloodList(this, [Blood]);
        this.processList = new ProcessList(this, [Process]);
       
    }

    public getBloodBagList(): BloodList<Blood> {
        return this.bloodList;
    }
    public getProcessList(): ProcessList<Process> {
        return this.processList;
    }
}
