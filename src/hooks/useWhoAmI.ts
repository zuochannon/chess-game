import { useState, useEffect } from 'react';

const useWhoAmI = () => {
  const [whoAmI, setWhoAmI] = useState(null);

  useEffect(() => {
    const storedWhoAmI = sessionStorage.getItem('whoami');
    if (storedWhoAmI) {
      setWhoAmI(JSON.parse(storedWhoAmI));
    }
  }, []);

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