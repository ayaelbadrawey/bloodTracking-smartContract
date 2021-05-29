/**
 * *** Exercise 02 > Part 4 > Step 5 ***
 */
import { Policy } from '../assets/policy';
import { IState } from '../ledger-api/state';
import { StateList } from '../ledger-api/statelist';
import { VehicleContext } from '../utils/vehicleContext';
export declare class PolicyList<T extends Policy> extends StateList<T> {
    constructor(ctx: VehicleContext, validTypes: Array<IState<T>>);
    addPolicy(policy: T): Promise<void>;
    getPolicy(policyKey: any): Promise<T>;
}
