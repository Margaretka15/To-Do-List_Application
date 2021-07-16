let mainSection;
let dashboardSection;

// localStorage.clear();

if (getNumberOfUsers() === null)
    setNumberOfUsers(0);

let userId = -1; //// that's probably not the best solution. Works though

let currentlyDisplayedCategory;

displayMainSection();

function displayMainSection()
{
    mainSection = document.createElement("div");
    mainSection.setAttribute("id", "main-section");

    mainSection.innerHTML = getMainSectionHTML();
    document.body.appendChild(mainSection);

    let loginButton = document.getElementById("log-in-btn");
    let signInButton = document.getElementById("sign-up-btn");

    loginButton.addEventListener("click", showWindow);
    signInButton.addEventListener("click", showWindow);
}

function showWindow(e) //// probably needs refactoring and moving parts of this function to separate functions
{
    if (document.getElementById("outer-gray-box") !== null)
        return;

    let outerGrayBox = document.createElement("div");
    outerGrayBox.setAttribute("id", "outer-gray-box");

    outerGrayBox.classList.add("big-box");

    outerGrayBox.classList.add("gray-box");

    document.body.appendChild(outerGrayBox);

    let messageOuterContainer = document.createElement("div");
    messageOuterContainer.classList.add("big-box");
    messageOuterContainer.setAttribute("id", "big-message-container");
    messageOuterContainer.addEventListener("click", (e) =>
    {
        if (e.target === messageOuterContainer)
            closeWindow();
    });
    messageOuterContainer.innerHTML = "<div id='message-box' style='display: block'></div>";

    document.body.appendChild(messageOuterContainer);

    let form = document.createElement("form");
    let messageTitle = document.createElement("h2");
    let message = document.getElementById("message-box");

    message.appendChild(messageTitle);
    message.appendChild(form);

    let element = e.target;
    if (element.id === "log-in-btn")
    {
        displayLoginForm();
    }
    else if (element.id === "sign-up-btn")
    {
        displaySignUpForm();
    }
    else if (element.id === "account-settings")
    {
        displayChangeYourDataMessage();
    }
    form.firstElementChild.nextSibling.focus();

    function displayLoginForm()
    {
        form.id = "login-form";
        {
            messageTitle.innerText = "Log in";
            if (form.hasChildNodes())
                removeAllChildrenElements(form);

            createInputField(form, "text", "email", "Your e-mail", "Enter your e-mail", "log-in-element");
            createInputField(form, "password", "password", "Password", "Enter your password", "log-in-element");

            let submitButton = newButton(form, "light", "Log in");
            submitButton.addEventListener("click", () =>
            {
                login();
            });
        }
    }

    function displaySignUpForm()
    {
        messageTitle.innerText = "Sign up";
        form.id = "sign-up-form";

        if (form.hasChildNodes())
            removeAllChildrenElements(form);

        let name = createInputField(form, "text", "name", "Your name", "Enter your name", "sign-up-element");
        let surname = createInputField(form, "text", "surname", "Your surname", "Enter your surname", "sign-up-element");
        let email = createInputField(form, "text", "email", "Your e-mail", "Enter your e-mail", "sign-up-element");
        let passwordInputField = createInputField(form, "password", "password", "Password", "Enter your password", "sign-up-element");
        let repeatedPasswordInputField = createInputField(form, "password", "password-repeated", "Password", "Repeat your password", "sign-up-element");

        let submitButton = newButton(form, "light", "Sign up");
        let canAddNewUser = false;
        passwordInputField.addEventListener("keyup", () =>
        {
            canAddNewUser = checkRepeatedPassword(passwordInputField, repeatedPasswordInputField);
        });
        repeatedPasswordInputField.addEventListener("keyup", () =>
        {
            canAddNewUser = checkRepeatedPassword(passwordInputField, repeatedPasswordInputField);
        });

        submitButton.addEventListener("click", () =>
        {
            console.log(canAddNewUser);
            if (canAddNewUser)
                newUser(name.value, surname.value, passwordInputField.value, email.value);
        });
    }

    function displayChangeYourDataMessage()
    {
        form.id = "account-settings-form";

        messageTitle.innerText = "Account settings";

        if (form.hasChildNodes())
            removeAllChildrenElements(form);

        (createInputField(form, "text", "name", "Your name", "Your name", "change-data-element")).value = getUserName(userId);
        (createInputField(form, "text", "surname", "Your surname", "Your surname", "change-data-element")).value = getUserSurname(userId);
        (createInputField(form, "text", "email", "Your e-mail", "your e-mail", "change-data-element")).value = getUserEmail(userId);
        (createInputField(form, "password", "password", "Password", "Your password", "change-data-element")).value = getUserPassword(userId);

        let buttonsContainer = document.createElement("div");

        form.appendChild(buttonsContainer);

        let cancelButton = newButton(buttonsContainer, "light", "Cancel");

        let submitButton = newButton(buttonsContainer, "light", "Submit");

        submitButton.addEventListener("click", () =>
        {
            changeUserData(userId);
            closeWindow();
        });
        cancelButton.addEventListener("click", () =>
        {
            closeWindow();
        });

    }

}

