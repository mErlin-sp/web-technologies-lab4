const express = require('express');
const {createServer} = require('node:http');
const {Server} = require('socket.io');

const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const debug = require("debug");

const app = express();
const server = createServer(app);
const io = new Server(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(require('express').json());
app.use(require('express').urlencoded({extended: false}));
app.use(cookieParser());
app.use(require('express').static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat message', (message) => {
        console.log('chat msg: ' + message);
        io.emit('chat message', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

const port = process.env.PORT || 3001;
app.set('port', port);

server.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
});

server.on('error', onError);
server.on('listening', onListening);

module.exports = app;
