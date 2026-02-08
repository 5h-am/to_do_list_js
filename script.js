let username = document.querySelectorAll(".username-box");
let password = document.querySelectorAll(".password-box");
let confirm_pwd = document.querySelector(".confirm-pwd");
let signin_btn = document.querySelector(".signin-btn");
let signup_btn = document.querySelector(".signup-btn");
let signin_box = document.querySelector(".signin-box");
let signup_box = document.querySelector(".signup-box");
let register_link = document.querySelector(".register-link");
let signin_link = document.querySelector(".signin-link");
let task_categories = document.querySelector(".task-categories");
let category_input = document.querySelector(".category-input");
let create_category = document.querySelector(".create-category");
let categories_btn = document.querySelector(".categories-btn");
let to_do_list_box = document.querySelector(".to-do-list-box");
let h1 = document.querySelector(".h1");
let task_list = document.querySelector(".task-list");
let task_input = document.querySelector(".task-input");
let task_create = document.querySelector(".task-create");
let completed_btn = document.querySelector(".completed-icon");
let delete_btn = document.querySelector(".delete-icon");
let exit_btn = document.querySelectorAll(".exit-btn");

let default_categories = ["Work/Professional","Personal/Home","Health & Wellness","Financial","Social/Relationships","Learning/Growth","Long Term Goals"];
function hidden (parent_element) {
    parent_element.classList.add("hidden")
}

function visible(parent_element) {
    parent_element.classList.remove("hidden");
}

username.forEach(a=>a.addEventListener("change", () => {
    sessionStorage.setItem("username",a.value);
}))

password.forEach(a=>a.addEventListener("change", () => {
    sessionStorage.setItem("password", a.value);
}))

confirm_pwd.addEventListener("change", () => {
    sessionStorage.setItem("confirm-pwd", confirm_pwd.value);
})

signup_btn.addEventListener("click", () => {
    let username = sessionStorage.getItem("username");
    let password = sessionStorage.getItem("password");
    let confirm_pwd = sessionStorage.getItem("confirm-pwd");
    if (password.length <= 3) {
        window.alert("The length of password should be minimum 4");
    }else if (username === null){
        window.alert("You can't leave username empty")
    }else if (password!==confirm_pwd) {
        window.alert("Oops! Your passwords don't match. Please double-check them.");
    } else if (username in localStorage) {
        window.alert("The Username is already taken");
    }else {
        localStorage.setItem(username,password);
        localStorage.setItem(`${username}_cat`,JSON.stringify(default_categories))
        window.location.reload();
    }   
})

signin_btn.addEventListener("click", ()=> {
    let username = sessionStorage.getItem("username");
    let password = sessionStorage.getItem("password");
    if (!username in localStorage) {
        window.location.reload();
        window.alert("Username/Password Incorrect")
    } else if (password!==localStorage.getItem(username)) {
        window.location.reload();
        window.alert("Username/Password Incorrect")       
    }else {
        sessionStorage.setItem("user",username);
        hidden(signin_box);
        visible(task_categories);
        let user = sessionStorage.getItem("user");
        let categories_list = JSON.parse(localStorage.getItem(`${user}_cat`))

        for(let i = 0; i < categories_list.length; i++) {
            let btn = document.createElement("button")
            btn.textContent = categories_list[i];
            btn.dataset.cat = categories_list[i];
            btn.classList.add("category-btn")
            categories_btn.appendChild(btn);
        }
    }  
})

register_link.onclick= ()=> {
    document.querySelectorAll(".credentials-in").forEach(e => {e.value = ""});
    hidden(signin_box);
    visible(signup_box);

}

signin_link.onclick = ()=> {
    document.querySelectorAll(".credentials-up").forEach(e => {e.value = ""});
    hidden(signup_box);
    visible(signin_box);
}



category_input.addEventListener("change", ()=> {
    sessionStorage.setItem("category_input", category_input.value);
})

create_category.addEventListener("click", () => {
    let user = sessionStorage.getItem("user");
    let new_category = sessionStorage.getItem('category_input');
    let categories_list = JSON.parse(localStorage.getItem(`${user}_cat`));
    category_input.value = "";
    if (!categories_list.includes(new_category)) {
        categories_list.push(new_category);
        localStorage.setItem(`${user}_cat`,JSON.stringify(categories_list));
        let btn = document.createElement("button")
        btn.textContent = new_category;
        btn.dataset.cat = new_category;
        btn.classList.add("category-btn")
        categories_btn.appendChild(btn);
    } else {
        window.alert("This category is already present");
    }  
})

