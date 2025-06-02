import React, { useEffect, useState } from 'react'

function AllSessionList({update}) {
    const [sessionDetails, setMysessionDetails] = useState([])
    const [pageIndex, setMypageIndex] = useState(0)
    const handleGetData = async () => {
        const response = await fetch("https://session-backend-1.onrender.com/api/sessionbook/Get_all_session", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'

            },
        })
        const json = await response.json()
        if (json) {
            setMysessionDetails(json.bookedsession)
            // console.log(json)
        } else {
            console.log('error')
        }
    }
    useEffect(() => {
        handleGetData()
    }, [update])
    return (
        <>
            <br />
            {sessionDetails.length===0? <h1 className='text-center'>No Session Booked yet</h1>
            :<div>
                <table className="table">
                    <thead className='table-secondary'>
                        <tr>
                            <td scope='col'>#</td>
                            <td scope='col'>Session Date</td>
                            <td scope='col'>Start Time</td>
                            <td scope='col'>End Time</td>
                        </tr>
                    </thead>
                    <tbody>
                        {sessionDetails[pageIndex]?.allsessiondate?.map((date, innerIndex) => {
                            const startTime = new Date(`${sessionDetails[pageIndex].sessionDate}T${sessionDetails[pageIndex].sessionTime}:00`);
                            const endTime = new Date(startTime.getTime() + sessionDetails[pageIndex].sessionDuration * 60 * 1000);

                            return (
                                <tr key={innerIndex}>
                                    <th scope="row">{innerIndex + 1}</th>
                                    <td className='fw-normal text-warning-emphasis'>{new Date(date).toLocaleDateString()}</td>
                                    <td className='text-primary'>{sessionDetails[pageIndex].sessionTime}</td>
                                    <td className='text-primary'>{endTime.toTimeString().slice(0, 5)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        {pageIndex>0&&<li className="page-item"><a className="page-link" href="#"onClick={()=>setMypageIndex(pageIndex-1)}>Previous</a></li>}
                        {sessionDetails.length>1&&sessionDetails?.map((value, index) => {
                            return <li className="page-item" key={index}><a className="page-link" href="#"onClick={()=>setMypageIndex(index)}>{index + 1}</a></li>
                        })}
                        {pageIndex<sessionDetails.length-1&&<li className="page-item"><a className="page-link" href="#" onClick={()=>setMypageIndex(pageIndex+1)}>Next</a></li>}
                    </ul>
                </nav>
            </div>}
        </>
    )
}

export default AllSessionList
