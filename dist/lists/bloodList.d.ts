import { Blood } from '../assets/blood';
import { IState } from '../ledger-api/state';
import { StateList } from '../ledger-api/statelist';
import { BloodContext } from '../utils/bloodContext';
export declare class BloodList<T extends Blood> extends StateList<T> {
    constructor(ctx: BloodContext, validTypes: Array<IState<T>>);
    addBloodBag(blood: T): Promise<void>;
    getBloodBag(blood: any): Promise<T>;
    updateBloodBag(blood: any): Promise<void>;
    /**
     *
     * @param  {string} bloodNumber blood number to return history for
     *
     */
    getBloodBagHistory(bloodNumber: any): Promise<import("../ledger-api/state").IHistoricState<T>[]>;
}
