import { useEffect, useState } from 'react';
import usePrevState from './hooks/usePrevState';

import axios from 'axios';

export default function App() {
  const [term, setTerm] = useState('javascript');
  const [result, setResult] = useState([]);
  const prevTerm = usePrevState(term);

  //init
  //term : state => javascript
  //result: state => array:empty
  //prevTerm: custom hook -> skip use effect -> return undifined
  //useEffect API -> skip
  //return

  //after render  1
  //useEffect -> inside custom hook -> use ref -> javascript
  //useEffect -> API -> update state -> result

  //new render
  //term : state => javascript
  //result: state -> array: list from wiki
  //prevTerm -> custom hook -> return javascript
  //return

  //after render 2
  //useEffect -> inside custom hook -> use ref -> javascript
  //useEffect -> API ->      //term : javascript vs prevTerm : javascript

  //update input -> update state ->  re render
  //term : state => javascript2
  //result : state => old data
  //prevTerm -> custom hook -> javascript
  //return

  //after render 3
  //useEffect -> inside custom hook -> use ref -> javascript2
  //useEffect -> API ->   //term : javascript2 vs prevTerm : javascript => search will run => update state => re render

  //re render 4
  //term : state => javascript2
  //result : state => new data
  //prevTerm => javascript2
  //return

  //after render 4
  //useEffect -> inside custom hook -> javascript2
  //useEffect -> API -> //term : javascript2 vs prevTerm : javascript2

  useEffect(() => {
    //API
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
      //term : javascript2 vs prevterm javascript2
    } else if (term !== prevTerm) {
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
