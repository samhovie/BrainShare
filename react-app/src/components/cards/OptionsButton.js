import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../modals/OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { deleteQuestionThunk, getQuestionsThunk, updateQuestionThunk  } from "../../store/question";
import "./Card.css";
import { useModal } from "../../context/Modal";
import UpdateQuestionModal from "../modals/UpdateQuestionModal";

// function Test({question}) {
//     const dispatch = useDispatch();
//     const { closeModal } = useModal();
//     const [text, setText] = useState('')

//     async function handleUpdateQuestion(e, question) {
//         e.preventDefault();
//         await dispatch(updateQuestionThunk({ id: question.id, text: text }));
//         await dispatch(getQuestionsThunk());
//         closeModal();
//     }

//     return (
//         <form
//         onSubmit={(e) =>
//             handleUpdateQuestion(e, question)
//         }
//     >
//         <input
//             type="text"
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//         ></input>
//         <button>UPDATE?</button>
//     </form>
//     )
// }

function OptionsButton({ question }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const { closeModal } = useModal();

    const openMenu = (e) => {
        e.preventDefault();
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    async function handleDeleteQuestion(id) {
        await dispatch(deleteQuestionThunk(id));
        await dispatch(getQuestionsThunk());
        closeModal();
    }

    const ulClassName = "options-dropdown" + (showMenu ? "" : " hidden");
    const closeMenu = () => setShowMenu(false);

    return (
        <>
            <button className="options border-none" onClick={openMenu}>
                {/* <i className="fa-regular fa-circle-user fa-xl" ></i> */}
                <i className="fa-solid fa-ellipsis fa-lg"></i>
            </button>

            <ul className={ulClassName} ref={ulRef}>
                <>
                    {/* <OpenModalButton
              buttonText="Delete"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            /> */}
                    <OpenModalButton
                        className="delete-question"
                        onItemClick={closeMenu}
                        modalComponent={
                            <div>
                                <button

                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleDeleteQuestion(question.id);
                                    }}
                                >
                                    DELETE?
                                </button>
                            </div>
                        }
                        buttonText="Delete"
                    />
                    <OpenModalButton
                        className="update-question"
                        onItemClick={closeMenu}
                        modalComponent={<UpdateQuestionModal question={question} />}
                        buttonText="Update"
                    />
                </>
            </ul>
        </>
    );
}

export default OptionsButton;
