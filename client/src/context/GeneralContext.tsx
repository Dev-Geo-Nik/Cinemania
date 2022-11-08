import React, { createContext, Dispatch, ReactNode, useContext, useReducer } from "react";
import { MovieProps } from "../utils/types";

import { Action, Genres } from "./Actions";
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
	week_trending: any;
	trending_people: any;
	top_rated_movies: any;
	upcoming_movies: any;
	actors_page: number;
	week_trending_page: number;
	top_rated_page: number;
	top_upcoming_page: number;
	movies_playing_now_page: number;
	movies_playing_now: any;
	movies_genres: any;
	single_movie: MovieProps | null;
	movie_cast: any;
	single_movie_id: number;
	single_recommended_movies: any;
	trending_movies_series: any;
	person_bio: any;
	person_known_for: any;
	person_socials: any;
	display_user_modal: boolean;
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
	// @ts-ignore
	user: JSON.parse(localStorage.getItem("user")),
	BACKEND_URL: "http://localhost:8000/api",
	isLoading: false,
	week_trending: [],
	trending_people: [],
	top_rated_movies: [],
	upcoming_movies: [],
	actors_page: 1,
	week_trending_page: 1,
	top_rated_page: 1,
	top_upcoming_page: 1,
	movies_playing_now: [],
	movies_playing_now_page: 1,
	movies_genres: [],
	single_movie: null,
	movie_cast: [],
	single_movie_id: 0,
	single_recommended_movies: [],
	trending_movies_series: [],
	person_bio: null,
	person_known_for: null,
	person_socials: null,
	display_user_modal: false,
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
