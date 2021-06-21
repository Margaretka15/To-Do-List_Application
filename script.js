let loginButton = document.getElementById("log-in-btn");
let mainSection = document.getElementById("main-section");
loginButton.addEventListener("click", login);

let dashboardSection;
let message = document.getElementById("message-box");
message.addEventListener("click", close);
function login()
{
    mainSection.style.display = "none";
    dashboardSection = document.createElement("section");
    dashboardSection.setAttribute("id", "dashboard");
    document.body.appendChild(dashboardSection);
    let logoutButton = document.createElement("button");
    logoutButton.innerText = "Log out";
    dashboardSection.appendChild(logoutButton);
    logoutButton.addEventListener("click", logout);
}
function logout()
{
    dashboardSection.style.display = "none";
    mainSection.style.display = "flex";
}
function close()
{
    message.style.display = "none";
    let boxes = document.getElementsByClassName("big-box");
    for (let b of boxes)
    {
        b.style.display = "none";
    }
}