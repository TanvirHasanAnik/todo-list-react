const {useState} = React;

function Task(id,title,description,createdAt,dueDate,completed){
    this.id = id;
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
    this.dueDate = dueDate;
    this.completed = completed;
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
    const [navstate,setNavState] = useState("task_list");
    const [taskList, setTaskList] = useState([]);
    const [addTaskInput, setAddTaskInput] = useState("");
    const [editId, setEditId] = useState(null);
    const [addTaskForm, setAddTaskForm] = useState({
        id: '',
        title: '',
        description: '',
        createdAt: '',
        dueDate: '',
        completed: false
    });

    
    function addTask(id,addTaskForm) {
        if(addTaskForm){
            const newTask = new Task(id,addTaskForm.title, addTaskForm.description, addTaskForm.createdAt, addTaskForm.dueDate, addTaskForm.completed);
            setTaskList((prev) => [...prev,newTask]);
            setNavState("task_list");
            console.log(newTask);
        }
    }

    function renderContent() {
        switch (navstate) {
            case "task_list":
                return React.createElement(
                    'main',
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
                            {className: "add_task_input", value: addTaskInput, onChange: (e) => { setAddTaskInput(e.target.value) }}
                        ),
                        React.createElement(
                            'button',
                            {className: "add_task_button", onClick: (e) => {
                                setNavState("add_task");
                            }},
                            "Add Task"
                        )
                    )
                );
            
            case "add_task":
                return React.createElement(
                    'main',
                    {className: "add_task_page"},
                    React.createElement(
                        'div', 
                        {className: "form_wrapper"}, 
                        React.createElement(
                            'form',
                            {className: "add_task_form"},
                
                            // Title input
                            React.createElement('input', {
                                className: "form_input",
                                placeholder: "Task Title",
                                value: addTaskForm.title || '',
                                onChange: (e) => setAddTaskForm({...addTaskForm, title: e.target.value})
                            }),
                
                            // Description input
                            React.createElement('textarea', {
                                className: "form_textarea",
                                placeholder: "Task Description",
                                value: addTaskForm.description || '',
                                onChange: (e) => setAddTaskForm({...addTaskForm, description: e.target.value})
                            }),
                
                            // Created At input (date or datetime-local)
                            React.createElement('input', {
                                type: "datetime-local",
                                className: "form_input",
                                value: addTaskForm.createdAt || '',
                                onChange: (e) => setAddTaskForm({...addTaskForm, createdAt: e.target.value})
                            }),
                
                            // Due Date input (date)
                            React.createElement('input', {
                                type: "date",
                                className: "form_input",
                                value: addTaskForm.dueDate || '',
                                onChange: (e) => setAddTaskForm({...addTaskForm, dueDate: e.target.value})
                            }),
                
                            // Completed checkbox
                            React.createElement('label', {className: "checkbox_label"},
                                "Completed: ",
                                React.createElement('input', {
                                    type: "checkbox",
                                    className: "form_checkbox",
                                    checked: addTaskForm.completed || false,
                                    onChange: (e) => setAddTaskForm({...addTaskForm, completed: e.target.checked})
                                })
                            ),
                
                            // Submit button
                            React.createElement('button', {
                                type: "button",
                                className: "submit_task_button",
                                onClick: () => {
                                    addTask((taskList[taskList.length - 1]?.id ?? 0) + 1, addTaskForm)
                                }
                            }, "Save Task")
                        )
                    )
                );
            
            default:
                return React.createElement(
                    'main',
                    null,
                    "Page Not Found"
                );
        }
    }

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
                        if(editId !== task.id){
                            setTaskList((prev)=> {
                                return prev.filter((taskItem)=> Number(taskItem.id) !== Number(e.target.getAttribute('id')));
                            })
                        }
                }},'Delete')

                )
            );
        });
    }

    return React.createElement(
        'div',
        {className: "full_page_wrapper"},
        React.createElement(
            'aside',
            {className: "navbar"},
            React.createElement(
                'ul',
                {className: "navbarList"},
                React.createElement(
                    'li',
                    {className: "nav_Tasks", onClick: ()=> {
                        setNavState("task_list");
                    }},
                    "Tasks"
                ),
                React.createElement(
                    'li',
                    {className: "nav_add_task", onClick: () => {
                        setNavState("add_task");
                    }},
                    "Add Task"
                )
            )
        ),
        renderContent()
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(TodoList));