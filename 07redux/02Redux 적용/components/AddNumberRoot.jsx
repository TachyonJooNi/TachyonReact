import { Component } from "react";
import AddNumber from "./AddNumber";
/*
2Depth에 Addnumber 컴포넌트를 자식으로 포함하고 있다.
*/
export default class AddNumberRoot extends Component {
  render() {
    return (
      <div>
        <h3>숫자 증가(Depth1)</h3>
        {/* porps를 제거한다. */}
        <AddNumber></AddNumber>
      </div>
    );
  }
}
