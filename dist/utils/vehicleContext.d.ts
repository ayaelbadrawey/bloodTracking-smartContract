import { Context } from 'fabric-contract-api';
import { Order } from '../assets/order';
import { Vehicle } from '../assets/vehicle';
import { OrderList } from '../lists/orderList';
import { VehicleList } from '../lists/vehicleList';
/**
 * *** Exercise 02 > Part 4 > Step 6 ***
 */
import { Policy } from '../assets/policy';
import { PolicyList } from '../lists/policyList';
export declare class VehicleContext extends Context {
    private orderList;
    private vehicleList;
    private policyList;
    constructor();
    getOrderList(): OrderList<Order>;
    getVehicleList(): VehicleList<Vehicle>;
    getPolicyList(): PolicyList<Policy>;
}
