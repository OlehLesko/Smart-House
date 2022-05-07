class Get_Data {
    constructor() {
        this.head_bedroom = document.getElementById("head-bedroom");
    }
};

class Go_To_Sleep extends Get_Data {
    constructor() {
        super();
    }


    go_to_sleep = () => {
        const form =  `
        <form class="form_go_to_sleep" id="form_go_to_sleep">
            <button class="btn_go_to_sleep" 
            type="button"
            onclick='go_to_sleep.get_up()'>Get Up</button>
        </form> 
    `
        this.head_bedroom.innerHTML += form;
    };


    get_up = () => {
        const form_go_to_sleep_del = document.getElementById("form_go_to_sleep");
        this.head_bedroom.removeChild(form_go_to_sleep_del);
    };
};

class Turn_Off_On_Light extends Get_Data {
    constructor() {
        super()
    }

    turn_on_light = () => {
        const form_go_to_sleep = document.getElementById("button-list-bedroom");
        const container_for_button_bedroom = document.getElementById("container-for-button-bedroom");

        const turn_light_btn = document.getElementById("turn-on-off-light");
        const go_to_sleep_btn = document.getElementById("go-to-sleep");
        const exit_btn = document.getElementById("exit");

        let text_event = turn_light_btn.textContent;

        const turn_off_on = (
            txt_turn_light_btn, head_background, form_background_color, 
            container_background_color, turn_light_btn_color,
            turn_light_btn_background, go_to_sleep_btn_background, 
            exit_background ) => {
                turn_light_btn.innerHTML = txt_turn_light_btn
                this.head_bedroom.style.background = head_background;
                form_go_to_sleep.style.backgroundColor = form_background_color;
                container_for_button_bedroom.style.backgroundColor = 
                    container_background_color;
                
                turn_light_btn.style.color = turn_light_btn_color;
                turn_light_btn.style.background = turn_light_btn_background;

                go_to_sleep_btn.style.background = go_to_sleep_btn_background;

                exit_btn.style.background = exit_background;

        }

        if(text_event === "Turn off light"){
            turn_off_on("Turn on light", "black", "black", 
                "black", "white", "black", "black", "black")
        } else if (text_event === "Turn on light") {
            turn_off_on("Turn off light", null, "white", "white", "black",
             "white", "white", "white")        
        }

        
    }


};

const go_to_sleep = new Go_To_Sleep();
const turn_off_on_light = new Turn_Off_On_Light();