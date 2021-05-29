import { Process } from '../assets/process';
import { IState } from '../ledger-api/state';
import { StateList } from '../ledger-api/statelist';
import { BloodContext } from '../utils/bloodContext';
export declare class ProcessList<T extends Process> extends StateList<T> {
    constructor(ctx: BloodContext, validTypes: Array<IState<T>>);
    addProcess(process: T): Promise<void>;
    getProcess(process: any): Promise<T>;
    updateProcess(process: any): Promise<void>;
}
