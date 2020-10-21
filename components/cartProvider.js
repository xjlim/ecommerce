import { useReducer, useContext, createContext } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  let index;
  switch (action.type) {
    case "ADD":
      index = state.findIndex((x) => x.id === action.payload.id);
      let newState;
      if (index === -1) {
        newState = [...state, action.payload];
      } else {
        const newPayload = {
          ...action.payload,
          quantity: action.payload.quantity + state[index].quantity,
        };
        newState = [
          ...state.slice(0, index),
          newPayload,
          ...state.slice(index + 1),
        ];
      }
      return newState;
    case "EDIT":
      index = state.findIndex((x) => x.id === action.payload.id);
      return [
        ...state.slice(0, index),
        action.payload,
        ...state.slice(index + 1),
      ];
    case "DELETE":
      return state.filter((x) => x.id !== action.payload.id);
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
