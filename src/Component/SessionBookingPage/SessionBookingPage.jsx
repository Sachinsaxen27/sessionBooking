import React, { useEffect, useState } from 'react'
import './SessionBookingPage.css'
import AllSessionList from '../Sessionlist/allSessionList'
function SessionBookingPage() {
    const [alert, setMyalert] = useState(false)
    const [update, setMyupdate] = useState(false)
    const [bookingCred, setMyBookingCred] = useState({
        sessionDate: '',
        sessionTime: "",
        totalSession: '',
        sessionInterval: "",
        sessionDuration: '',
        lastsessionTime: ""
    })
    const [sessionPreferredday, setMySessionPreferredday] = useState([])
    const [sessionAllpreferreddate, setMysessionAllpreferraddate] = useState([])
    const handlepreferredday = (day) => {
        setMySessionPreferredday(prev =>
            prev.includes(day) ? prev : [...prev, day]
        );
    }
    const handlechange = (e) => {
        setMyBookingCred({ ...bookingCred, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        const totalsession = Number(bookingCred.totalSession) || 1;
        const interval = Number(bookingCred.sessionInterval) === 0 ? 1 : Number(bookingCred.sessionInterval);
        const startDate = new Date(bookingCred.sessionDate);
        const startDay = startDate.toLocaleDateString('en-US', { weekday: 'short' });
        if (sessionPreferredday.length > 0 && !sessionPreferredday.includes(startDay)) {
            setMyalert(true);
        }
        if (totalsession === 1) {
            setMysessionAllpreferraddate([bookingCred.sessionDate]);
        }
        else if (totalsession > 1 && sessionPreferredday.length === 0) {
            const resultDates = [];
            for (let i = 0; i < totalsession; i++) {
                const nextDate = new Date(startDate);
                nextDate.setDate(startDate.getDate() + i * interval);
                resultDates.push(nextDate.toISOString().split("T")[0]);
            }
            setMysessionAllpreferraddate(resultDates);
            setMyBookingCred(prev => ({ ...prev, lastsessiondate: resultDates[resultDates.length - 1] }));
        }
        else if (sessionPreferredday.length > 0) {
            const resultDates = [];
            let currentDate = new Date(bookingCred.sessionDate);

            while (resultDates.length < totalsession) {
                const currentDay = currentDate.toLocaleDateString('en-US', { weekday: 'short' });

                if (sessionPreferredday.includes(currentDay)) {
                    resultDates.push(currentDate.toISOString().split("T")[0]);
                    currentDate.setDate(currentDate.getDate() + interval);
                } else {
                    currentDate.setDate(currentDate.getDate() + 1);
                }
            }
            setMysessionAllpreferraddate(resultDates);
            setMyBookingCred(prev => ({ ...prev, lastsessiondate: resultDates[resultDates.length - 1] }));
        }

    }, [bookingCred.totalSession, bookingCred.sessionInterval, bookingCred.sessionDate, sessionPreferredday]);

    const handlesumbit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://session-backend-tivg.onrender.com/book_session", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({
                sessionDate: bookingCred.sessionDate,
                sessionTime: bookingCred.sessionTime,
                totalSession: bookingCred.totalSession,
                sessionInterval: bookingCred.sessionInterval,
                sessionDuration: bookingCred.sessionDuration,
                lastsessionTime: bookingCred.sessionTime,
                sessionAllpreferreddate: sessionAllpreferreddate
            }),
        });
        const json = await response.json()
        if (json.success) {
            setMyupdate(true)
            setMyBookingCred({
                sessionDate: '',
                sessionTime: "",
                totalSession: '',
                sessionInterval: "",
                sessionDuration: '',
                lastsessiondate: "",
                lastsessionTime: ""
            })
            setMySessionPreferredday([])
            setMysessionAllpreferraddate([])
            console.log(json)
            setTimeout(() => {
                setMyupdate(false)
            }, 4000)
        } else {
            setMyupdate(false)
            console.log('error')
        }
    }
    return (
        <>
            <div className='sessionBookingOuterDiv'>
                <div className='sessionBookingHeaderDiv'>+ Session Page</div>
                <div>
                    <form>
                        <div className='sessionFormFirstContainer'>
                            <div>
                                <label htmlFor="sessionDate">Session Date</label>
                                <input type="date" name="sessionDate" id="sessionDate" onChange={handlechange} />
                            </div>
                            <div>
                                <label htmlFor="sessionTime">Session Time</label>
                                <input type="time" name="sessionTime" id="sessionTime" onChange={handlechange} />
                            </div>
                            <div>
                                <label htmlFor="totalSession">Total Session</label>
                                <input type="number" name="totalSession" id="totalSession" onChange={handlechange} />
                            </div>
                        </div>
                        <div className="sessionFormSecondContainer">
                            <div>
                                <label htmlFor="sessionInterval">
                                    Session Interval
                                </label>
                                <span>
                                    <input type="number" name="sessionInterval" id="sessionInterval" style={{ width: "3rem" }} placeholder='00' disabled={Number(bookingCred.totalSession) <= 1} onChange={handlechange} /> days
                                </span>
                            </div>
                            <div style={{ paddingLeft: "20px" }}>
                                <div style={{ flexDirection: 'row', margin: "0px", alignItems: 'center' }}>
                                    <label htmlFor="preferredDays">Preferred Days -</label>
                                    <span className='text-primary' style={{ fontSize: "12px" }}>
                                        {sessionPreferredday.join(',')}
                                    </span>
                                </div>
                                <div style={{ flexDirection: 'row', margin: '0px' }}>
                                    <input type='button' className='buttonprefrredDay' style={{ padding: "0px" }} value='S' onClick={() => handlepreferredday("Sun")} />
                                    <input type='button' className='buttonprefrredDay' style={{ padding: "0px" }} value='M' onClick={() => handlepreferredday('Mon')} />
                                    <input type='button' className='buttonprefrredDay' style={{ padding: "0px" }} value='T' onClick={() => handlepreferredday('Tue')} />
                                    <input type='button' className='buttonprefrredDay' style={{ padding: "0px" }} value='W' onClick={() => handlepreferredday('Wed')} />
                                    <input type='button' className='buttonprefrredDay' style={{ padding: "0px" }} value='Th' onClick={() => handlepreferredday('Thu')} />
                                    <input type='button' className='buttonprefrredDay' style={{ padding: "0px" }} value='F' onClick={() => handlepreferredday('Fri')} />
                                    <input type='button' className='buttonprefrredDay' style={{ padding: "0px" }} value='S' onClick={() => handlepreferredday('Sat')} />
                                </div>
                            </div>
                            <div></div>
                        </div>
                        <div className="sessionFormThirdContainer">
                            <div>
                                <label htmlFor="sessionDuration">Duration per session</label>
                                <span>
                                    <input type="number" name="sessionDuration" id="SessionDuration" style={{ width: '3rem' }} placeholder='60' onChange={handlechange} /> Minutes
                                </span>
                            </div>
                            <div>
                                <label htmlFor="lastsessiondate">Last Session Date</label>
                                <input type="date" name="lastsessiondate" value={sessionAllpreferreddate.length > 1 ? sessionAllpreferreddate[sessionAllpreferreddate.length - 1] : sessionAllpreferreddate[0] || ''} id="Lastsessiondate" readOnly />
                            </div>
                            <div>
                                <label htmlFor="lastsessionTime">Last Session Time</label>
                                <input type="time" name="lastsessionTime" id="LastsessionTime" value={bookingCred.sessionTime} readOnly />
                            </div>
                        </div>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button type="button" className="btn btn-primary" onClick={handlesumbit}>Save</button>
                            <button type="button" className="btn btn-outline-danger">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
            {alert && <div class="alert alert-warning alert-dismissible fade show" role="alert" style={{ width: '30rem', position: 'fixed', top: '20px', right: '10px' }}>
                Today's day is not included in your preferred days. To begin the session today, please add it back. Otherwise, the session will start from the next available preferred day.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>}
            <AllSessionList update={update} />
        </>
    )
}

export default SessionBookingPage
