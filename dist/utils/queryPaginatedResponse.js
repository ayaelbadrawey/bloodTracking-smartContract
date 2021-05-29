"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryPaginationResponse = void 0;
// Query response as a container for query results with pagination option
/*
The container defines attributes for fetched record count and bookmark
*/
class QueryPaginationResponse {
    constructor(fetched_records_count, bookmark) {
        this.fetched_records_count = fetched_records_count;
        this.bookmark = bookmark;
    }
}
exports.QueryPaginationResponse = QueryPaginationResponse;
//# sourceMappingURL=queryPaginatedResponse.js.map