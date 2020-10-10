import React, {useState, useErrect} from 'react';

const useFetch = (callback, url) => {

    const [loading, setLoading] = useState(false);

    const fetchInitialData = async () => {
        setLoading(true);
        // const response = await fetch('http://localhost:8080/todo');
        // const initialData = await response.json();
        const initialData = [
            {"id":1, "title": "공부하기", "status":"todo"},
            {"id":2, "title": "스터디준비", "status":"todo"},
            {"id":3, "title": "알고리즘공부", "status":"todo"},
            {"id":4, "title": "컴퓨터게임", "status":"todo"}];
        setTodos(initialData);
        setLodaing(false);
    }

    useEffetct( () => {
        fetchInitialData();
    }, [])

    return loading;
}

export default useFetch;