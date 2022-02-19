import React, { useEffect } from 'react';
import ReactGA from 'react-ga4';

const isTestingEnvironment = () => process.env.NODE_ENV === 'development';

if (isTestingEnvironment()) {
  console.log('testing, console is active');
} else {
  console.log('shutting down console log for prod');
  console.log = function () {};
}

const GOOGLE_UA_ID:string = 'G-7C8VE1N6WD';// process.env.NEXT_PUBLIC_GOOGLE_UA_ID || '';

const Categories = {
  any: 'Share Quote',
};
const Actions = {
  click: 'click',
};

export const initGA = () => {
  ReactGA.initialize(GOOGLE_UA_ID);
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};

export const logEvent = ({
  category, action, label, value,
}:{
  category: string,
  action: string,
  label?: string,
  value?: any
}) => {
  ReactGA.event({
    ...(category && { category }),
    ...(action && { action }),
    ...(label && { label }),
    ...(value && { value }),
  });
};
declare const window: any;

export function GAWrapper(props:any) {
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  });

  return (
    <div>
      {props.children}
    </div>
  );
}

// export const sendClick = (category:string,label:string):React.MouseEventHandler<HTMLDivElement>  => {
//   try{
//   const f = () => {
//     console.log(category, " is clicked")
//     logEvent({
//       category: category,
//       action: "click",
//       label
//     })
//   }
//   return f
// }catch(e){
//   console.log("error like",e,"with ", name)
// }
// }

// export const logOnClick = (name:string):React.MouseEventHandler<HTMLDivElement> => {
//   const f = () => {
//     console.log(name)
//   }
//   return f
// }
