const textInput =
    document.getElementById("textInput");

const copyButton =
    document.getElementById("copyButton");

const clearButton =
    document.getElementById("clearButton");

const upperButton =
    document.getElementById("upperButton");

const lowerButton =
    document.getElementById("lowerButton");

const titleButton =
    document.getElementById("titleButton");

const sentenceButton =
    document.getElementById("sentenceButton");

const alternatingButton =
    document.getElementById(
        "alternatingButton"
    );

const themeButton =
    document.getElementById("themeButton");

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById(
        "toastMessage"
    );

const year =
    document.getElementById("year");


function showToast(message) {

    toastMessage.textContent =
        message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2000);

}


upperButton.onclick = () => {

    textInput.value =
        textInput.value.toUpperCase();

};


lowerButton.onclick = () => {

    textInput.value =
        textInput.value.toLowerCase();

};


titleButton.onclick = () => {

    textInput.value =
        textInput.value
        .toLowerCase()
        .replace(
            /\b\w/g,
            letter =>
                letter.toUpperCase()
        );

};


sentenceButton.onclick = () => {

    textInput.value =
        textInput.value
        .toLowerCase()
        .replace(
            /(^\s*\w|[.!?]\s+\w)/g,
            match =>
                match.toUpperCase()
        );

};


alternatingButton.onclick = () => {

    let result = "";

    let upper = true;

    for (
        const character
        of textInput.value
    ) {

        if (/[a-z]/i.test(character)) {

            result += upper
                ? character.toUpperCase()
                : character.toLowerCase();

            upper = !upper;

        } else {

            result += character;

        }

    }

    textInput.value = result;

};


copyButton.onclick = async () => {

    if (!textInput.value.trim()) {

        showToast(
            "Nothing to copy"
        );

        return;

    }

    await navigator.clipboard.writeText(
        textInput.value
    );

    showToast(
        "Text copied!"
    );

};


clearButton.onclick = () => {

    textInput.value = "";

    textInput.focus();

    showToast(
        "Text cleared"
    );

};


let lightMode = false;

themeButton.onclick = () => {

    lightMode =
        !lightMode;

    if (lightMode) {

        document.documentElement.style.setProperty(
            "--bg",
            "#f5f5f7"
        );

        document.documentElement.style.setProperty(
            "--text",
            "#111217"
        );

        document.documentElement.style.setProperty(
            "--muted",
            "#686d79"
        );

        themeButton.textContent =
            "☾";

    } else {

        document.documentElement.style.setProperty(
            "--bg",
            "#08090d"
        );

        document.documentElement.style.setProperty(
            "--text",
            "#f5f7ff"
        );

        document.documentElement.style.setProperty(
            "--muted",
            "#858a9a"
        );

        themeButton.textContent =
            "☼";

    }

};


year.textContent =
    new Date().getFullYear();