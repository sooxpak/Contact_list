import React, {useRef, useState, memo, useContext} from "react";
import "./ContactEditor.css";
import { ContactDispatchContext } from "../App";


const ContactEditor = () => {
    const {onCreate} = useContext(ContactDispatchContext);

    const [name, setName] = useState("");
    const [content, setContent] = useState("");

    const nameRef = useRef();
    const contentRef = useRef();

    const onSubmit = () => {
        if(name === ""){
            nameRef.current.focus();
            return;
        }
        if(content === ""){
            contentRef.current.focus();
            return;
        }
        onCreate(name, content)
    }

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onChangeContent = (e) => {
        setContent(e.target.value);
    }

    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            onSubmit();
        }
    }

    return (
        <div className="ContactEditor">
            <div className="title">Add Contact</div>
            <div className="input_wrapper">
                <input className="name" placeholder="이름 ..."
                       ref={nameRef}
                       value={name}
                       onChange={onChangeName}
                />
                <input className="contact" placeholder="연락처(이메일) ..."
                       ref={contentRef}
                       value={content}
                       onChange={onChangeContent}
                       onKeyDown={onKeyDown}
                />
            </div>
            <button onClick={onSubmit}>Add</button>
        </div>
    );
}
export default memo(ContactEditor);