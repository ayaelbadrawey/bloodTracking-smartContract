import { Vehicle } from '../assets/vehicle';
import { IState } from '../ledger-api/state';
import { StateList } from '../ledger-api/statelist';
import { VehicleContext } from '../utils/vehicleContext';
export declare class VehicleList<T extends Vehicle> extends StateList<T> {
    constructor(ctx: VehicleContext, validTypes: Array<IState<T>>);
    addVehicle(vehicle: T): Promise<void>;
    getVehicle(vehicle: any): Promise<T>;
    updateVehicle(vehicle: any): Promise<void>;
    /**
     * *** Exercise 03 > Part 4 ***
     * @param  {string} vehicleNumber vehicle number to return history for
     * get history for vehicle as provenance of changes over vehicle
     */
    getVehicleHistory(vehicleNumber: any): Promise<import("../ledger-api/state").IHistoricState<T>[]>;
}
