var todos = [];

function createToDo() {
    
    var todo = document.getElementById("todo").value;
    
    
    if (todo == null || todo == "") {
        alert("To do cannot be empty");
    }
    else {
        // append the new to-do with the table
        alert("todo: " + todo);
        
        todos.push(todo);
        document.getElementById("todo").value = "";       
        addTableRow(todos, false);
        
        console.log(todos);
    }
}

// add a row to the table
var rowID = 0;
function addTableRow(todos, appIsLoading) {
	
	alert(todos);
	
    var table = document.getElementById("dataTable");
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);	
    var todoLength = todos.length;		

	// create the checkbox
    var cell1 = row.insertCell(0);
    var element1 = document.createElement("input");
    element1.type = "checkbox";
    element1.name = "chkbox[]";
    element1.setAttribute("onclick", "deleteSelectedRow(this)");
    cell1.appendChild(element1);
			    
	// create the textbox
	var cell2 = row.insertCell(1);
	var element2 = document.createElement("input");
	element2.type = "text";
	element2.name = "txtbox[]";
	element2.size = 16;
	element2.id = "text" + rowID;
	element2.value = todos[todoLength];
	element2.setAttribute("onchange", "saveToDoList()");
	cell2.appendChild(element2);	
	
	rowID +=1;
	saveToDoList();
			 
	if (!appIsLoading) alert("Task Added Successfully.");    
}

// delete the selected row
function deleteSelectedRow(deleteButton) {
    var p = deleteButton.parentNode.parentNode;
    p.parentNode.removeChild(p);
    
    saveToDoList();
}

// save the to-do list
function saveToDoList() {
    var todoArray = {};
    var textValue = "";
 
    var table = document.getElementById("dataTable");
    var rowCount = table.rows.length;
 
    if (rowCount != 0)
    {
        // loop through all rows of the table
        for(var i=0; i<rowCount; i++)
        {
            var row = table.rows[i];
 
            // retrieve the content of the to-do
            var textbox = row.cells[1].childNodes[0];
            textValue = textbox.value;
            
 
            // populate the array
            todoArray["row" + i] =
            {
                text : textValue
            };
        }
    }
    else
    {
        todoArray = null;
    }
 
    // use the local storage API to persist the data as JSON
    window.localStorage.setItem("todoList", JSON.stringify(todos));
}

// load the to-do list
function loadToDoList() {
    // use the local storage API load the JSON formatted to-do list, and decode it
    var theList = JSON.parse(window.localStorage.getItem("todoList"));

    var count = 0;
    for (var obj in theList)
    {
        count++;
    }
 
    // loop through the to-dos
    for(var i = 0; i < count; i++)
    {
        // adding a row to the table for each one
        addTableRow(theList[i], true);
    }
}
			