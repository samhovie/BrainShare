const normalize = (data) => data.reduce((obj,ele) => ({ ...obj, [ele.id]: ele }), {});


const GET_QUESTIONS = "songs/GET_QUESTIONS";



export const getAllQuestionsAction = (questions) => ({
	type: GET_QUESTIONS,
	payload: questions
});


export const getAllQuestionsThunk = () => async (dispatch) => {
	const response = await fetch("/api/questions/")
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
            return data.errors;
        }
		return dispatch(getAllQuestionsAction(normalize(data.questions)));
	}
};

const initialState = { allQuestions: {} }

export default function questionsReducer(state = initialState, action) {
	switch (action.type) {
		case GET_QUESTIONS:
			return { ...state, allQuestions: { ...action.payload } }

		default:
			return state;
	}
}
