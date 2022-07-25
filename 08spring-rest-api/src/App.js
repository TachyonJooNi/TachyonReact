import React, { Component } from "react";
import "./App.css";
import Top from "./components/Top";
import Left from "./components/Left";
import Bottom from "./components/Bottom";
import ListContents from "./components/ListContents";
import ViewContents from "./components/ViewContents";
import WriteContents from "./components/WriteContents";

class App extends Component {
  //생성자
  constructor(props) {
    super(props);
    //state생성. 현재 페이지에 대한 읽기 mode와 num 초기화
    this.state = {
      mode: "list",
      num: 0,
    };
  }

  render() {
    /*
    mode에 따라 화면의 내용을 변경하기 위해 컴포넌트를 저장하기 위한 목적으로
    생성한 변수    
    */
    let content;
    //게시판 목록 보기(state의 초기값)
    if (this.state.mode === "list") {
      content = (
        /*
        부모가 자식 컴포넌트로 데이터를 전달할때는 props를 사용한다.
        이때 props는 일반적인 값일수도 있고, 기능을 가진 함수일수도 있다.
        여기서는 2개의 매개변수를 받아 부모의 state를 변경하는 기능을 가지고 있다.        
        */
        <ListContents
          myBoardView={(pnum, pmode) => {
            console.log("num", pnum, "mode", pmode);
            //파라미터를 통해 state를 변경하고 화면을 업데이트 한다.
            this.setState({
              mode: pmode,
              num: pnum,
            });
          }}
          //글쓰기 페이지로 전환하기 위한 props 선언
          myBoardWrite={(pmode) => {
            this.setState({
              mode: pmode,
            });
          }}
        ></ListContents>
      );
    } else if (this.state.mode === "view") {
      /*
      리스트에서 특정 게시물을 클릭할때 전달된 파라미터를 통해 mode는 view로 변경하고
      일련번호는 state의 num을 변경한다. 이때 새롭게 렌더링 되면서 얻어온 num을
      해당 컴포넌트의 props로 전달한다.      
      */
      content = (
        <ViewContents
          num={this.state.num}
          myBoardList={(pmode) => {
            console.log("mode", pmode);
            this.setState({ mode: pmode });
          }}
        ></ViewContents>
      );
    } else if (this.state.mode === "write") {
      //mode가 글쓰기 일때 진입.
      content = (
        <WriteContents
          //리스트 페이지 전환 props
          myBoardList={(pmode) => {
            console.log("mode", pmode);
            this.setState({ mode: pmode });
          }}
          //폼값을 submit 했을때 서버로 전송하기 위한 함수를 props로 전달한다.
          mySubmitValue={(_id, _title, _content) => {
            console.log(_id, _title, _content);
            //3개의 폼값을 받은 후 전송을 위해 JSON객체로 저장한다.
            let param = {
              id: _id,
              title: _title,
              content: _content,
            };
            //요청URL 선언
            let url =
              "http://localhost:8088/Ex07JSONRestAPI/restapi/boardWrite.do";
            /*
            서버로 전송시 방식을 post로 변경한다.
            두번째 매개변수는 JSON형식으로 생성한다. 폼값을 저장한 JSON객체를
            JSON.stringify()를 통해 String으로 변환한 후 body에 실어 서버로 전송한다.
            스프링 서버에서는 @RequestBody 어노테이션을 통해 해당 값을 받는다.
            */
            fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json;charset=utf-8",
              },
              body: JSON.stringify(param),
            })
              .then((response) => {
                return response.json();
              })
              .then(function (json) {
                console.log(json);
                if (json.result === "success") {
                  console.log("글쓰기 성공");
                } else {
                  alert("글쓰기에 실패했습니다.");
                }
              });
            //state를 변경해서 게시판 리스트로 전환한다. 이때 화면은 새롭게 렌더링된다.
            this.setState({ mode: "list" });
          }}
        ></WriteContents>
      );
    }

    return (
      <div className="container">
        <h2>리엑트 + 스프링 연동하기</h2>
        {/* Top 컴포넌트 */}
        <Top></Top>
        {/* Middle 영역 */}
        <div className="row">
          {/* Left컴포넌트 */}
          <Left></Left>
          {/* Content영역 - List, View, Write 컴포넌트 삽입 */}
          {/* 게시판 목록 or 내용보기 출력 */}
          {content}
        </div>
        <Bottom></Bottom>
      </div>
    );
  }
}

export default App;
