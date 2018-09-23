import { RECEIVED_MSG, CREATE_MSG } from '../types';

export default function chat(state = [], action = {}) {
	switch (action.type) {
	case RECEIVED_MSG:
		return [ ...state, ...action.chat ];
	case CREATE_MSG:
		return [ ...state, ...action.chat ];
	default:
		return state;
	}
}