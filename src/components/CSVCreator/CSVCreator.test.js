import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CSVCreator from "./CSVCreator";
import TopButton from "../topButtons/topButton/TopButton";

configure({ adapter: new Adapter() });

describe("<CSVCreator />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CSVCreator />);
  });
  it("should render table <CSVCreator /> and the relative <TableButton />", () => {
    expect(wrapper.find(TopButton)).toHaveLength(1);
  });
  it("shows an exact csv button", () => {
    expect(
      wrapper.contains(
        <TopButton
          title="Generate CSV"
          className="rect-btn big yellow right"
          icon="file-csv"
          text="CSV"
        />
      )
    );
  });
});
