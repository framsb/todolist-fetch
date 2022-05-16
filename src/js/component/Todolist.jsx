import React, { useState } from "react";
import { useEffect } from "react";

export const Todolist = () => {
	const [TasksList, setTasksList] = useState([]);
	const [newTask, setnewTask] = useState("");

	const getTask = async () => {
		try {
			const response = await fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/frambesb",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const data = await response.json();
			setTasksList(data);
			console.log(data);
		} catch (error) {
			console.log("Aqui hay un error: ", error);
		}
	};

	useEffect(() => {
		const addTask = async () => {
			fetch("https://assets.breatheco.de/apis/fake/todos/user/frambesb", {
				method: "PUT",
				body: JSON.stringify(TasksList),
				headers: {
					"Content-Type": "application/json",
				},
			}).catch((error) => console.log(error));
		};
		console.log("Aqui se añade al TODO o quita del TODO");
		console.log(TasksList);
		addTask();
	}, [TasksList]);

	useEffect(() => {
		getTask();
	}, []);

	const pressEnter = (e) => {
		if (e.key === "Enter" && newTask !== "") {
			setTasksList((prevTask) => [
				...prevTask,
				{ label: newTask, done: false },
			]);
		}
	};

	const Deleteitem = (elementdelete) => {
		setTasksList(TasksList.filter((task, ind) => ind !== elementdelete));
	};

	return (
		<div className="container d-flex">
			<div className="leftcontainer">
				<h1 className="display-2 text-white text-center px-5 py-5">
					TodoList
				</h1>
				<div className="otherside">
					<input
						className="col col-10"
						type="text"
						placeholder="Add a new task"
						maxLength="50"
						value={newTask}
						onChange={(e) => setnewTask(e.target.value)}
						onKeyDown={(e) => pressEnter(e)}
					/>
					<button
						className="button1 col col-2"
						onClick={(e) =>
							newTask !== ""
								? setTasksList((prevTask) => [
										...prevTask,
										{ label: newTask, done: false },
								  ])
								: alert("Debes añadir una tarea")
						}>
						<i className="fa-solid fa-pencil" />
					</button>
				</div>
			</div>
			<div className="rightcontainer">
				{TasksList.map((task, id) => (
					<div className="row px-2 m-1">
						<div key={id} className="listTask col col-11 my-1">
							{task.label}
						</div>
						<button
							className="button2 col col-1 my-1"
							onClick={() => Deleteitem(id)}>
							<i className="fa-solid fa-trash" />
						</button>
					</div>
				))}
			</div>
		</div>
	);
};
