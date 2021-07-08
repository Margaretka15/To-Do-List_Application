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
// let list;
let currentlyDisplayedCategory;

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
    let signInButton = document.getElementById("sign-up-btn");


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
    form.id = "sign-up-form";
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
    else if (element.id === "sign-up-btn")
    {
        displaySignUpForm();
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

    function displaySignUpForm()
    {
        messageTitle.innerText = "Sign up";

        removeAllChildrenElements(form);

        createInputField(form, "text", "name", "Your name", "Enter your name", "sign-up-element");
        createInputField(form, "text", "surname", "Your surname", "Enter your surname", "sign-up-element");
        createInputField(form, "text", "email", "Your e-mail", "Enter your e-mail", "sign-up-element");
        createInputField(form, "password", "password", "Password", "Enter your password", "sign-up-element");
        createInputField(form, "password", "password-repeated", "Password", "Repeat your password", "sign-up-element");

        let submitButton = newButton(form, "light", "Sign up");

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


    categoriesOuterContainer = document.createElement("div");
    categoriesOuterContainer.classList.add("categories-container");
    categoriesOuterContainer.classList.add("column");
    categoriesOuterContainer.innerHTML = "<div><h2> Your lists: </h2> </div>" +
        "<div class = \"left-list-box\"> </div>" +
        "<div id='input-box' class='input-box'> <input type='text' id='category-title' placeholder='Create new category here!'>" +
        "</div>" +
        "<div  id = 'categories-box' class = 'left-list-box'> </div>";
    let addListButton = document.createElement("i");
    addListButton.classList.add("fa");
    addListButton.classList.add("fa-plus-circle");
    addListButton.classList.add("fa-3x");


    let bigContainer = document.createElement("div");
    bigContainer.setAttribute("id", "big-container-dashboard");

    bigContainer.appendChild(categoriesOuterContainer);

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

    addListButton.addEventListener("click", createNewCategory);
    dashboardDisplayed = true;
////????????????


}

function createNewCategory()
{

    let title = document.getElementById("category-title").value;
    if (title === "")
        return;

    let numberOfCategories = localStorage.getItem("user" + userId + "numberOfCategories");
    if (numberOfCategories === null)
    {
        localStorage.setItem("user" + userId + "numberOfCategories", "0");
        numberOfCategories = 0;
    }
    else
    {
        numberOfCategories = parseInt(numberOfCategories);
    }
    localStorage.setItem("user" + userId + "category" + numberOfCategories, title);
    localStorage.setItem("user" + userId + "numberOfCategories", (numberOfCategories + 1).toString());

    displayAllCategories();
    // showCategory(newCategory);
}

function displayAllCategories()
{
    let numberOfCategories = localStorage.getItem("user" + userId + "numberOfCategories");
    if (numberOfCategories === null)
    {
        return;
    }
    numberOfCategories = parseInt(numberOfCategories);
    let categoriesContainer = document.getElementById("categories-box");
    removeAllChildrenElements(categoriesContainer);
    for (let i = numberOfCategories - 1; i >= 0; i--)
    {
        let newCategory = document.createElement("div");
        newCategory.classList.add("category-element");
        let newTitle = localStorage.getItem("user" + userId + "category" + (numberOfCategories - 1 - i));

        document.getElementById("category-title").value = "";
        newCategory.innerHTML = "<h3>" + newTitle + "</h3> " +
            "<i class=\"fa fa-trash-o fa-2x trash-icon\" ></i>";

        newCategory.addEventListener("click", showCategory);

        categoriesContainer.appendChild(newCategory);

        newCategory.querySelector("I").addEventListener("click", removeCategory);
    }


}

function getClickedCategoryId(clickedElement)
{

    let categoriesArray = document.getElementsByClassName("category-element");
    let categoryId;

    if (clickedElement.nodeName === "H3" || clickedElement.nodeName === "I")
    {
        clickedElement = clickedElement.parentElement;
    }
    // console.log("clicked element ", clickedElement);
    for (let i = 0; i < categoriesArray.length; i++)
    {
        if (categoriesArray[i] === clickedElement)
        {
            categoryId = i;
            // console.log(categoryId);
            return categoryId;
        }
    }

}
/////te dwie funkcje da się połączyć, ale pasuje podać parenta i nazwę klasy po której szukamy
function getClickedItemId(clickedElement)
{
    let elementsArray = document.getElementById("to-do-list").getElementsByClassName("list-element");
    let itemId;
    if (clickedElement.nodeName === "H3" || clickedElement.nodeName === "I")
    {
        clickedElement = clickedElement.parentElement;
    }
    // console.log("clicked element ", clickedElement.target);
    for (let i = 0; i < elementsArray.length; i++)
    {
        if (elementsArray[i] === clickedElement)
        {
            itemId = i;
            console.log(itemId);
            return itemId;
        }
    }
    // console.log(itemId);
}

function showCategory(clickedElement)
{
    if (clickedElement.target.nodeName === "I")
        return;
    let categoryTitle;
    let shownCategoryId = getClickedCategoryId(clickedElement.target);

    categoryTitle = localStorage.getItem("user" + userId + "category" + shownCategoryId);

    let rightContainer = document.getElementById("right-container");
    if (rightContainer === null)
    {
        let bigContainer = document.getElementById("big-container-dashboard");
        rightContainer = document.createElement("div");
        rightContainer.setAttribute("ID", "right-container");
        bigContainer.appendChild(rightContainer);
    }


    rightContainer.classList.add("list-big-outer-container");
    rightContainer.classList.add("column");

    if (rightContainer.hasChildNodes())
    {
        rightContainer.removeChild(rightContainer.lastElementChild);
    }
    rightContainer.innerHTML = "<h1 onclick='editTitle(this)'> " + categoryTitle + " </h1> " +
        "<div> <div id='to-do-list' class='list-small-outer-container'><h2> To do: </h2> " +

        "<input type = 'text' placeholder='Plan something here!'  class='thin-dark-border'>"
        +
       " <div class = 'list'>" +

      "  </div>" +
        "</div> <div id ='done-list' class='list-small-outer-container'> <h2> Done: </h2>  " +
        " <div class = 'list'>" +

        "  </div>" +
        "</div>  </div>";
    currentlyDisplayedCategory = shownCategoryId;
    // console.log(currentlyDisplayedCategory);

    let toDoInputField = rightContainer.querySelector("INPUT");
    toDoInputField.addEventListener("keypress", (e) => {
        if(e.key === "Enter" && toDoInputField.value!=="")
        {
            addOneToDo(toDoInputField.value);
            toDoInputField.value ="";
        }
    })
    displayToDoList();
    displayDoneList();
}
function addOneToDo(todo)
{
    console.log(todo);
    let numberOfToDo = localStorage.getItem("user"+userId+"category"+currentlyDisplayedCategory+"numberOfToDo");
    if(numberOfToDo === null)
    {
        localStorage.setItem("user" + userId + "category" + currentlyDisplayedCategory + "numberOfToDo", "0");
        numberOfToDo = 0;
    }
    else
    {
        numberOfToDo = parseInt(localStorage.getItem("user"+userId+"category"+currentlyDisplayedCategory+"numberOfToDo"));
    }
    localStorage.setItem("user"+userId+"category"+currentlyDisplayedCategory+"to-do"+numberOfToDo, todo);
    localStorage.setItem("user"+userId+"category"+currentlyDisplayedCategory+"numberOfToDo", (numberOfToDo + 1).toString());
    displayToDoList();
}
function displayToDoList()
{
    let listOfToDo = document.getElementById("to-do-list").querySelector(".list");
    removeAllChildrenElements(listOfToDo);
    console.log(typeof listOfToDo);
    let numberOfToDo = localStorage.getItem("user"+userId+"category"+currentlyDisplayedCategory+"numberOfToDo");
     if(numberOfToDo!== null && numberOfToDo !== "0")
     {
         for (let i = numberOfToDo-1; i >=0; i--)
         {
             let newToDo = document.createElement("div");
             newToDo.classList.add("list-element");
             newToDo.classList.add("thin-dark-border");
             let title = localStorage.getItem("user" + userId + "category" +currentlyDisplayedCategory +"to-do"+(numberOfToDo - 1 - i));

             // document.getElementById("category-title").value = "";
             newToDo.innerHTML = " <input type='checkbox' class='mark-as-done-checkbox'> " +
                 "<h4>" + title + "</h4>   <i class=\"fa fas fa-times x-icon fa-2x\"></i>  ";
             newToDo.querySelector(".x-icon").addEventListener("click", removeListToDoElement);
             listOfToDo.appendChild(newToDo);
         }
     }
}
function displayDoneList()
{
    let listOfDone = document.getElementById("done-list");
}
function removeListToDoElement(element)
{
    let removedElementId = getClickedItemId(element.target);

    let numberOfToDo = parseInt(localStorage.getItem("user"+userId +"category"+currentlyDisplayedCategory+"numberOfToDo"));
    if(removedElementId !== numberOfToDo - 1)
    {
        for (let i = removedElementId + 1; i < numberOfToDo; i++)
        {
            let item = localStorage.getItem("user" + userId + "category" + currentlyDisplayedCategory+"to-do"+i);
            localStorage.setItem("user" + userId + "category" +currentlyDisplayedCategory+"to-do"+(i - 1), item);
        }
    }
    localStorage.removeItem("user" + userId + "category" + currentlyDisplayedCategory + "to-do" + (numberOfToDo - 1).toString());
    localStorage.setItem("user" + userId + "category" + currentlyDisplayedCategory + "numberOfToDo", (numberOfToDo - 1).toString());

    displayToDoList();
    // console.log("you tried to remove this item");

}
function removeCategory(element) /////
{
    let removedCategoryId = getClickedCategoryId(element.target);

    let numberOfCategories = parseInt(localStorage.getItem("user" + userId + "numberOfCategories"));
    if (removedCategoryId !== numberOfCategories - 1)
    {
        for (let i = removedCategoryId + 1; i < numberOfCategories; i++)
        {
            let item = localStorage.getItem("user" + userId + "category" + i);
            localStorage.setItem("user" + userId + "category" + (i - 1), item);
        }
    }
    localStorage.removeItem("user" + userId + "category" + (numberOfCategories - 1).toString());
    localStorage.setItem("user" + userId + "numberOfCategories", (numberOfCategories - 1).toString());

    if (currentlyDisplayedCategory === removedCategoryId)
    {
        let rightContainer = document.getElementById("right-container");
        document.getElementById("big-container-dashboard").removeChild(rightContainer);
        // currentlyDisplayedCategory = null;
    }
    else if (currentlyDisplayedCategory!== undefined && removedCategoryId < currentlyDisplayedCategory)
    {
        currentlyDisplayedCategory -=1; /// chyba wystarczy?? do przetestowania
    }

    let numberOfToDo = parseInt(localStorage.getItem("user"+userId +"category"+currentlyDisplayedCategory+"numberOfToDo"));
    for (let i = 0; i < numberOfToDo; i++)
    {
        localStorage.removeItem("user"+userId+"category"+currentlyDisplayedCategory+"to-do"+i);
        localStorage.removeItem("user"+userId+"category"+currentlyDisplayedCategory+"numberOfToDo");
    }

    displayAllCategories();
    // WAŻNE!!! Po dodaniu opcji dodawania elementów do kategorii je też trzeba będzie zmienić !!!

}

function newUser()
{
    // let form = document.getElementById("sign-up-form");
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
    {

    }
    // console.log("juz jest taki uzytkownik");

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

    let inputField = document.getElementById("editTitleInputField");
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
                localStorage.setItem("user"+userId+"category"+currentlyDisplayedCategory, inputField.value);
                displayAllCategories();
            }

        });



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
        "<button id='sign-up-btn'>Sign up</button> " +
        "  </div>  </div>  ";

}