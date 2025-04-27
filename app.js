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
        if (!addTaskForm.title) {
            alert('Task title is required!');
            return;
        }
        if(addTaskForm){
            const now = new Date();
            const createdAt = now.toLocaleString();
            const newTask = new Task(id,addTaskForm.title, addTaskForm.description, createdAt, addTaskForm.dueDate, false);
            setTaskList((prev) => [...prev,newTask]);
            setNavState("task_list");
            setAddTaskForm({
                id: '',
                title: '',
                description: '',
                createdAt: '',
                dueDate: '',
                completed: false
            });
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
                            'table',
                            {className: "task_table"},
                            React.createElement(
                                'thead',
                                {className: "table_thead"},
                                React.createElement(
                                    'tr',
                                    {className: "table_head_tr"},
                                    React.createElement(
                                        'th',
                                        null,
                                        "ID",
                                    ),
                                    React.createElement(
                                        'th',
                                        null,
                                        "title",
                                    ),
                                    React.createElement(
                                        'th',
                                        null,
                                        "createdAt",
                                    ),
                                    React.createElement(
                                        'th',
                                        null,
                                        "dueDate",
                                    ),
                                    React.createElement(
                                        'th',
                                        null,
                                        "completed",
                                    ),
                                    React.createElement(
                                        'th',
                                        null,
                                        "Action",
                                    )
                                )
                            ),

                            React.createElement(
                                'tbody',
                                {className: "table_tbody"},
                                loadTask()
                            )
                        )
                    ),
                    React.createElement(
                        'button',
                        {className: "add_task_button", onClick: (e) => {
                            setNavState("add_task");
                        }},
                        "Add Task"
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
                            React.createElement('input', {
                                className: "form_input",
                                placeholder: "Task Title",
                                value: addTaskForm.title || '',
                                required: true,
                                onChange: (e) => setAddTaskForm({...addTaskForm, title: e.target.value}),
                            }),
                            React.createElement('textarea', {
                                className: "form_textarea",
                                placeholder: "Task Description",
                                value: addTaskForm.description || '',
                                onChange: (e) => setAddTaskForm({...addTaskForm, description: e.target.value})
                            }),

                            React.createElement(
                                'label',
                                null,
                                "Due Date"
                            ),
                            React.createElement('input', {
                                type: "date",
                                className: "form_input",
                                value: addTaskForm.dueDate || '',
                                onChange: (e) => setAddTaskForm({...addTaskForm, dueDate: e.target.value})
                            }),
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

    function dateTimeSplit(task) {
        if (!task.createdAt) return "N/A";
        const parts = task.createdAt.split(",");
        return React.createElement('div',null,React.createElement('span',null,parts[0]),React.createElement('br'),React.createElement('span',null,parts[1]))
    }

    function loadTask(){
        return taskList.map((task) => {
            return React.createElement('tr', { className: "task_row", id: task.id },
                React.createElement('td', null, task.id),
                React.createElement('td', null, task.title),
                React.createElement('td', null, 
                    dateTimeSplit(task)
                ),
                React.createElement('td', null, task.dueDate || "N/A"),
                React.createElement('td',null,
                    React.createElement('input', {
                        type: "checkbox",
                        className: "form_checkbox",
                        checked: task.completed || false,
                        onChange: (e) => {
                            const updatedTasks = taskList.map((item) => {
                                if (item.id === task.id) {
                                    return {...item, completed: e.target.checked};
                                }
                                return item;
                            });
                            setTaskList(updatedTasks);
                        }
                    })),
                React.createElement('td', null, 
                    React.createElement('div', { className: "task_button_wrapper" },
                        editId !== task.id ? React.createElement('button', { className: "edit_button", id: task.id, onClick: (e) => {
                            setEditId(task.id);
                        } }, 'Edit') :
                        React.createElement('button', { className: "edit_button", id: task.id, onClick: (e) => {
                            setEditId(null);
                        } }, 'Cancel'),
    
                        React.createElement('button', { className: "delete_button", id: task.id, onClick: (e) => {
                            if (editId !== task.id) {
                                setTaskList((prev) => {
                                    return prev.filter((taskItem) => Number(taskItem.id) !== Number(e.target.getAttribute('id')));
                                })
                            }
                        } }, 'Delete')
                    )
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