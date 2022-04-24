const get_data = localStorage.getItem(`User`)
const parse_user_data = JSON.parse(get_data);
const username_db = parse_user_data.username;
const container_for_text = document.getElementById("container_for_txt");

container_for_text.innerHTML = `
    <label id="hi-user">
    Hi, ${username_db}. <br>Please choose room
    </label>
`

function update_user_data(room, way) {
    const list_rooms = ["cookroom", "bedroom", "bathroom", "livingroom"];

    const get_data = localStorage.getItem(`User`)
    const parse_user_data = JSON.parse(get_data);
    const obj_keys = Object.keys(parse_user_data)

    for(let i = 0; i != obj_keys.length; i++){
        if(obj_keys[i] === room) {
            console.log(false);

            parse_user_data[obj_keys[i]] = {room: "was-opened"}
            console.log(parse_user_data);

            const pushdata = localStorage.setItem(`User`, JSON.stringify(parse_user_data)); 
            window.location.href = way; 
        } else {
           console.log(false);
        }
    }
}
