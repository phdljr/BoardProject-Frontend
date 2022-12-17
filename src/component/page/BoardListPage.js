import axios from 'axios';
import { useEffect, useState } from 'react';

export default function BoardListPage() {
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
                <div key={index}>
                    <span>{board.id}</span>
                    <span>{board.title}</span>
                </div>
            ))}
        </>
    )
}