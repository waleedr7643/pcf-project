import { constants } from "buffer";

export const FormatString = (str: string, ...val: string[]) => {
  for (let index = 0; index < val.length; index++) {
    str = str.replace(`{${index}}`, val[index]);
  }
  return str;
};

export const PRESALES_REQUESTS_FETCHXML =
  "<fetch mapping='logical'>" +
  "<entity name='tek__presales'>" +
  "<attribute name='tek__opportunityid' />" +
  "<attribute name='tek__opportunityname' />" +
  "<attribute name='tek__name' />" +
  "<attribute name='tek__presalesid' />" +
  "<attribute name='tek__opportunitysubgrid' />" +
  "<filter>" +
  "<condition attribute='tek__opportunityid' operator='eq' value='{0}' />" +
  "</filter>" +
  "</entity>" +
  "</fetch>";

export const data = {
  pageid: null,
};
