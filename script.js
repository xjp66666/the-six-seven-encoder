const encodeButton = document.querySelector("#encode-button");
const decodeButton = document.querySelector("#decode-button");
const input = document.querySelector("#input-text");
const output = document.querySelector("#output-text");

encodeButton.addEventListener("click", () => {
    if (input.value != null) {

        const bytes = new TextEncoder().encode(input.value);

        output.value = Array.from(bytes)
            .map(bytes => bytes.toString(2).padStart(8, "0"))
            .join("")
            .replaceAll("0", "6")
            .replaceAll("1", "7");


    }
})

decodeButton.addEventListener("click", () => {
    const encoded = input.value;

    if (encoded) {
        // 6 -> 0, 7 -> 1
        const binary = encoded
            .replaceAll("6", "0")
            .replaceAll("7", "1");

        // Split into 8-bit chunks and convert to bytes
        const bytes = binary.match(/.{8}/g).map(byte =>
            parseInt(byte, 2)
        );

        // UTF-8 bytes -> string
        output.value = new TextDecoder().decode(new Uint8Array(bytes));
    }
});