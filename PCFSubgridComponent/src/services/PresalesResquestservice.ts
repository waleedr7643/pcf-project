import { IInputs } from "../../generated/ManifestTypes";
import { PRESALES_REQUESTS_FETCHXML, FormatString } from "../constants";
import { PresalesRequest } from "../models/PresalesRequest";
import { ApiService } from "./apiservice";

export class PresalesResquestservice {
  private _context: ComponentFramework.Context<IInputs>;

  private _apiService: ApiService;

  constructor(
    context: ComponentFramework.Context<IInputs>,
    apiService: ApiService
  ) {
    this._context = context;
    this._apiService = apiService;
  }

  public executeFetchxml = (): Promise<any> => {
    //@ts-ignore
    const currentId = this._context.page.entityId;
    const entity = "tek__presales";
    const fetchXml = FormatString(PRESALES_REQUESTS_FETCHXML, currentId);
    debugger;
    return this._apiService.retriveRecords(fetchXml, entity);
  };

  public getPresalesRequestDetails = (
    items: PresalesRequest[] = new Array(0)
  ): Promise<PresalesRequest[]> => {
    const self = this;
    return this.executeFetchxml().then((result: any) => {
      let morerecords = result["@Microsoft.Dynamics.CRM.morerecords"]
        ? (result["@Microsoft.Dynamics.CRM.morerecords"] as boolean)
        : false;
      if (result.value && result.value.length > 0) {
        let results: PresalesRequest[] = new Array();
        for (let i = 0; i < result.value.length; i++) {
          let newResult: PresalesRequest = {
            Opportunity_Name: result.value[i]["tek__opportunityname"] ?? "",
            Presales_Name: result.value[i]["tek__name"] ?? "",
          };
          //console.log('RESULT ADDED:', newResult);

          results.push(newResult);
        }

        items = items.concat(...results);
      }
      if (morerecords) {
        return self.getPresalesRequestDetails(items);
      } else {
        return Promise.resolve(items);
      }
    });
  };
}
