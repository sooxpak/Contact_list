import React, {memo} from "react";
import "./ContactItem.css";

const  ContactItem = ({ id, name, content, onDelete }) => {
    const onClickDeleteButton = () =>{
        onDelete(id);
    }

  return (
    <div className="ContactItem">
      <div className="name">{name}</div>
      <div className="contact">{content}</div>
      <button onClick={onClickDeleteButton}>🗑️ Remove</button>
    </div>
  );
}

export default memo(ContactItem);
