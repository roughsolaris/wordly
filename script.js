const textInput =
    document.getElementById("textInput");

const wordCount =
    document.getElementById("wordCount");

const characterCount =
    document.getElementById("characterCount");

const characterNoSpaceCount =
    document.getElementById(
        "characterNoSpaceCount"
    );

const sentenceCount =
    document.getElementById("sentenceCount");

const paragraphCount =
    document.getElementById("paragraphCount");

const readingTime =
    document.getElementById("readingTime");

const speakingTime =
    document.getElementById("speakingTime");

const characterLimit =
    document.getElementById("characterLimit");

const progressText =
    document.getElementById("progressText");

const progressFill =
    document.getElementById("progressFill");

const copyButton =
    document.getElementById("copyButton");

const clearButton =
    document.getElementById("clearButton");

const downloadButton =
    document.getElementById("downloadButton");

const themeButton =
    document.getElementById("themeButton");

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toastMessage");

const year =
    document.getElementById("year");


const MAX_CHARACTERS = 10000;

const READING_SPEED = 200;

const SPEAKING_SPEED = 130;


function analyzeText() {

    const text =
        textInput.value;

    const trimmed =
        text.trim();


    const characters =
        text.length;


    const noSpaces =
        text.replace(/\s/g, "").length;


    let words = 0;

    if (trimmed) {

        words =
            trimmed
                .split(/\s+/)
                .filter(Boolean)
                .length;

    }


    let sentences = 0;

    if (trimmed) {

        const matches =
            trimmed.match(
                /[^.!?]+[.!?]+(?=\s|$)|[^.!?]+$/g
            );

        sentences =
            matches
                ? matches.length
                : 0;

    }


    let paragraphs = 0;

    if (trimmed) {

        paragraphs =
            trimmed
                .split(/\n\s*\n/)
                .filter(Boolean)
                .length;

    }


    const reading =
        words / READING_SPEED;

    const speaking =
        words / SPEAKING_SPEED;


    wordCount.textContent =
        words.toLocaleString();

    characterCount.textContent =
        characters.toLocaleString();

    characterNoSpaceCount.textContent =
        noSpaces.toLocaleString();

    sentenceCount.textContent =
        sentences.toLocaleString();

    paragraphCount.textContent =
        paragraphs.toLocaleString();

    readingTime.textContent =
        formatTime(reading);

    speakingTime.textContent =
        formatTime(speaking);


    characterLimit.textContent =
        `${characters.toLocaleString()} / ${MAX_CHARACTERS.toLocaleString()}`;


    const percentage =
        Math.min(
            characters / MAX_CHARACTERS * 100,
            100
        );


    progressFill.style.width =
        `${percentage}%`;

    progressText.textContent =
        `${Math.round(percentage)}%`;


    if (characters > MAX_CHARACTERS) {

        textInput.value =
            text.substring(
                0,
                MAX_CHARACTERS
            );

        analyzeText();

    }

}


function formatTime(minutes) {

    if (minutes === 0) {
        return "0 min";
    }

    if (minutes < 1) {

        return `${Math.ceil(
            minutes * 60
        )} sec`;

    }


    const mins =
        Math.floor(minutes);

    const seconds =
        Math.round(
            (minutes - mins) * 60
        );


    if (seconds === 0) {
        return `${mins} min`;
    }


    return `${mins}m ${seconds}s`;

}


textInput.addEventListener(
    "input",
    analyzeText
);


copyButton.addEventListener(
    "click",
    async () => {

        if (!textInput.value.trim()) {

            showToast(
                "Nothing to copy"
            );

            return;

        }


        try {

            await navigator.clipboard.writeText(
                textInput.value
            );

            showToast(
                "Text copied!"
            );

        } catch {

            textInput.select();

            document.execCommand("copy");

            showToast(
                "Text copied!"
            );

        }

    }
);


clearButton.addEventListener(
    "click",
    () => {

        textInput.value = "";

        analyzeText();

        textInput.focus();

        showToast(
            "Text cleared"
        );

    }
);


downloadButton.addEventListener(
    "click",
    () => {

        if (!textInput.value.trim()) {

            showToast(
                "Nothing to download"
            );

            return;

        }


        const blob =
            new Blob(
                [textInput.value],
                {
                    type: "text/plain"
                }
            );


        const url =
            URL.createObjectURL(blob);


        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            "wordly-text.txt";

        link.click();


        URL.revokeObjectURL(url);

        showToast(
            "Text downloaded!"
        );

    }
);


let toastTimer;

function showToast(message) {

    toastMessage.textContent =
        message;

    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2200
        );

}


let lightMode = false;

themeButton.addEventListener(
    "click",
    () => {

        lightMode =
            !lightMode;


        if (lightMode) {

            document.documentElement.style.setProperty(
                "--bg",
                "#f5f5f7"
            );

            document.documentElement.style.setProperty(
                "--bg-secondary",
                "#ffffff"
            );

            document.documentElement.style.setProperty(
                "--card",
                "rgba(255,255,255,0.85)"
            );

            document.documentElement.style.setProperty(
                "--text",
                "#111217"
            );

            document.documentElement.style.setProperty(
                "--muted",
                "#686d79"
            );

            document.documentElement.style.setProperty(
                "--muted-light",
                "#454956"
            );

            themeButton.textContent =
                "☾";

            showToast(
                "Light mode"
            );

        } else {

            document.documentElement.style.setProperty(
                "--bg",
                "#08090d"
            );

            document.documentElement.style.setProperty(
                "--bg-secondary",
                "#0d0f15"
            );

            document.documentElement.style.setProperty(
                "--card",
                "rgba(18,20,28,0.78)"
            );

            document.documentElement.style.setProperty(
                "--text",
                "#f5f7ff"
            );

            document.documentElement.style.setProperty(
                "--muted",
                "#858a9a"
            );

            document.documentElement.style.setProperty(
                "--muted-light",
                "#aeb3c2"
            );

            themeButton.textContent =
                "☼";

            showToast(
                "Dark mode"
            );

        }

    }
);


year.textContent =
    new Date().getFullYear();


analyzeText();