import { Context } from "vm";
import { IInputs } from "../../generated/ManifestTypes";

export class ApiService {
  private _context: ComponentFramework.Context<IInputs>;

  constructor(context: ComponentFramework.Context<IInputs>) {
    this._context = context;
  }

  public retriveRecords = async (
    entityXml: string,
    entity: string
  ): Promise<any> => {
    let fetchXml = [
      `<fetch count= returntotalrecordcount='true'>`,
      entityXml,
      "</fetch>",
    ].join("");

    let odataUrl = `?fetchXml=${fetchXml}`;
    //@ts-ignore
    const url =
      Xrm.Page.context.getClientUrl() + `/api/data/v9.2/${entity}` + odataUrl;
    //console.log(url);
    return fetch(url, {
      method: "GET",
      headers: {
        "OData-MaxVersion": "4.0",
        "OData-Version": "4.0",
        Accept: "text/plain",
        "Content-Type": "application/json; charset=utf-8",
        Prefer: 'odata.include-annotations="*"',
      },
    })
      .then(function (res) {
        return res.json();
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
