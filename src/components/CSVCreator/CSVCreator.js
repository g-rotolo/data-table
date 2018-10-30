import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class CSVCreator extends Component {
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
    var data, filename, link;
    var csv = this.convertArraytoCSV({
      data: this.props.csvData
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
      <div>
        <button
          style={{ marginRight: "10px" }}
          title="Generate CSV"
          onClick={() => this.downloadCSV({ filename: "data-table.csv" })}
          className="rect-btn big yellow right"
        >
          <FontAwesomeIcon icon="file-csv" />
          <span style={{ marginLeft: "5px" }}>Download CSV</span>
        </button>
      </div>
    );
  }
}

export default CSVCreator;
