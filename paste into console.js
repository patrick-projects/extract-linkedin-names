async function extractAllData() {
    function extractDataFromPage() {
        const data = [];
        const elements = document.querySelectorAll('#root > div > div.tw-overflow-hidden.tw-bg-primary.tw-flex.tw-min-h-screen.tw-flex-col > section > div > section.tw-flex > div > div.tw-mt-5 > div.tw-mt-2.tw-relative.tw-overscroll-x-contain.tw-flex.tw-items-start.tw-flex-row.tw-overflow-auto > table > tbody > tr > td:nth-child(2) > span > span');

        elements.forEach(element => {
            let cleanedText = element.innerText
                .replace(/\w*\.+\w*/g, '')  // Remove any word with a period
                .replace(/\b(CPA|CISSP|CEC|CCA|MBA|BSEE|CSCP|CSM|ITIL|CSSGB|PMP|MSBA|CSPO|ACP|CIPM|ACMA|CGMA|MAFM|MIS)\b/g, '')  // Remove certifications
                .replace(/, +/g, '')  // Remove spaces after commas
                .replace(/,$/g, '')  // Remove trailing commas
                .replace(/^,/g, '')  // Remove leading commas
                .trim();

            // If name has three or more words, grab only the first and last words
            const nameParts = cleanedText.split(' ');
            if (nameParts.length >= 3) {
                cleanedText = `${nameParts[0]} ${nameParts[nameParts.length - 1]}`;
            }

            if (cleanedText.split(' ').length > 1) {  // Check if more than one word is present
                data.push(cleanedText);
            }
        });

        return data;
    }

    const allData = [];
    for (let i = 2; i <= 30; i++) {
        allData.push(...extractDataFromPage());

        const nextPageButton = document.querySelector(`button[label='${i}']`);
        if (nextPageButton) {
            nextPageButton.click();
            await new Promise(resolve => setTimeout(resolve, 900));  // Wait 1.5 seconds for the page to load
        }
    }

    console.log(allData.join('\n'));
}

extractAllData();
