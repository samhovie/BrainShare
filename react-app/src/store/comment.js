import { normalize } from "../utils";
const GET_COMMENTS = "comments/GET_COMMENTS";
const DELETE_COMMENT = "comments/DELETE_COMMENT";
const CREATE_COMMENT = "comments/CREATE_COMMENT";
const UPDATE_COMMENT = "comments/UPDATE_COMMENT";

const getCommentsAction = (comments) => ({
	type: GET_COMMENTS,
	payload: comments
});

const deleteCommentAction = (id) => ({
    type: DELETE_COMMENT,
    payload: id,
});

const createCommentAction = (comment) => ({
    type: CREATE_COMMENT,
    payload: comment,
});

const updateCommentAction = (comment) => ({
    type: UPDATE_COMMENT,
    payload: comment,
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

export const deleteCommentThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/comments/${id}`, {
        method: "DELETE",
    });
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return data.errors
        };
        return dispatch(deleteCommentAction(id));
    }
};


export const createCommentThunk = (comment) => async (dispatch) => {
    const response = await fetch(
        `/api/comments/${comment.answer_id}/new`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(comment),
        }
    );
    if (response.ok) {
        const data = await response.json();
        if (data.errors) return data.errors;
        return dispatch(createCommentAction(data.comment));
    }
};

export const updateCommentThunk = (comment) => async (dispatch) => {
    const response = await fetch(`/api/comments/${comment.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
    });

    if (response.ok) {

        const data = await response.json();
        if (data.errors) return data.errors;
        return dispatch(updateCommentAction(data.comment));
    }
};


const initialState = { allComments: {}, singleComment: {} }

export default function commentsReducer(state = initialState, action) {
    const newState = { ...state };
	switch (action.type) {
		case GET_COMMENTS:
			return { ...state, allComments: { ...action.payload } }
        case DELETE_COMMENT:
            delete newState.allComments[action.payload];
            return newState;
        case CREATE_COMMENT:
                return { ...state, ...action.payload };
        case UPDATE_COMMENT:
            newState.allComments[action.payload.id] = action.payload;
            return { ...newState };
		default:
			return state;
	}
}
