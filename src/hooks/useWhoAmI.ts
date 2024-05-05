import { useState } from 'react';

const useWhoAmI = () => {
  const [whoAmI, setWhoAmI] = useState(() => {
    const storedWhoAmI = sessionStorage.getItem('whoami');
    return storedWhoAmI ? JSON.parse(storedWhoAmI) : null;
  });

  const saveWhoAmI = (data) => {
    sessionStorage.setItem('whoami', JSON.stringify(data));
    setWhoAmI(data);
  };

  const clearWhoAmI = () => {
    sessionStorage.removeItem('whoami');
    setWhoAmI(null);
  };

  return { whoAmI, saveWhoAmI, clearWhoAmI };
};

export default useWhoAmI;