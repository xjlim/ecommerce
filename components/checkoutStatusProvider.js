import { useReducer, useContext, createContext } from "react";

const CheckoutStatusContext = createContext();
const CheckoutStatusDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "IDLE":
      return "IDLE";
    case "ORDER_COMPLETE":
      return "ORDER_COMPLETE";
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const CheckoutStatusProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, "IDLE");
  return (
    <CheckoutStatusDispatchContext.Provider value={dispatch}>
      <CheckoutStatusContext.Provider value={state}>
        {children}
      </CheckoutStatusContext.Provider>
    </CheckoutStatusDispatchContext.Provider>
  );
};

export const useCheckoutStatus = () => useContext(CheckoutStatusContext);
export const useDispatchCheckoutStatus = () =>
  useContext(CheckoutStatusDispatchContext);
