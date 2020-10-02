import React, { Component } from 'react';
import './App.css';
import Subject from './components/Subject';
import TOC from './components/TOC';
import Control from './components/Control';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';


class App extends Component {

  constructor(props) {
    super(props);
    this.max_content_id=3;
    this.state = {
      mode: 'welcome',
      selected_content_id: 2,
      subject: { title: 'WEB', sub: 'World Wide Web!' },
      welcome: { title: "Welcome", desc: 'Hello, React!!' },
      contents: [
        { id: 1, title: 'HTML', desc: 'HTML is for information' },
        { id: 2, title: 'CSS', desc: 'CSS is for design' },
        { id: 3, title: 'JavaScript', desc: 'JavaScript is for interactive' }
      ]
    }
  }

  getReadContent(){
    let i = 0;
    while(i < this.state.contents.length){
      if(this.state.selected_content_id === this.state.contents[i].id){
        return this.state.contents[i];
      }
      i++;
    }
  }


  getContent(){
    var _title, _desc, _article, _content = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if (this.state.mode === 'read') {
      // _title = this.state.contents[this.state.selected_content_id - 1].title;
      // _desc = this.state.contents[this.state.selected_content_id - 1].desc;
      _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    } else if (this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function (_title, _desc) {
        this.max_content_id++;

        var _contents = this.state.contents.concat(
          { id: this.max_content_id, title: _title, desc: _desc }
        );
        this.setState({ 
          contents: _contents,
          mode: 'read',
          selected_content_id: this.max_content_id  
        });

        // push를 쓰고 싶은 경우
        // var newContents = Array.from(this.state.contents);
        // newContents.push({ id: this.max_content_id, title: _title, desc: _desc });
        // this.setState({ contents: newContents });

      }.bind(this)}></CreateContent>
    } else if (this.state.mode === 'update') {
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={
        function (_id, _title, _desc) {
          console.log(_id, _title, _desc);
          console.log(typeof(_id));
          console.log(typeof(this.state.contents[0].id));
          var _contents = Array.from(this.state.contents);
          var i = 0;
          while(i < _contents.length){
            if ( Number(_id) === _contents[i].id){
              _contents[i] = {id:_id, title: _title, desc: _desc};
              break;
            }
            i++;
          }

          this.setState({
            contents:_contents,
            mode : 'read'
          });

          // var _contents = this.state.contents.concat(
          //   { id: this.max_content_id, title: _title, desc: _desc }
          // );
          this.setState({ contents: _contents });
      }.bind(this)}></UpdateContent>
    }

    return _article;
  }


  render() {
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function () {
            this.setState({
              mode: "welcome"
            });
          }.bind(this)}>
        </Subject>

        <TOC
          onChangePage={function (id) {
            this.setState({
              mode: 'read',
              selected_content_id: id
            });
          }.bind(this)}
          data={this.state.contents}>
        </TOC>

        <Control onChangeMode={
          function(_mode){
            if(_mode === 'delete'){
              if(window.confirm('really?')){
                let i = 0;
                let _contents = Array.from(this.state.contents);
                while( i < _contents.length){
                  if(this.state.selected_content_id === _contents[i].id){
                    _contents.splice(i,1);
                    break;
                  }
                  i++;
                }
                this.setState({
                  contents : _contents,
                  mode: 'welcome'
                });
                alert('deleted!');
              }
            }else{
              this.setState({mode:_mode});
            }
            
          }.bind(this)}></Control>

        {this.getContent()}

      </div>
    );
  }
}

export default App;
