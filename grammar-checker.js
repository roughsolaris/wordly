const grammarInput = document.getElementById("grammarInput");
const checkGrammar = document.getElementById("checkGrammar");
const clearText = document.getElementById("clearText");

const wordCount = document.getElementById("wordCount");
const characterCount = document.getElementById("characterCount");

const resultsSection = document.getElementById("resultsSection");
const issuesList = document.getElementById("issuesList");
const issueSummary = document.getElementById("issueSummary");

const fixAll = document.getElementById("fixAll");

const correctedArea = document.getElementById("correctedArea");
const correctedText = document.getElementById("correctedText");

const copyCorrected = document.getElementById("copyCorrected");


let detectedIssues = [];


// ================================
// TEXT STATISTICS
// ================================

function updateStats() {

    const text = grammarInput.value.trim();

    const words = text
        ? text.split(/\s+/).length
        : 0;

    wordCount.textContent = words;

    characterCount.textContent = grammarInput.value.length;
}


grammarInput.addEventListener("input", updateStats);


// ================================
// GRAMMAR RULES
// ================================

const grammarRules = [

    // =========================================
    // SUBJECT / VERB AGREEMENT
    // =========================================

    {
        pattern: /\bI\s+has\b/gi,
        replacement: "I have",
        explanation: '"I" takes "have", not "has".',
        type: "Grammar"
    },

    {
        pattern: /\bI\s+is\b/gi,
        replacement: "I am",
        explanation: '"I" takes "am", not "is".',
        type: "Grammar"
    },

    {
        pattern: /\bI\s+are\b/gi,
        replacement: "I am",
        explanation: '"I" takes "am", not "are".',
        type: "Grammar"
    },

    {
        pattern: /\bI\s+was\b/gi,
        replacement: "I was",
        explanation: 'This form is correct.',
        type: "Grammar",
        ignore: true
    },

    {
        pattern: /\bhe\s+have\b/gi,
        replacement: "he has",
        explanation: '"He" takes "has".',
        type: "Grammar"
    },

    {
        pattern: /\bshe\s+have\b/gi,
        replacement: "she has",
        explanation: '"She" takes "has".',
        type: "Grammar"
    },

    {
        pattern: /\bit\s+have\b/gi,
        replacement: "it has",
        explanation: '"It" takes "has".',
        type: "Grammar"
    },

    {
        pattern: /\bthey\s+has\b/gi,
        replacement: "they have",
        explanation: '"They" takes "have".',
        type: "Grammar"
    },

    {
        pattern: /\bwe\s+has\b/gi,
        replacement: "we have",
        explanation: '"We" takes "have".',
        type: "Grammar"
    },

    {
        pattern: /\byou\s+has\b/gi,
        replacement: "you have",
        explanation: '"You" takes "have".',
        type: "Grammar"
    },

    {
        pattern: /\bhe\s+are\b/gi,
        replacement: "he is",
        explanation: '"He" takes "is".',
        type: "Grammar"
    },

    {
        pattern: /\bshe\s+are\b/gi,
        replacement: "she is",
        explanation: '"She" takes "is".',
        type: "Grammar"
    },

    {
        pattern: /\bit\s+are\b/gi,
        replacement: "it is",
        explanation: '"It" takes "is".',
        type: "Grammar"
    },

    {
        pattern: /\bthey\s+is\b/gi,
        replacement: "they are",
        explanation: '"They" takes "are".',
        type: "Grammar"
    },

    {
        pattern: /\bwe\s+is\b/gi,
        replacement: "we are",
        explanation: '"We" takes "are".',
        type: "Grammar"
    },

    {
        pattern: /\byou\s+is\b/gi,
        replacement: "you are",
        explanation: '"You" takes "are".',
        type: "Grammar"
    },

    {
        pattern: /\bthey\s+was\b/gi,
        replacement: "they were",
        explanation: '"They" takes "were".',
        type: "Grammar"
    },

    {
        pattern: /\bwe\s+was\b/gi,
        replacement: "we were",
        explanation: '"We" takes "were".',
        type: "Grammar"
    },

    {
        pattern: /\byou\s+was\b/gi,
        replacement: "you were",
        explanation: '"You" takes "were".',
        type: "Grammar"
    },

    // =========================================
    // THIRD PERSON VERBS
    // =========================================

    {
        pattern: /\bhe\s+go\b/gi,
        replacement: "he goes",
        explanation: '"He" normally takes the third-person singular form.',
        type: "Grammar"
    },

    {
        pattern: /\bshe\s+go\b/gi,
        replacement: "she goes",
        explanation: '"She" normally takes the third-person singular form.',
        type: "Grammar"
    },

    {
        pattern: /\bit\s+go\b/gi,
        replacement: "it goes",
        explanation: '"It" normally takes the third-person singular form.',
        type: "Grammar"
    },

    {
        pattern: /\bhe\s+do\b/gi,
        replacement: "he does",
        explanation: '"He" takes "does".',
        type: "Grammar"
    },

    {
        pattern: /\bshe\s+do\b/gi,
        replacement: "she does",
        explanation: '"She" takes "does".',
        type: "Grammar"
    },

    {
        pattern: /\bit\s+do\b/gi,
        replacement: "it does",
        explanation: '"It" takes "does".',
        type: "Grammar"
    },

    {
        pattern: /\bhe\s+watch\b/gi,
        replacement: "he watches",
        explanation: '"He" normally takes "watches".',
        type: "Grammar"
    },

    {
        pattern: /\bshe\s+watch\b/gi,
        replacement: "she watches",
        explanation: '"She" normally takes "watches".',
        type: "Grammar"
    },

    {
        pattern: /\bhe\s+like\b/gi,
        replacement: "he likes",
        explanation: '"He" normally takes "likes".',
        type: "Grammar"
    },

    {
        pattern: /\bshe\s+like\b/gi,
        replacement: "she likes",
        explanation: '"She" normally takes "likes".',
        type: "Grammar"
    },

    {
        pattern: /\bhe\s+want\b/gi,
        replacement: "he wants",
        explanation: '"He" normally takes "wants".',
        type: "Grammar"
    },

    {
        pattern: /\bshe\s+want\b/gi,
        replacement: "she wants",
        explanation: '"She" normally takes "wants".',
        type: "Grammar"
    },

    {
        pattern: /\bhe\s+need\b/gi,
        replacement: "he needs",
        explanation: '"He" normally takes "needs".',
        type: "Grammar"
    },

    {
        pattern: /\bshe\s+need\b/gi,
        replacement: "she needs",
        explanation: '"She" normally takes "needs".',
        type: "Grammar"
    },

    // =========================================
    // COMMON MODAL ERRORS
    // =========================================

    {
        pattern: /\bshould\s+of\b/gi,
        replacement: "should have",
        explanation: 'The correct expression is "should have".',
        type: "Grammar"
    },

    {
        pattern: /\bcould\s+of\b/gi,
        replacement: "could have",
        explanation: 'The correct expression is "could have".',
        type: "Grammar"
    },

    {
        pattern: /\bwould\s+of\b/gi,
        replacement: "would have",
        explanation: 'The correct expression is "would have".',
        type: "Grammar"
    },

    {
        pattern: /\bmust\s+of\b/gi,
        replacement: "must have",
        explanation: 'The correct expression is "must have".',
        type: "Grammar"
    },

    {
        pattern: /\bcan\s+be\s+able\s+to\b/gi,
        replacement: "can",
        explanation: '"Can be able to" is usually unnecessarily redundant.',
        type: "Style"
    },

    // =========================================
    // COMMON CONTRACTIONS
    // =========================================

    {
        pattern: /\bdont\b/gi,
        replacement: "don't",
        explanation: 'The standard spelling is "don\'t".',
        type: "Spelling"
    },

    {
        pattern: /\bdoesnt\b/gi,
        replacement: "doesn't",
        explanation: 'The standard spelling is "doesn\'t".',
        type: "Spelling"
    },

    {
        pattern: /\bcant\b/gi,
        replacement: "can't",
        explanation: 'The standard spelling is "can\'t".',
        type: "Spelling"
    },

    {
        pattern: /\bwont\b/gi,
        replacement: "won't",
        explanation: 'The standard spelling is "won\'t".',
        type: "Spelling"
    },

    {
        pattern: /\bisnt\b/gi,
        replacement: "isn't",
        explanation: 'The standard spelling is "isn\'t".',
        type: "Spelling"
    },

    {
        pattern: /\barent\b/gi,
        replacement: "aren't",
        explanation: 'The standard spelling is "aren\'t".',
        type: "Spelling"
    },

    {
        pattern: /\bwasnt\b/gi,
        replacement: "wasn't",
        explanation: 'The standard spelling is "wasn\'t".',
        type: "Spelling"
    },

    {
        pattern: /\bwerent\b/gi,
        replacement: "weren't",
        explanation: 'The standard spelling is "weren\'t".',
        type: "Spelling"
    },

    {
        pattern: /\bhasnt\b/gi,
        replacement: "hasn't",
        explanation: 'The standard spelling is "hasn\'t".',
        type: "Spelling"
    },

    {
        pattern: /\bhavent\b/gi,
        replacement: "haven't",
        explanation: 'The standard spelling is "haven\'t".',
        type: "Spelling"
    },

    {
        pattern: /\bhadnt\b/gi,
        replacement: "hadn't",
        explanation: 'The standard spelling is "hadn\'t".',
        type: "Spelling"
    },

    {
        pattern: /\bshouldnt\b/gi,
        replacement: "shouldn't",
        explanation: 'The standard spelling is "shouldn\'t".',
        type: "Spelling"
    },

    {
        pattern: /\bcouldnt\b/gi,
        replacement: "couldn't",
        explanation: 'The standard spelling is "couldn\'t".',
        type: "Spelling"
    },

    {
        pattern: /\bwouldnt\b/gi,
        replacement: "wouldn't",
        explanation: 'The standard spelling is "wouldn\'t".',
        type: "Spelling"
    },

    {
        pattern: /\bim\b/gi,
        replacement: "I'm",
        explanation: 'The standard contraction is "I\'m".',
        type: "Spelling"
    },

    {
        pattern: /\bive\b/gi,
        replacement: "I've",
        explanation: 'The standard contraction is "I\'ve".',
        type: "Spelling"
    },

    {
        pattern: /\bid\b/gi,
        replacement: "I'd",
        explanation: 'The standard contraction is "I\'d".',
        type: "Spelling"
    },

    {
        pattern: /\bill\b/gi,
        replacement: "I'll",
        explanation: 'The standard contraction is "I\'ll".',
        type: "Spelling"
    },

    // =========================================
    // ARTICLES
    // =========================================

    {
        pattern: /\ba\s+apple\b/gi,
        replacement: "an apple",
        explanation: 'Use "an" before a vowel sound.',
        type: "Grammar"
    },

    {
        pattern: /\ba\s+orange\b/gi,
        replacement: "an orange",
        explanation: 'Use "an" before a vowel sound.',
        type: "Grammar"
    },

    {
        pattern: /\ba\s+elephant\b/gi,
        replacement: "an elephant",
        explanation: 'Use "an" before a vowel sound.',
        type: "Grammar"
    },

    {
        pattern: /\ba\s+umbrella\b/gi,
        replacement: "an umbrella",
        explanation: 'Use "an" before a vowel sound.',
        type: "Grammar"
    },

    {
        pattern: /\ba\s+hour\b/gi,
        replacement: "an hour",
        explanation: '"Hour" begins with a vowel sound.',
        type: "Grammar"
    },

    {
        pattern: /\ban\s+university\b/gi,
        replacement: "a university",
        explanation: '"University" begins with a consonant sound.',
        type: "Grammar"
    },

    {
        pattern: /\ban\s+unique\b/gi,
        replacement: "a unique",
        explanation: '"Unique" begins with a consonant sound.',
        type: "Grammar"
    },

    // =========================================
    // PRONOUN / PREPOSITION
    // =========================================

    {
        pattern: /\bbetween\s+you\s+and\s+I\b/gi,
        replacement: "between you and me",
        explanation: 'After "between", use the object pronoun "me".',
        type: "Grammar"
    },

    {
        pattern: /\baccording\s+to\s+me\s+I\s+think\b/gi,
        replacement: "I think",
        explanation: 'This phrase is unnecessarily repetitive.',
        type: "Style"
    },

    // =========================================
    // COMMON WORD CONFUSIONS
    // =========================================

    {
        pattern: /\btheir\s+is\b/gi,
        replacement: "there is",
        explanation: '"There is" is used to describe something that exists.',
        type: "Grammar"
    },

    {
        pattern: /\btheir\s+are\b/gi,
        replacement: "there are",
        explanation: '"There are" is used with plural nouns.',
        type: "Grammar"
    },

    {
        pattern: /\byour\s+welcome\b/gi,
        replacement: "you're welcome",
        explanation: '"You\'re" means "you are".',
        type: "Grammar"
    },

    {
        pattern: /\byour\s+right\b/gi,
        replacement: "you're right",
        explanation: '"You\'re" means "you are".',
        type: "Grammar"
    },

    {
        pattern: /\byour\s+wrong\b/gi,
        replacement: "you're wrong",
        explanation: '"You\'re" means "you are".',
        type: "Grammar"
    },

    {
        pattern: /\bits\s+a\s+good\b/gi,
        replacement: "it's a good",
        explanation: '"It\'s" means "it is".',
        type: "Grammar"
    },

    // =========================================
    // DOUBLE COMPARATIVES
    // =========================================

    {
        pattern: /\bmore\s+better\b/gi,
        replacement: "better",
        explanation: 'Do not use "more" with "better".',
        type: "Grammar"
    },

    {
        pattern: /\bmost\s+best\b/gi,
        replacement: "best",
        explanation: 'Do not use "most" with "best".',
        type: "Grammar"
    },

    {
        pattern: /\bmore\s+easier\b/gi,
        replacement: "easier",
        explanation: 'Do not use "more" with "easier".',
        type: "Grammar"
    },

    {
        pattern: /\bmore\s+harder\b/gi,
        replacement: "harder",
        explanation: 'Do not use "more" with "harder".',
        type: "Grammar"
    },

    {
        pattern: /\bmore\s+faster\b/gi,
        replacement: "faster",
        explanation: 'Do not use "more" with "faster".',
        type: "Grammar"
    },

    {
        pattern: /\bmore\s+slower\b/gi,
        replacement: "slower",
        explanation: 'Do not use "more" with "slower".',
        type: "Grammar"
    },

    {
        pattern: /\bmore\s+smaller\b/gi,
        replacement: "smaller",
        explanation: 'Do not use "more" with "smaller".',
        type: "Grammar"
    },

    {
        pattern: /\bmore\s+bigger\b/gi,
        replacement: "bigger",
        explanation: 'Do not use "more" with "bigger".',
        type: "Grammar"
    },

    // =========================================
    // COMMON SPELLING ERRORS
    // =========================================

    {
        pattern: /\balot\b/gi,
        replacement: "a lot",
        explanation: '"A lot" is written as two words.',
        type: "Spelling"
    },

    {
        pattern: /\bdefinately\b/gi,
        replacement: "definitely",
        explanation: 'The correct spelling is "definitely".',
        type: "Spelling"
    },

    {
        pattern: /\bseperate\b/gi,
        replacement: "separate",
        explanation: 'The correct spelling is "separate".',
        type: "Spelling"
    },

    {
        pattern: /\brecieve\b/gi,
        replacement: "receive",
        explanation: 'The correct spelling is "receive".',
        type: "Spelling"
    },

    {
        pattern: /\boccured\b/gi,
        replacement: "occurred",
        explanation: 'The correct spelling is "occurred".',
        type: "Spelling"
    },

    {
        pattern: /\boccurence\b/gi,
        replacement: "occurrence",
        explanation: 'The correct spelling is "occurrence".',
        type: "Spelling"
    },

    {
        pattern: /\benviroment\b/gi,
        replacement: "environment",
        explanation: 'The correct spelling is "environment".',
        type: "Spelling"
    },

    {
        pattern: /\bwich\b/gi,
        replacement: "which",
        explanation: 'The correct spelling is "which".',
        type: "Spelling"
    },

    {
        pattern: /\bbecouse\b/gi,
        replacement: "because",
        explanation: 'The correct spelling is "because".',
        type: "Spelling"
    },

    {
        pattern: /\bthier\b/gi,
        replacement: "their",
        explanation: 'The correct spelling is "their".',
        type: "Spelling"
    },

    {
        pattern: /\bteh\b/gi,
        replacement: "the",
        explanation: 'The correct spelling is "the".',
        type: "Spelling"
    },

    {
        pattern: /\breccomend\b/gi,
        replacement: "recommend",
        explanation: 'The correct spelling is "recommend".',
        type: "Spelling"
    },

    {
        pattern: /\brecomend\b/gi,
        replacement: "recommend",
        explanation: 'The correct spelling is "recommend".',
        type: "Spelling"
    },

    {
        pattern: /\buntill\b/gi,
        replacement: "until",
        explanation: 'The correct spelling is "until".',
        type: "Spelling"
    },

    {
        pattern: /\btommorow\b/gi,
        replacement: "tomorrow",
        explanation: 'The correct spelling is "tomorrow".',
        type: "Spelling"
    },

    {
        pattern: /\byesturday\b/gi,
        replacement: "yesterday",
        explanation: 'The correct spelling is "yesterday".',
        type: "Spelling"
    },

    {
        pattern: /\bbeleive\b/gi,
        replacement: "believe",
        explanation: 'The correct spelling is "believe".',
        type: "Spelling"
    },

    {
        pattern: /\bfreind\b/gi,
        replacement: "friend",
        explanation: 'The correct spelling is "friend".',
        type: "Spelling"
    },

    {
        pattern: /\bwierd\b/gi,
        replacement: "weird",
        explanation: 'The correct spelling is "weird".',
        type: "Spelling"
    },

    {
        pattern: /\btruely\b/gi,
        replacement: "truly",
        explanation: 'The correct spelling is "truly".',
        type: "Spelling"
    },

    {
        pattern: /\bpriviledge\b/gi,
        replacement: "privilege",
        explanation: 'The correct spelling is "privilege".',
        type: "Spelling"
    },

    {
        pattern: /\bpublically\b/gi,
        replacement: "publicly",
        explanation: 'The standard spelling is "publicly".',
        type: "Spelling"
    },

    {
        pattern: /\bcalender\b/gi,
        replacement: "calendar",
        explanation: 'The correct spelling is "calendar".',
        type: "Spelling"
    },

    {
        pattern: /\bgrammer\b/gi,
        replacement: "grammar",
        explanation: 'The correct spelling is "grammar".',
        type: "Spelling"
    },

    {
        pattern: /\boccassion\b/gi,
        replacement: "occasion",
        explanation: 'The correct spelling is "occasion".',
        type: "Spelling"
    },

    {
        pattern: /\bmaintainance\b/gi,
        replacement: "maintenance",
        explanation: 'The correct spelling is "maintenance".',
        type: "Spelling"
    },

    {
        pattern: /\bneccessary\b/gi,
        replacement: "necessary",
        explanation: 'The correct spelling is "necessary".',
        type: "Spelling"
    },

    {
        pattern: /\bexistance\b/gi,
        replacement: "existence",
        explanation: 'The correct spelling is "existence".',
        type: "Spelling"
    },

    {
        pattern: /\bknowlege\b/gi,
        replacement: "knowledge",
        explanation: 'The correct spelling is "knowledge".',
        type: "Spelling"
    },

    {
        pattern: /\barguement\b/gi,
        replacement: "argument",
        explanation: 'The correct spelling is "argument".',
        type: "Spelling"
    },

    {
        pattern: /\bconcious\b/gi,
        replacement: "conscious",
        explanation: 'The correct spelling is "conscious".',
        type: "Spelling"
    },

    {
        pattern: /\bsuccesful\b/gi,
        replacement: "successful",
        explanation: 'The correct spelling is "successful".',
        type: "Spelling"
    },

    {
        pattern: /\bsucessful\b/gi,
        replacement: "successful",
        explanation: 'The correct spelling is "successful".',
        type: "Spelling"
    },

    {
        pattern: /\bbegining\b/gi,
        replacement: "beginning",
        explanation: 'The correct spelling is "beginning".',
        type: "Spelling"
    },

    {
        pattern: /\bfinaly\b/gi,
        replacement: "finally",
        explanation: 'The correct spelling is "finally".',
        type: "Spelling"
    },

    {
        pattern: /\bdefinate\b/gi,
        replacement: "definite",
        explanation: 'The correct spelling is "definite".',
        type: "Spelling"
    },

    {
        pattern: /\bseperately\b/gi,
        replacement: "separately",
        explanation: 'The correct spelling is "separately".',
        type: "Spelling"
    },

    {
        pattern: /\brecieved\b/gi,
        replacement: "received",
        explanation: 'The correct spelling is "received".',
        type: "Spelling"
    },

    {
        pattern: /\bacheive\b/gi,
        replacement: "achieve",
        explanation: 'The correct spelling is "achieve".',
        type: "Spelling"
    },

    {
        pattern: /\bacheived\b/gi,
        replacement: "achieved",
        explanation: 'The correct spelling is "achieved".',
        type: "Spelling"
    },

    // =========================================
    // COMMON WORDING / STYLE
    // =========================================

    {
        pattern: /\bvery\s+unique\b/gi,
        replacement: "unique",
        explanation: '"Unique" is generally treated as an absolute adjective.',
        type: "Style"
    },

    {
        pattern: /\brevert\s+back\b/gi,
        replacement: "revert",
        explanation: '"Revert" already means to return to a previous state.',
        type: "Style"
    },

    {
        pattern: /\breturn\s+back\b/gi,
        replacement: "return",
        explanation: '"Return" already expresses the idea of going back.',
        type: "Style"
    },

    {
        pattern: /\brepeat\s+again\b/gi,
        replacement: "repeat",
        explanation: '"Repeat" already means to do again.',
        type: "Style"
    },

    {
        pattern: /\bfree\s+gift\b/gi,
        replacement: "gift",
        explanation: 'A gift is already something given freely.',
        type: "Style"
    },

    {
        pattern: /\bpast\s+history\b/gi,
        replacement: "history",
        explanation: 'History already refers to the past.',
        type: "Style"
    },

    {
        pattern: /\bfuture\s+plans\b/gi,
        replacement: "plans",
        explanation: 'Plans generally refer to future intentions.',
        type: "Style"
    }


    
];

