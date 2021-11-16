import { createContext, useState } from "react";

export const SideBarContext = createContext();

export const SideBarProvider = (props) => {
  const [visible, setVisible] = useState(false);
  return (
    <SideBarContext.Provider value={[visible, setVisible]}>
      {props.children}
    </SideBarContext.Provider>
  );
};
