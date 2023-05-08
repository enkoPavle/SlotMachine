import React, {createContext, useState} from 'react';

export const PolicyContext = createContext();

export const PolicyProvider = ({children}) => {
  const [value, setValue] = useState(false);
  const setIsAgree = () => setValue(true);

  return (
    <PolicyContext.Provider value={{isAgree: value, setIsAgree}}>
      {children}
    </PolicyContext.Provider>
  );
};
