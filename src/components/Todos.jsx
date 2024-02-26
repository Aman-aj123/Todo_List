import React, { useState, useEffect } from "react"


const Todos = () => {
     // State for handling inputValue
     const [inputValue, setInputValue] = useState('');
     // State for handling todos
     const [todos, setTodos] = useState([]);


     // If the value of input will be change then
     const handleInputChange = (e) => {
          setInputValue(e.target.value);
     }

     // If the 'Enter' key is pressed then call the 'handleAddTodo' function
     const handleKeyPress = (e) => {
          if (e.key === "Enter") {
               handleAddTodo();
          }
     };


     // If the todo is added
     const handleAddTodo = () => {
          if (inputValue.trim() !== "") {
               const todosItems = {
                    title: inputValue,
                    isComplited: false
               };

               const isDuplicate = todos ? todos.find((element) => element.title.toLowerCase().trim() === todosItems.title.toLowerCase().trim()) : [];

               if (isDuplicate) {
                    // If the duplicate todo is already present then
                    alert("This todo is already exists");
               } else {
                    const storeTodos = todos ? [...todos, todosItems] : [todosItems];
                    // Adding the todos
                    setTodos(storeTodos);
                    setInputValue("");
               }
          }

          saveData();
     };


     // If the todo is deleted
     const handleDeleteTodo = (index) => {
          const removedTodos = todos.filter((element, i) => {
               return i !== index
          });

          setTodos(removedTodos)
          saveData();
     }

     // If the todo is edited
     const handleEditTodo = (index) => {
          const newTodos = [...todos];
          const todoTitle = newTodos[index].title;
          setInputValue(todoTitle);

          const targettedTodo = newTodos.filter((element, i) => index !== i);

          setTodos(targettedTodo);

          saveData();
     };

     // If the todo is completed
     const handleCompletedTodo = (index) => {
          const updatedTodos = todos.map((todo, i) => {
               if (i === index) {
                    return {
                         ...todo,
                         isComplited: !todo.isComplited
                    };
               }
               return todo;
          });

          setTodos(updatedTodos);

          saveData();
     };


     // loading the data from localStorage
     useEffect(() => {
          const savedTodos = localStorage.getItem("Todos");
          if (savedTodos) {
               const presentTodos = JSON.parse(savedTodos);
               setTodos(presentTodos);
          }
     }, []);

     // Saving the todos in localStorage
     const saveData = () => {
          localStorage.setItem("Todos", JSON.stringify(todos))
     };

     
     return (
          <div className="todo-wrapper w-full bg-pink-600 h-screen flex justify-center items-center">
               <div className="todo-container shadow-2xl overflow-hidden bg-white rounded w-[95%] md:w-[500px] ">

                    <div className="todo-addBar pl-2 h-[50px] bg-gray-300 w-full flex justify-between">
                         <input
                              placeholder="Add your todos.."
                              className=' placeholder:tracking-normal placeholder:text-base placeholder:text-gray-500 tracking-wider text-base outline-none border-none bg-transparent h-full w-full'
                              type="text"
                              value={inputValue}
                              onChange={handleInputChange}
                              onKeyUp={handleKeyPress}
                         />

                         <button className='h-full text-white bg-green-500 shadow-md hover:bg-green-600 px-4' onClick={handleAddTodo}>Add</button>
                    </div>

                    <div className="todo-showBar flex flex-col gap-2 mt-7 mb-1">

                         {todos.length === 0 &&
                              <div className="emptyTodo">
                                   <h1 className="font-semibold text-center mb-4 mt-2 text-2xl">Your todo is empty...</h1>
                                   <img className="emptyImage w-[180px] mx-auto " src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMR2eFR6dSi7CxxpC15nVMwcp0dSHMF1f1Fg&usqp=CAU" />
                              </div>
                         }

                         {
                              todos.map((element, index) => (
                                   <div key={index} className="todoItems flex justify-between">
                                        <div className="todo-text flex justify-between w-full px-2 cursor-pointer bg-gray-200">

                                             <h1 className={`text-lg ${element.isComplited ? "line-through" : ""}  `}>{element.title}</h1>
                                             <div className="todo-options flex justify-center gap-2">
                                                  <input
                                                       className="cursor-pointer"
                                                       type="checkbox"
                                                       checked={element.isComplited}
                                                       onChange={() => handleCompletedTodo(index)}
                                                  />
                                                  <button onClick={() => { handleEditTodo(index) }} className='rounded bg-green-600 hover:bg-green-700 px-2 py-1 text-base text-white  tracking-wide cursor-pointer'>Edit</button>
                                                  <button onClick={() => { handleDeleteTodo(index) }} className='rounded hover:bg-red-700 bg-red-600 px-2 py-1 text-base text-white tracking-wide cursor-pointer'>Delete</button>
                                             </div>
                                        </div>
                                   </div>
                              ))
                         }

                    </div>
               </div>
          </div>
     )
}

export default Todos;