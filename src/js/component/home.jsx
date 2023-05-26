import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
  const [task, setTask] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [actButon, setActButon] = useState(false);

/*   function deleteTask(id) {
    setTask(
      task.filter((task, index) => {
        return index !== id;
      })
    );
  } */

  const api = "https://assets.breatheco.de/apis/fake/todos/user/estefaniggt";

  //llamado a la api - creando
  async function createNewToDo() {
    try {
      const respons = await fetch(api, {
        method: "POST",
        body: JSON.stringify([]),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (respons.ok) {
        let body = respons.json();
        /* console.log(body); */
		getList();
      } else if (respons.status === 400) {
        getList();
      } 
    } catch (error) {
      console.log(error);
    }
  }

  //createNewToDo(api)
  useEffect(() => {
    createNewToDo();
  }, []);

  //obteniendo la lista y almacenandolo en estado. Solicitud GET
  async function getList() {
    try {
      const respons = await fetch(api);
      if (respons.ok) {
        const body = await respons.json();
        setTask(body);
      } else {
        alert("Ha ocurrido un error");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  //actualizando en la api
  const updateList = async (task) => {
    try {
      const respons = await fetch(api, {
        method: "PUT",
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json",
        },
      });
      getList();
    } catch (error) {
      console.log(error);
    }
  }

  
  async function deleteTask(position) {
	let newTaskList = task.filter((item, index) => index !== position)
    try {
      const respons = await fetch(api, {
        method: "PUT",
        body: JSON.stringify(newTaskList),
        headers: {
          "Content-Type": "application/json",
        },
      });
	  if (respons.ok){
		getList();
	  }
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteUser(){
	try {
		const response = await fetch(api, {
			method: "DELETE"
		})
		if(response.ok){
			alert("Usuario eliminado");
			createNewToDo();
		}
	} catch (error) {
		console.log(error); 
	}
  }

  return (
    <>
      <h1>todos</h1>
      <div className="todolist">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            let todoL = [...task, { label: inputValue, done: false }];
            updateList(todoL);
            setTask(todoL);
            setInputValue("");
          }}
          action=""
          method="get"
        >
          <div>
            <input
              type="text"
              className="form-control border-0"
              placeholder="  What needs to be done?"
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
            />
          </div>
        </form>
        <ul>
          {task.map((task, i) => {
            return (
              <dd
                key={i}
                onMouseOver={() => setActButon(true)}
                onMouseOut={() => setActButon(false)}
              >
                {" "}
                {task.label}{" "}
                <a
                  className={actButon ? "" : "disable"}
                  onClick={() => {
                    deleteTask(i);
                  }}
                >
                  X
                </a>
              </dd>
            );
          })}
        </ul>
        <p>
          {task.length === 0
            ? "No tasks, add a task"
            : task.length + " item left"}
			<button onClick={deleteUser}>Delete everything</button>
        </p>
		
      </div>
    </>
  );
};

export default Home;
