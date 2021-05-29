import { Context } from 'fabric-contract-api';
import { QueryPaginationResponse } from '../utils/queryPaginatedResponse';
import { IHistoricState, IState, State } from './state';
/**
 * StateList provides a named virtual container for a set of ledger states.
 * Each state has a unique key which associates it with the container, rather
 * than the container containing a link to the state. This minimizes collisions
 * for parallel transactions on different states.
 */
export declare class StateList<T extends State> {
    private ctx;
    private name;
    private supportedClasses;
    constructor(ctx: Context, listName: string);
    getCtx(): Context;
    /**
     * Add a state to the list. Creates a new state in worldstate with
     * appropriate composite key.  Note that state defines its own key.
     * State object is serialized before writing.
     */
    add(state: T): Promise<void>;
    /**
     * Get a state from the list using supplied keys. Form composite
     * keys to retrieve state from world state. State data is deserialized
     * into JSON object before being returned.
     */
    get(key: string): Promise<T>;
    getAll(): Promise<T[]>;
    /**
     * generic function used across exercises to update assets
     * Update a state in the list. Puts the new state in world state with
     * appropriate composite key.  Note that state defines its own key.
     * A state is serialized before writing. Logic is very similar to
     * addState() but kept separate becuase it is semantically distinct.
     */
    update(state: any): Promise<void>;
    exists(key: string): Promise<boolean>;
    query(query: any): Promise<T[]>;
    delete(key: string): Promise<void>;
    getName(): string;
    use(...stateClasses: Array<IState<T>>): void;
    /**
     * *** Exercise 3  > Part 4 ***
     * @param { string } key for which to return all history
     * @returns {Array<IHistoricState<T>} array of history state
     * The function returns history of all transactions over a key
     */
    getHistory(key: string): Promise<Array<IHistoricState<T>>>;
    /**
     * *** Exercise 3  > Part 4 ***
     *
     * @param { string } startKey: Start key used as starting point to search the ledger with
     * @param { string } endkey: End key used as end point to search the ledger with
     * @returns T[] Array of states that exists in the range between start and end keys
     *  Query assets by range by using startkey and endkey. This function uses the API getStateByRange
     */
    getAssetsByRange(startKey: string, endKey: string): Promise<T[]>;
    /**
     * *** Exercise 3  > Part 5 ***
     *
     * @param { string } queryString: Query statment as string
     * @param { number } pageSize: Number of query result per page
     * @param { string } bookmark: When an empty string is passed as a value to the bookmark argument,
     * the returned iterator can be used to fetch the first `pageSize` of query results. When the bookmark is not an empty string,
     * the iterator can be used to fetch the first `pageSize` keys between the bookmark and the last key in the query result.
     * @returns { QueryPaginationResponse<T> }: Object of type QueryPaginationResponse T, which contains array of states, number of returned results, and bookmark.
     */
    queryWithPagination(queryString: string, pageSize: number, bookmark: string): Promise<QueryPaginationResponse<T>>;
    /**
     * *** Exercise 3 > Part 4 ***
     *
     * @returns { Number }   count total number of assets of specific type
     * Get Count of specific state (Vehicle , Order , ...)
     */
    count(): Promise<number>;
}
