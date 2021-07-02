
// let mainSection = document.getElementById("main-section");
let mainSection;
let dashboardSection;
let message;
let shadowBoxes;
// message.addEventListener("click", close);

// document.addEventListener("click", (e) => { console.log(e.target)})
// localStorage.clear();
if (localStorage.getItem("numberOfUsers") === null)
    localStorage.setItem("numberOfUsers", "0");

// console.log(localStorage.getItem("numberOfUsers"));
let messageDisplayed = false;
let signInFormDisplayed = false;
let loginFormDisplayed = false;
let form;
let messageTitle;
let submitButton;
let dashboardDisplayed = false;
let listsContainer;
// let listElements;
let list;
let numberOfLists;

// let logoutButton;
displayMainSection();

function displayMainSection()
{
    mainSection = document.createElement("div");
    mainSection.setAttribute("id", "main-section");

    loginFormDisplayed = false;
    signInFormDisplayed = false;
    messageDisplayed = false;
    dashboardDisplayed = false;
    mainSection.innerHTML = " <div class ='container left'>" +
        " <div class = 'box'> " +
        "<h1>Plan your time </h1>" +
        " <h2>Improve your life</h2>" +
        " <p>Welcome! So nice to see you here but this is just a placeholder. Wait for the actual content" +
        ":P <br><br> \“You create opportunities by performing, not complaining.\”</p> " +
        " </div> " +
        " <div class='image-div'></div>" +
        "</div> " +
        " <div class='container right'>" +
        "   <button id='log-in-btn'>Log in</button>" +
        "<button id='sign-in-btn'>Sign in</button> " +

        "  </div>  </div>  " +


        " <div class='big-box gray-box'> </div>" +
        "    <div class='big-box' id='big-message-container'>" +
        "        <div id='message-box'></div> " +
        "</div>";

    setTimeout(function (){
        let loginButton = document.getElementById("log-in-btn");
        let signInButton = document.getElementById("sign-in-btn");



        loginButton.addEventListener("click", showMessage);
        signInButton.addEventListener("click", showMessage);

    }, 0);


    document.body.appendChild(mainSection);
}


//// do ogarnięcia jak to zrobić xDD

