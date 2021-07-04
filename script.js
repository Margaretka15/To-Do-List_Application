let mainSection;
let dashboardSection;

// let numberOfUsers;


localStorage.clear();
if (localStorage.getItem("numberOfUsers") === null)
    localStorage.setItem("numberOfUsers", "0");
let userId = 0; //// potrzebne!! widoczne w wielu miejscach
let messageDisplayed = false;

let dashboardDisplayed = false;
let categoriesOuterContainer;
let list;

displayMainSection();
// document.addEventListener("click", (e) =>
// {
//     console.log(e.target);
// });

function displayMainSection()
{
    mainSection = document.createElement("div");
    mainSection.setAttribute("id", "main-section");


    messageDisplayed = false; ////// trzeba to zrobić tak, żeby w widoku mobilnym nie dało się w to kliknąć drugi raz !!!
    dashboardDisplayed = false;

    mainSection.innerHTML = getMainSectionHTML();
    document.body.appendChild(mainSection);

    let loginButton = document.getElementById("log-in-btn");
    let signInButton = document.getElementById("sign-in-btn");


    loginButton.addEventListener("click", showMessage);
    signInButton.addEventListener("click", showMessage);


}

function showMessage(e)
{
    let outerGrayBox = document.createElement("div");
    outerGrayBox.setAttribute("id", "outer-gray-box");

    outerGrayBox.classList.add("big-box");

    outerGrayBox.classList.add("gray-box");

    mainSection.appendChild(outerGrayBox);


    let messageOuterContainer = document.createElement("div");
    messageOuterContainer.classList.add("big-box");
    messageOuterContainer.setAttribute("id", "big-message-container");
    messageOuterContainer.addEventListener("click", closeMessage);
    messageOuterContainer.innerHTML = "<div id=\"message-box\" style=\"display: block\"></div>";

    mainSection.appendChild(messageOuterContainer);

    let form = document.createElement("form");
    form.id = "sign-in-form";
    let messageTitle = document.createElement("h2");
    let message = document.getElementById("message-box");

    message.appendChild(messageTitle);
    message.appendChild(form);
    messageDisplayed = true;

    let element = e.target;
    if (element.id === "log-in-btn")
    {
        displayLoginForm();
    }
    else if (element.id === "sign-in-btn")
    {
        displaySignInForm();
    }

    function displayLoginForm()
    {

        {
            messageTitle.innerText = "Log in";
            removeAllChildrenElements(form);

            createInputField(form, "text", "email", "Your e-mail", "Enter your e-mail", "log-in-element");
            createInputField(form, "password", "password", "Password", "Enter your password", "log-in-element");

            let submitButton = newButton(form, "light", "Log in");
            submitButton.addEventListener("click", displayDashboard);

        }

    }

    function displaySignInForm()
    {
        messageTitle.innerText = "Sign in";

        removeAllChildrenElements(form);

        createInputField(form, "text", "name", "Your name", "Enter your name", "sign-in-element");
        createInputField(form, "text", "surname", "Your surname", "Enter your surname", "sign-in-element");
        createInputField(form, "text", "email", "Your e-mail", "Enter your e-mail", "sign-in-element");
        createInputField(form, "password", "password", "Password", "Enter your password", "sign-in-element");
        createInputField(form, "password", "password-repeated", "Password", "Repeat your password", "sign-in-element");

        let submitButton = newButton(form, "light", "Sign in");

        submitButton.addEventListener("click", newUser);
    }


}

function closeMessage(e)
{
    if (e.target.id === "big-message-container" || e.target.nodeName === "BUTTON")
    {
        mainSection.removeChild(document.getElementById("big-message-container"));
        mainSection.removeChild(document.getElementById('outer-gray-box'));
    }
}

function createInputField(parentNode, type, id, placeholder, label, className)
{
    let newInputField = document.createElement("input");
    newInputField.type = type;
    newInputField.id = id;
    newInputField.placeholder = placeholder;
    newInputField.classList.add(className);

    let newLabel = document.createElement("label");
    newLabel.innerText = label;
    newLabel.classList.add(className);
    parentNode.appendChild(newLabel);
    parentNode.appendChild(newInputField);
}

