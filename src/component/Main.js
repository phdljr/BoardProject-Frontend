import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Main() {
    const [boardList, setBoardList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/board")
            .then(res => {
                setBoardList(res.data)
                console.log(res.data)
            })
    }, [])

    return (
        <>
            {boardList.map((board, index) => (
                <div>
                    <span key={index}>{board.id}</span>
                    <span key={index}>{board.title}</span>
                </div>
            ))}
        </>
    )
}