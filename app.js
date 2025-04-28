function HeaderH1({text}) {
    return (
        <h1>{text}</h1>
    )
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
                    <th>complete</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
    )
}

function NewTaskInput(){
    function addTask(event) {
        event.preventDefault();
    }
    return (
        <form onSubmit={addTask}>
            <label for="title">Title:</label>
            <input id="title" type="text" />
            
            <label for="description">Description:</label>
            <input id="description" type="text" />
            
            <label for="due-date">Due Date:</label>
            <input id="due-date" type="date" />

            <button type="submit">Submit</button>            
        </form>
    )
}

function TodoApp() {
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