updateStats();

// ================================
// PUNCTUATION & CAPITALIZATION CHECK
// ================================

function checkPunctuationAndCapitalization(text) {

    const issues = [];

    // --------------------------------
    // Lowercase "i"
    // --------------------------------

    const lowercaseI = text.match(/\bi\b/g);

    if (lowercaseI) {

        lowercaseI.forEach(() => {

            issues.push({
                original: "i",
                replacement: "I",
                explanation: 'The pronoun "I" should always be capitalized.',
                type: "Capitalization"
            });

        });

    }


    // --------------------------------
    // Space before punctuation
    // --------------------------------

    const spaceBeforePunctuation =
        text.match(/\s+[,.!?;:]/g);

    if (spaceBeforePunctuation) {

        spaceBeforePunctuation.forEach(match => {

            issues.push({
                original: match,
                replacement: match.trim(),
                explanation: "There should not be a space before punctuation.",
                type: "Punctuation"
            });

        });

    }


    // --------------------------------
    // Missing space after punctuation
    // --------------------------------

    const missingSpace =
        text.match(/[,.!?;:][A-Za-z]/g);

    if (missingSpace) {

        missingSpace.forEach(match => {

            issues.push({
                original: match,
                replacement: match[0] + " " + match[1],
                explanation: "Add a space after punctuation.",
                type: "Punctuation"
            });

        });

    }


    // --------------------------------
    // Repeated punctuation
    // --------------------------------

    const repeatedPunctuation =
        text.match(/([!?.,])\1+/g);

    if (repeatedPunctuation) {

        repeatedPunctuation.forEach(match => {

            issues.push({
                original: match,
                replacement: match[0],
                explanation: "Avoid unnecessary repeated punctuation.",
                type: "Punctuation"
            });

        });

    }


    // --------------------------------
    // Multiple spaces
    // --------------------------------

    const multipleSpaces =
        text.match(/ {2,}/g);

    if (multipleSpaces) {

        multipleSpaces.forEach(match => {

            issues.push({
                original: match,
                replacement: " ",
                explanation: "Remove unnecessary extra spaces.",
                type: "Formatting"
            });

        });

    }


    return issues;

}
// ================================
// CHECK GRAMMAR
// ================================

