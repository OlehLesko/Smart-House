class Get_Data {
    constructor() {
        this.head_livingroom = document.getElementById("head-livingroom");
    }
};

class Open_Close_Windows extends Get_Data {
    constructor() {
        super()
    }

    open = () => {
        this.head_livingroom.innerHTML += `
            <form class="form_for_open_windows" id="form_for_open_windows">
                <button class="btn_open_windows" 
                type="button"
                onclick="open_close_windows.close()">Close the\nwindows</button>
            </form> 
        `
    };


    close = () => {
        const form_windows = document.getElementById("form_for_open_windows");
        form_windows.remove()
    };


};

class Choose_channel extends Get_Data {
    constructor() {
        super();
    }

    open_or_close_list_channels = () => {
        const get_txt_btn_event = document.getElementById("open_close_channel");
        let text_event = get_txt_btn_event.textContent;

        if(text_event === "Turn on TV") {
            get_txt_btn_event.innerHTML = "Turn off TV";
            this.head_livingroom.innerHTML += `
                <form class="form_for_channel" id="form_for_channel">
                    <div class="choose_channel" id="choose_channel">
                        Choose channel
                    </div>
                    
                    <div class="container-channels" id="container-channels">
                        <ol class="channels">
                            <li><a href="https://www.stb.ua/ua/" target="_blank">
                            1 СТБ</a></li>

                            <li><a href="https://m.1plus1.ua/" target="_blank">
                            2 1+1</a></li>

                            <li><a href="https://novy.tv/ua/" target="_blank">
                            3 Новий канал</a></li>

                            <li><a href="https://ictv.ua/ua/" target="_blank">
                            4 ISTV</a></li>
                        </ol> 
                    </div>
                </form> 
            `
        } else if(text_event === "Turn off TV") {
            get_txt_btn_event.innerHTML = "Turn on TV";
            const form_channels = document.getElementById("form_for_channel");
            form_channels.remove()
        }
    };

};

const open_close_windows = new Open_Close_Windows();
const choose_channel = new Choose_channel();