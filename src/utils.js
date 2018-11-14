export const registerMessageListeners = (actions) => {

    const onMessage = (ev) => {
        if (ev.type !== 'message') {
            return;
        }
        var msg = (typeof(ev.data) === 'string' ? JSON.parse(ev.data) : ev.data), action;
        action = actions[msg.action]; // select action from message
        if (typeof(action) === 'function') {
            action(msg.payload);
        }
    };

    if (window.addEventListener !== undefined) {
        window.addEventListener('message', onMessage);
    } else {
        window.attachEvent('onmessage', onMessage);
    }
};

export const notifyParentWindow = (action, payload) => {
    window.parent.postMessage(JSON.stringify({
        action: action,
        payload: payload,
    }), '*');
};





