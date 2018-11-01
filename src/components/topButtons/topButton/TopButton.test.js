import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import TopButton from "./TopButton";

configure({ adapter: new Adapter() });

describe("<TopButton />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<TopButton />);
  });
  it("shows an exact button element", () => {
    expect(wrapper.contains(<button />));
  });
});
