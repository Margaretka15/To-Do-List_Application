let mainSection;
let dashboardSection;

localStorage.clear();

if (localStorage.getItem("numberOfUsers") === null)
    localStorage.setItem("numberOfUsers", "0");

let userId = 0; //// potrzebne!! widoczne w wielu miejscach, będzie ustawiane w momencie logowania i wywalane przy wylogowaniu xD
let messageDisplayed = false;

let dashboardDisplayed = false;
let categoriesOuterContainer;
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


    messageDisplayed = false; ////// trzeba to zrobić tak, żeby w widoku mobilnym
    // nie dało się w to kliknąć drugi raz !!
    // !! do zrobienia!!!
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
   if(document.getElementById("outer-gray-box") !== null)
       return;

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
            submitButton.addEventListener("click", login);

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
    if (e.target.id === "big-message-container")
    {

        mainSection.removeChild(document.getElementById("outer-gray-box"));
        mainSection.removeChild(document.getElementById("big-message-container"));
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

    displayAllCategories();
}

function createNewCategory()
{

    let title = document.getElementById("category-title").value;
    if (title === "")
        return;

    let numberOfCategories = getNumberOfCategories();
    if (numberOfCategories === null)
    {
        setNumberOfCategories(0);
        numberOfCategories = 0;
    }
    else
    {
        numberOfCategories = parseInt(numberOfCategories);
    }
    setCategoryNumberOfToDo(numberOfCategories, 0);
    setCategoryNumberOfDone(numberOfCategories, 0);
    setCategoryName(numberOfCategories, title);
    setNumberOfCategories(numberOfCategories + 1);

    displayAllCategories();
    showCategory(numberOfCategories);
    document.getElementById("to-do-list").querySelector("INPUT").focus(); /// chyba ma sens?
}

function displayAllCategories()
{
    let numberOfCategories = getNumberOfCategories();
    if (numberOfCategories === null)
    {
        return;
    }
    numberOfCategories = parseInt(numberOfCategories);
    let categoriesContainer = document.getElementById("categories-box");
    removeAllChildrenElements(categoriesContainer);
    for (let i = 0; i < numberOfCategories; i++)
    {
        let newCategory = document.createElement("div");
        newCategory.classList.add("category-element");
        let newTitle = getCategoryName(i);

        document.getElementById("category-title").value = "";
        newCategory.innerHTML = "<h3>" + newTitle + "</h3> " +
            "<i class=\"fa fa-trash-o fa-2x trash-icon\" ></i>";

        newCategory.addEventListener("click", (e) =>
        {
            if (e.target.nodeName !== "I") ///// kto jest mądrą Gosią, no kto? <3
                showCategory(i);
        });

        categoriesContainer.appendChild(newCategory);

        newCategory.querySelector("I").addEventListener("click", () =>
        {
            removeCategory(i)
        });
    }


}


function showCategory(shownCategoryId)
{
    let categoryTitle = getCategoryName(shownCategoryId);

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

    let toDoInputField = rightContainer.querySelector("INPUT");
    toDoInputField.addEventListener("keypress", (e) =>
    {
        if (e.key === "Enter" && toDoInputField.value !== "")
        {
            addOneToDo(toDoInputField.value);
            toDoInputField.value = "";
        }
    })
    displayList("to-do");
    displayList("done");

}

function addOneToDo(todo)
{
    let numberOfToDo = getCategoryNumberOfToDo(currentlyDisplayedCategory);
    if (numberOfToDo === null)
    {
        setCategoryNumberOfToDo(0);
        numberOfToDo = 0;
    }
    else
    {
        numberOfToDo = parseInt(getCategoryNumberOfToDo(currentlyDisplayedCategory));
    }
    setToDo(currentlyDisplayedCategory, numberOfToDo, todo);
    setCategoryNumberOfToDo(currentlyDisplayedCategory, numberOfToDo + 1);
    // displayToDoList();
    displayList("to-do");
}

