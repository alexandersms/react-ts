import {
  FunctionComponent,
  ReactNode,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import "./App.css";

const Heading = ({ title }: { title: string }) => <h2>{title}</h2>;

const Box = ({ children }: { children: ReactNode }) => (
  <div style={{ padding: "1rem", fontWeight: "bold" }}>{children}</div>
);

const List: FunctionComponent<{
  items: string[];
  onClick?: (item: string) => void;
}> = ({ items, onClick }) => (
  <ul>
    {items.map((item, index) => (
      <li key={index} onClick={() => onClick?.(item)}>
        {item}
      </li>
    ))}
  </ul>
);

interface IPayload {
  text: string;
}

interface ITodo {
  id: number;
  done: boolean;
  text: string;
}

type ActionType =
  | { type: "ADD"; text: string }
  | { type: "REMOVE"; id: number };

function App() {
  const onlistClick = useCallback((item: string) => {
    alert(item);
  }, []);

  const [payload, setPayload] = useState<IPayload | null>(null);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        setPayload(data);
      });
  });

  const [todos, dispatch] = useReducer((state: ITodo[], action: ActionType) => {
    switch (action.type) {
      case "ADD":
        return [
          ...state,
          {
            id: state.length,
            text: action.text,
            done: false,
          },
        ];
      case "REMOVE":
        return state.filter(({ id }) => id !== action.id);
      default:
        throw new Error();
    }
  }, []);

  const newTodoRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      dispatch({
        type: "ADD",
        text: newTodoRef.current?.value,
      });
      newTodoRef.current.value = "";
    }
  }, []);

  return (
    <div>
      <Heading title="intro" />
      <Box>Hello les gens</Box>
      <List items={["1", "2", "3"]} onClick={onlistClick} />
      <Box>{JSON.stringify(payload)}</Box>
      <Heading title="Todos" />
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.text}
          <button
            onClick={() =>
              dispatch({
                type: "REMOVE",
                id: todo.id,
              })
            }
          >
            Remove
          </button>
        </div>
      ))}
      <div>
        <input type="text" ref={newTodoRef} />
        <button onClick={onAddTodo}>Add todo</button>
      </div>
    </div>
  );
}

export default App;
