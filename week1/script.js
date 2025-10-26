let ctr = 0;

function callback() {
    console.log(ctr);
    // update visible counter in the page if present
    const el = document.getElementById('counter');
    if (el) el.textContent = ctr;
    ctr++;
}

// schedule the callback every second (call setInterval once)
setInterval(callback, 1000);