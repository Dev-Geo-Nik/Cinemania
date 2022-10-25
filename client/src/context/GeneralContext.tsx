import React, { createContext, Dispatch, ReactNode, useContext, useReducer } from "react";
import { Action } from "./Actions";
import { reducer } from "./GeneralReducer";
export interface GeneralContextState {
	allData: any;
	movies: any;
	series: any;
	favMovies: any;
	favSeries: any;
	homeFilter: string;
	BACKEND_URL: string;
	searchFilter: string;
	bookmarkedFilter: string;
	user: any;
	isLoading: boolean;
}
const initialState: GeneralContextState = {
	allData: [],
	movies: [],
	series: [],
	favMovies: [],
	favSeries: [],
	homeFilter: "",
	searchFilter: "",
	bookmarkedFilter: "",
	user: null,
	BACKEND_URL: " http://127.0.0.1:8000/api",
	isLoading: false,
};

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
