import React, { Component } from "react";

class View extends Component {
  render() {
    return (
      //Contents 영역 s
      <div className="col-lg-10" id="lay_contents">
        <h2>게시판내용보기</h2>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th width="10%">번호</th>
              <td width="40%">{this.props.id}</td>
              <th width="10%">작성자</th>
              <td width="40%">{this.props.writer}</td>
            </tr>
            <tr>
              <th>작성일</th>
              <td>{this.props.date}</td>
              <th>조회수</th>
              <td>{this.props.date}</td>
            </tr>
            <tr>
              <th>제목</th>
              <td colSpan="3">{this.props.title}</td>
            </tr>
            <tr>
              <th>내용</th>
              <td colSpan="3" height="100">
                {this.props.desc}
              </td>
            </tr>
            <tr>
              <td colSpan="4" align="center">
                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    this.props.onChangeMode("list");
                  }}
                >
                  리스트바로가기
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      //Contents 영역 e
    );
  }
}
export default View;
