import React, { createContext, Dispatch, ReactNode, useContext, useEffect, useReducer } from "react";
import { Action } from "./Actions";
import { reducer } from "./GeneralReducer";

export interface GeneralContextState {}

const initialState: GeneralContextState = {};

type ContextHook = () => {
	state: GeneralContextState;
	dispatch: (action: Action) => void;
};

const GeneralContext = createContext<{
	state: GeneralContextState;
	dispatch: Dispatch<Action>;
}>({
	state: initialState,
	dispatch: () => {},
});

//Provider name must start with capital letter
export const GeneralContextProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return <GeneralContext.Provider value={{ state, dispatch }}>{children}</GeneralContext.Provider>;
};

//Capitalize the first character after the word use
export const useGeneralContext: ContextHook = () => {
	const { state, dispatch } = useContext(GeneralContext);
	return { state, dispatch };
};
