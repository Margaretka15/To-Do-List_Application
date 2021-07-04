let mainSection;
let dashboardSection;




// localStorage.clear();
if (localStorage.getItem("numberOfUsers") === null)
    localStorage.setItem("numberOfUsers", "0");

let messageDisplayed = false;

let dashboardDisplayed = false;
let listOfCategories;
let list;

displayMainSection();
document.addEventListener("click", (e) =>
{
    console.log(e.target);
});

function displayMainSection()
{
    mainSection = document.createElement("div");
    mainSection.setAttribute("id", "main-section");


    messageDisplayed = false;
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

    // shadowBoxes = document.getElementsByClassName("big-box");
    // // for (let b of shadowBoxes)
    // // {
    // //     b.style.display = "flex";
    // // }

    let form = document.createElement("form");
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
            removeFormElements(form);

            createInputField(form, "text", "email", "Your e-mail", "Enter your e-mail", "log-in-element");
            createInputField(form, "password", "password", "Password", "Enter your password", "log-in-element");

            let submitButton = newButton(form, "light", "Log in");
            submitButton.addEventListener("click", displayDashboard);


        }

    }

    function displaySignInForm()
    {
        messageTitle.innerText = "Sign in";

        removeFormElements(form);

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

function removeFormElements(form)
{
    while (form.lastElementChild)
    {
        form.removeChild(form.lastElementChild);
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
    dashboardSection.setAttribute("id", "dashboard-section");
    document.body.appendChild(dashboardSection);
    let logoutButton = document.createElement("button");
    let bar = document.createElement("div");
    bar.setAttribute("id", "bar");
    dashboardSection.appendChild(bar);
    logoutButton.id = "logout-button";
    logoutButton.innerText = "Log out";
    logoutButton.setAttribute("id", "logout-button")
    bar.appendChild(logoutButton);
    logoutButton.addEventListener("click", logout);

    /////list of categories on the left

    listOfCategories = document.createElement("div");
    listOfCategories.classList.add("categories-container");
    listOfCategories.classList.add("list");
    listOfCategories.innerHTML = "<div><h2> Your lists: </h2> </div>" +
        "<div id = \"list-box\" class = \"left-list-box\"> </div>" +
        "<div id='input-box' class='input-box'> <input type='text' id='category-title' placeholder='Create new category here!'>" +
        "</div>";
    let addListButton = document.createElement("i");
    addListButton.classList.add("fa");
    addListButton.classList.add("fa-plus-circle");
    addListButton.classList.add("fa-3x");

    //// lists content on the right
    let bigContainer = document.createElement("div");
    bigContainer.setAttribute("id", "big-container-dashboard");
    let rightContainer = document.createElement("div");
    rightContainer.setAttribute("ID", "right-container");

    bigContainer.appendChild(listOfCategories);
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

    let newCategory = document.createElement("div");
    newCategory.classList.add("list-element");

    localStorage.setItem("title1", title);
    console.log(localStorage.getItem("title1"));

    document.getElementById("category-title").value = "";
    newCategory.innerHTML = "<h3>" + title + "</h3> " +
        "<i id ='trash-icon' class=\"fa fa-trash-o fa-2x\" ></i>";

    newCategory.addEventListener("click", editList);

    listOfCategories.appendChild(newCategory);
    showCategory(newCategory);

}

function editList(e)
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

function removeCategory(element)
{
    element.parentElement.removeChild(element);
    console.log("you tried to remove list");

}

function newUser()
{
    let userName = document.getElementById("email").value;
    let userPassword = document.getElementById("password").value;
    if (localStorage.getItem(userName) === null)
    {
        localStorage.setItem(userName, userPassword);
        let numberOfUsers = parseInt(localStorage.getItem("numberOfUsers")) + 1;
        console.log(numberOfUsers);
        localStorage.setItem("numberOfUsers", numberOfUsers.toString());
        console.log(localStorage.getItem("numberOfUsers"));
        displayDashboard();
    }
    else
        console.log("juz jest taki uzytkownik");

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
        console.log(inputField);
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