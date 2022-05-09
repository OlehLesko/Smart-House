class Get_Data {
    constructor() {
        // Main div 
        this.head_cookroom = document.getElementById("head-cookroom");

        // Freezer      
        this.list_button = document.getElementById("container-for-button");

        // Audio
        this.audio_form = document.getElementById("form_for_audio");
        this.player = document.getElementById("player");
        this.now_playing = document.querySelector('.now-playing');
        this.track_art = document.querySelector('.track-art');
        this.track_name = document.querySelector('.track-name');
        this.track_artist = document.querySelector('.track-artist');

        this.playpause_btn = document.querySelector('.playpause-track');
        this.next_btn = document.querySelector('.next-track');
        this.prev_btn = document.querySelector('.prev-track');

        this.seek_slider = document.querySelector('.seek_slider');
        this.volume_slider = document.querySelector('.volume_slider');
        this.curr_time = document.querySelector('.current-time');
        this.total_duration = document.querySelector('.total-duration');
        this.wave = document.getElementById('wave');
        this.randomIcon = document.querySelector('.fa-random');
        this.curr_track = document.createElement('audio');
        this.track_index = 0;
        this.isPlaying = false;
        this.isRandom = false;
    }
};

// Audio script
const btn_turn_on_off_music = document.getElementById("turn-on-off-music");

let updateTimer;

const music_list = [
    // Alan Walker
    {
        img : '../../../images/audio/faded.png',
        name : 'Faded',
        artist : 'Alan Walker',
        music : '../music/Alan Walker - Faded.mp3',
        time: '03:32'
    },

    // Один в каное
    {
        img : '../../../images/audio/one_in_a_canoe.jpg',
        name: 'Човен',
        artist: 'Один в каное',
        music : '../music/Один В Каное - Човен.mp3',
        time: '02:44'
    },


    // Океан Ельзи 
    {
        img : '../../../images/audio/okean_elzy_autumn.jpg',
        name: 'Осінь',
        artist: 'Океан Ельзи',
        music : '../music/Океан Ельзи - Осінь.mp3',
        time: '04:36'
    },
    {
        img : '../../../images/audio/okean_elzy_city_of_mary.jpg',
        name: 'Місто Марії',
        artist: 'Океан Ельзи',
        music : '../music/Океан Ельзи - Місто Марії.mp3',
        time: '04:16'
    },
];


class Audio extends Get_Data {
    constructor() {
        super()
    }

    get_data_for_turn_fun () {
        let text_event = btn_turn_on_off_music.textContent;

        let audio_form = this.audio_form;
        let player = this.player;

        if(text_event === "Turn on music for cooking"){
            btn_turn_on_off_music.innerHTML = "Turn off music for cooking";
            audio_form.className = "new_form_for_audio";
            player.className = "new_player";
    
            console.log(`${text_event}`);
            this.loadTrack(this.track_index);
            
        } 
        if(text_event === "Turn off music for cooking") {
            btn_turn_on_off_music.innerHTML = "Turn on music for cooking";
            
            audio_form.className = "form_for_audio";
            player.className = "player";
            this.pauseTrack() 
            console.log(`${text_event}`);
              
        }
    
    }

    loadTrack(track_index) {
        clearInterval(updateTimer);
        this.reset();
    
        this.curr_track.src = music_list[track_index].music;
        this.curr_track.load();
    
        this.track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
        this.track_name.textContent = music_list[track_index].name;
        this.track_artist.textContent = music_list[track_index].artist;
        this.total_duration.textContent = music_list[track_index].time;
        this.now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;
    
        this.updateTimer = setInterval(this.setUpdate, 1000);
        this.playTrack()
    
        this.curr_track.addEventListener('ended', this.nextTrack);
        this.random_bg_audio_color()
    
    };

    random_bg_audio_color () {
        let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
        let a;

        function populate(a){
                for(let i=0; i<6; i++){
                    let x = Math.round(Math.random() * 14);
                    let y = hex[x];
                    a += y;
                }
                return a;
        }

        let Color1 = populate('#');
        let Color2 = populate('#');
        let angle = 'to right';

        let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
        this.audio_form.style.background = gradient;
    }

    reset () {
        this.curr_time.textContent = "00:00";
        this.total_duration.textContent = "00:00";
        this.seek_slider.value = 0;
    }
    
    randomTrack () {this.isRandom ? this.pauseRandom() : this.playRandom();}

    playRandom () {
        this.isRandom = true;
        this.randomIcon.classList.add('randomActive');
    }

    repeatTrack () {
        let current_index = this.track_index;
        this.loadTrack(current_index);
        this.playTrack();
    }
    
