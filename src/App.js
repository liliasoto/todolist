import React, {useState,useEffect} from "react"; //Se importan React, useState y useEffect desde el módulo "react" para poder usar estados
import "./App.css";
const App = () => {
  //A continuación se utilizan los hooks useState para definir dos estados
  //El estado todos almacena la lista de tareas
  const [todos, setTodos] = useState([]);
  //El estado todoEditing almacena el ID de la tarea que se está editando actualmente
  const [todoEditing, setTodoEditing] = useState(null);

  //El siguiente useEffect es para cargar las tareas almacenadas en el almacenamiento local cuando se monta el componente por primera vez
  useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  //El siguiente useEffect se utiliza para guardar las tareas en el almacenamiento local cada vez que el estado todos cambia
  useEffect(() => {
    if(todos.length > 0) {
        const json = JSON.stringify(todos);
        localStorage.setItem("todos", json);
    }
  }, [todos]);
  
  // Add the handlesubmit code here
  function handleSubmit(e) {
    e.preventDefault(); //Evita que el formulario se envíe y la página se recargue
    let todo = document.getElementById('todoAdd').value //Se obtiene el valor del elemento de entrada del formulario con el id 'todoAdd' y lo asigna a la variable todo
    //Se crea un nuevo objeto de tarea newTodo
    const newTodo = {
      id: new Date().getTime(), //Se asigna un ID único utilizando new Date().getTime(), que devuelve el tiempo actual en milisegundos desde el 1 de enero de 1970
      text: todo.trim(), //Se asigna el valor de todo después de eliminar los espacios en blanco al inicio y al final utilizando trim()
      completed: false, //Se establece en false porque la tarea recién creada no está completada
    };
    //Esta condición verifica si el texto de la nueva tarea no está vacío
    if (newTodo.text.length > 0 ) {
        setTodos([...todos].concat(newTodo)); //Si la condición anterior se cumple, se utiliza el setter setTodos para actualizar el estado todos 
        //Se crea un nuevo array copiando todos los elementos de todos ([...todos]) y luego
        // se concatena el nuevo objeto de tarea (newTodo) al final del array
    } else {
        alert("Enter Valid Task"); //Si la condición no se cumple (es decir, el texto de la tarea está vacío), se muestra una alerta indicando al usuario que ingrese una tarea válida
    }
    document.getElementById('todoAdd').value = "" //Se restablece el valor del campo de entrada del formulario con el id 'todoAdd' a una cadena vacía, lo que borra el texto que el usuario había ingresado previamente en el campo de entrada
  }
  // Add the deleteToDo code here
  function deleteTodo(id) { //Esta línea define una función llamada deleteTodo que toma un argumento id, que representa el ID de la tarea que se desea eliminar
    let updatedTodos = [...todos].filter((todo) => todo.id !== id); //se inicializa como una copia del estado todos, utilizando el operador de propagación (...todos)
    //Luego se aplica el método filter() sobre este array para filtrar los elementos cuyo id no coincide con el id pasado como argumento a la función
    setTodos(updatedTodos);
  }
  // Add the toggleComplete code here
  //Esta función toma el ID de la tarea que se desea marcar como completada o no completada
  function toggleComplete(id) { 
    let updatedTodos = [...todos].map((todo) => { //Se crea una nueva variable llamada updatedTodos, que se inicializa como una copia del estado todos, 
      //utilizando el operador de propagación (...todos). 
      //Luego, se utiliza el método map() sobre este array para iterar sobre cada tarea y devolver una nueva versión de cada tarea.
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }
  // Add the submitEdits code here
  function submitEdits(newtodo) {
    const updatedTodos = [...todos].map((todo) => { //Se crea una nueva variable llamada updatedTodos, que se inicializa como una copia del estado todos, 
      //utilizando el operador de propagación (...todos). Luego, se utiliza el método map() sobre este array para iterar sobre cada tarea 
      //y devolver una nueva versión de cada tarea.
      if (todo.id === newtodo.id) {
        todo.text = document.getElementById(newtodo.id).value; // se verifica si el id de la tarea actual coincide con el id de la nueva tarea proporcionada como argumento.
        // Si coinciden, significa que esta tarea debe ser editada.
        }
        return todo;
      });
      setTodos(updatedTodos); //se utiliza el setter setTodos para actualizar el estado todos con el nuevo array de tareas, donde la tarea editada ha sido modificada

      setTodoEditing(null); //se llama a setTodoEditing para restablecer el estado todoEditing a null, lo que indica que ya no se está editando ninguna tarea
    }
  
return(
  <div id="todo-list">
  <h1>Todo List</h1>
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      id = 'todoAdd'
    />
    <button type="submit">Add Todo</button>
  </form>
{todos.map((todo) => (
  <div key={todo.id} className="todo">
    <div className="todo-text">
      {/* Add checkbox for toggle complete */}
      <input
        type="checkbox"
        id="completed"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
      />
      {/* if it is edit mode, display input box, else display text */}
      {todo.id === todoEditing ?
        (<input
          type="text"
          id = {todo.id}
          defaultValue={todo.text}
        />) :
        (<div>{todo.text}</div>)
      }
    </div>
    <div className="todo-actions">
      {/* if it is edit mode, allow submit edit, else allow edit */}
      {todo.id === todoEditing ?
      (
        <button onClick={() => submitEdits(todo)}>Submit Edits</button>
      ) :
      (
        <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
      )}
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
     </div>
  </div>
))}
</div>
);
};
export default App;
