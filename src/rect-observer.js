export const observeRect = (element, property, callback) => {

    let lastValue = -1;

    const check = () => {
        const rect = element.getBoundingClientRect();
        const newValue = rect && rect[property];
        if (newValue && newValue !== lastValue) {
            lastValue = newValue;
            callback(newValue);
        }
    };

    window.setInterval(check, 100);

    check(); // run one check now
};