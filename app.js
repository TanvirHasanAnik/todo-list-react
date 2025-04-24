const {useState} = React;

function todoList() {
    return React.createElement(
        'div',
        {class: "todo_wrapper"},
        React.createElement(
            'div',
            {class: "list_wrapper"},
            "List div here"
        ),
        React.createElement(
            'div',
            {class: "input_wrapper"},
            React.createElement(
                'input',
                {class: "add_task_input"},
                "add task"
            )
        )
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(todoList));