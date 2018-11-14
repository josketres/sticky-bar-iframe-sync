import {registerMessageListeners} from "./utils";

const wrapper = document.querySelector('#iframe-wrapper');
const iframe = wrapper.querySelector('iframe');
const placeholder = wrapper.querySelector('.placeholder');
const stickyBar = wrapper.querySelector('.sticky-bar');

function resizeIframe(payload) {
    iframe.style.height = payload.height + 'px';
    placeholder.style.height = payload.stickyTop + 'px';
}

function stickyBarUpdate(payload) {
    stickyBar.innerHTML = payload.content;
}

registerMessageListeners({
    'iframe-resize': resizeIframe,
    'sticky-bar-update': stickyBarUpdate
});


