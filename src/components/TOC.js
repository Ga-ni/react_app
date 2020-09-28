import React, { Component } from 'react';

class TOC extends Component {
    shouldComponentUpdate(newProps, newState){ //두 개의 매개변수가 있음.
        console.log("===> TOC render sholdcomponentUpdate",
        newProps.data
        ,this.props.data);

        if(this.props.data === newProps.data){ //이런 것 때문에 push 대신에 concat을 씀 = 원본을 바꾸지 않음.
            return false;
        }
        return true;
    }

    render() {
        console.log("===> TOC render");
        var lists = [];
        var data = this.props.data;
        var i = 0;
        while (i < data.length) {
            lists.push(
                <li key={data[i].id}>
                    <a
                        href={"/content/" + data[i].id}
                        data-id={data[i].id}
                        onClick={function (id, e) {
                            e.preventDefault();
                            this.props.onChangePage(id);
                        }.bind(this, data[i].id)}
                    >{data[i].title}</a>
                </li>);
            i++;
        }

        return (
            <nav>
                <ul>
                    {lists}
                </ul>
            </nav>
        );
    }
}

export default TOC;