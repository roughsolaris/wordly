/* =========================================
   WORDLY
   Main JavaScript
========================================= */

const textInput = document.getElementById("textInput");

const wordCount = document.getElementById("wordCount");
const characterCount = document.getElementById("characterCount");
const characterNoSpaceCount =
    document.getElementById("characterNoSpaceCount");

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

const themeButton =
    document.getElementById("themeButton");

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toastMessage");

const year =
    document.getElementById("year");


/* =========================================
   SETTINGS
========================================= */

const MAX_CHARACTERS = 10000;

const WORDS_PER_MINUTE_READING = 200;

const WORDS_PER_MINUTE_SPEAKING = 130;


/* =========================================
   COUNT TEXT
========================================= */

function analyzeText() {

    const text = textInput.value;

    const trimmedText = text.trim();


    /* Words */

    let words = 0;

    if (trimmedText.length > 0) {

        words = trimmedText
            .split(/\s+/)
            .filter(Boolean)
            .length;

    }


    /* Characters */

    const characters = text.length;


    /* Characters without spaces */

    const charactersWithoutSpaces =
        text.replace(/\s/g, "").length;


    /* Sentences */

    let sentences = 0;

    if (trimmedText.length > 0) {

        const sentenceMatches =
            trimmedText.match(
                /[^.!?]+[.!?]+(?=\s|$)|[^.!?]+$/g
            );

        sentences =
            sentenceMatches
                ? sentenceMatches.length
                : 0;

    }


    /* Paragraphs */

    let paragraphs = 0;

    if (trimmedText.length > 0) {

        paragraphs =
            trimmedText
                .split(/\n\s*\n/)
                .filter(Boolean)
                .length;

    }


    /* Reading time */

    const readingMinutes =
        words / WORDS_PER_MINUTE_READING;


    /* Speaking time */

    const speakingMinutes =
        words / WORDS_PER_MINUTE_SPEAKING;


    /* Update UI */

    wordCount.textContent =
        words.toLocaleString();

    characterCount.textContent =
        characters.toLocaleString();

    characterNoSpaceCount.textContent =
        charactersWithoutSpaces.toLocaleString();

    sentenceCount.textContent =
        sentences.toLocaleString();

    paragraphCount.textContent =
        paragraphs.toLocaleString();


    /* Time formatting */

    readingTime.textContent =
        formatTime(readingMinutes);

    speakingTime.textContent =
        formatTime(speakingMinutes);


    /* Character limit */

    characterLimit.textContent =
        `${characters.toLocaleString()} / ${MAX_CHARACTERS.toLocaleString()}`;


    /* Progress */

    const percentage =
        Math.min(
            (characters / MAX_CHARACTERS) * 100,
            100
        );

    progressFill.style.width =
        `${percentage}%`;

    progressText.textContent =
        `${Math.round(percentage)}%`;


    /* Character limit warning */

    if (characters >= MAX_CHARACTERS) {

        textInput.value =
            text.substring(0, MAX_CHARACTERS);

        showToast("Character limit reached");

        analyzeText();

    }

}


/* =========================================
   FORMAT TIME
========================================= */

function formatTime(minutes) {

    if (minutes === 0) {
        return "0 min";
    }

    if (minutes < 1) {

        const seconds =
            Math.ceil(minutes * 60);

        return `${seconds} sec`;

    }

    const wholeMinutes =
        Math.floor(minutes);

    const seconds =
        Math.round(
            (minutes - wholeMinutes) * 60
        );

    if (seconds === 0) {

        return `${wholeMinutes} min`;

    }

    return `${wholeMinutes}m ${seconds}s`;

}


/* =========================================
   TEXT INPUT
========================================= */

textInput.addEventListener(
    "input",
    analyzeText
);


/* =========================================
   COPY
========================================= */

copyButton.addEventListener(
    "click",
    async () => {

        const text =
            textInput.value;

        if (!text.trim()) {

            showToast("Nothing to copy");

            return;

        }

        try {

            await navigator.clipboard.writeText(text);

            showToast("Text copied!");

        } catch (error) {

            textInput.select();

            document.execCommand("copy");

            showToast("Text copied!");

        }

    }
);


/* =========================================
   CLEAR
========================================= */

clearButton.addEventListener(
    "click",
    () => {

        if (!textInput.value) {

            showToast("Already empty");

            return;

        }

        textInput.value = "";

        analyzeText();

        textInput.focus();

        showToast("Text cleared");

    }
);


/* =========================================
   TOAST
========================================= */

let toastTimer;

function showToast(message) {

    toastMessage.textContent =
        message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer =
        setTimeout(
            () => {
                toast.classList.remove("show");
            },
            2200
        );

}


/* =========================================
   THEME BUTTON
========================================= */

let lightMode = false;

themeButton.addEventListener(
    "click",
    () => {

        lightMode = !lightMode;

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

            themeButton.textContent = "☾";

            showToast("Light mode");

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

            themeButton.textContent = "☼";

            showToast("Dark mode");

        }

    }
);


/* =========================================
   YEAR
========================================= */

year.textContent =
    new Date().getFullYear();


/* =========================================
   INITIALIZE
========================================= */

analyzeText();