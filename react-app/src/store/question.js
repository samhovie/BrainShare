const normalize = (data) => data.reduce((obj,ele) => ({ ...obj, [ele.id]: ele }), {});

const GET_QUESTIONS = "songs/GET_QUESTIONS";
const DELETE_QUESTION = "songs/DELETE_QUESTION";
const UPDATE_QUESTION = "songs/UPDATE_QUESTION";

const getQuestionsAction = (questions) => ({
	type: GET_QUESTIONS,
	payload: questions
});

const deleteQuestionAction = (id) => ({
	type: DELETE_QUESTION,
	payload: id
});

const updateQuestionAction = (question) => ({
	type: UPDATE_QUESTION,
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
	console.log(JSON.stringify({ text: question.text}))
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


const initialState = { allQuestions: {} }

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
		default:
			return state;
	}
}
