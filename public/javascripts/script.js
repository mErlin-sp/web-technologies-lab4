const socket = io();

$(document).ready(function () {
    $('#send').click(function () {
        console.log('send')
        let msg = $('#message')
        let name = $('#name')
        console.log('send msg: ' + msg.val() + ' name: ' + name.val())
        socket.emit('chat message', {'msg': msg.val(), 'name': name.val()});
        msg.val('');
    });
})

socket.on('chat message', function (message) {
    $('#messages').append(`
        <div class="row">
            <h1>${message.name}: ${message.msg}</h1>
        </div>
`);
});