function displayList(keyInLocalStorage)
{
    const listName = keyInLocalStorage + "-list";
    const numberKey = (keyInLocalStorage === "to-do") ? "numberOfToDo" : "numberOfDone";
    const numberOfElements = (numberKey === "numberOfDone") ? getCategoryNumberOfDone(currentlyDisplayedCategory) : getCategoryNumberOfToDo(currentlyDisplayedCategory);

    let list = document.getElementById(listName).querySelector(".list");
    removeAllChildrenElements(list);


    if (numberOfElements !== null && numberOfElements !== "0")
    {
        for (let i = numberOfElements - 1; i >= 0; i--)
        {
            let newElement = document.createElement("div");
            newElement.classList.add("list-element");
            newElement.classList.add("thin-dark-border");
            newElement.classList.add(listName + "-element");
            let id = numberOfElements - 1 - i;
            let title = (numberKey === "numberOfDone") ? getDone(currentlyDisplayedCategory, id) : getToDo(currentlyDisplayedCategory, id);

            // document.getElementById("category-title").value = "";
            newElement.innerHTML = " <input type='checkbox' class='mark-as-done-checkbox'> " +
                "<h4>" + title + "</h4>   <i class=\"fa fas fa-times x-icon fa-2x\"></i>  ";
            newElement.querySelector(".x-icon").addEventListener("click", () =>
            {
                removeElement(keyInLocalStorage, id);
            });
            newElement.querySelector("INPUT").addEventListener("click", () =>
            {
                // moveToListOfDone(id)

                if (listName === "to-do-list")
                {
                    setTimeout(() => moveToAnotherList(keyInLocalStorage, id), 100);
                }
                else
                {
                    moveToAnotherList(keyInLocalStorage, id); //// DO ZROBIENIA!!!!!!
                }

            });
            if (listName === "done-list")
            {
                newElement.querySelector("INPUT").checked = true;
            }
            list.appendChild(newElement);
        }
    }
}

function removeElement(keyInLocalStorage, removedElementId)
{
    const numberKey = (keyInLocalStorage === "to-do") ? "numberOfToDo" : "numberOfDone";
    const numberOfElements = (numberKey === "numberOfDone") ? getCategoryNumberOfDone(currentlyDisplayedCategory) : getCategoryNumberOfToDo(currentlyDisplayedCategory);

    if (removedElementId !== numberOfElements - 1)
    {
        for (let i = removedElementId + 1; i < numberOfElements; i++)
        {
            let item = (numberKey === "numberOfDone") ? getDone(currentlyDisplayedCategory, i) : getToDo(currentlyDisplayedCategory, i);

            if (numberKey === "numberOfDone")
            {
                setDone(currentlyDisplayedCategory, i - 1, item);
            }
            else
            {
                setToDo(currentlyDisplayedCategory, i - 1, item);
            }
        }
    }

    if (numberKey === "numberOfDone")
    {
        removeDone(currentlyDisplayedCategory, numberOfElements - 1);
        setCategoryNumberOfDone(currentlyDisplayedCategory, numberOfElements - 1);
    }
    else
    {
        removeToDo(currentlyDisplayedCategory, numberOfElements - 1);
        setCategoryNumberOfToDo(currentlyDisplayedCategory, numberOfElements - 1);
    }

    displayList("to-do");
    displayList("done");
}

function moveToAnotherList(sourceListKeyInLocalStorage, elementId)
{
    const targetListName = (sourceListKeyInLocalStorage === "to-do") ? "done" : "to-do";
    const targetNumberKey = (sourceListKeyInLocalStorage === "to-do") ? "numberOfDone" : "numberOfToDo";


    let numberOfElementsInTargetList = (targetNumberKey === "numberOfDone") ? getCategoryNumberOfDone(currentlyDisplayedCategory) : getCategoryNumberOfToDo(currentlyDisplayedCategory);
    numberOfElementsInTargetList = parseInt(numberOfElementsInTargetList);


    if(targetListName === "to-do")
    {
        const movedElement = getDone(currentlyDisplayedCategory, elementId);
        setToDo(currentlyDisplayedCategory, numberOfElementsInTargetList, movedElement);
        setCategoryNumberOfToDo(currentlyDisplayedCategory, numberOfElementsInTargetList + 1);
    }
    else
    {
        const movedElement = getToDo(currentlyDisplayedCategory, elementId);
        setDone(currentlyDisplayedCategory, numberOfElementsInTargetList, movedElement);
        setCategoryNumberOfDone(currentlyDisplayedCategory, numberOfElementsInTargetList + 1 );
    }


    removeElement(sourceListKeyInLocalStorage, elementId);
}