categories_btn.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        hidden(task_categories);
        visible(to_do_list_box);
        let user = sessionStorage.getItem("user");
        let category = event.target.dataset.cat;
        sessionStorage.setItem('category',category);
        h1.textContent = category;
        if (`${user}_${category}_tasks` in localStorage) {
            let user_tasks = JSON.parse(localStorage.getItem(`${user}_${category}_tasks`));
            let cat_tasks = user_tasks;
            for (let i = 0; i < cat_tasks.length; i++) {
            let div = document.createElement("div")
            div.classList.add("tasks-box");
            let p = document.createElement("p");
            p.textContent = cat_tasks[i];
            p.classList.add("tasks")
            let btn = document.createElement("button");
            btn.classList.add("completed-icon")
            let img = document.createElement("img");
            img.src = "completed_icon.jpeg";
            img.alt = "A button for task completed";
            img.dataset.task = cat_tasks[i];
            img.classList.add("completed-icon_img");
            btn.appendChild(img);
            div.appendChild(p);
            div.appendChild(btn);
            task_list.appendChild(div);
            }   
        } 
    }
})

task_input.addEventListener("change", ()=> {
    sessionStorage.setItem("task_input", task_input.value);
})

task_create.onclick = () => {
    let user = sessionStorage.getItem("user");
    let task = sessionStorage.getItem("task_input")
    let category = sessionStorage.getItem("category");
    task_input.value = "";
    let present = false;
    if (`${user}_${category}_tasks` in localStorage) {
        let task_array = JSON.parse(localStorage.getItem(`${user}_${category}_tasks`));
        if (!task_array.includes(task)) {  
            task_array.push(task);
            localStorage.setItem(`${user}_${category}_tasks`, JSON.stringify(task_array))
            present = true;
        } else {
            window.alert("This task is already present");
        }
    } else {
        localStorage.setItem(`${user}_${category}_tasks`, JSON.stringify([task]));
        let div = document.createElement("div")
        div.classList.add("tasks-box");
        let p = document.createElement("p");
        p.textContent = task;
        p.classList.add("tasks")
        let btn = document.createElement("button");
        btn.classList.add("completed-icon");
        let img = document.createElement("img");
        img.src = "completed_icon.jpeg";
        img.alt = "A button for task completed";
        img.dataset.task = task;
        img.classList.add("completed-icon_img");
        btn.appendChild(img);
        div.appendChild(p);
        div.appendChild(btn);
        task_list.appendChild(div);
    }
    if (present) {
        let task_array = JSON.parse(localStorage.getItem(`${user}_${category}_tasks` ));
        let cat_tasks = task_array;
        for (let i = cat_tasks.length-1; i < cat_tasks.length; i++) {
            let div = document.createElement("div")
            div.classList.add("tasks-box");
            let p = document.createElement("p");
            p.textContent = cat_tasks[i];
            p.classList.add("tasks")
            let btn = document.createElement("button");
            btn.classList.add("completed-icon");
            let img = document.createElement("img");
            img.src = "completed_icon.jpeg";
            img.alt = "A button for task completed";
            img.dataset.task = cat_tasks[i];
            img.classList.add("completed-icon_img");
            btn.appendChild(img);
            div.appendChild(p);
            div.appendChild(btn);
            task_list.appendChild(div);
        }  
    } 
}

delete_btn.addEventListener("click", ()=> {
    let confirmation = window.confirm("Do you want to delete this task category?");
    if (confirmation){
        let user = sessionStorage.getItem("user");
        let category = sessionStorage.getItem("category");
        localStorage.removeItem(`${user}_${category}_tasks`);
        let categories_array = JSON.parse(localStorage.getItem(`${user}_cat`))
        let position = categories_array.indexOf(category);
        position !== -1 ? categories_array.splice(position,1) : categories_array.splice(position,0);
        localStorage.setItem(`${user}_cat`, JSON.stringify(categories_array));
        window.location.reload();
    }
})

task_list.addEventListener("click", (event)=> {
    if (event.target.tagName === "IMG") {
        let confirmation = window.confirm("Have you completed this task?");
        if (confirmation) {
            let user = sessionStorage.getItem("user");
            let category = sessionStorage.getItem("category");
            let task_array = JSON.parse(localStorage.getItem(`${user}_${category}_tasks` ));
            let task = event.target.dataset.task
            let position = task_array.indexOf(task);
            position !== -1 ? task_array.splice(position,1) : task_array.splice(position,0);
            localStorage.setItem(`${user}_${category}_tasks`,JSON.stringify(task_array));
        }
        if (event.target.closest(".tasks-box")) {
            event.target.closest(".tasks-box").remove();
        }
    }
})
exit_btn.forEach(e => {
    e.onclick = () => {
    let confimation = window.confirm("Do you want to Sign Out?")
    if (confimation) {
        window.location.reload();
    }
}

})

