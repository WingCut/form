import React, { createContext, useEffect, useState } from "react";

import instance from "../utils/axios.js";

const ConfigContext = createContext({
  configs: null,
});

function ConfigProvider({ children }) {
  const [configs, setConfigs] = useState();

  useEffect(() => {
    const getConfigs = async () => {
      const response = await instance.get("/categories");
      setConfigs(response.data);
    };

    getConfigs();
  }, []);

  return (
    <ConfigContext.Provider
      value={{
        configs,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

export { ConfigContext };
export default ConfigProvider;
