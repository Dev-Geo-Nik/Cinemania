export enum ActionTypes {
	TEST = "TEST",
	FETCH_INITIAL_DATA = "FETCH_INITIAL_DATA",
	FETCH_NEW_QUOTE = "FETCH_NEW_QUOTE",
	IS_MODAL_OPEN = "IS_MODAL_OPEN",
}

export enum PayloadTypes {}

export interface Action {
	type: ActionTypes;
	payload?: any;
}
