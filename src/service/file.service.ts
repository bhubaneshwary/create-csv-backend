import {
  DATA_TYPE,
  CURRENCY,
  UOM,
  getRandomValue,
  getRandomDate,
  generateString,
} from "../utils";
import { Workbook } from "exceljs";
import { v4 as uuidv4 } from "uuid";

type Header = {
  name: string;
  dataType: DATA_TYPE;
  defaultValue?: any;
  valueRange?: any[];
};

export type FileInput = {
  headers: Header[];
  numberOfRows: number;
};

function getValues(index: number, header: Header) {
  if (header.defaultValue) {
    return header.defaultValue;
  }
  const range =
    header?.defaultValue?.[0] || 100 - header?.defaultValue?.[1] || 10 + 1;
  const length =
    Math.floor(Math.random() * range) + header.defaultValue?.[0] || 10;
  switch (header.dataType) {
    case DATA_TYPE.text:
      return generateString(length);
    case DATA_TYPE.number:
      return (
        Math.floor(Math.random() * range) + header?.defaultValue?.[0] || 10
      );
    case DATA_TYPE.select:
      return getRandomValue(index, header.valueRange || []);
    case DATA_TYPE.textarea:
      return generateString(length * 10);
    case DATA_TYPE.date:
      return getRandomDate();
    case DATA_TYPE.email:
      return `${generateString(10)}@testmail.com`;
    case DATA_TYPE.checkbox:
      return getRandomValue(index, header.valueRange || []);

    case DATA_TYPE.currency:
      return getRandomValue(index, CURRENCY);
    case DATA_TYPE.uom:
      return getRandomValue(index, UOM);
    default:
      break;
  }
}

export async function generateXLSXFile(input: FileInput) {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet("sheet1");

  const columnsHeader: typeof worksheet.columns = [];
  const finalData = [];

  input.headers.forEach((item) => {
    columnsHeader.push({
      key: item.name,
      header: item.name,
    });
  });

  worksheet.columns = columnsHeader;

  for (let i = 1; i <= input.numberOfRows; i++) {
    const tempData = {} as { [key: string]: any };
    input.headers.forEach((item) => {
      const key = item.name;
      tempData[key] = getValues(i, item);
    });
    finalData.push(tempData);
  }

  finalData.forEach((item) => {
    worksheet.addRow(item);
  });

  await workbook.xlsx.writeFile(`./public/files/${uuidv4()}.xlsx`);
}
