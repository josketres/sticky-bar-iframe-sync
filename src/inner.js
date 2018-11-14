import {observeRect} from "./rect-observer";
import {notifyParentWindow} from "./utils";

// observe body's height and notify the parent window about changes
observeRect(document.body, 'height', (height) => {
    notifyParentWindow('iframe-resize', {height});
});

// observe sticky-bar's top-offset and notify the parent window about changes
const stickyBar = document.querySelector('.sticky-bar');
observeRect(stickyBar, 'y', (y) => {
    notifyParentWindow('sticky-bar-offset', {y});
});

// notify the parent window about changes in the content of the sticky-bar
updateStickyBarContent();
window.updateStickyBarContent = updateStickyBarContent;

function updateStickyBarContent() {
    const content = stickyBar.innerHTML;
    const counter = stickyBar.querySelector('span');
    counter.textContent = parseInt(counter.textContent) + 1;
    notifyParentWindow('sticky-bar-update', {
        content: content
    });
}