checkGrammar.addEventListener("click", function () {

    const text = grammarInput.value.trim();

    if (!text) {

        resultsSection.classList.remove("hidden");

        issueSummary.textContent = "Please enter some text first.";

        issuesList.innerHTML = `
            <div class="issue-empty">
                ✦ Enter some text to check.
            </div>
        `;

        correctedArea.classList.add("hidden");

        return;
    }

    detectedIssues = [];

    grammarRules.forEach(rule => {

        if (rule.ignore) return;

        const matches = text.match(rule.pattern);

        if (matches) {

            matches.forEach(match => {

                detectedIssues.push({
                    original: match,
                    replacement: match.replace(
                        rule.pattern,
                        rule.replacement
                    ),
                    explanation: rule.explanation,
                    type: rule.type
                });

            });

        }

    });

const punctuationIssues =
    checkPunctuationAndCapitalization(text);

detectedIssues.push(...punctuationIssues);

    displayIssues();

});


// ================================
// DISPLAY RESULTS
// ================================

function displayIssues() {

    resultsSection.classList.remove("hidden");

    if (detectedIssues.length === 0) {

        issueSummary.textContent =
            "✓ No obvious grammar or spelling issues found.";

        issuesList.innerHTML = `
            <div class="issue-empty">
                ✦ Your writing looks good!
            </div>
        `;

        correctedArea.classList.add("hidden");

        return;
    }

    issueSummary.textContent =
        `${detectedIssues.length} issue${detectedIssues.length === 1 ? "" : "s"} found.`;

    issuesList.innerHTML = "";

    detectedIssues.forEach((issue, index) => {

        const issueElement = document.createElement("div");

        issueElement.className = "grammar-issue";

        issueElement.innerHTML = `

            <div class="issue-number">
                ${index + 1}
            </div>

            <div class="issue-content">

                <div class="issue-type">
                    ${escapeHTML(issue.type)}
                </div>

                <div class="issue-original">

                    <strong>
                        ${escapeHTML(issue.original)}
                    </strong>

                    →

                    <strong>
                        ${escapeHTML(issue.replacement)}
                    </strong>

                </div>

                <div class="issue-explanation">
                    ${escapeHTML(issue.explanation)}
                </div>

            </div>

        `;

        issuesList.appendChild(issueElement);

    });

    correctedArea.classList.add("hidden");
}


