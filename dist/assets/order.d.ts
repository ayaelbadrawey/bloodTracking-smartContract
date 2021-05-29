/// <reference types="node" />
import { State } from '../ledger-api/state';
import { Vehicle } from './vehicle';
export declare enum OrderStatus {
    ISSUED = "ISSUED",
    PENDING = "PENDING",
    INPROGRESS = "INPROGRESS",
    DELIVERED = "DELIVERED"
}
export declare class Order extends State {
    static fromBuffer(buffer: any): Order;
    /**
     * Deserialize a state data to commercial paper
     * @param {Buffer} data to form back into the object
     */
    static deserialize(data: any): Order;
    static getClass(): string;
    static createInstance(orderId: any, owner: any, orderStatus: any, vehicleDetails: any): Order;
    orderId: string;
    owner: string;
    orderStatus: OrderStatus;
    vehicleDetails: Vehicle;
    constructor(obj: any);
    toBuffer(): Buffer;
    setIssued(): void;
}