function closeWindow()
{
    document.body.removeChild(document.getElementById("outer-gray-box"));
    document.body.removeChild(document.getElementById("big-message-container"));
}

function createInputField(parentNode, type, id, placeholder, label, className)
{
    let newInputField = document.createElement("input");
    newInputField.type = type;
    newInputField.id = id;
    newInputField.placeholder = placeholder;
    newInputField.classList.add(className);

    let newLabel = document.createElement("label");
    newLabel.id = "label-for-" + id;
    newLabel.innerText = label;
    newLabel.classList.add(className);
    parentNode.appendChild(newLabel);
    parentNode.appendChild(newInputField);
    return newInputField;
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
    document.body.removeChild(document.getElementById("outer-gray-box"));
    document.body.removeChild(document.getElementById("big-message-container"));


    dashboardSection = document.createElement("section");
    dashboardSection.id = "dashboard-section";
    document.body.appendChild(dashboardSection);

    let bar = document.createElement("div");


    let accountSettingsButton = newButton(bar, 'button', "Account settings");
    let logoutButton = newButton(bar, 'button', "Log out");
    bar.setAttribute("id", "bar");
    dashboardSection.appendChild(bar);

    logoutButton.id = "logout-button";
    accountSettingsButton.id = "account-settings";
    // logoutButton.setAttribute("id", "logout-button");

    logoutButton.addEventListener("click", logout);
    accountSettingsButton.addEventListener("click", showWindow);

    let categoriesOuterContainer = document.createElement("div");
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


    if (targetListName === "to-do")
    {
        const movedElement = getDone(currentlyDisplayedCategory, elementId);
        setToDo(currentlyDisplayedCategory, numberOfElementsInTargetList, movedElement);
        setCategoryNumberOfToDo(currentlyDisplayedCategory, numberOfElementsInTargetList + 1);
    }
    else
    {
        const movedElement = getToDo(currentlyDisplayedCategory, elementId);
        setDone(currentlyDisplayedCategory, numberOfElementsInTargetList, movedElement);
        setCategoryNumberOfDone(currentlyDisplayedCategory, numberOfElementsInTargetList + 1);
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

function newUser(userName, userSurname, userPassword, userEmail)
{

    if (getExistingUserId(userEmail) == null) /// ??????????
    {
        let id = parseInt(getNumberOfUsers());


        setUserName(id, userName);
        setUserSurname(id, userSurname);
        setUserPassword(id, userPassword);
        setUserEmail(id, userEmail);


        let numberOfUsers = id + 1;
        setNumberOfUsers(numberOfUsers);
        userId = id;
        displayDashboard();
    }
    else
    {
       showFormErrorMessage(document.getElementById("sign-up-form"), "email", "This email is already taken!");
    }

}

function changeUserData(id)
{
    console.log("You tried to change your data!");
    let userName = document.getElementById("name").value;
    let userSurname = document.getElementById("surname").value;
    let userPassword = document.getElementById("password").value;
    let userEmail = document.getElementById("email").value;

    setUserName(id, userName);
    setUserSurname(id, userSurname);
    setUserPassword(id, userPassword);
    setUserEmail(id, userEmail);

}

function getExistingUserId(userEmail)
{
    let numberOfUsers = getNumberOfUsers();
    for (let i = 0; i < numberOfUsers; i++)
    {
        let email = getUserEmail(i);
        if (email === userEmail)
            return i;
    }
    return null;
}

function printUserData(id) /// this function is never used but was helpful and still may be useful
{
    let userName = getUserName(id)
    console.log("User name: ", userName);
    let userSurname = getUserSurname(id);
    console.log("User surname: ", userSurname);
    let userEmail = getUserEmail(id);
    console.log("User email: ", userEmail);


}

function login()
{
    let email = document.getElementById("email").value;
    let id = getExistingUserId(email);
    let form = document.getElementById("login-form");
    if (id != null)
    {
        hideLoginErrorMessage(form, "email");
        let enteredPassword = document.getElementById("password").value;

        let storedPassword = getUserPassword(id);
        if (enteredPassword === storedPassword)
        {
            userId = id;

            hideLoginErrorMessage(form, "password");
            displayDashboard();
        }
        else
        {
            showFormErrorMessage(form, "password", "Incorrect password!");
        }
    }
    else
    {
        showFormErrorMessage(form, "email", "Incorrect e-mail!");
    }

}

function logout()
{
    document.body.removeChild(dashboardSection);
    userId = -1; ///// or what??
    displayMainSection();
}

function showFormErrorMessage(form, elementId, messageText)
{
    let message = document.createElement("p");
    message.innerText = messageText;

    if (document.getElementById(elementId).nextSibling.nodeName !== "P")
        form.insertBefore(message, document.getElementById(elementId).nextSibling);
}

function hideLoginErrorMessage(form, elementName)
{
    // let loginForm = document.getElementById("login-form");
    if (document.getElementById(elementName).nextSibling.nodeName === "P")
    {
        form.removeChild(document.getElementById(elementName).nextSibling);
    }
}

function checkRepeatedPassword(password, repeatedPassword)
{
    let form = document.getElementById("sign-up-form");
    if (password.value !== repeatedPassword.value)
    {
        showFormErrorMessage(form, "password", "Your passwords do not match");
        return false;
    }
    else
        hideLoginErrorMessage(form, "password");
    return true;
}


function editTitle(title)
{
    title.style.display = "none";

    createInputField(title.parentElement, "text", "editTitleInputField", "", "", "input");

    let inputField = document.getElementById("editTitleInputField");
    inputField.classList.add("edit-input");
    inputField.value = title.innerText;
    // inputField.focus();
    inputField.select();


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

function getUserName(id)
{
    return localStorage.getItem("user" + id);

}

function getUserSurname(id)
{
    return localStorage.getItem("user" + id + "surname");
}

function getUserPassword(id)
{
    return localStorage.getItem("user" + id + "pass");
}

function getUserEmail(id)
{
    return localStorage.getItem("user" + id + "email");
}

function setNumberOfUsers(numberOfUsers)
{
    localStorage.setItem("numberOfUsers", numberOfUsers);
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

function setUserName(id, userName)
{
    localStorage.setItem("user" + id, userName);

}

function setUserSurname(id, userSurname)
{
    localStorage.setItem("user" + id + "surname", userSurname);
}

function setUserPassword(id, userPassword)
{
    localStorage.setItem("user" + id + "pass", userPassword);
}

function setUserEmail(id, userEmail)
{
    localStorage.setItem("user" + id + "email", userEmail);
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