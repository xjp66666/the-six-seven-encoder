const encodeButton = document.querySelector("#encode-button");
const decodeButton = document.querySelector("#decode-button");
const input = document.querySelector("#input-text");
const output = document.querySelector("#output-text");

encodeButton.addEventListener("click", () => {
    encode();
})

decodeButton.addEventListener("click", () => {
    decode();
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

        const binary = input.value.replaceAll("6", "0").replaceAll("7", "1");

        const bytes = binary
            .match(/.{8}/g)
            .map(byte => parseInt(byte, 2));

        output.value = new TextDecoder().decode(new Uint8Array(bytes));
    }
}