import { useState } from "react";
import add from "../assets/add.png";
import del from "../assets/del.png";
import edit from "../assets/edit.png";
import update from "../assets/update.png";

const TodoList = () => {
  // holds list of tasks
  const [todos, setTodos] = useState([]);
  // hold current todo
  const [newTodo, setNewTodo] = useState("");
  // editing Todo
  const [editingTodo, setEditingTodo] = useState(null);
  // editing text holds new text for the task being edited
  const [editingText, setEditingText] = useState("");

  console.log(todos);
  console.log(newTodo);
  console.log(editingTodo);
  console.log(editingText);

  function addTodo() {
    //check if the input is not empty
    if (newTodo.trim() !== "") {
      //add the new task to the todos array with a unique id
      setTodos([...todos, { id: Date.now(), text: newTodo }]);
      //clear the input field
      setNewTodo("");
    }
  }

  function deleteTodo(id) {
    //filter out the task with the given id from the todos array
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function editTodo(todo) {
    //set editingTodo to the selected task and editing text
    setEditingTodo(todo);
    setEditingText(todo.text);
  }

  function updateTodo() {
    // map over the todos array and update the task with the new text
    setTodos(
      todos.map((todo) =>
        todo.id === editingTodo.id ? { ...todo, text: editingText } : todo
      )
    );
    setEditingTodo(null);
    setEditingText("");
  }

  return (
    <>
      <div className="flex justify-center mt-20">
        <div>
          <h1 className="mb-10 text-center text-3xl font-semibold">
            Task Manager
          </h1>
          {/* input field for adding new task  */}
          <div className="bg-slate-200 p-5 rounded-lg w-[600px]">
            <div className="flex justify-between items-center">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new Task"
                className=" w-11/12 p-2 rounded-lg mr-5"
              />
              {/* button to add new task  */}
              <button
                onClick={addTodo}
                className="w-10  hover:bg-orange-400 rounded-full "
              >
                <img src={add} alt="add" />
              </button>
            </div>
            {/* list of tasks  */}
            <ul>
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className=" p-2 rounded-lg mt-4 ml-1 bg-blue-200 flex justify-between items-center"
                >
                  {/* display the task text  */}
                  <p className="font-semibold text-lg ">
                    {todo.text.toLowerCase()}
                  </p>
                  {/* button to delete task  */}
                  <div className="flex items-center">
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="mx-5 w-10"
                    >
                      <img src={del} alt="delete" />
                    </button>
                    <button onClick={() => editTodo(todo)} className="w-9">
                      <img src={edit} alt="edit" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            {/* section for editing a task  */}
            {editingTodo && (
              <div className="mt-4 ml-1 flex items-center">
                {/* input field for the new text of the task  */}
                <input
                  type="text"
                  className="p-2 rounded-lg mr-5"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                {/* button to update the task  */}
                <button onClick={updateTodo}>
                  <img src={update} alt="update" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoList;
