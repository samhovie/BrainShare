
const DELETE_ANSWER = "answers/DELETE_ANSWER";
const UPDATE_ANSWER = "answers/UPDATE_ANSWER";
const CREATE_ANSWER = "answers/CREATE_ANSWER";

const deleteAnswerAction = (id) => ({
    type: DELETE_ANSWER,
    payload: id,
});

const updateAnswerAction = (answer) => ({
    type: UPDATE_ANSWER,
    payload: answer,
});

const createAnswerAction = (answer) => ({
    type: CREATE_ANSWER,
    payload: answer,
});

export const deleteAnswerThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/questions/${id}/answers`, {
        method: "DELETE",
    });
    if (response.ok) {
        const data = await response.json();
        if (data.errors) return data.errors;
        return dispatch(deleteAnswerAction(id));
    }
};

export const updateAnswerThunk = (answer) => async (dispatch) => {
    const response = await fetch(`/api/questions/${answer.id}/answers`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: answer.text }),
    });

    if (response.ok) {
        const data = await response.json();
        if (data.errors) return data.errors;
        return dispatch(updateAnswerAction(data.answer));
    }
};

export const createAnswerThunk = (answer) => async (dispatch) => {
    const response = await fetch(
        `/api/questions/${answer.question_id}/answers/new`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(answer),
        }
    );

    if (response.ok) {
        const data = await response.json();
        if (data.errors) return data.errors;
        return dispatch(createAnswerAction(data.answer));
    }
};

const initialState = { allAnswers: {}, singleAnswer: {} };

export default function answersReducer(state = initialState, action) {
    const newState = { ...state };
    switch (action.type) {
        case DELETE_ANSWER:
            delete newState.allAnswers[action.payload];
            return { ...newState };
        case UPDATE_ANSWER:
            newState.allAnswers[action.payload.id] = action.payload;
            return { ...newState };
        case CREATE_ANSWER:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