// ================================
// FIX ALL
// ================================

fixAll.addEventListener("click", function () {

    let corrected = grammarInput.value;

    grammarRules.forEach(rule => {

        if (rule.ignore) return;

        corrected = corrected.replace(
            rule.pattern,
            rule.replacement
        );

    });

    correctedText.textContent = corrected;

    correctedArea.classList.remove("hidden");

    correctedArea.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

});


// ================================
// CLEAR TEXT
// ================================

clearText.addEventListener("click", function () {

    grammarInput.value = "";

    detectedIssues = [];

    wordCount.textContent = "0";
    characterCount.textContent = "0";

    resultsSection.classList.add("hidden");

    correctedArea.classList.add("hidden");

    correctedText.textContent = "";

});


// ================================
// COPY CORRECTED TEXT
// ================================

copyCorrected.addEventListener("click", async function () {

    const text = correctedText.textContent;

    if (!text) return;

    try {

        await navigator.clipboard.writeText(text);

        const originalText = copyCorrected.textContent;

        copyCorrected.textContent = "✓ Copied!";

        setTimeout(() => {

            copyCorrected.textContent = originalText;

        }, 1500);

    } catch (error) {

        const range = document.createRange();

        range.selectNodeContents(correctedText);

        const selection = window.getSelection();

        selection.removeAllRanges();

        selection.addRange(range);

        document.execCommand("copy");

        selection.removeAllRanges();

        copyCorrected.textContent = "✓ Copied!";

        setTimeout(() => {

            copyCorrected.textContent = "Copy";

        }, 1500);

    }

});


// ================================
// HTML SAFETY
// ================================

function escapeHTML(text) {

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}