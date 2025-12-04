import { useEffect, useState } from 'react';

import './CheckInfo.css';
import { BaseResponse } from '../../interfaces';

export function CheckInfo() {
  const [status, setStatus] = useState<'INITIAL' | 'SEND_DATA' | 'SENDING_DATA' | 'DATA_SENDED' | 'ERROR_SENDING_DATA'>();
  const [formInfo, setValue] = useState({
    name: '',
    age: '',
    married: false,
    dateOfBirth: ''
  });
  const [data , setData] = useState<BaseResponse>();

  useEffect(() => {

    if(status === 'SEND_DATA') {
      setStatus('SENDING_DATA');
      fetch('http://localhost:3001/info-user/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          formInfo
        )
      })
      .then((rawResponse) => {
        if([200, 201].includes(rawResponse.status)) {
          return rawResponse.json();
        } else {
          throw new Error();
        }        
      })
      .then((response: BaseResponse) => {
        setStatus('DATA_SENDED');
        setData(response);
      })
      .catch(e => {
        setStatus('ERROR_SENDING_DATA');
      })
    }
  }, [status, formInfo]);

  if (status === 'ERROR_SENDING_DATA') {
    return (
      <div className="error">
        <h1>ERROR SENDING DATA</h1>
        <button onClick={() => setStatus('INITIAL')}>TRY AGAIN</button>
      </div>
    );
  }

  if(status === 'SEND_DATA' || status === 'SENDING_DATA') {
    return (
      <div className="sending">
        <h1>SENDING IN PROGRESS</h1>
        <button onClick={() => setStatus('INITIAL')}>CANCEL</button>
      </div>
    );
  }

  if(status === 'DATA_SENDED') {
    return (
    <div className="success">
        {data?.success === true && <h1>VALID DATA SENT</h1>}
        {data?.success === false && <h1>INVALID DATA SENT</h1>}
        <button onClick={() => setStatus('INITIAL')}>SEND ANOTHER VALUE</button>
    </div>)
  }

  return (
    <form className='form'>
        <h1>ENTER YOUR DETAILS</h1>
        <input className='input'  type="text" placeholder='Name' value={formInfo.name} onChange={(e) => setValue({...formInfo, name: e.target.value})} />

        <input className='input' type="number" placeholder="Age" value={formInfo.age} onChange={(e) => setValue({ ...formInfo, age: e.target.value })}/>

        <input className='input' type="date" placeholder='DateOfBirth' value={formInfo.dateOfBirth} onChange={(e) => setValue({ ...formInfo, dateOfBirth: e.target.value })}/>

          <label className="checkbox-label">Married<input className='input' type="checkbox" checked={formInfo.married} onChange={(e) => setValue({ ...formInfo, married: e.target.checked })}/></label>


        <button className='button' onClick={() => setStatus('SEND_DATA')}>SUBMIT</button>
    </form>
  );
}
