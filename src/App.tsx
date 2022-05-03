import { FunctionComponent, ReactNode, useCallback } from "react";
import "./App.css";

const Heading = ({ title }: { title: string }) => <h2>{title}</h2>;

const Box = ({ children }: { children: ReactNode }) => (
  <div style={{ padding: "1rem", fontWeight: "bold" }}>{children}</div>
);

const List: FunctionComponent<{
  items: string[];
  onClick?: (item:string) => void
}> = ({ items, onClick }) => (
  <ul>
    {items.map((item, index) => (
      <li key={index} onClick={()=> onClick?.(item)}>{item}</li>
    ))}
  </ul>
);

function App() {
  const onlistClick = useCallback((item:string) => {
    alert(item)
  }, [])
  return (
    <div>
      <Heading title="intro" />
      <Box>Hello les gens</Box>
      <List items={["1", "2", "3"]} onClick={onlistClick}/>
    </div>
  );
}

export default App;
