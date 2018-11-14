var lastSize = {
    width: -1,
    height: -1,
    stickyTop: -1
};

var stickyBar = document.querySelector('.sticky-bar');

function checkSizes() {
    var newSize = getComputedSize();
    if (newSize && (lastSize.height !== newSize.height || lastSize.width !== newSize.width)) {
        lastSize = newSize;
        notifyParent('iframe-resize', newSize);
    }
}

function getComputedSize() {
    var rect = document.body.getBoundingClientRect();
    var stickyBarRect = stickyBar.getBoundingClientRect();
    return rect && stickyBarRect && {
        height: parseFloat(rect.height),
        width: parseFloat(rect.width),
        stickyTop: parseFloat(stickyBarRect.y)
    };
}

function notifyParent(action, payload) {
    window.parent.postMessage(JSON.stringify({
        action: action,
        payload: payload,
    }), '*');
}

function updateStickyBarContent() {
    var content = stickyBar.innerHTML;
    var counter = stickyBar.querySelector('span');
    counter.textContent = parseInt(counter.textContent) + 1;
    notifyParent('sticky-bar-update', {
        content: content
    });
}

checkSizes();
updateStickyBarContent();

// check for changes every 100 ms
window.setInterval(checkSizes, 100);
window.updateStickyBarContent = updateStickyBarContent;
