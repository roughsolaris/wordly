const textInput =
    document.getElementById("textInput");

const copyButton =
    document.getElementById("copyButton");

const clearButton =
    document.getElementById("clearButton");

const spacesButton =
    document.getElementById("spacesButton");

const linesButton =
    document.getElementById("linesButton");

const tabsButton =
    document.getElementById("tabsButton");

const allButton =
    document.getElementById("allButton");

const themeButton =
    document.getElementById("themeButton");

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toastMessage");

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


spacesButton.onclick = () => {

    textInput.value =
        textInput.value
        .replace(/[ ]{2,}/g, " ");

    showToast(
        "Extra spaces removed"
    );

};


linesButton.onclick = () => {

    textInput.value =
        textInput.value
        .replace(/\n\s*\n+/g, "\n");

    showToast(
        "Blank lines removed"
    );

};


tabsButton.onclick = () => {

    textInput.value =
        textInput.value
        .replace(/\t/g, " ");

    showToast(
        "Tabs removed"
    );

};


allButton.onclick = () => {

    let text =
        textInput.value;

    text =
        text.replace(
            /\t/g,
            " "
        );

    text =
        text.replace(
            /[ ]{2,}/g,
            " "
        );

    text =
        text.replace(
            /\n\s*\n+/g,
            "\n"
        );

    textInput.value =
        text.trim();

    showToast(
        "Text completely cleaned"
    );

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