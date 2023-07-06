const normalize = (data) => data.reduce((obj,ele) => ({ ...obj, [ele.id]: ele }), {});

const GET_COMMENTS = "comments/GET_COMMENTS";

const getCommentsAction = (comments) => ({
	type: GET_COMMENTS,
	payload: comments
});

export const getCommentsThunk = () => async (dispatch) => {
	const response = await fetch("/api/comments/")
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
            return data.errors;
        }
		return dispatch(getCommentsAction(normalize(data.comments)));
	}
};

const initialState = { allComments: {}, singleComment: {} }

export default function commentsReducer(state = initialState, action) {
	switch (action.type) {
		case GET_COMMENTS:
			return { ...state, allComments: { ...action.payload } }
		default:
			return state;
	}
}
