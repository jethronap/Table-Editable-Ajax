// 1. Check that jQuery library is loaded:
// console.log(jQuery);

//2.1) Load App code after document is ready:
jQuery(init);
// 2.2) jQuery(function ($){/* App Code here */})

//--------------//

// 3) App logic goes here:
function init($) {
    // jQuery.ajax(); --> $.ajax(); // $ alias for jQuery

    let $getUsersButton = document.querySelector('#getusers');
    let $table = document.querySelector("#output"); // document.querySelectorAll();
    let $tbody = $table.querySelector("tbody");
    let options = {
        url: "http://localhost:3000/users/",
        success: handleResponse,
    }

    let $addUserButton = document.querySelector('#adduser');

    //add a click that refers to the whole table:
    document.querySelector("table")
        .addEventListener("click", clickHandler);

    function clickHandler(event) {

        //targets the element that clicked:
        let $tr = event.target.parentElement;
        let id = $tr.firstElementChild.textContent;
        let type = event.target.className;

        if (type === "delete") {
            console.log($tr);
            //console.log(type);
            console.log(id);

            console.log("delete attempt");

            delUser(id);

        } else if (type === "update") {

            editUser(id);

        }
    }

    // edit user when click on update:
    function editUser(id) {
        let $tr = event.target.parentElement;
        let name = $tr.children[1].firstElementChild.value;
        let username = $tr.children[2].firstElementChild.value;
        let email = $tr.children[3].firstElementChild.value;
         
        let editOptions = {
            url: "http://localhost:3000/users/" + id,
            method: 'PUT',
            data:  {
                name: name,
                username: username,
                email: email,
            },
            success: function (result) {
                console.log("Success!");
            }
        }
        $.ajax(editOptions);


    }

    // delete user when click o delete:
    function delUser(id) {

        let delOptions = {
            url: "http://localhost:3000/users/" + id,
            method: 'DELETE',
            success: function (result) {
                alert("Entry Deleted.");
            }
        }
        if (confirm("Delete Entry?")) {
            $.ajax(delOptions);
        }
    }

    // add new username:
    function addUser() {
        let $userName = document.querySelector("#username");
        let value = $userName.value;
        let addOptions = {
            url: "http://localhost:3000/users/",
            method: 'POST',
            data: {
                username: value
            },
            success: handleAddUser,
        }
        $.ajax(addOptions);
    }
    
    // get all users:
    function getUsers() {
        $.ajax(options);
        $tbody.innerHTML = "";
    }

    function handleAddUser() {
        console.log("User added successfully...");
    }

    //dynamically create table rows:
    function createRow(profile) {

        let $tr = document.createElement("tr");
        $tr.innerHTML = `
                        <td id="id">${profile.id}</td>
                        <td id="name"><input type="text" value="${profile.name}"></td>
                        <td id="username"><input type="text" value="${profile.username}"></td>
                        <td id="email"><input type="text" value="${profile.email}"></td>
                        <td class="update">update</td>
                        <td class="delete">delete</td>
                        `;

        $tbody.appendChild($tr);
    }

    function handleResponse(data) {
        /* to see the keys of an object:
            let keys = Object.keys(data[0]);
            console.log(keys);
        */
        let profile1 = data[0];
        // createRow(profile1);
        if (data instanceof Array) {
            data.map(createRow);
        } else {
            createRow(data);
        }

    }

    // add event Listeners to buttons get & add:
    $getUsersButton.addEventListener("click", getUsers);
    $addUserButton.addEventListener("click", addUser);
    
}