    playTrack(){
        this.curr_track.play();
        this.isPlaying = true;
        this.track_art.classList.add('rotate');
        this.wave.classList.add('loader');
        this.playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
    }
    
    playpauseTrack(){
        this.isPlaying ? this.pauseTrack() : this.playTrack();
    }

    pauseTrack () {
        this.curr_track.pause();
        this.isPlaying = false;
        this.track_art.classList.remove('rotate');
        this.wave.classList.remove('loader');
        this.playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
    }
    
    nextTrack ()  {
        if(this.track_index < music_list.length - 1 && this.isRandom === false){
            this.track_index += 1;
        }else if(this.track_index < music_list.length - 1 && this.isRandom === true){
            let random_index = Number.parseInt(Math.random() * music_list.length);
            this.track_index = random_index;
        }else{
            this.track_index = 0;
        }
        this.loadTrack(this.track_index);
        this.playTrack();
    }

    prevTrack () {
        if(this.track_index > 0){
            this.track_index -= 1;
        }else{
            this.track_index = music_list.length -1;
        }
        this.loadTrack(this.track_index);
        this.playTrack();
    }
    
    seekTo () {
        let seekto = this.curr_track.duration * (this.seek_slider.value / 100);
        this.curr_track.currentTime = seekto;
    }
    
    setVolume () {
        this.curr_track.volume = this.volume_slider.value / 100;
    }

    setUpdate = () => {
        let seekPosition = 0;
        let curr_track = this.curr_track.duration
        if(!isNaN(curr_track)){
            seekPosition = this.curr_track.currentTime * (100 / curr_track);
            this.seek_slider.value = seekPosition;
    
            let currentMinutes = Math.floor(this.curr_track.currentTime / 60);
            let currentSeconds = Math.floor(this.curr_track.currentTime - currentMinutes * 60);
    
            if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
            if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }

            this.curr_time.textContent = currentMinutes + ":" + currentSeconds;
        }
    }
};


class Freezer extends Get_Data {
    constructor() {
        super()
    }

    add_form = () => {
        this.head_cookroom.innerHTML += `
            <form class="form_for_information" id="form_for_information">
                <div class="freezer-has-open">
                    Freezer has open
                </div>
                    
                <button class="close_freezer" 
                type="button"
                onclick='freezer.close_form()'>Close freezer</button>
            </form> `
    }

    close_form () {
        const form_del = document.getElementById("form_for_information");
        form_del.remove()
    }
}


class Make_eats extends Freezer {
    constructor() {
        super();
    }

    add_form = (title) => {
        this.head_cookroom.innerHTML += `
            <form class="form_for_information" id="form_for_information">
                <div class="freezer-has-open" id="freezer-has-open">
                    ${title}
                </div>
                
                <div class="container-dishes" id="container-dishes">
                    <ol class="dishes">
                        <li onclick = 'make_eats.make_dish("Pasta", 7000)'>1 Pasta</li>
                        <li onclick = 'make_eats.make_dish("Pizza", 20000)'>2 Pizza</li>
                        <li onclick = 'make_eats.make_dish("Potato", 10000)'>3 Potato</li>
                        <li onclick = 'make_eats.make_dish("Coffee", 5000)'>4 Coffee</li>
                        <li onclick = 'make_eats.make_dish("Tea", 4000)'>5 Tea</li>
                    </ol> 
                </div>
    
                <button class="close_choose_dishes"
                type="button"
                    id="close_choose_dishes"
                    onclick='make_eats.close_form()'>Exit</button>
            </form> 
        `
    };

    make_dish = (dish, time) => {
        const arr_dishes = ["Pasta", "Pizza", "Potato", "Coffee", "Tea"];
        const arr_dishes_time = [7, 20, 10, 5, 4];

        const remove_title = document.getElementById("freezer-has-open");
        const remove_list_dishes = document.getElementById("container-dishes");
        const form_information = document.getElementById("form_for_information");

        remove_title.remove();
        remove_list_dishes.remove();
        

        form_information.innerHTML += `
                <div class="make_dish" id="make_dish">
                </div>            
        `

        const done_dish = (time_for_dish) => {
            const get_make_dish_value = document.getElementById("make_dish");
            setTimeout(
                () => get_make_dish_value.innerHTML = `
                    <p class="making_dish">${dish} maked</p>
                `, time_for_dish);
        };

        for(let i = 0; i != arr_dishes.length; i++) {
            if(dish === arr_dishes[i]) {
                const get_make_dish_val = document.getElementById("make_dish");
                get_make_dish_val.innerHTML = `
                    <p class="making_dish">${dish} will done on ${arr_dishes_time[i]} seconds</p>
                `

                done_dish(time);
                break;
            } 
        }
    }
};

const freezer = new Freezer();
const make_eats = new Make_eats();
const audio = new Audio();