class Get_Data {
    constructor() {
        this.head_bedroom = document.getElementById("head-bedroom");
        this.form_go_to_sleep = document.getElementById("button-list-bedroom");
        this.container_for_button_bedroom = document.getElementById("container-for-button-bedroom");
        
        this.turn_light_btn = document.getElementById("turn-on-off-light");
        this.go_to_sleep_btn = document.getElementById("go-to-sleep");
        this.exit_btn = document.getElementById("exit");
    }
};

class Go_To_Sleep extends Get_Data {
    constructor() {
        super();
    }


    go_to_sleep = () => {
        this.head_bedroom.innerHTML += `
            <form class="form_go_to_sleep" id="form_go_to_sleep">
                <button class="btn_go_to_sleep" 
                type="button"
                onclick='go_to_sleep.get_up()'>Get Up</button>
            </form> 
        `
    };


    get_up = () => {
        const form_go_to_sleep_del = document.getElementById("form_go_to_sleep");
        form_go_to_sleep_del.remove()
    };
};

class Turn_Off_On_Light extends Get_Data {
    turn_on_light = () => {
        let text_event = this.turn_light_btn.textContent;
        console.log(text_event);

        if(text_event === "Turn off light"){
            this.head_bedroom.style.background = "black";
            this.form_go_to_sleep.style.backgroundColor = "black";
            this.container_for_button_bedroom.style.backgroundColor = "black";

            this.turn_light_btn.style.color = "white";
            this.turn_light_btn.style.background = "black"

            this.go_to_sleep_btn.style.background = "black";

            this.exit_btn.style.background = "black";

            this.turn_light_btn.innerHTML = "Turn on light"
        } else if (text_event === "Turn on light") {
            this.head_bedroom.style.background = "";
            this.form_go_to_sleep.style.backgroundColor = "white";
            this.container_for_button_bedroom.style.backgroundColor = "white";

            this.turn_light_btn.style.background = "white";
            this.turn_light_btn.style.color = "black";

            this.go_to_sleep_btn.style.background = "white";

            this.exit_btn.style.background = "white";

            this.turn_light_btn.innerHTML = "Turn off light"
        }

        
    }


};

const go_to_sleep = new Go_To_Sleep();
const turn_off_on_light = new Turn_Off_On_Light();

