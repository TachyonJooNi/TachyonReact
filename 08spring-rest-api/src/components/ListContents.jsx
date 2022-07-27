import { Component } from "react";

export default class ListContents extends Component {
  /*
  게시판에 출력할 목록을 저장할 배열과 페이지번호를 state로 생성한다.
  React에서는 컴포넌트의 상태를 표현하기 위해 state를 사용하고, state값이
  변결될때마다 render() 함수가 호출되어 화면이 갱신된다.
  */
  state = {
    blists: [],
    pageNum: 1,
  };

  /*
  render()함수가 호출된 직후 호출되는 수명주기 함수로써 첫 렌더링에서는
  빈 화면을 먼저 출력하고, 서버와 통신 후 데이터가 있는 화면을 출력한다.  
  */
  componentDidMount() {
    //state의 pageNum을 가져와서 요청URL에 파라미터로 사용한다.
    let pageNum = this.state.pageNum;
    /*
    fetch() 함수는 JS에서 기본제공되고, 별도의 옵션이 없으면 get방식의 요청이 된다.
    스프링 서버로 요청한 후 콜백데이터가 있으면 then()절에서 콜백받아 사용한다.    
    */
    fetch(
      "http://localhost:8082/Ex07JSONRestAPI/restapi/boardList.do?nowPage=" +
        pageNum
    )
      .then(function (result) {
        //서버에서 콜백된 데이터를 매개변수 result로 받아온다.
        return result.json();
      })
      .then(
        function (json) {
          //앞의 then절에서 return한 내용은 해당 then절로 전달된다.
          console.log(json);
          //콜백데이터를 통해 state를  변경한다. 이때 화면이 갱신된다.
          this.setState({ blists: json });
          /*
          this.state.blists = json;
          이와 같이 state를 변경할 수 있으나, 이경우 render()함수가 호출되지
          않으므로 화면이 갱신되지 않는다. 반드시 setState()를 통해 state값을
          변경해야 render()함수가 호출되어 화면이 업데이트 된다.
          */
        }.bind(this)
      );
  }

  render() {
    console.log("ListContents render 완료");
    //파싱된 데이터를 출력하기 위한 배열생성
    let listTr = [];
    //출력할 리스트 항목의 갯수만큼 반복한다.
    for (var i = 0; i < this.state.blists.length; i++) {
      //인덱스를 통해 해당 반복에서 출력할 객체를 저장
      var row = this.state.blists[i];
      /*
      push() 함수를 통해 배열의 끝 부분에 데이터를 삽입한다.

      tr태그에 key는 리엑트가 중복되지 않는 prop를 요구하므로 삽입한다.
      없어도 에러가 나진 않으나 경고메세지가 뜨므로 추가해주는것이 좋다.
      
      data-id : event객체를 target이라는 속성을 통해 dataset.id 속성값으로 지정된 
      값을 얻어올수있다. 여기서는 게시물의 일련번호를 전달할 목적으로 사용된다.
      */
      listTr.push(
        <tr align="center" key={row.num}>
          <td>{row.num}</td>
          <td align="left">
            <a
              href={row.num}
              data-id={row.num}
              onClick={(e) => {
                //화면의 새로고침 차단.
                //--화면의 깜빡임을 막아주는 기능 (preventDefault())
                e.preventDefault();
                /*
                부모컴포넌트에서 HTML 속성처럼 전달해준 props를 통해 2개의 인수를
                부모로 전달한다. 첫번째는 게시물의 일련번호, 두번째는 mode값이다.
                */
                this.props.myBoardView(e.target.dataset.id, "view");
              }}
            >
              {row.title}
            </a>
          </td>

          <td align="center">{row.id}</td>
          <td align="center">{row.visitcount}</td>
          <td align="center">{row.postdate}</td>
        </tr>
      );
    }

    return (
      <div className="col-lg-10" id="lay_contents">
        <h2>게시판목록</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th width="10%">번호</th>
              <th width="*">제목</th>
              <th width="15%">작성자</th>
              <th width="15%">조회수</th>
              <th width="15%">작성일</th>
            </tr>
          </thead>
          <tbody>{listTr}</tbody>
        </table>
        <div align="right">
          <button
            type="button"
            onClick={(e) => {
              this.props.myBoardWrite("write");
            }}
          >
            글쓰기
          </button>
        </div>
      </div>
    );
  }
}
