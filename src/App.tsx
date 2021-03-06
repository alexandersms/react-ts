import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FunctionComponent,
  HTMLAttributes,
  ReactNode,
  useCallback,
  useRef,
} from "react";
import "./App.css";
import { useTodos } from "./useTodos";

const Heading = ({ title }: { title: string }) => <h2>{title}</h2>;

const Box = ({ children }: { children: ReactNode }) => (
  <div style={{ padding: "1rem", fontWeight: "bold" }}>{children}</div>
);

const Button: FunctionComponent<
  DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & {
    title?: string;
  }
> = ({ children, style, title, ...rest }) => (
  <button
    {...rest}
    style={{
      ...style,
      backgroundColor: "red",
      color: "white",
      border: "2px solid red",
      fontSize: "large",
    }}
  >
    {title ?? children}
  </button>
);

function UL<T>({
  items,
  itemClick,
  render,
}: DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> & {
  items: T[];
  itemClick: (item: T) => void;
  render: (item: T) => ReactNode;
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <li onClick={() => itemClick(item)} key={index}>
          {render(item)}
        </li>
      ))}
    </ul>
  );
}

function App() {
  const { addTodo, todos, removeTodo } = useTodos([
    { id: 0, text: "Acheter Pizza", done: false },
  ]);

  const newTodoRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      addTodo(newTodoRef.current?.value);
      newTodoRef.current.value = "";
    }
  }, [addTodo]);

  return (
    <div>
      <Heading title="intro" />
      <Box>Hello les gens</Box>

      <Heading title="Todos" />

      <UL
        items={todos}
        itemClick={(item) => alert(item.id)}
        render={(todo) => (
          <>
            {todo.text}
            <button onClick={() => removeTodo(todo.id)}>Remove</button>
          </>
        )}
      />

      <div>
        <input type="text" ref={newTodoRef} />
        <Button onClick={onAddTodo}>Add todo</Button>
      </div>
    </div>
  );
}

export default App;
