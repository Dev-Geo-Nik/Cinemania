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
		case ActionTypes.TOGGLE_LOADING:
			return {
				...state,
				isLoading: action.payload,
			};
		case ActionTypes.FETCH_WEEK_TRENDING:
			return {
				...state,
				week_trending: action.payload,
			};
		case ActionTypes.FETCH_MOVIES_PLAYING_NOW:
			return {
				...state,
				movies_playing_now: action.payload,
			};
		case ActionTypes.UPDATE_MOVIES_PLAYING_NOW:
			return {
				...state,
				movies_playing_now_page: action.payload,
			};
		case ActionTypes.UPDATE_WEEK_TRENDING:
			return {
				...state,
				week_trending_page: action.payload,
			};
		case ActionTypes.FETCH_TRENDING_PEOPLE:
			return {
				...state,
				trending_people: action.payload,
			};
		case ActionTypes.UPDATE_TRENDING_PEOPLE:
			return {
				...state,
				actors_page: action.payload,
			};
		case ActionTypes.FETCH_TOP_RATED_MOVIES:
			return {
				...state,
				top_rated_movies: action.payload,
			};
		case ActionTypes.UPDATE_TOP_RATED_MOVIES:
			return {
				...state,
				top_rated_page: action.payload,
			};
		case ActionTypes.FETCH_TOP_UPCOMING:
			return {
				...state,
				upcoming_movies: action.payload,
			};
		case ActionTypes.UPDATE_TOP_UPCOMING:
			return {
				...state,
				top_upcoming_page: action.payload,
			};
		case ActionTypes.FETCH_ALL_MOVIES_GENRES:
			return {
				...state,
				movies_genres: action.payload,
			};
		case ActionTypes.FETCH_SINGLE_MOVIE:
			return {
				...state,
				single_movie: action.payload,
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
