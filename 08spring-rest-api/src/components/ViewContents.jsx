import { Component } from "react";

export default class ViewContents extends Component {
  //state에서는 내용보기를 위한 bview를 생성한 후 JSON객체로 초기화한다.
  state = {
    bview: {
      content: "여긴내용",
    },
    // bview: {} --> 썰렁해서 content 하나 써놓은 것이고 그냥 객체하나가 필요해서 만든것이다.
  };
  //내용보기를 위한 API를 요청한다.
  componentDidMount() {
    //부모가 전달해준 props를 통해 일련번호를 받아온다.
    fetch(
      "http://localhost:8082/Ex07JSONRestAPI/restapi/boardView.do?num=" +
        this.props.num
    )
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        //첫번째 then절에서 콜백데이터를 받은후 두번째 then절로 전달한다.
        //이를 통해 state을 변경하고 화면을 갱신한다.
        console.log(json);
        this.setState({ bview: json });
      });
    //여기서는 화살표함수를 사용하므로 bind()가 필요없다.
  }
  render() {
    console.log("ViewContents->num", this.props.num);
    return (
      <div className="col-lg-10" id="lay_contents">
        <h2>게시판내용보기</h2>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td>번호</td>
              <td>{this.state.bview.num}</td>
              <td>작성자</td>
              <td>{this.state.bview.id}</td>
            </tr>
            <tr>
              <td>작성일</td>
              <td>{this.state.bview.postdate}</td>
              <td>조회수</td>
              <td>{this.state.bview.visitcount}</td>
            </tr>
            <tr>
              <td>제목</td>
              <td colSpan="3">{this.state.bview.title}</td>
            </tr>
            <tr>
              <td>내용</td>
              <td colSpan="3" height="100">
                {this.state.bview.content.split("\n").map((line) => {
                  /* 고차함수 중 map()을 이용해서 엔터키를 <br>태그로 변경한 후 화면에 출력한다. */
                  return (
                    <span key={Math.random()}>
                      {line}
                      <br />
                    </span>
                  );
                })}
              </td>
            </tr>
            <tr>
              <td colSpan="4" align="center">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    /*
                    부모가 props를 통해 전달한 함수를 통해 목록으로 화면전환한다.
                    mode가 list로 변경될때 화면이 갱신된다.                    
                    */
                    this.props.myBoardList("list");
                  }}
                >
                  목록보기
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
