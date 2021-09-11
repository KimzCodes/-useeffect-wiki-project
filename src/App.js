import { useEffect, useState, useRef} from 'react';
import axios from 'axios';

export default function App() {
  const [term, setTerm] = useState('javascript');
  const [result, setResult] = useState([]);
  const termUseRef = useRef(); 



  //init
  //state -> term = javascript 
  //state -> result = array empty
  //ref -> termUseRef -> empty
  //prevTerm -> termUseRef.current ->empty
  //render

  //after first render
   //prevTerm -> termUseRef.current ->empty
   //useEffect 1 -> termUseRef.current = term -> javascript
   //useEffect 2 ->result empty -> update state
   //re render


   //after second
  //prevTerm -> termUseRef.current ->javascript
   //useEffect 1 -> termUseRef.current = term -> javascript
   //useEffect 2 ->   //term = javascript vs prevTerm  = javascript



   //user update the input with php, update state
   //re render
  //prevTerm -> termUseRef.current -> javascript
  //useEffect 1 -> termUseRef.current = term -> php
  //useEffect 2->//term = php  vs prevTerm = javascript -> search -> hit wiki api -> update result -> re render

  //prevTerm -> termUseRef.current -> php
    //useEffect 1 -> termUseRef.current = term -> php
  //useEffect 2->//term = php  vs prevTerm = php
  

  useEffect(() => {
    termUseRef.current = term
 
  })

  const prevTerm = termUseRef.current;


  useEffect(() => {
    const search = async () => {
      const respond = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          list: 'search',
          origin: '*',
          format: 'json',
          srsearch: term,
        },
      });
      setResult(respond.data.query.search);
    };

    if (!result.length) {
      if (term) {
        search();
      }

    } else if(term !== prevTerm) {
      const debounceSearch = setTimeout(() => {
        if (term) {
          search();
        }
      }, 1200);

      return () => {
        clearTimeout(debounceSearch);
      };
    }
  }, [term, result.length, prevTerm]);

  //init render
  //useEffect -> check length -> search() -> update resualt
  //re-render
  //useEffect ->check length -> search() -> update resualt
  //re-render

  const fetchResult = result.map((el) => {
    return (
      <tr key={el.pageid}>
        <td>1</td>
        <td>{el.title}</td>
        <td>
          <span dangerouslySetInnerHTML={{ __html: el.snippet }} />
        </td>
      </tr>
    );
  });

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <div className='my-3'>
            <label htmlFor='exampleFormControlInput1' className='form-label'>
              Search Input
            </label>
            <input
              type='text'
              className='form-control'
              id='exampleFormControlInput1'
              onChange={(e) => setTerm(e.target.value)}
              value={term}
            />
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col'>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Title</th>
                <th scope='col'>Desc</th>
              </tr>
            </thead>
            <tbody>{fetchResult}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
