import "./App.css";
import ContactEditor from "./components/ContactEditor";
import ContactList from "./components/ContactList";
import {useReducer, useRef, useState} from "react";

const mockData = [
    {
        id: 0,
        name: "박아무개",
        content: "010-2345-2323",
    },
    {
        id: 1,
        name: "홍길동",
        content: "031-232-2323",
    },
];

function reducer (state, action){
    switch (action.type){
        case "CREATE":
            return[action.data, ...state];
        case "DELETE":
           return state.filter((contact)=>contact.id !== action.targetId);
        default:
            return state;
    }
}

function App() {
    const [contacts, dispatch] = useReducer(reducer, mockData);
    const idRef= useRef("3");

    const onCreate = (name, content) => {
        dispatch({
            type: "CREATE",
            data: {
                id: idRef.current++,
                name: name,
                content: content,
            }
        })
    }

    const onDelete = (targetId) => {
      dispatch({
          type: "DELETE",
          targetId: targetId,
      })
    }

    return (
      <div className="App">
        <h2>Contact List</h2>
        <section>
          <ContactEditor
              onCreate={onCreate}
          />
        </section>
        <section>
          <ContactList
              contacts={contacts}
              onCreate={onCreate}
              onDelete={onDelete}
          />
        </section>
      </div>
  );
}

export default App;
