import { Component } from "react";
//store를 임포트하면 리덕스 스토어에 접근할 수 있다.
import store from "../store";

export default class AddNumber extends Component {
  //state 선언 및 초기화
  state = { adder: 1 };
  render() {
    return (
      <div>
        <h4>숫자 증가 Form(Depth2)</h4>
        <p>숫자를 변경한 후 증가 버튼을 누르세요.</p>
        <input
          type="number"
          className="addInput"
          value={this.state.adder}
          onChange={(e) => {
            this.setState({
              adder: Number(e.target.value),
            });
          }}
        />
        {/* 
        store의 dispatch() 함수를 통해 값과 타입을 전달할 수 있다.
        타입은 INCREMENT, 사이즈는 state인 adder를 전달한다.
        */}
        <input
          type="button"
          className="addBtn"
          value="증가"
          onClick={() => {
            store.dispatch({ type: "INCREMENT", size: this.state.adder });
          }}
        />
      </div>
    );
  }
}