function removeCategory(removedCategoryId)
{
    const numberOfCategories = parseInt(getNumberOfCategories());

    if (currentlyDisplayedCategory === removedCategoryId)
    {
        let rightContainer = document.getElementById("right-container");
        if (rightContainer !== null)
        {
            document.getElementById("big-container-dashboard").removeChild(rightContainer);
        }
    }


    let numberOfToDo = parseInt(getCategoryNumberOfToDo(removedCategoryId));
    let numberOfDone = parseInt(getCategoryNumberOfDone(removedCategoryId));
    for (let i = 0; i < numberOfToDo; i++)
    {
        removeToDo(removedCategoryId, i);
    }
    for (let i = 0; i < numberOfDone; i++)
    {
        removeDone(removedCategoryId, i);
    }
    removeCategoryName(removedCategoryId);
    removeCategoryNumberOfToDo(removedCategoryId);
    removeCategoryNumberOfDone(removedCategoryId);

    for (let categoryId = removedCategoryId; categoryId < numberOfCategories - 1; categoryId++)
    {
        setCategoryName(categoryId, getCategoryName(categoryId + 1));
        removeCategoryName(categoryId + 1);

        let numberOfToDo = parseInt(getCategoryNumberOfToDo(categoryId + 1));
        let numberOfDone = parseInt(getCategoryNumberOfDone(categoryId + 1));
        setCategoryNumberOfToDo(categoryId, numberOfToDo);
        setCategoryNumberOfDone(categoryId, numberOfDone);
        removeCategoryNumberOfToDo(categoryId + 1);
        removeCategoryNumberOfDone(categoryId + 1);

        for (let i = 0; i < numberOfToDo; i++)
        {
            setToDo(categoryId, i, getToDo(categoryId + 1, i));
            removeToDo(categoryId + 1, i);
        }
        for (let i = 0; i < numberOfDone; i++)
        {
            setDone(categoryId, i, getDone(categoryId + 1, i));
            removeDone(categoryId + 1, i);
        }
    }
    setNumberOfCategories(numberOfCategories - 1)

    displayAllCategories();
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
        // printUserData(id);
        displayDashboard();
    }
    else
    {

    }
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

function login(e)
{
    // let email = document.getElementById("email");
    /// bla bla bla pobrać Id, sprawdzić czy ok z hasłem, jeśli tak, to userId = ustalić i displayDashboard;
    displayDashboard(e);
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

    title.parentElement.insertBefore(inputField, title);
    inputField.addEventListener("keypress",
        (e) =>
        {
            if (e.key === 'Enter')
            {
                title.style.display = "block";
                title.innerText = inputField.value;
                title.parentElement.removeChild(inputField);
                setCategoryName(currentlyDisplayedCategory, inputField.value);
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

function getNumberOfUsers()
{
    return localStorage.getItem("numberOfUsers");
}

function getNumberOfCategories()
{
    return localStorage.getItem("user" + userId + "numberOfCategories");
}

function getCategoryName(categoryId)
{
    return localStorage.getItem("user" + userId + "category" + categoryId);
}

function getCategoryNumberOfToDo(categoryId)
{
    return localStorage.getItem("user" + userId + "category" + categoryId + "numberOfToDo");
}

function getCategoryNumberOfDone(categoryId)
{
    return localStorage.getItem("user" + userId + "category" + categoryId + "numberOfDone");
}

function getToDo(categoryId, toDoId)
{
    return localStorage.getItem("user" + userId + "category" + categoryId + "to-do" + toDoId);
}

function getDone(categoryId, doneId)
{
    return localStorage.getItem("user" + userId + "category" + categoryId + "done" + doneId);
}

function setNumberOfCategories(numberOfCategories)
{
    localStorage.setItem("user" + userId + "numberOfCategories", numberOfCategories);
}

function setCategoryName(categoryId, name)
{
    localStorage.setItem("user" + userId + "category" + categoryId, name);
}

function setCategoryNumberOfToDo(categoryId, numberOfToDo)
{
    localStorage.setItem("user" + userId + "category" + categoryId + "numberOfToDo", numberOfToDo);
}

function setCategoryNumberOfDone(categoryId, numberOfDone)
{
    localStorage.setItem("user" + userId + "category" + categoryId + "numberOfDone", numberOfDone);
}

function setToDo(categoryId, toDoId, name)
{
    localStorage.setItem("user" + userId + "category" + categoryId + "to-do" + toDoId, name);
}

function setDone(categoryId, doneId, name)
{
    localStorage.setItem("user" + userId + "category" + categoryId + "done" + doneId, name);
}

function removeNumberOfCategories()
{
    localStorage.removeItem("user" + userId + "numberOfCategories");
}

function removeCategoryName(categoryId)
{
    localStorage.removeItem("user" + userId + "category" + categoryId);
}

function removeCategoryNumberOfToDo(categoryId)
{
    localStorage.removeItem("user" + userId + "category" + categoryId + "numberOfToDo");
}

function removeCategoryNumberOfDone(categoryId)
{
    localStorage.removeItem("user" + userId + "category" + categoryId + "numberOfDone");
}

function removeToDo(categoryId, toDoId)
{
    localStorage.removeItem("user" + userId + "category" + categoryId + "to-do" + toDoId);
}

function removeDone(categoryId, doneId)
{
    localStorage.removeItem("user" + userId + "category" + categoryId + "done" + doneId);
}