import "./App.css";
import Top from "./component/Top";
import Bottom from "./component/Bottom";
import React, { Component } from "react";
import Left from "./component/Left";
import List from "./component/List";
import Write from "./component/Write";
import View from "./component/View";

class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 102;

    //state를 생성 및 초기화 한다.
    this.state = {
      lists: [
        {
          id: 100,
          title: "나는 제목",
          writer: "홍길동",
          views: "20",
          date: "2020. 2.20",
          desc: "나는 내용",
        },
        {
          id: 101,
          title: "나는 제목1",
          writer: "홍길동1",
          views: "21",
          date: "2020. 2.21",
          desc: "나는 내용1",
        },
        {
          id: 102,
          title: "나는 제목2",
          writer: "홍길동2",
          views: "22",
          date: "2020. 2.22",
          desc: "나는 내용2",
        },
      ],
      mode: "list",
      selected_content_id: 100,
    };
  }

  render() {
    let _id = null,
      _title = null,
      _writer = null,
      _views = null,
      _date = null,
      _desc = null,
      _article = null;

    if (this.state.mode === "list") {
      _article = (
        <List
          data={this.state.lists}
          onChangePage={(id) => {
            this.setState({
              mode: "view",
              selected_content_id: Number(id),
            });
          }}
          onChangeMode={(btn_mode) => {
            this.setState({
              mode: btn_mode,
            });
          }}
        ></List>
      );
    } else if (this.state.mode === "view") {
      let i = 0;
      while (i < this.state.lists.length) {
        var data = this.state.lists[i];
        if (data.id === this.state.selected_content_id) {
          _id = data.id;
          _title = data.title;
          _writer = data.writer;
          _views = data.views;
          _date = data.date;
          _desc = data.desc;
          break;
        }
        i++;
      }
      _article = (
        <View
          id={_id}
          title={_title}
          writer={_writer}
          views={_views}
          date={_date}
          desc={_desc}
          onChangeMode={(btn_mode) => {
            this.setState({
              mode: btn_mode,
            });
          }}
        ></View>
      );
    } else if (this.state.mode === "write") {
      _article = (
        <Write
          onSubmitValue={(_writer, _title, _desc) => {
            this.max_content_id = this.max_content_id + 1;
            var _lists = this.state.lists.concat({
              id: this.max_content_id,
              views: 0,
              date: new Date().toLocaleDateString(),
              writer: _writer,
              title: _title,
              desc: _desc,
            });
            this.setState({
              lists: _lists,
              mode: "list",
              max_content_id: this.max_content_id,
            });
          }}
        ></Write>
      );
    }
    // else if (this.state.mode === "update") {
    //   let _readData;
    //   let i = 0;
    //   while (i < this.state.contents.length) {
    //     let data = this.state.contents[i];
    //     if (this.state.selected_content_id === data.id) {
    //       _readData = data;
    //       break;
    //     }
    //     i++;
    //   }

    //   _article = (
    //     <UpdateForm
    //       readData={_readData}
    //       onSubmitValue={(_id, _title, _desc) => {
    //         console.log(_id, _title, _desc);

    //         var _contents = Array.from(this.state.contents);

    //         var i = 0;
    //         while (i < _contents.length) {
    //           let data = _contents[i];
    //           if (data.id === Number(_id)) {
    //             _contents[i] = { id: Number(_id), title: _title, desc: _desc };
    //             break;
    //           }
    //           i++;
    //         }
    //         this.setState({
    //           contents: _contents,
    //           mode: "read",
    //         });
    //       }}
    //     ></UpdateForm>
    //   );
    // }

    return (
      <div className="App">
        <div className="container">
          <Top></Top>
          <div className="row">
            <Left></Left>
            {_article}
          </div>
          <Bottom></Bottom>
        </div>
      </div>
    );
  }
}

export default App;
