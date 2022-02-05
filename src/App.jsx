import { useState } from "react";
import "./style.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const App = () => {
  // テキスト入力欄のstate
  const [todoText, setTodoText] = useState("");
  // 未完了TODOのstate
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  // 完了TODOのstate
  const [completeTodos, setCompleteTodos] = useState([]);

  // TODO入力時のstate更新関数
  const onChangeTodoText = (event) => setTodoText(event.target.value);
  // 追加ボタンクリック処理
  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };
  // 削除ボタンクリック処理
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };
  // 完了ボタンクリック処理
  const onClickComplete = (index) => {
    // TODOを未完了欄から削除
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);
    // TODOを完了へ移す
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };
  // 戻るボタンクリック処理
  const onClickBack = (index) => {
    // TODOを完了欄から削除
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    // TODOを未完了へ移す
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
      />
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
