

const handleEditBox = () => {
    // Set necessary variables


    editForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if(editBox.value){
            socket.emit('chat message', displayMessage);
            editBox.value = "";
        }

        return false;
    });
}

const handleChannelSelect = () => {
    const channelSelect = document.getElementById('channelSelect');

    channelSelect.addEventListener('change', () => {
        messages.innerHTML = '';
        socket.emit('room change', channelSelect.value);

        // Alt method:
        /*switch(channelSelect.value) {
            case 'memes':
                socket.off('general'); // turning off event listener
                socket.on('memes', displayMessage);
                break;
            default:
                socket.off('memes');
                socket.on('general', displayMessage);
                break;
        }*/
    });
}

const displayMessage = (msg) => {
    const messageDiv = document.createElement('div');
    messageDiv.innerText = msg;
}

const init = () => {
    handleEditBox();
    socket.on('chat message', displayMessage);
    handleChannelSelect();
};


window.onload = init;