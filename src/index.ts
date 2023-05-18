import { generateXLSXFile, FileInput } from "./service";
import { DATA_TYPE } from "./utils";

//define your headers
const input: FileInput = {
  headers: [
    {
      name: "SKU",
      dataType: DATA_TYPE.text,
      valueRange: [10, 100],
    },
    {
      name: "DESCRIPTION",
      dataType: DATA_TYPE.text,
      valueRange: [100, 200],
    },
    {
      name: "UNITS OF MEASURE",
      dataType: DATA_TYPE.uom,
    },
    {
      name: "QUANTITY",
      dataType: DATA_TYPE.number,
      valueRange: [10, 100],
    },
    {
      name: "CFF-1",
      dataType: DATA_TYPE.currency,
    },
    {
      name: "CF-2",
      dataType: DATA_TYPE.date,
    },
  ],
  numberOfRows: 10000,
};

//uncomment to generate file
generateXLSXFile(input)
  .then((res) => {
    console.log("File created Sucessfully");
  })
  .catch((err) => {
    console.log("Error occurs: ", err);
  });
