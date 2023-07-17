import { normalize } from "../utils";
const GET_QUESTIONS = "questions/GET_QUESTIONS";
const GET_QUESTION = "questions/GET_QUESTION";
const DELETE_QUESTION = "questions/DELETE_QUESTION";
const UPDATE_QUESTION = "questions/UPDATE_QUESTION";
const CREATE_QUESTION = "questions/CREATE_QUESTION";

const getQuestionsAction = (questions) => ({
	type: GET_QUESTIONS,
	payload: questions
});

const getQuestionAction = (question) => ({
	type: GET_QUESTION,
	payload: question
});

const deleteQuestionAction = (id) => ({
	type: DELETE_QUESTION,
	payload: id
});

const updateQuestionAction = (question) => ({
	type: UPDATE_QUESTION,
	payload: question
});

const createQuestionAction = (question) => ({
	type: CREATE_QUESTION,
	payload: question
});

export const getQuestionsThunk = () => async (dispatch) => {
	const response = await fetch("/api/questions/")
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
            return data.errors;
        }
		return dispatch(getQuestionsAction(normalize(data.questions)));
	}
};

export const getQuestionThunk = (id) => async (dispatch) => {
	const response = await fetch(`/api/questions/${id}`)
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
            return data.errors;
        }
		return dispatch(getQuestionAction(data.question));
	}
};

export const deleteQuestionThunk = (id) => async (dispatch) => {
	const response = await fetch(`/api/questions/${id}`, {
		method: "DELETE"
	  });
	if (response.ok) {
		const data = await response.json()
		if(data.errors) return data.errors;
		return dispatch(deleteQuestionAction(id));
	}
};

export const updateQuestionThunk = (question) => async (dispatch) => {
	const response = await fetch(`/api/questions/${question.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ text: question.text})
	  });

	if (response.ok) {
		const data = await response.json()
		if(data.errors) return data.errors;
		return dispatch(updateQuestionAction(data.question));
	}
};

export const createQuestionThunk = (question) => async (dispatch) => {
	const response = await fetch(`/api/questions/new`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(question)
	  });

	if (response.ok) {
		const data = await response.json()
		if(data.errors) return data.errors;
		return dispatch(createQuestionAction(data.question));
	}
}


const initialState = { allQuestions: {}, singleQuestion: {} }

export default function questionsReducer(state = initialState, action) {
	const newState = {...state}
	switch (action.type) {
		case GET_QUESTIONS:
			return { ...state, allQuestions: { ...action.payload } }
		case DELETE_QUESTION:
			delete newState.allQuestions[action.payload]
			return {...newState}
		case UPDATE_QUESTION:
			newState.allQuestions[action.payload.id] = action.payload
			return {...newState}
		case GET_QUESTION:
			return { ...state, singleQuestion: { ...action.payload } }
		case CREATE_QUESTION:
			return { ...state, ...action.payload }
		default:
			return state;
	}
}
