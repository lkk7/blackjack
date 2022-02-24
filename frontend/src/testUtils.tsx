import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { initialState, setWholeGame } from "./store/slices/gameSlice";

function render(ui: React.ReactElement, { ...renderOptions } = {}) {
  store.dispatch(setWholeGame({ ...initialState, gameId: "testId123" }));
  function Wrapper({ children }: { children: any }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
