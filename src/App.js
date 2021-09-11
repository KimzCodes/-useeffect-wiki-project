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
 //prevTerm undifined / empty
 //render

 //after render
 //prevTerm javascript
 //useEffect API -> result is empty -> search -> update result - >re render
 //re render

 //after render
//prevTerm javascript
 //useEffect API term ->javascript vs  prevTerm -> javascript

 //php
 //re render
//prevTerm javascript
//useEffect -> term -> php vs prevTerm -> javascript -> update result
//re render


///after re render
//prevTerm php
//useEffect -> term -> php vs prevTerm -> PHP 


   


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
