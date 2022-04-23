const user_name = document.getElementById("user_login");
const user_password = document.getElementById("user_password");
const sign_in_btn = document.getElementById("sign_in");
const register_btn = document.getElementById("register");


sign_in_btn.onclick = function() { check_user_data(user_name, user_password, "Sign_in") };
register_btn.onclick = function(){ check_user_data(user_name, user_password, "Register") };

function check_user_data (login, password, clicked_button) {
    const reg_exp_uppercase_letters = /[A-Z]/;
    const reg_exp_little_letters = /[a-z]/;
    const reg_exp_numbers = /[0-9]/;
    const reg_exp_format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    const timeInMs = Date.now();

    // Modal for error
    const modal = document.getElementById("modal_for_Error");
    const span = document.getElementsByClassName("close_modal_for_error")[0];
    const p = document.getElementById("text_error");
    
     
    function open_modal_window_for_error(text, style_class) {
        modal.style.display = "block";
        p.className = style_class;
        p.innerHTML = `<h1>${text}</h1>`
        span.onclick = function() {
            modal.style.display = "none";      
        }
        window.onclick = function(event) {
            if (event.target == modal) {
              modal.style.display = "none";
            }
        }
    };


    // Inputs can`t be null
    if(login.value === '' || password.value === '') {
        const txt_error = `Empty values are entered in one of the fields`;
        open_modal_window_for_error(txt_error, "null_values");
    } else if(login.value.length < 7  || password.value.length < 7) {
        const txt_error = `The minimum length of the username and password\n  is 7 characters.
        Please enter a valid value`;
        open_modal_window_for_error(txt_error, "min_length_values");
    }
    else {
        // Check Username 
        if(reg_exp_uppercase_letters.test(login.value) &&
            reg_exp_little_letters.test(login.value) &&
            reg_exp_numbers.test(login.value) &&
            reg_exp_format.test(login.value) === false){}
        else {
            const txt_error = `Username must be uppercase and lowercase letters, \n
            numbers and can't have special characters`
            open_modal_window_for_error(txt_error, "username_null");
        }

        // Check Password 
        if(reg_exp_uppercase_letters.test(password.value) &&
            reg_exp_little_letters.test(password.value) &&
            reg_exp_numbers.test(password.value) &&
            reg_exp_format.test(password.value) === true){}
        else {
            const txt_error = `Password must be uppercase and lowercase letters, \n
            numbers and have special characters`
            open_modal_window_for_error(txt_error, "username_null");
        }

        // Check clicked button
        if (clicked_button === "Sign_in") {
            const get_data = localStorage.getItem(`${login.value}`)
            const parse_user_data = JSON.parse(get_data);
            const username_db = parse_user_data.Username;
            const user_password_db = parse_user_data.Password;

            if(username_db === login.value && user_password_db === password.value) {
                window.location.href = "./choose_room_window/choose_room.html";
            } else {
                const txt_error = `No such user found. Check the entered values`
                open_modal_window_for_error(txt_error, "not_find_user");
            }
        } else if (clicked_button === "Register") {
            const get_data = localStorage.getItem(`${login.value}`)
            const parse_user_data = JSON.parse(get_data);
            
            if(get_data === null){
                const obj_for_push = {id: timeInMs, Username: login.value, Password: password.value}
                const pushdata = localStorage.setItem(`${login.value}`, JSON.stringify(obj_for_push)); 
                window.location.href = "./choose_room_window/choose_room.html"; 
            } else if(get_data != null) {
                const username_db = parse_user_data.Username;
                const user_password_db = parse_user_data.Password;
                
                if(login.value === username_db) {
                    const txt_error = `Such a user already exists. Please check the entered values`
                    open_modal_window_for_error(txt_error, "user_already_exists");
                } else if(login.value != username_db){
                    const obj_for_push = {id: timeInMs, Username: login.value, Password: password.value}
                    const pushdata = localStorage.setItem(`${login.value}`, JSON.stringify(obj_for_push));
                    window.location.href = "./choose_room_window/choose_room.html"; 
                }

            }
        }
        
    }
};