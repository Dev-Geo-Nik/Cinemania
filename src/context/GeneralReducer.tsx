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
				favMovies: action.payload.favMovies,
				favSeries: action.payload.favSeries,
			};
		case ActionTypes.UPDATE_FILTER_SEARCH:
			if (action.payload.searchPath === "movies") {
				return {
					...state,
					searchFilter: action.payload.searchValue,
				};
			}
			if (action.payload.searchPath === "series") {
				return {
					...state,
					searchFilter: action.payload.searchValue,
				};
			}
			if (action.payload.searchPath === "bookmarked") {
				return {
					...state,
					bookmarkedFilter: action.payload.searchValue,
				};
			}
			// default home search
			return {
				...state,
				homeFilter: action.payload.searchValue,
			};

		default:
			return state;
	}
};
