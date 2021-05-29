import { State } from '../ledger-api/state';
export declare class QueryPaginationResponse<T extends State> {
    value: T[];
    fetched_records_count: number;
    bookmark: string;
    constructor(fetched_records_count: number, bookmark: string);
}