function showMessage(e)
{
    message = document.getElementById("message-box");

    shadowBoxes = document.getElementsByClassName("big-box");
    let shadowBackgroundBox = document.getElementById("big-message-container");
    shadowBackgroundBox.addEventListener("click", closeMessage);
    message.style.display = "block";
    for (let b of shadowBoxes)
    {
        b.style.display = "flex";
    }

    if (!messageDisplayed) ///
    {
        form = document.createElement("form");
        messageTitle = document.createElement("h2");
        message.appendChild(messageTitle);
        message.appendChild(form);
        messageDisplayed = true;
    }

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
        signInFormDisplayed = false;
        if (!loginFormDisplayed)
        {
            messageTitle.innerText = "Log in";
            removeFormElements(form);

            createInputField(form, "text", "email", "Your e-mail", "Enter your e-mail", "log-in-element");
            createInputField(form, "password", "password", "Password", "Enter your password", "log-in-element");

            submitButton = newButton(form, "light", "Log in");
            submitButton.addEventListener("click", displayDashboard);

            loginFormDisplayed = true;
        }

    }

    function displaySignInForm()
    {
        messageTitle.innerText = "Sign in";
        loginFormDisplayed = false;
        if (!signInFormDisplayed)
        {
            removeFormElements(form);

            createInputField(form, "text", "name", "Your name", "Enter your name", "sign-in-element");
            createInputField(form, "text", "surname", "Your surname", "Enter your surname", "sign-in-element");
            createInputField(form, "text", "email", "Your e-mail", "Enter your e-mail", "sign-in-element");
            createInputField(form, "password", "password", "Password", "Enter your password", "sign-in-element");
            createInputField(form, "password", "password-repeated", "Password", "Repeat your password", "sign-in-element");

            submitButton = newButton(form, "light", "Sign in");
            submitButton.margin = "auto";

            signInFormDisplayed = true;


            submitButton.addEventListener("click", newUser);
        }

    }
}
function closeMessage(e)
{
    if (e.target.id === "big-message-container" || e.target.nodeName === "BUTTON")
    {
        message.style.display = "none";
        // document.body.removeChild(message);
        // messageDisplayed = false;
        // loginFormDisplayed = false;
        // signInFormDisplayed = false;
        for (let b of shadowBoxes)
        {
            b.style.display = "none";
        }
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
    button.classList.add("light");
    button.margin = "auto";
    button.innerText = innerText;
    form.appendChild(button);
    return button;
}


function displayDashboard(e)
{
    if (e !== undefined)
    {
        e.preventDefault();
        // console.log(e.target.nodeName);
        closeMessage(e);
    }
  //  mainSection.style.display = "none";
    document.body.removeChild(mainSection);
    if (!dashboardDisplayed)
    {
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

        /////list of lists on the left

        listsContainer = document.createElement("div");
        listsContainer.classList.add("lists-container");
        listsContainer.classList.add("list");
        listsContainer.innerHTML = "<div><h2> Your lists: </h2> </div>" +
            "<div id = \"list-box\" class = \"left-list-box\"> </div>" +
            "<div id='input-box' class='input-box'> <input type='text' id = 'list-title' placeholder='Create new list here!'> </div>";
        // let listBox = document.getElementById("list-box");
        let addListButton = document.createElement("i");
        addListButton.classList.add("fa");
        addListButton.classList.add("fa-plus-circle");
        addListButton.classList.add("fa-3x");

        //// lists content on the right
        let bigContainer = document.createElement("div");
        bigContainer.setAttribute("id", "big-container-dashboard");
        let rightContainer = document.createElement("div");
        rightContainer.setAttribute("ID", "right-container");

        bigContainer.appendChild(listsContainer);
        bigContainer.appendChild(rightContainer);
        dashboardSection.appendChild(bigContainer);

        setTimeout(function ()
        {
            let inputBar = document.getElementById("input-box");
            inputBar.appendChild(addListButton);
            inputBar.addEventListener("keypress",
                (e) =>
                {
                    if (e.key === 'Enter')
                    {
                        createNewList();
                    }

                });
        }, 0);
        // listsContainer.appendChild(addListButton);


        setTimeout(function ()
        {
            let titleInputField = document.getElementById("list-title");
            //  console.log(titleInputField);
        }, 0);

        addListButton.addEventListener("click", createNewList);
        dashboardDisplayed = true;
    }
    else
    {
        dashboardSection.style.display = "block";
    }

}

function createNewList()
{

    let title = document.getElementById("list-title").value;
    if (title === "")
        return;

    let newList = document.createElement("div");
    newList.classList.add("list-element");

    localStorage.setItem("title1", title);
    console.log(localStorage.getItem("title1"));

    document.getElementById("list-title").value = "";
    newList.innerHTML = "<h3>" + title + "</h3> " +
        "<i id ='trash-icon' class=\"fa fa-trash-o fa-2x\" ></i>";

    newList.addEventListener("click", editList);

    listsContainer.appendChild(newList);
    showList(newList);

}

function editList(e)
{
    let element = e.target;
    // console.log(element.parentElement);
    if (element.id === "trash-icon")
    {
        removeList(element.parentElement);
    }
    else
    {
        showList(element);
    }
}

function showList(clickedElement)
{
    // let element = e.target;

    let listTitle;

    if (clickedElement.nodeName === "H3")
    {
        listTitle = clickedElement.innerText;

    }
    else
    {
        listTitle = clickedElement.querySelector("H3").innerText;
    }
    let rightContainer = document.getElementById("right-container");
    rightContainer.classList.add("list-elements");
    rightContainer.classList.add("list");

    if (rightContainer.hasChildNodes())
    {
        rightContainer.removeChild(rightContainer.lastElementChild);
    }
    rightContainer.innerHTML = "<h1 onclick='editTitle(this)'> " + listTitle + " </h1> <div> <div id='to-do-list'><h2> To do: </h2> </div> <div id ='done-list'> <h2> Done: </h2>  </div>  </div>";

}

function removeList(element)
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




function editTitle(element)
{
    element.style.display = "none";
    // let inputField = document.createElement("input");
    // inputField.setAttribute("ID", "editTitleInputField");
    // inputField.classList.add("input");
    ///nie mogę się zdecydować xD
    createInputField(element.parentElement, "text", "editTitleInputField", "", "", "input");

    let inputField;
    setTimeout(function ()
    {
        inputField = document.getElementById("editTitleInputField");
        inputField.classList.add("edit-input");
        inputField.value = element.innerText;
        inputField.focus();
        console.log(inputField);
        element.parentElement.insertBefore(inputField, element);
        inputField.addEventListener("keypress",
            (e) =>
            {
                if (e.key === 'Enter')
                {
                    element.style.display = "block";
                    element.innerText = inputField.value;
                    element.parentElement.removeChild(inputField);
                }

            });

    }, 0);

}