function removeAllChildrenElements(parent)
{
    while (parent.lastElementChild)
    {
        parent.removeChild(parent.lastElementChild);
    }
}

function newButton(parent, className, innerText)
{
    let button = document.createElement("button");
    button.type = "button";
    button.classList.add(className);
    button.margin = "auto";
    button.innerText = innerText;
    parent.appendChild(button);
    return button;
}


function displayDashboard(e)
{
    if (e !== undefined)
    {
        e.preventDefault();
        // closeMessage(e);
    }
    document.body.removeChild(mainSection);

    dashboardSection = document.createElement("section");
    dashboardSection.id = "dashboard-section";
    document.body.appendChild(dashboardSection);

    let bar = document.createElement("div");
    let logoutButton = newButton(bar, 'button', "Log out");

    bar.setAttribute("id", "bar");
    dashboardSection.appendChild(bar);

    logoutButton.id = "logout-button";
    // logoutButton.setAttribute("id", "logout-button");

    logoutButton.addEventListener("click", logout);

    /////list of categories on the left
    ////to do - div inside, only for categories

    categoriesOuterContainer = document.createElement("div");
    categoriesOuterContainer.classList.add("categories-container");
    categoriesOuterContainer.classList.add("list");
    categoriesOuterContainer.innerHTML = "<div><h2> Your lists: </h2> </div>" +
        "<div class = \"left-list-box\"> </div>" +
        "<div id='input-box' class='input-box'> <input type='text' id='category-title' placeholder='Create new category here!'>" +


        "</div>" +
    "<div  id = 'categories-box' class 'left-list-box'> </div>";
    let addListButton = document.createElement("i");
    addListButton.classList.add("fa");
    addListButton.classList.add("fa-plus-circle");
    addListButton.classList.add("fa-3x");

    //// lists content on the right
    let bigContainer = document.createElement("div");
    bigContainer.setAttribute("id", "big-container-dashboard");
    let rightContainer = document.createElement("div");
    rightContainer.setAttribute("ID", "right-container");

    bigContainer.appendChild(categoriesOuterContainer);
    bigContainer.appendChild(rightContainer);
    dashboardSection.appendChild(bigContainer);


    let inputBar = document.getElementById("input-box");
    inputBar.appendChild(addListButton);
    inputBar.addEventListener("keypress",
        (e) =>
        {
            if (e.key === 'Enter')
            {
                createNewCategory();
            }

        });
    // listsContainer.appendChild(addListButton);


    setTimeout(function ()
    {
        let titleInputField = document.getElementById("category-title");
        //  console.log(titleInputField);
    }, 0);

    addListButton.addEventListener("click", createNewCategory);
    dashboardDisplayed = true;
    //////?????


}

function createNewCategory()
{

    let title = document.getElementById("category-title").value;
    if (title === "")
        return;

    let numberOfCategories = localStorage.getItem("user"+userId+"numberOfCategories");
    if(numberOfCategories === null)
    {
        localStorage.setItem("user"+userId+"numberOfCategories", "0");
        numberOfCategories = 0;
    }
    else
    {
        numberOfCategories = parseInt(numberOfCategories) ;
        localStorage.setItem("user"+userId+"numberOfCategories", (numberOfCategories + 1).toString());
    }
    localStorage.setItem("user" + userId + "category" + numberOfCategories, title);
    displayAllCategories();
    // showCategory(newCategory);
}
function displayAllCategories(id)
{
    let numberOfCategories = localStorage.getItem("user"+userId+"numberOfCategories");
    if(numberOfCategories === null || numberOfCategories === "0")
    {
        return;
    }
    numberOfCategories = parseInt(numberOfCategories);
    let categoriesContainer = document.getElementById("categories-box");
    removeAllChildrenElements(categoriesContainer);
    for (let i = 0; i < numberOfCategories; i++)
    {
        ///do something
        let newCategory = document.createElement("div");
        newCategory.classList.add("list-element");
        let newTitle = localStorage.getItem("user"+userId+"category"+(numberOfCategories - 1 - i));

        document.getElementById("category-title").value = "";
        newCategory.innerHTML = "<h3>" + newTitle + "</h3> " +
            "<i id ='trash-icon' class=\"fa fa-trash-o fa-2x\" ></i>";

        newCategory.addEventListener("click", editCategory);

        categoriesContainer.appendChild(newCategory);
    }


}

