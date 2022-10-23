export enum ActionTypes {
	TEST = "TEST",
	FETCH_INITIAL_DATA = "FETCH_INITIAL_DATA",
	UPDATE_FILTER_SEARCH = "UPDATE_FILTER_SEARCH",
}

export enum PayloadTypes {}

export interface Action {
	type: ActionTypes;
	payload?: any;
}
