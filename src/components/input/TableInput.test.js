import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import TableInput from "./TableInput";

configure({ adapter: new Adapter() });

describe("<TableInput />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<TableInput />);
  });
  it("shows an exact input element", () => {
    expect(wrapper.contains(<input />));
  });
});
