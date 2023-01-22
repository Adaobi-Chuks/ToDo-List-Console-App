class ToDo {

    #toDoList;

    //Constructor function
    constructor() {
        this.#toDoList = {
            Undone: ["Wake up", "Pray", "Bath"],
            Done: []
        }
    }

    get undone() {
        return this.#toDoList.Undone;
    }

    get done() {
        return this.#toDoList.Done;
    }
    
    //Method that adds a task to the toDoList
    add (task) {
        this.undone.push(task);
    }

    //Method that edits a task at a specific index
    update (index, task) {
        this.undone[index - 1] = task;
    }

    //Method that deletes a task at a specific index
    remove (index) {
        return this.undone.splice(index - 1, 1);
    }

    //Method that deletes a task from Undone and adds the same task to Done
    markDone (index) {
        const task = this.remove(index);
        this.done.push(task);
    }
    
    //Method that deletes all the items from Undone and adds them to Done
    clear () {
        for (let i = 0; i = this.undone.length; i++) {
            this.markDone(1);
        }
    }
    
    //Method that displays the Undone and Done task to the user in a neat format
    read () {
        console.log(`You have ${this.undone.length} tasks to be completed AND ${this.done.length} completed tasks for today!!!`);
        //Only displaying the title when the array isn't empty
        (this.undone.length === 0) ? null : console.log(`\nTODAY'S TODO:`);
        this.undone.forEach((task, index) => {console.log(`🔳 ${index + 1}->${task}`)});
        //Only displaying the title when the array isn't empty
        (this.done.length === 0) ? null : console.log(`\nCOMPLETED TASK:`);
        this.done.forEach((task, index) => {console.log(`✅ ${index + 1}->${task}`)});
    }

}

//To avoid repitition of code, a function that checks if an index is valid. It expects a callback function.
function checkIndex (index, callback) {
    if((index > t.undone.length) || (index <= 0)) {
        console.log("\nTask doesn't exist");
    } else if (isNaN(index)) {
        console.log(`\n${index} is not a number!`);
    } else {
        callback();
    }
}

//Main Function: Runs the application
async function main() {

    const t = new ToDo;
    
    console.log(`\n       WELCOME!!\n`);
    console.log(`This is a todo list application used to view all your tasks for the day, add your daily tasks, update your tasks, delete any task and mark or clear any completed tasks.\n`)

    await new Promise(resolve => 
        setTimeout(() => {
            resolve(t.read());
    }, 5000));

    while(true) {
        await new Promise(resolve => 
            setTimeout(() => {
                console.log("\nAVAILABLE OPTIONS!!!");
                console.log(`1.) View todo List\n2.) Add a todo task\n3.) Update a todo task\n4.) Delete a todo task\n5.) Mark a todo task as done\n6.) Clear incomplete task\n7.) Exit\n`);
                resolve();
        }, 4000));
        
        const choice = prompt(`Input a number from above to perform a task: `);
        console.log("");

        switch(choice) {
            case "1":
                t.read();
                break;
            case "2":
                const reply = prompt("Input a task to add to the list: ");
                //Using a higher order function to ensure a task can only be added once
                const filter = t.undone.filter((task) => task.toLowerCase() === reply.toLowerCase());
                if (filter.length === 0){
                    t.add(reply);
                    console.log();
                    t.read();
                } else {
                    console.log(`\n"${reply}" has already been added!!!`);
                }
                break;
            case "3":
                const index = prompt("Input the index of the task you wish to update: ");
                //Ensures that the user inputs only the index that has a task assigned to avoid creating empty objects
                checkIndex(index, (() => {
                    const newTask = prompt("Input your new task: ");
                    t.update(index, newTask);
                    console.log();
                    t.read();
                }))
                break;
            case "4":
                const rep = prompt("Are you sure?y/n ");
                if((rep.toLowerCase() === "yes") || (rep.toLowerCase() === "y")) {
                    const i = prompt("Input the index of the task you wish to delete: ");
                    //Ensures that the user inputs only the index that has a task assigned
                    checkIndex(index, (() => {
                        t.remove(i);
                        console.log();
                        t.read();
                    }));
                }
                break;
            case "5":
                const i = prompt("\nInput the index of the task you wish to mark as done: ");
                //Ensures that the user inputs only the index that has a task assigned to avoid creating empty objects
                checkIndex(index, (() => {
                    t.markDone(i);
                    console.log();
                    t.read();
                }));
                break;
            case "6":
                const answer = prompt("Are you sure?y/n ");
                if((answer.toLowerCase() === "yes") || (answer.toLowerCase() === "y")) {
                    t.clear();
                    console.log();
                    t.read();
                }
                break;
            case "7":
                if(t.undone.length > 0) {
                    const ans = prompt(`You still have some unfinished tasks. Are you sure you want to exit? y/n `);
                    if((ans.toLowerCase() === "yes") || (ans.toLowerCase() === "y")) {
                        return;
                    }
                }
                t.read();
                break;
            default:
                continue;
        }
    }
}

main();
