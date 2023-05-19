const normalize = (data) => data.reduce((obj,ele) => ({ ...obj, [ele.id]: ele }), {});

const GET_QUESTIONS = "songs/GET_QUESTIONS";
const DELETE_QUESTION = "songs/DELETE_QUESTION";

const getQuestionsAction = (questions) => ({
	type: GET_QUESTIONS,
	payload: questions
});

const deleteQuestionAction = (id) => ({
	type: DELETE_QUESTION,
	payload: id
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


const initialState = { allQuestions: {} }

export default function questionsReducer(state = initialState, action) {
	switch (action.type) {
		case GET_QUESTIONS:
			return { ...state, allQuestions: { ...action.payload } }
		case DELETE_QUESTION:
			const newState = {...state}
			delete newState.allQuestions[action.payload]
			return {...newState}

		default:
			return state;
	}
}
