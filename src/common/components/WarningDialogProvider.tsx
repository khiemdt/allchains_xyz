import React, { useContext, useEffect, useState } from "react";
import WarningDialog, { WaringDialogParams } from "./WarningDialog";

const DUMMY_VALUE: WaringDialogParams = {
  openDialog: () => {},
};

const WarningDialogContext =
  React.createContext<WaringDialogParams>(DUMMY_VALUE);

export const useWarningDialog = () => {
  const ref = useContext(WarningDialogContext);
  return ref;
};

const WarningDialogProvider: React.FunctionComponent<any> = ({ children }) => {
  const ref = React.useRef<WaringDialogParams>(DUMMY_VALUE);

  const [ref_state, setRefState] = useState<WaringDialogParams>(DUMMY_VALUE);

  useEffect(() => {
    if (!ref.current) {
      return;
    } else {
      setRefState(ref.current);
    }
  }, []);

  return (
    <WarningDialogContext.Provider value={ref_state}>
      {children}
      <WarningDialog ref={ref} />
    </WarningDialogContext.Provider>
  );
};
export default WarningDialogProvider;
