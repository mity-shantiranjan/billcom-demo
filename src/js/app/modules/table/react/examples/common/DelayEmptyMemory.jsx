import Store from "dstore/Store";
import Deferred from "dojo/Deferred";
import QueryResults from "dstore/QueryResults";

// @see https://github.com/SitePen/dstore/blob/master/src/Store.js
export default class DelayEmptyMemory extends Store {

    // @see https://github.com/SitePen/dstore/blob/master/src/Request.js
    fetchRange() {
        // ES6 Promises don't work here for some reason. Use Dojo
        const promise = new Deferred();

        // Wait 5 seconds before sending back the data
        setTimeout(() => {
            promise.resolve([]);
        }, 5000);

        return new QueryResults(
            promise.then(data => {
                return data;
            }),
            {
                totalLength: promise.then(() => {
                    return 0;
                })
            }
        );
    }

}
