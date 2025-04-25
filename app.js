const {useState} = React;

function Task(id,title){
    this.id = id;
    this.title = title;
}
function addTask(id,title,setTaskList) {
    const newTask = new Task(id,title);
    setTaskList((prev) => [...prev,newTask]);
}

function TodoList() {
    const [taskList, setTaskList] = useState([]);
    const [addTaskInput, setAddTaskInput] = useState("");

    function loadTask(){
        return taskList.map((task)=>{
            return React.createElement('li',{id: task.id},
                React.createElement('span',null,task.title),
                React.createElement('button',{className: "edit_button", id: task.id, onClick: (e)=>{
                    const editedTitle = prompt(`Edit ${task.title}`, `${task.title}`);
                    const updatedTaskList = taskList.map((element)=>{
                        if(Number(element.id) === Number(task.id)){
                            element.title = editedTitle;
                            return element;
                        }
                        else{
                            return element;
                        }
                    });
                    setTaskList(updatedTaskList);
                }},'Edit'),

                React.createElement('button',{className: "delete_button", id: task.id, onClick: (e)=> {
                    setTaskList((prev)=> {
                    return prev.filter((taskItem)=> Number(taskItem.id) !== Number(e.target.getAttribute('id')));
                })
            }},'Delete')
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
                null,
                loadTask()
            )
        ),
        React.createElement(
            'div',
            {className: "input_wrapper"},
            React.createElement(
                'input',
                {className: "add_task_input",onChange: (e)=> {setAddTaskInput(e.target.value)}}
            ),
            React.createElement(
                'button',
                {className: "add_task_button",onClick: (e)=> {addTask((taskList[taskList.length - 1]?.id ?? 0)+1,addTaskInput,setTaskList)}},
                "Add Task"
            )
        )
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(TodoList));