let loginButton = document.getElementById("log-in-btn");
let signInButton = document.getElementById("sign-in-btn");

let mainSection = document.getElementById("main-section");
let dashboardSection;

let message = document.getElementById("message-box");
let shadowBoxes = document.getElementsByClassName("big-box");
let shadowBackgroundBox = document.getElementById("big-message-container");

loginButton.addEventListener("click", showMessage);
signInButton.addEventListener("click", showMessage);
shadowBackgroundBox.addEventListener("click", closeMessage);
// message.addEventListener("click", close);

// document.addEventListener("click", (e) => { console.log(e.target)})

let executed = false;
let form;
let messageTitle;
let submitButton;
let dashboardDisplayed = false;
let listsContainer;
let listElements;
let list;
// let logoutButton;
function showMessage(e)
{

    message.style.display = "block";
    for (let b of shadowBoxes)
    {
        b.style.display = "flex";
    }
    if(!executed)
    {
        form = document.createElement("form");
        messageTitle = document.createElement("h2");
        message.appendChild(messageTitle);
        message.appendChild(form);

        let userName = document.createElement("input");
        userName.type = "text";
        userName.id = "user-name";
        userName.placeholder = "E-mail";
        let userNameLabel = document.createElement("label");
        userNameLabel.innerText = "Enter username or e-mail:"
        form.appendChild(userNameLabel);
        form.appendChild(userName);

        let userPass = document.createElement("input");
        userPass.type = "password";
        userPass.id = "user-pass";
        userPass.placeholder = "Password";
        let userPassLabel = document.createElement("label");
        userPassLabel.innerText = "Enter password:"
        form.appendChild(userPassLabel);
        form.appendChild(userPass);

        submitButton = document.createElement("button");
        submitButton.classList.add("light");
        submitButton.margin = "auto";
        submitButton.addEventListener("click", displayDashboard);
        form.appendChild(submitButton);

        executed = true;
    }



    let element = e.target;
    if (element.id === "log-in-btn")
    {
        loginMessage();
    }
    else if (element.id === "sign-in-btn")
    {
        signInMessage();
    }

    function loginMessage()
    {

       messageTitle.innerText = "Log in";
       submitButton.innerText = "Log in";

    }

    function signInMessage()
    {
        messageTitle.innerText = "Sign in";
        submitButton.innerText = "Sign in";
    }
}

function displayDashboard(e)
{
    e.preventDefault();
    // console.log(e.target.nodeName);
    closeMessage(e);
    mainSection.style.display = "none";
    if(!dashboardDisplayed)
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

        let bigContainer = document.createElement("div");
        bigContainer.setAttribute("id", "big-container-dashboard");


        listsContainer = document.createElement("div");
        listsContainer.classList.add("lists-container");
        listsContainer.classList.add("list");
        listsContainer.innerHTML = "<div><h2> Your lists: </h2> </div>"

        listElements = document.createElement("div");
        listElements.classList.add("list-elements");
        listElements.classList.add("list");
        listElements.innerHTML = "<div><h2> To do: </h2> </div> <div> <h2> Done: </h2>  </div>";

        bigContainer.appendChild(listsContainer);
        bigContainer.appendChild(listElements);
        dashboardSection.appendChild(bigContainer);


        // dashboardSection.

        dashboardDisplayed = true;
    }
    else
    {
        dashboardSection.style.display = "block";
    }

}
function logout()
{
    dashboardSection.style.display = "none";
    mainSection.style.display = "flex";
    // logoutButton.display = "none";

}
function closeMessage(e)
{
    if(e.target.id === "big-message-container" || e.target.nodeName === "BUTTON")
    {
        message.style.display = "none";

        for (let b of shadowBoxes)
        {
            b.style.display = "none";
        }
    }

}