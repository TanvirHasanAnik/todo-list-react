const {useState} = React;

function Task(id,title){
    this.id = id;
    this.title = title;
}
function addTask(id,title,setTaskList,setAddTaskInput) {
    if(title){
        const newTask = new Task(id,title);
        setTaskList((prev) => [...prev,newTask]);
        setAddTaskInput("");
    }
}

function editTask(id,title,taskList,setTaskList,setEditId,setAddTaskInput){
    const updatedTaskList = taskList.map((element)=>{
        if(Number(element.id) === Number(id) && id !== null && id !== "" && title){
            element.title = title;
            return element;
        }
        else{
            return element;
        }
    });
    setTaskList(updatedTaskList);
    setEditId(null);
    setAddTaskInput("");
}

function TodoList() {
    const [taskList, setTaskList] = useState([]);
    const [addTaskInput, setAddTaskInput] = useState("");
    const [editId, setEditId] = useState(null);

    function loadTask(){
        return taskList.map((task)=>{
            return React.createElement('li',{className: "task_list",id: task.id},
                React.createElement('span',null,task.title),
                React.createElement('div',{className: "task_button_wrapper"},
                    editId !== task.id ? React.createElement('button',{className: "edit_button", id: task.id, onClick: (e)=>{

                        setAddTaskInput(`${task.title}`);
                        setEditId(task.id);

                    }},'Edit') :
                    React.createElement('button',{className: "edit_button", id: task.id, onClick: (e)=>{
                        setEditId(null);

                    }},'Cancel'),
    
                    React.createElement('button',{className: "delete_button", id: task.id, onClick: (e)=> {
                        if(editId === null){
                            setTaskList((prev)=> {
                                return prev.filter((taskItem)=> Number(taskItem.id) !== Number(e.target.getAttribute('id')) && editId == null);
                            })
                        }
                }},'Delete')

                )
            );
        });
    }

    return React.createElement(
        'div',
        {className: "todo_wrapper"},
        React.createElement(
            'div',
            {className: "list_wrapper"},
            React.createElement(
                'ul',
                {className: "task_ul_wrapper"},
                loadTask()
            )
        ),
        React.createElement(
            'div',
            {className: "input_wrapper"},
            React.createElement(
                'input',
                {className: "add_task_input",value: `${addTaskInput}`,onChange: (e)=> {setAddTaskInput(e.target.value)}}
            ),
            React.createElement(
                'button',
                {className: "add_task_button",onClick: (e)=> {
                    console.log(editId);
                    console.log(addTaskInput);
                    console.log(taskList);
                    console.log(setTaskList);
                    editId !== null ? editTask(editId,addTaskInput,taskList,setTaskList,setEditId,setAddTaskInput) : addTask((taskList[taskList.length - 1]?.id ?? 0)+1,addTaskInput,setTaskList,setAddTaskInput)
                }},
                editId !== null ? "Edit Task" : "Add Task"
            )
        )
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(TodoList));