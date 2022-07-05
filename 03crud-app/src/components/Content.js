//모듈화를 위해 App.js 에서 작성한걸 잘라서 옮기고 import와 export를 알맞게 작성해준다.
import React, { Component } from "react";

class Content extends Component {
  //컨텐츠 부분도 출력내용을 props로 변경한다.
  render() {
    return (
      <article>
        <h2>{this.props.title}</h2>
        {this.props.desc}
      </article>
    );
  }
}

export default Content;
