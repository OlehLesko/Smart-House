class Get_Data {
    constructor() {
        this.head_bathroom = document.getElementById("head-bathroom");
    }
};

class Turn_Off_On_Shower extends Get_Data {
    constructor() {
        super()
    }

    turn_on_shower = () => {
        this.head_bathroom.innerHTML += `
            <form class="form_for_shower" id="form_for_shower">
                <div class="shower_is_working">
                    Shower is working
                </div>

                <button class="btn_shower" 
                type="button"
                onclick='turn_off_on_shower.turn_off_shower()'>Turn off</button>
            </form> 
        `
    };


    turn_off_shower = () => {
        const form_shower = document.getElementById("form_for_shower");
        form_shower.remove()
    };


};

const turn_off_on_shower = new Turn_Off_On_Shower();