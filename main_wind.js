class Check_user_data {
    constructor(login, password) {
        // User data
        this.login = login;
        this.password = password;

        // Check user data variables 
        this.reg_exp_uppercase_letters = /[A-Z]/;
        this.reg_exp_little_letters = /[a-z]/;
        this.reg_exp_numbers = /[0-9]/;
        this.reg_exp_format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        this.timeInMs = Date.now();

        // Modal error
        this.modal = document.getElementById("modal_for_Error");
        this.close_button_for_model = document.getElementsByClassName("close_modal_for_error-main")[0];
        this.txt_error = document.getElementById("text_error");
    }

    open_modal_window_for_error = (text, style_class) => {
        this.modal.style.display = "block";
        this.txt_error.className = style_class;
        this.txt_error.innerHTML = `<h1>${text}</h1>`
        this.close_button_for_model.onclick = () => {
            this.modal.style.display = "none";      
        }
        window.onclick = (e) => {
            if (e.target == this.modal) {
              this.modal.style.display = "none";
            }
        }
    };


    check_data(btn) {
        let result = [];

        if(this.login.value === '' || this.password.value === '') {            
            const txt_error = `Empty values are entered in one of the fields`;

            this.open_modal_window_for_error(txt_error, "null_values");
            result.push(false);
        } 
        else if(this.login.value.length < 8  || this.password.value.length < 8) {
            const txt_error = `The minimum length of the username and password\n is 8 characters.
            Please enter a valid value`;

            this.open_modal_window_for_error(txt_error, "min_length_values");
            result.push(false);
        }
        else if(!this.reg_exp_uppercase_letters.test(this.login.value) ||
            !this.reg_exp_little_letters.test(this.login.value) ||
            !this.reg_exp_numbers.test(this.login.value) ||
            !this.reg_exp_format.test(this.login.value) === false) // Check Username 
        {   
            const txt_error = `Username must be uppercase and lowercase letters, \n
            numbers and can't have special characters`
            this.open_modal_window_for_error(txt_error, "username_null");

            result.push(false);        
        } 
        else if(!this.reg_exp_uppercase_letters.test(this.password.value) ||
            !this.reg_exp_little_letters.test(this.password.value) ||
            !this.reg_exp_numbers.test(this.password.value) ||
            !this.reg_exp_format.test(this.password.value) === true) 
        {
            const txt_error = `Password must be uppercase and lowercase letters, \n
            numbers and have special characters`
            this.open_modal_window_for_error(txt_error, "username_null");
            result.push(false);
            
        }
        if(result[0] != false){
            if(btn === "Sign_in") {
                const btns = new Buttons(user_name, user_password);
                btns.sign_in()
            } else if(btn === "Register") {
                const btns = new Buttons(user_name, user_password);
                btns.register()
            } else if(btn === "Forgot_password") {
                const get_data = localStorage.getItem(`User`)
                const parse_user_data = JSON.parse(get_data);
                const username_db = parse_user_data.username;


                const btns = new Buttons(user_name, user_password);
                btns.forgot_password(username_db)
            }
        }
        
    }


}

class Buttons extends Check_user_data{
    constructor(login, password) {
        super()
        this.login = login;
        this.password = password;
    }

    sign_in() {
        const get_data = localStorage.getItem(`User`)
        const parse_user_data = JSON.parse(get_data);

        if(get_data === null){
            const txt_error = `No such user found. Check the entered values`
            this.open_modal_window_for_error(txt_error, "not_find_user");
        } else {

            const username_db = parse_user_data.username;
            const user_password_db = parse_user_data.password;

            if(username_db === this.login.value && user_password_db === this.password.value) {
                window.location.href = "./choose_room_window/choose_room.html";
            } else {
                const txt_error = `No such user found. Check the entered values`
                this.open_modal_window_for_error(txt_error, "not_find_user");
            }
        }
    } 

    register() {
        const get_data = localStorage.getItem(`User`)
        const parse_user_data = JSON.parse(get_data);
        
        if(get_data === null){
            const obj_for_push = {id: this.timeInMs, username: this.login.value, password: this.password.value, cookroom: '', bedroom: '', bathroom: '', livingroom: ''}

            const pushdata = localStorage.setItem(`User`, JSON.stringify(obj_for_push)); 
            window.location.href = "./choose_room_window/choose_room.html"; 
        } else if(get_data != null) {
            const username_db = parse_user_data.username;
            const user_password_db = parse_user_data.password;
            console.log(user_password_db);

            const update_data = confirm("You are already registered to update the data.");

            if (update_data) {
                const get_old_user_password = prompt("Enter your old password ");
                console.log(this.password.value);

                if(get_old_user_password === user_password_db) {
                    const obj_for_push = {id: this.timeInMs, username: this.login.value, password: this.password.value, cookroom: '', bedroom: '', bathroom: '', livingroom: ''}

                    const pushdata = localStorage.setItem(`User`, JSON.stringify(obj_for_push));
                    window.location.href = "./choose_room_window/choose_room.html"; 
                } else {
                    this.forgot_password(username_db)
                    }

                }
        }
    }

    forgot_password(username_db) {
        const password_is_not_valid = confirm("Passwords do not match");

        const forgot_password = confirm("Forgot password ?");
        
        if(forgot_password){
            const get_old_username = prompt("Enter your old username");

            if(get_old_username === username_db) {
                const obj_for_push = {id: this.timeInMs, username: this.login.value, password: this.password.value, cookroom: '', bedroom: '', bathroom: '', livingroom: ''}

                const pushdata = localStorage.setItem(`User`, JSON.stringify(obj_for_push));
                window.location.href = "./choose_room_window/choose_room.html"; 
            } else {
                const sorry_user = alert("Sorry, but that data isn`t correct . Please repeat enter")
            }
        }
    }
}

const user_name = document.getElementById("user_login");
const user_password = document.getElementById("user_password");

const sign_in_btn = document.getElementById("sign_in");
const register_btn = document.getElementById("register");
const forgot_password_btn = document.getElementById("forgot_password");

const check_user_data = new Check_user_data(user_name, user_password);
sign_in_btn.onclick = function() { check_user_data.check_data("Sign_in") };
register_btn.onclick = function() { check_user_data.check_data("Register") };
forgot_password_btn.onclick = function() { check_user_data.check_data("Forgot_password") };
