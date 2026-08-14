let darkmode = localStorage.getItem('darkmode')
let muted = localStorage.getItem('muted')

let any_spans_open = false;
const theme_switcher = document.getElementById('theme_switcher')
const mute_toggle = document.getElementById('mute_toggle')

function enableDarkmode() {
    document.body.classList.add('darkmode')
    localStorage.setItem('darkmode', 'active')
}

function disableDarkmode() {
    document.body.classList.remove('darkmode')
    localStorage.setItem('darkmode', null)
}

function mute() {
    document.body.classList.add('muted')
    localStorage.setItem('muted', 'active')
}

function unmute() {
    document.body.classList.remove('muted')
    localStorage.setItem('muted', null)
}

function showSpan(span) {

    if (any_spans_open) return;

    const span_to_change = document.getElementById(span)

    if (span_to_change.style.display === 'flex') return;

    span_to_change.classList.remove('hide_span')
    span_to_change.style.display = "flex"
    any_spans_open = true;


}

function hideSpan(span) {
    const span_to_change = document.getElementById(span)

    span_to_change.classList.add('hide_span')

    any_spans_open = false;

    span_to_change.addEventListener('animationend', () => {
        if (span_to_change.classList.contains('hide_span'))
            span_to_change.style.display = "none"
    })

}

const browser_dark_mode = window.matchMedia('(prefers-color-scheme: dark)').matches

if (darkmode === "active" || browser_dark_mode) enableDarkmode()
if (muted === "active") mute()


theme_switcher.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkmode')
    darkmode !== "active" ? enableDarkmode() : disableDarkmode()

    document.body.style.transition = "0.2s"
})

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    darkmode = localStorage.getItem('darkmode')
    event.matches ? enableDarkmode() : disableDarkmode()
})


mute_toggle.addEventListener("click", () => {
    muted = localStorage.getItem('muted')
    muted !== "active" ? mute() : unmute()
})