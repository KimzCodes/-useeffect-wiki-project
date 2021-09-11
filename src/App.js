import { useEffect, useState} from 'react';
import usePrevState from './hooks/usePrevState';

import axios from 'axios';

export default function App() {
  const [term, setTerm] = useState('javascript');
  const [result, setResult] = useState([]);
  const prevTerm = usePrevState(term); 

 //init
 //term -> javascript
 //result -> array empty
 //prevTerm -> custom hooks
  //useEffect will not work
  //value undifined
//render


//after first render
//prevTerm -> custom hooks
  //value undifined
  //use Effect will work -> ref.current = term = javascript

//use effect wiki api ->   result == 0 -> search -> update -> setResult -> re render


//after sec render
//prevTerm -> custom hooks
  //value javascript
  //use Effect will work -> ref.current = term = javascript
//use effect wiki api ->  term -> javascript vs  prevTerm -> javascript


//php
//render
//prevTerm -> custom hooks
  //value javascript
  //use Effect will work -> ref.current = term = php
//use effect wiki api ->  term -> PHP vs  prevTerm -> javascript -> SEARCH -> UPDATE result -> re render


//after re render
//prevTerm -> custom hooks
  //value php
  //use Effect will work -> ref.current = term = php
//use effect wiki api ->  term -> PHP vs  prevTerm -> php 


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
