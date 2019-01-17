import { Security } from './securities.model';

export interface ExcelConfig {
    columnConfig: { header: string, fieldName: string }[];
    options: {
        workbook: string,
        worksheet: string,
    };
    data: Security[];
}

export interface Sheet extends ExcelConfig {
    changeColumnConfig: (columnConfig, data) => any;
    update: (data: Security[]) => any;
    onChanged: (callback) => any;
    workbook: string;
    name: string;
}
