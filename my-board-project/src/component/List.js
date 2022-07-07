import React, { Component } from "react";

class List extends Component {
  render() {
    //빈 배열 변수 선언
    let lists = [];
    //프롭스로 전달된 값(배열)을 변수에 저장
    let data = this.props.data;
    let i = 0;
    //배열의 크기만큼 반복한다.
    while (i < data.length) {
      //앞에서 생성한 빈 배열에 <li>태그를 하나씩 추가한다.
      lists.push(
        <tr align="center" key={data[i].id}>
          <td>{data[i].id}</td>
          <td align="left">
            <a
              href={"/View/" + data[i].id}
              data-id={data[i].id}
              onClick={function (event) {
                console.log(event);
                event.preventDefault();
                this.props.onChangePage(event.target.dataset.id);
              }.bind(this)}
            >
              {data[i].title}
            </a>
          </td>
          <td align="center">{data[i].writer}</td>
          <td align="center">{data[i].views}</td>
          <td align="center">{data[i].date}</td>
        </tr>
      );
      i++;
    }

    return (
      //Contents 영역 s
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
          <tbody>{lists}</tbody>
        </table>
        <div align="right">
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              this.props.onChangeMode("write");
            }}
          >
            글쓰기
          </button>
        </div>
      </div>
      //Contents 영역 e
    );
  }
}
export default List;
