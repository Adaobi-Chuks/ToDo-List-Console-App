//An object that stores both completed and incomplete tasks
const toDoList = {
    ToDo: ["Wake up", "Pray", "Bath"],
    Done: []
}

//Function used to add an item to an array
function add (list, item) {
    list.push(item);
}

//Function used to edit a task in an array
function update (list, index, item) {
    list[index - 1] = item;
}

//Function used to delete an item from one array and add the same item to another array
function markDone (list1, index, list2) {
    const itemDone = list1.splice(index - 1, 1);
    add(list2, itemDone);
}

//Function used to delete all the items from one array and add them to another array
function clear (list1, list2) {
    for (let i = 0; i = list1.length; i++) {
        markDone(list1, 1, list2);
    }
}

//Function that groups the incomplete an completed tasks and displays it to the user
function read (list1, list2) {
    console.log(`You have ${list1.length} tasks to be completed AND ${list2.length} completed tasks for today!!!`);
    //Only displaying the title when the array isn't empty
    (list1.length === 0) ? null : console.log(`\nTODAY'S TODO:`);
    list1.forEach((item, index) => {console.log(`🔳 ${index + 1}->${item}`)});
    //Only displaying the title when the array isn't empty
    (list2.length === 0) ? null : console.log(`\nCOMPLETED TASK:`);
    list2.forEach((item, index) => {console.log(`✅ ${index + 1}->${item}`)});
}

//Main Function
async function main() {
    console.log(`\n       WELCOME!!\n`);
    console.log(`This is a todo list application used to view all your tasks for the day, add your daily tasks, update your tasks and mark or clear any completed tasks.\n`)

    await new Promise(resolve => 
        setTimeout(() => {
            read(toDoList.ToDo, toDoList.Done);
            resolve();
    }, 5000));

    while(true) {
        await new Promise(resolve => 
            setTimeout(() => {
                console.log("\nAVAILABLE OPTIONS!!!");
                console.log(`1.) View todo List\n2.) Add a todo task\n3.) Update a todo task\n4.) Mark a todo task as done\n5.) Clear incomplete task\n6.) Exit\n`);
                resolve();
        }, 5000));
        
        const choice = prompt(`Input a number from above to perform a task: `);
        console.log("");

        switch(choice) {
            case "1":
                read(toDoList.ToDo, toDoList.Done);
                break;
            case "2":
                const reply = prompt("Input a task to add to the list: ");
                //Using a higher order function to ensure a task can only be added once
                const filter = toDoList.ToDo.filter((task) => task.toLowerCase() === reply.toLowerCase());
                if (filter.length === 0){
                    add(toDoList.ToDo, reply);
                    console.log();
                    read(toDoList.ToDo, toDoList.Done);
                } else {
                    console.log(`"${reply}" has already been added!!!`);
                }
                break;
            case "3":
                const index = prompt("Input the index of the task you wish to update: ");
                //Ensures that the user inputs only the index that has a task assigned to avoid creating empty objects
                if((index > toDoList.ToDo.length) || (index <= 0)) {
                    console.log("\nTask doesn't exist")
                } else {
                    const newTask = prompt("Input your new task: ");
                    update(toDoList.ToDo, index, newTask);
                    console.log();
                    read(toDoList.ToDo, toDoList.Done);
                }
                break;
            case "4":
                const i = prompt("Input the index of the task you wish to mark as done: ");
                //Ensures that the user inputs only the index that has a task assigned to avoid creating empty objects
                if((i > toDoList.ToDo.length) || (i <= 0)) {
                    console.log("\nTask doesn't exist")
                } else {
                    markDone(toDoList.ToDo, i, toDoList.Done);
                    console.log();
                read(toDoList.ToDo, toDoList.Done);
            }
            break;
            case "5":
                const answer = prompt("Are you sure?y/n ");
                if((answer.toLowerCase() === "yes") || (answer.toLowerCase() === "y")) {
                    clear(toDoList.ToDo, toDoList.Done);
                    console.log();
                    read(toDoList.ToDo, toDoList.Done);
                }
                break;
            case "6":
                return;
            default:
                continue;
        }
    }
}

main();
