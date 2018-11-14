var actions = {
    resize: resize,
    'sticky-bar-update': stickyBarUpdate
};

var wrapper = document.querySelector('#iframe-wrapper');

var iframe = wrapper.querySelector('iframe');
var placeholder = wrapper.querySelector('.placeholder');
var stickyBar = wrapper.querySelector('.sticky-bar');

function resize(payload) {
    iframe.style.height = payload.height + 'px';
    placeholder.style.height = payload.stickyTop + 'px';
}

function stickyBarUpdate(payload) {
    stickyBar.innerHTML = payload.content;
}

function onMessage(ev) {
    if (ev.type !== 'message') {
        return;
    }
    if (typeof(ev.data) === 'string' && ev.data.indexOf('_FB_') === 0) {
        return;  // facebook also sends messages but they are not JSON
    }

    var msg = (typeof(ev.data) === 'string' ? JSON.parse(ev.data) : ev.data), action;
    action = actions[msg.action]; // select action from message
    if (typeof(action) === 'function') {
        action(msg.payload);
    }
}


if (window.addEventListener !== undefined) {
    window.addEventListener('message', onMessage);
} else {
    window.attachEvent('onmessage', onMessage);
}

