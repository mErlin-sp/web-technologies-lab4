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
    let messages = $('#messages')
    let color = (messages.children().length % 2 === 0) ? 'blue' : 'yellow';
    messages.append(`
        <div class="row ${color}">
            <h1>${message.name}: ${message.msg}</h1>
        </div>
`);
});