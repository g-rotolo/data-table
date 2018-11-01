import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import DataTable from "./DataTable";
import TopButtons from "./components/topButtons/TopButtons";
import { columsMock, rowsMock } from "./mocks";

configure({ adapter: new Adapter() });

describe("<DataTable />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<DataTable />);
    wrapper.setProps({ cols: columsMock, rows: rowsMock });
  });
  it("should render table <TableButtons />", () => {
    expect(wrapper.find(TopButtons)).toHaveLength(1);
  });
  it("shows an exact table element", () => {
    expect(wrapper.contains(<table />));
  });
});
