/// <reference types="node" />
export interface IState<T> {
    new (...args: any[]): T;
    getClass(): string;
}
/**
 * State class. States have a class, unique key, and a lifecycle current state
 * the current state is determined by the specific subclass (Vehicle , Order , ... )
 */
export declare class State {
    private class;
    private subClass?;
    private key;
    constructor(stateClass: string, keyParts: string[]);
    /**
     * Convert object to buffer containing JSON data serialization
     * Typically used before putState()ledger API
     * @param {Object} JSON object to serialize
     * @return {buffer} buffer with the data to store
     */
    static serialize(object: object): Buffer;
    /**
     * Deserialize object into one of a set of supported JSON classes
     * i.e. Covert serialized data to JSON object
     * Typically used after getState() ledger API
     * @param {data} data to deserialize into JSON object
     * @param (supportedClasses) the set of classes data can be serialized to
     * @return {json} json with the data to store
     */
    static deserialize(data: Buffer, supportedClasses: Map<string, IState<State>>): State;
    /**
     * Deserialize object into specific object class
     * Typically used after getState() ledger API
     * @param {data} data to deserialize into JSON object
     * @return {json} json with the data to store
     */
    static deserializeClass<T extends State>(data: string, objClass: IState<T>): T;
    /**
     * Join the keyParts to make a unififed string
     * @param (String[]) keyParts
     */
    static makeKey(keyParts: string[]): string;
    static splitKey(key: string): string[];
    getClass(): string;
    getSubClass(): string;
    getKey(): string;
    getSplitKey(): string[];
    serialize(): Buffer;
}
export declare class IHistoricState<T extends State> {
    value: T;
    timestamp: number;
    txId: string;
    constructor(timestamp: number, txId: string, value: T);
    serialize(): Buffer;
}
