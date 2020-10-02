import React, {useState} from 'react';
import './App.css';

function App(){
    return(
        <div className="container">
            <h1>Hello world</h1>
            <FuncComp initNumber={2} date={(new Date()).toString()}></FuncComp>
            <ClassComp initNumber={2} date={(new Date()).toString()}></ClassComp>
        </div>
    );
}

function FuncComp(props){
    // var numberState = useState(props.initNumber);
    // var nowState = useState(props.now);
    // var number = numberState[0];
    // var now = nowState[0];
    // var setNumber = numberState[1];
    // var setNow = nowState[1];

    var [_num, setNumber] = useState(props.initNumber);
    var [_date, setDate] = useState((new Date()).toString());

    return(
        <div className="container">
            <h2>Function Style Component</h2>
            <p>Number : {_num}</p>
            <p>now : {_date}</p>
            <input type="button" value="ramdom" onClick={
                function(){
                    setNumber(Math.random());
                }
            }></input>
            <input type="button" value="date" onClick={
                function(){
                    setDate(new Date().toString());
                }
            }></input>
        </div>
    
    );
}


var classStyle = 'color:red';
class ClassComp extends React.Component{
    state={
        initNumber:this.props.initNumber,
        date: this.props.date
    }


    componentWillMount(){
        console.log("%cclass => componentWillMount()", classStyle);
    }
    componentDidMount(){
        console.log("%cclass => componentDidMount()", classStyle);
    }
    shouldComponentUpdate(){
        console.log("%cclass => shouldComponentUpdate()", classStyle);
        return true;
    }
    componentWillUpdate(){
        console.log("%cclass => componentWillUpdate()", classStyle);
    }
    componentDidUpdate(){
        console.log("%cclass => componentDidUpdate()", classStyle);
    }
    render(){
        console.log("%cclass => render()", classStyle);
        return(
            <div className="container">
                <h2>Class Style Component</h2>
                <p>Number : {this.state.initNumber}</p>
                <p>Date time : {this.state.date}</p>
                <input type="button" value="random" onClick={ function(){
                    this.setState({
                        initNumber: Math.random()
                    });
                }.bind(this)}>
                </input>
                <input type="button" value="date" onClick={ function(){
                    this.setState({
                        date: (new Date()).toString()
                    });
                }.bind(this)}></input>
            </div>
        );
    }
}

export default App;