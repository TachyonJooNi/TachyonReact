//해당 문서에서 React기능을 사용하기 위해 import한다.
import React, { Component } from "react";
import "./App.css";

/*
외부 js파일로 모듈화한 컴포넌트를 해당 문서로 import 하기 위한 구분으로,
각 컴포넌트의 마지막에 지정한 "export default 컴포넌트명" 을 그대로 사용한다.
형식] import 변수로사용할이름(별칭) from '컴포넌트경로';
*/
import Subject from "./components/Subject";
import Navi from "./components/Navi";
import Content from "./components/Content";
import Buttons from "./components/Buttons";
import CreateForm from "./components/CreateForm";

/*
함수형 컴포넌트 대신 클래스형 컴포넌트를 사용해서 CRUD앱을 제작한다.
클래스형 컴포넌트 제작시 CDN방식에서는 React.Component를 상속하지만 웹팩방식에서는
아래와 같이 상속하면 된다. React는 상단 import구문에서 이미 정의되어 있기때문이다.
*/

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: { title: "WEB(st)", sub: "World Wide Web(st)" },
      contents: [
        { id: 1, title: "HTML", desc: "HTML은 내용을 출력합니다." },
        { id: 2, title: "CSS", desc: "CSS는 스타일을 지정합니다." },
        {
          id: 3,
          title: "JavaScript",
          desc: "JS는 화면을 동적으로 제어합니다.",
        },
      ],
      mode: "welcome",
      welcome: { title: "Welcome", desc: "Hello React..!!" },
      selected_content_id: 2,
    };
  }
  render() {
    /* 
    Step 2 : props는 컴포넌트 추가시 HTML의 속성처럼 추가하는 부분으로 해당 컴포넌트에서
    사용시에는 "this.props.프롭스명"으로 기술하면 된다.
    
    Step 4 : 생성자에서 state를 생성한 후 기존의 문자열을 state값으로 변경한다. 
    
    Step 5 : Navi를 클릭했을때 해당 내용으로 변경하기 위해 state에 mode, welcome을 추가한다.
    현재 mode가 welcome이라면 환영메세지를 출력하고, read라면 해당 컨텐츠를 출력할 것이다.

    Step 7 : Navi를 클릭할때 mode를 변경하기 위해 selected_content_id를 state에 추가한다.
    */
    let _title,
      _desc = null;
    /* Step 5
    비교연산자 == 은 값만 동일한지 비교한다.
    === 은 값과 타입까지 동일한지 비교하는 연산자이다. ES6의 권장사항이다.
    개발자모드에서 state를 read로 변경해본다.
    */
    if (this.state.mode === "welcome") {
      //해당 애플리케이션을 처음 시작했을때 환영메세지를 출력
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } else if (this.state.mode === "read") {
      //Navi의 각 링크를 클릭했을때 해당 항목의 타이틀과 제목을 출력

      // _title = this.state.contents[0].title;
      // _desc = this.state.contents[0].desc;

      //선택한 항목을 출력하기 위해 반복문을 통해 선택한다.
      var i = 0;
      while (i < this.state.contents.length) {
        var data = this.state.contents[i];
        if (data.id === this.state.selected_content_id) {
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i++;
      }
    }
    return (
      <div className="App">
        {/* Step 6
        Subject 컴포넌트로 onChangePage라는 props를 전달한다. 자식에서 호출시
        mode를 welcome으로 변경하는 역할을 한다. */}
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function () {
            // alert("이벤트 확인용(부모)");
            this.setState({ mode: "welcome" });
          }.bind(this)}
        ></Subject>

        {/* Step 7
        Navi 컴포넌트로 onChangePage라는 props를 전달한다. 자식에서 호출시
        mode를 read로 변경하고, 매개변수로 전달된 값으로 selected_content_id를 변경한다. */}
        <Navi
          data={this.state.contents}
          onChangePage={function (id) {
            // alert("이벤트 확인용(Navi)");
            console.log("content_id", id);
            this.setState({
              mode: "read",
              selected_content_id: Number(id),
            });
          }.bind(this)}
        ></Navi>

        {/* mode값을 변경할수 있는 기능을 onChangeMode라는 props로 자식에게 전달한다. */}
        <Buttons
          onChangeMode={function (btn_mode) {
            this.setState({
              mode: btn_mode,
            });
          }.bind(this)}
        ></Buttons>

        <Content title={_title} desc={_desc}></Content>
        <CreateForm></CreateForm>
      </div>
    );
  }
}

export default App;
