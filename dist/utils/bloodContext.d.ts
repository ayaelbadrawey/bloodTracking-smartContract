import { Context } from 'fabric-contract-api';
import { Blood } from '../assets/blood';
import { BloodList } from '../lists/bloodList';
import { Process } from '../assets/process';
import { ProcessList } from '../lists/processList';
export declare class BloodContext extends Context {
    private bloodList;
    private processList;
    constructor();
    getBloodBagList(): BloodList<Blood>;
    getProcessList(): ProcessList<Process>;
}
