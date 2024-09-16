document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const replaceOptions = document.getElementById('replaceOptions');
    const addReplacementBtn = document.getElementById('addReplacement');
    const copyAllBtn = document.getElementById('copyAllBtn');

    // // Automatically paste clipboard content when tab is activated
    // window.addEventListener('focus', async () => {
    //     try {
    //         const text = await navigator.clipboard.readText();
    //         inputText.value = text;
    //     } catch (err) {
    //         console.error('Failed to read clipboard: ', err);
    //     }
    // });

    // Function to add new find/replace input fields
    addReplacementBtn.addEventListener('click', () => {
        const newItem = document.createElement('div');
        newItem.classList.add('replace-item');
        newItem.innerHTML = `
            <input type="text" class="findText" placeholder="Find text">
            <input type="text" class="replaceText" placeholder="Replace with">
        `;
        replaceOptions.appendChild(newItem);
    });

    // Function to automatically perform find and replace on text change
    inputText.addEventListener('input', () => {
        let text = inputText.value;
        const findTexts = document.querySelectorAll('.findText');
        const replaceTexts = document.querySelectorAll('.replaceText');

        findTexts.forEach((findInput, index) => {
            const replaceInput = replaceTexts[index];
            const findValue = findInput.value;
            const replaceValue = replaceInput.value;

            if (findValue) {
                const regex = new RegExp(findValue, 'g'); // Use 'g' for global replacement
                text = text.replace(regex, replaceValue);
            }
        });

        inputText.value = text;
    });

    // Function to copy all text from the textarea
    copyAllBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(inputText.value);
            // alert('Text copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    });
});
