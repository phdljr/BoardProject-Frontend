import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

export default function BoardPage() {
    const { boardId } = useParams();
    const [loadData, isLoadData] = useState(null);

    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_HOST + "/board/" + boardId)
            .then(res => {
                isLoadData(true)
                console.log(res.data)
            })
            .catch(() => {
                isLoadData(false)
                console.log("실패")
            })
    }, [boardId])

    if (loadData === null) {
        return (
            <Card body className="alignmentCenter normalPadding shadow">데이터 요청중...</Card>
        )
    }
    if (!loadData) {
        return (
            <Card body className="alignmentCenter normalPadding shadow">데이터를 가져오지 못했습니다.</Card>
        )
    }
    return (
        <>
            {boardId}
        </>
    )
}