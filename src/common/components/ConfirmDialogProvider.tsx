import React, { useContext, useEffect, useState } from "react";
import ConfirmDialog, { ConfirmDialogParams } from "./ConfirmDialog";

const DUMMY_VALUE = {
  close: () => {},
  open: false,
  promptConfirmation: async () => {},
  resetSetting: () => {},
  setOptions: () => {},
};

const ConfirmDialogContext =
  React.createContext<ConfirmDialogParams>(DUMMY_VALUE);

export const useConfirmDialog = () => {
  const ref = useContext(ConfirmDialogContext);
  return ref;
};

const ConfirmDialogProvider: React.FunctionComponent<any> = ({ children }) => {
  const ref = React.useRef<ConfirmDialogParams>(DUMMY_VALUE);

  const [ref_state, setRefState] = useState<ConfirmDialogParams>(DUMMY_VALUE);

  useEffect(() => {
    if (!ref.current) {
      return;
    } else {
      setRefState(ref.current);
    }
  }, []);

  return (
    <ConfirmDialogContext.Provider value={ref_state}>
      {children}
      <ConfirmDialog ref={ref} />
    </ConfirmDialogContext.Provider>
  );
};
export default ConfirmDialogProvider;
