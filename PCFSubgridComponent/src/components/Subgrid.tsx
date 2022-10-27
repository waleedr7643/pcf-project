import React = require("react");
import { useEffect } from "react";
import { IInputs } from "../../generated/ManifestTypes";
import { ApiService } from "../services/apiservice";
import { returnpresalesrequest } from "../../servicesnew/services";
import { Console } from "console";
import { data } from "../../src/constants";

import {
  ColumnDirective,
  ColumnsDirective,
  Filter,
  GridComponent,
  Group,
  Inject,
  Page,
  Sort,
  Toolbar,
} from "@syncfusion/ej2-react-grids";



export interface SubgridProp {
  context?: ComponentFramework.Context<IInputs>;
  apiService?: ApiService;
}

export interface IState {
  data: any;
}

const pageSettings = { pageSize: 6 };

var entityFormOptions = {
  ["entityName"]: "tek__presales",
  ["useQuickCreateForm"]: true,
};

var valueguid = `${data}`.toString();



export class Subgrid extends React.Component<SubgridProp, IState> {
  private apiService: ApiService;
  private pcfcontext: any;
  toolbarOptions: {
    text: string;
    tooltipText: string;
    prefixIcon: string;
    id: string;
  }[];

  // entityFormOptions["entityName"] = "tek__presales";

  constructor(props: any) {
    super(props);

    this.apiService = props.apiService;
    this.pcfcontext = props.context;

    this.state = { data: [] };

    this.toolbarOptions = [
      {
        text: "New Presales Request",
        tooltipText: "Click",
        prefixIcon: "e-click",
        id: "Click",
      },
    ];
  }

  clickHandler(args: any) {
    // if (args.item.id === "Click") {
    //   alert(`${data.pageid}`);
    // }

    var formParameters = {
      // ["tek__name"]: "Sample",
      ["tek__opportunityid"]: `${data.pageid}`,
      // ["tek__presalesresource"]: "Contact",
      // ["tek__opportunityname"]: "sample data",
      // ["emailaddress1"]: "contact@adventure-works.com",
      // ["tek__opportunitysubgrid"]: "Sr. Marketing Manager",
    };

    Xrm.Navigation.openForm(entityFormOptions, formParameters).then(
      function (success) {
        console.log(success);
      },
      function (error) {
        console.log(error);
      }
    );
  }

  async componentDidMount(): Promise<any> {
    var result;

    var results = await returnpresalesrequest();

    var rows = [];

    for (var k = 0; k < results.entities.length; k++) {
      result = results.entities[k];
      // Columns
      rows.push({
        "Presale Name": result["tek__name"],
        "Opportunity Name": result["tek__opportunityname"],
        "Products in Opportunity": result["tek__productsinopportunity"],
      });
    }

    this.setState({ data: rows });
  }

  public render() {
    this.clickHandler = this.clickHandler.bind(this);
    return (
      <div>
        <GridComponent
          dataSource={this.state.data}
          allowPaging={true}
          pageSettings={pageSettings}
          toolbar={this.toolbarOptions}
          toolbarClick={this.clickHandler}
        >
          <ColumnsDirective>
            <ColumnDirective
              field="Presale Name"
              width="100"
              textAlign="Left"
            />
            <ColumnDirective
              field="Opportunity Name"
              width="100"
              format="C2"
              textAlign="Left"
            />
            <ColumnDirective
              field="Products in Opportunity"
              width="100"
              format="C2"
              textAlign="Left"
            />
          </ColumnsDirective>
          <Inject services={[Page, Sort, Filter, Group, Toolbar]} />
        </GridComponent>
      </div>
    );
  }
}
