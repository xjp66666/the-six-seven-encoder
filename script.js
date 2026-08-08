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