import {useReducer, useRef, useCallback, createContext, useMemo} from "react";
import ContactEditor from "./components/ContactEditor";
import ContactList from "./components/ContactList";
import "./App.css";

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

export const ContactStateContext = createContext();
export const ContactDispatchContext = createContext();

function App() {
    const [contacts, dispatch] = useReducer(reducer, []);
    const idRef= useRef(0);

    const onCreate = useCallback((name, content) => {
        dispatch({
            type: "CREATE",
            data: {
                id: idRef.current++,
                name: name,
                content: content,
            }
        })
    }, []);

    const onDelete = useCallback((targetId) => {
      dispatch({
          type: "DELETE",
          targetId: targetId,
      })
    }, []);

    const memoizedDispatche = useMemo(
        () => ({ onCreate, onDelete }),
        []
    );

    return (
      <div className="App">
          <ContactStateContext.Provider value={contacts}>
              <ContactDispatchContext.Provider value={memoizedDispatche}>
                <h2>Contact List</h2>
                <section>
                  <ContactEditor/>
                </section>
                <section>
                  <ContactList />
                </section>
              </ContactDispatchContext.Provider>
          </ContactStateContext.Provider>
      </div>
  );
}

export default App;
