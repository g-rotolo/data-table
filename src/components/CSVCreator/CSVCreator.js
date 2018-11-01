import React, { Component } from "react";
import TopButton from "../topButtons/topButton/TopButton";

class CSVCreator extends Component {
  generateCSVData = (cols, rows) => {
    const csvData = [];
    rows.forEach(row => {
      let obj = {};
      cols.forEach(col => {
        obj[col.name] = row[col.name];
      });
      csvData.push(obj);
    });
    return csvData;
  };

  convertArraytoCSV = args => {
    let result, ctr, keys, columnDelimiter, lineDelimiter, data;

    data = args.data || null;
    if (data == null || !data.length) {
      return null;
    }

    columnDelimiter = args.columnDelimiter || ",";
    lineDelimiter = args.lineDelimiter || "\n";

    keys = Object.keys(data[0]);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach(function(item) {
      ctr = 0;
      keys.forEach(function(key) {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];
        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  };

  downloadCSV = args => {
    let data, filename, link;
    let formattedData = this.generateCSVData(this.props.cols, this.props.rows);
    let csv = this.convertArraytoCSV({
      data: formattedData
    });
    if (csv == null) return;

    filename = args.filename || "export.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = "data:text/csv;charset=utf-8," + csv;
    }
    data = encodeURI(csv);

    link = document.createElement("a");
    link.setAttribute("href", data);
    link.setAttribute("download", filename);
    link.click();
  };

  render() {
    return (
      <TopButton
        title="Generate CSV"
        onClick={() => this.downloadCSV({ filename: "data-table.csv" })}
        className="rect-btn big yellow right"
        icon="file-csv"
        text="CSV"
      />
    );
  }
}

export default CSVCreator;
