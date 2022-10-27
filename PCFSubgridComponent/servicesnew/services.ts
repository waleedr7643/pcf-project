import { data } from "../src/constants";

export async function returnpresalesrequest() {
  return Xrm.WebApi.online
    .retrieveMultipleRecords(
      "tek__presales",
      `?$select=tek__name,tek__opportunityname,tek__productsinopportunity&$filter=tek__opportunityid eq '${data.pageid}'`
    )
    .then(
      function success(results) {
        // debugger;
        console.log(results);
        return results;
      },
      function (error) {
        console.log(error.message);
      }
    );
}
