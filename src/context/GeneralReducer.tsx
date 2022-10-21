import { Action, ActionTypes } from "./Actions";
import { GeneralContextState } from "./GeneralContext";

type ReducerType = (state: GeneralContextState, action: Action) => GeneralContextState;

export const reducer: ReducerType = (state, action) => {
	switch (action.type) {
		case ActionTypes.TEST:
			return { ...state };
		case ActionTypes.FETCH_INITIAL_DATA:
			return {
				...state,
				allData: action.payload.allData,
				movies: action.payload.moviesArray,
				series: action.payload.seriesArray,
			};

		default:
			return state;
	}
};
