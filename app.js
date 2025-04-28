const {useState} = React;

function TodoApp() {
    const [taskList,setTaskList] = useState([]);
    function HeaderH1({text}) {
        return (
            <h1>{text}</h1>
        )
    }

    function LoadTask(){
        return taskList.map((element)=> {
            return (
                <tr>
                    <td>{element.id}</td>
                    <td>{element.title}</td>
                    <td><span>{element.createdAt[0]}</span><br/><span>{element.createdAt[1]}</span></td>
                    <td>{element.due_date}</td>
                    <td>{element.completed === true ? "Yes" : "No"}</td>
                    <td>{element.id}</td>
                </tr>
            )
        })
    }

    function TaskListTable(){
        return (
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Create date</th>
                        <th>Due date</th>
                        <th>completed</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <LoadTask/>
                </tbody>
            </table>
        )
    }

    function NewTaskInput(){
        function addTask(event) {
            event.preventDefault();
            let task = {};
            const formData = new FormData(event.target);
            for(let [key,value] of formData.entries()){
                task[key] = value;
            }
            const now = new Date();
            let createdAt = now.toLocaleString();
            createdAt = createdAt.split(",");
            task.id = (taskList[taskList.length - 1]?.id ?? 0) + 1;
            task.createdAt = createdAt;
            task.completed = false;
            console.log(task);
            setTaskList([...taskList,task]);
        }
        return (
            <form onSubmit={addTask}>
                <label htmlFor="title">Title:</label>
                <input name="title" id="title" type="text" />
                
                <label htmlFor="description">Description:</label>
                <input name="description" id="description" type="text" />
                
                <label htmlFor="due-date">Due Date:</label>
                <input name="due_date" id="due-date" type="date" />

                <button type="submit">Submit</button>            
            </form>
        )
        }

        return (
            <div>
                <header>
                    <HeaderH1 text="Todo Application"/>
                </header>
                <aside></aside>
                <main>
                    <TaskListTable/>
                    <NewTaskInput/>
                </main>
            </div>
        )
  }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TodoApp />);