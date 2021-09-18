import { useEffect, useRef } from 'react';

const usePrevState = (state) => {
  const ref = useRef(); //1:undefined
  //after render 1 : useRef => javascript
  //after render 1 : useRef => javascript
  //after render 2 : useRef => javascript
  //after render 3 : useRef => javascript2
  //after render 3 : useRef => javascript2
  useEffect(() => {
    ref.current = state;
  });

  return ref.current;
};

export default usePrevState;
