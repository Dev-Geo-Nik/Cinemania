export enum ActionTypes {
	TEST = "TEST",
	FETCH_INITIAL_DATA = "FETCH_INITIAL_DATA",
}

export enum PayloadTypes {}

export interface Action {
	type: ActionTypes;
	payload?: any;
}
