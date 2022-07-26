import { Component } from "react";

// process.env.PUBLIC_URL 은 배포시 도메인을 표현하기 위한 것???
export default class Top extends Component {
  render() {
    return (
      <div className="row" id="lay_top">
        <p>
          <img
            src={process.env.PUBLIC_URL + "./my_img/logo_center_v2.jpg"}
            style={{ width: "100px" }}
          />
          &nbsp;&nbsp;
          <a href="../../">스프링 Home</a>
          &nbsp;&nbsp; TOP
        </p>
      </div>
    );
  }
}