function editCategory(e)
{
    let element = e.target;
    // console.log(element.parentElement);
    if (element.id === "trash-icon")
    {
        removeCategory(element.parentElement);
    }
    else
    {
        showCategory(element);
    }
}

function showCategory(clickedElement)
{
    let categoryTitle;

    if (clickedElement.nodeName === "H3")
    {
        categoryTitle = clickedElement.innerText;
    }
    else
    {
        categoryTitle = clickedElement.querySelector("H3").innerText;
    }

    let rightContainer = document.getElementById("right-container");
    rightContainer.classList.add("list-elements");
    rightContainer.classList.add("list");

    if (rightContainer.hasChildNodes())
    {
        rightContainer.removeChild(rightContainer.lastElementChild);
    }
    rightContainer.innerHTML = "<h1 onclick='editTitle(this)'> " + categoryTitle + " </h1> " +
        "<div> <div id='to-do-list'><h2> To do: </h2> " +
        "</div> <div id ='done-list'> <h2> Done: </h2>  </div>  </div>";

}

function removeCategory(element) /////
{
    element.parentElement.removeChild(element);
    // console.log("you tried to remove list");

}

function newUser()
{
    // let form = document.getElementById("sign-in-form");
    let userName = document.getElementById("name").value;
    let userSurname = document.getElementById("surname").value;
    let userPassword = document.getElementById("password").value;
    let userEmail = document.getElementById("email").value;
    if (localStorage.getItem(userName) === null)
    {
        let id = localStorage.getItem("numberOfUsers");
        localStorage.setItem("user" + id, userName);
        localStorage.setItem("user" + id + "surname", userSurname);
        localStorage.setItem("user" + id + "pass", userPassword);
        localStorage.setItem("user" + id + "email", userEmail);


        let numberOfUsers = parseInt(localStorage.getItem("numberOfUsers")) + 1;
        localStorage.setItem("numberOfUsers", numberOfUsers.toString());
        printUserData(id);
        displayDashboard();
    }
    else
        console.log("juz jest taki uzytkownik");

}

function printUserData()
{
    let userName = localStorage.getItem("user" + userId);
    console.log("User name: ", userName);
    let userSurname = localStorage.getItem("user" + userId + "surname");
    console.log("User surname: ", userSurname);
    let userEmail = localStorage.getItem("user" + userId + "email");
    console.log("User email: ", userEmail);


}

function logout()
{
    document.body.removeChild(dashboardSection);
    displayMainSection();
}


function editTitle(title)
{
    title.style.display = "none";

    createInputField(title.parentElement, "text", "editTitleInputField", "", "", "input");

    let inputField;
    setTimeout(function ()
    {
        inputField = document.getElementById("editTitleInputField");
        inputField.classList.add("edit-input");
        inputField.value = title.innerText;
        inputField.focus();
        // console.log(inputField);
        title.parentElement.insertBefore(inputField, title);
        inputField.addEventListener("keypress",
            (e) =>
            {
                if (e.key === 'Enter')
                {
                    title.style.display = "block";
                    title.innerText = inputField.value;
                    title.parentElement.removeChild(inputField);
                }

            });

    }, 0);

}

function getMainSectionHTML()
{
    return "<div class ='container left'>" +
        " <div class = 'box'> " +
        "<h1>Plan your time </h1>" +
        " <h2>Improve your life</h2>" +
        " <p>Welcome! So nice to see you here but this is just a placeholder. Wait for the actual content" +
        ":P <br><br> \“You create opportunities by performing, not complaining.\”</p> " +
        " </div> " +
        " <div class='image-div'></div>" +
        "</div> " +
        " <div class='container right' id='main-section-container-right'>" +
        "   <button id='log-in-btn'>Log in</button>" +
        "<button id='sign-in-btn'>Sign in</button> " +
        "  </div>  </div>  ";

}