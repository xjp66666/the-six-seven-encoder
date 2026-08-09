const encodeButton = document.querySelector("#encode-button");
const decodeButton = document.querySelector("#decode-button");
const swapButton = document.querySelector("#swap-button");
const copyButton = document.querySelector("#copy-button");
const input = document.querySelector("#input-text");
const output = document.querySelector("#output-text");

encodeButton.addEventListener("click", () => {
    encode();
})

decodeButton.addEventListener("click", () => {
    decode();
});

swapButton.addEventListener("click", () => {
    swap();
});

copyButton.addEventListener("click", async () => {
    await navigator.clipboard.writeText(output.value);

    copyButton.textContent = "Copied!";
    setTimeout(() => {
        copyButton.textContent = "Copy output";
    }, 1000);
});


function encode() {
    if (input.value != null) {

        const bytes = new TextEncoder().encode(input.value);

        output.value = Array.from(bytes)
            .map(byte => byte.toString(2).padStart(8, "0"))
            .join("")
            .replaceAll("0", "6")
            .replaceAll("1", "7");

    }
}

function decode() {

    if (input.value != null) {

        if (/[^67]/.test(input.value)) {
            output.value = "The text contains characters other than siiiiiiiiiix and seeeeeeeeeven!";
            return;
        }

        if (input.value.length % 8 != 0) {
            output.value = "The length of the encoded text must be divisible by 8!"
            return
        }

        const binary = input.value.replaceAll("6", "0").replaceAll("7", "1");

        const bytes = binary
            .match(/.{8}/g)
            .map(byte => parseInt(byte, 2));

        output.value = new TextDecoder().decode(new Uint8Array(bytes));
    }
}

function swap() {
    const inputText = input.value;
    const outputText = output.value;
    input.value = outputText;
    output.value = inputText;
}
