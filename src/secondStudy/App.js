import React, {useState, useEffect} from 'react';
import './App.css';

function App(){
    var [funcShow, setFuncShow] = useState(true);
    var [classShow, setClassShow] = useState(true);

    return(

        <div className="container">
            <input type='button' value='remove func' onClick ={()=>{
                setFuncShow(false);
            }}/>
            <input type='button' value='remove class' onClick ={()=>{
                setClassShow(false);
            }}/>
            <h1>Hello world</h1>
            {funcShow ? <FuncComp initNumber={2} date={(new Date()).toString()}></FuncComp> : null}
            {classShow ? <ClassComp initNumber={2} date={(new Date()).toString()}></ClassComp> : null}
        </div>
    );
}

var funcStyle = 'color:blue';
var funcId = 0;
function FuncComp(props){
    var numberState = useState(props.initNumber);
    var number = numberState[0];
    var setNumber = numberState[1];
    // var nowState = useState(props.now);
    // var now = nowState[0];
    // var setNow = nowState[1];

    // var [_num, setNumber] = useState(props.initNumber);
    var [_date, setDate] = useState((new Date()).toString());

    useEffect(()=>{
        console.log('%cfunc => useEffect (componentDidMount) ' + (++funcId), funcStyle);
        //clean up
        return ()=>{
            console.log('%cfunc => useEffect return (componentWillUnmount) ' + (++funcId), funcStyle);
        }
    }, []); // componentDidMount처럼 한번만 useEffect 실행

    useEffect(()=>{
        console.log('%cfunc => useEffect number (componentDidMount & componentDidUpdate) ' + (++funcId), funcStyle);
        document.title = number;
        //clean up
        return ()=>{
            console.log('%cfunc => useEffect number return (componentDidMount & componentDidUpdate) ' + (++funcId), funcStyle);
        }
    }, [number]); // number가 변경될 경우에만 useEffect 실행

    // side effect
    useEffect(()=>{
        console.log('%cfunc => useEffect _date (componentDidMount & componentDidUpdate) ' + (++funcId), funcStyle);
        document.title = _date;
        //clean up
        return ()=>{
            console.log('%cfunc => useEffect _date return (componentDidMount & componentDidUpdate) ' + (++funcId), funcStyle);
        }
    }, [_date]); // _date가 변경될 경우에만 useEffect 실행



    console.log('%cfunc => render ' + (++funcId), funcStyle);

    return(
        <div className="container">
            <h2>Function Style Component</h2>
            <p>Number : {number}</p>
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


    // componentWillMount(){
    //     console.log("%cclass => componentWillMount()", classStyle);
    // }
    componentDidMount(){
        console.log("%cclass => componentDidMount()", classStyle);
    }
    shouldComponentUpdate(nextProps, nextState){
        console.log("%cclass => shouldComponentUpdate()", classStyle); //, nextProps, nextState);
        return true;
    }
    // componentWillUpdate(prevProps, nextState){
    //     console.log("%cclass => componentWillUpdate() :: \n", classStyle, nextProps, nextState);
    // }
    componentDidUpdate(prevProps, prevState){
        console.log("%cclass => componentDidUpdate() ", classStyle); //, prevProps, prevState);
    }

    componentWillUnmount(){
        console.log("%cclass => componentWillUnmount()", classStyle);
    }
    render(){
        console.log("%cclass => render()", classStyle);
        return(
            <div className="container">
                <h2>Class Style Component</h2>
                <p>Number : {this.state.initNumber}</p>
                <p>Date time : {this.state.date}</p>
                <input type="button" value="random" onClick={ ()=>{
                    this.setState({
                        initNumber: Math.random()
                    });
                }}>
                </input>
                <input type="button" value="date" onClick={ ()=>{
                    this.setState({
                        date: (new Date()).toString()
                    });
                }}></input>
            </div>
        );
    }
}

export default App;