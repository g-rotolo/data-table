import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import TopButtons from "./TopButtons";
import CSVCreator from "../CSVCreator/CSVCreator";
import TopButton from "./topButton/TopButton";

configure({ adapter: new Adapter() });

describe("<TopButtons />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<TopButtons />);
  });
  it("should render table <TopButtons /> if show is true", () => {
    wrapper.setProps({ show: true });
    expect(wrapper.find(CSVCreator)).toHaveLength(1);
    expect(wrapper.find(TopButton)).toHaveLength(2);
  });
  it("should not render table <TopButtons /> if show is false", () => {
    wrapper.setProps({ show: false });
    expect(wrapper.find(CSVCreator)).toHaveLength(0);
    expect(wrapper.find(TopButton)).toHaveLength(0);
  });
});
