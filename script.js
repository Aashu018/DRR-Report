// JavaScript code to calculate Expected Lead Count and handle other functionalities
document.addEventListener("DOMContentLoaded", function() {
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    const excludedDateInput = document.getElementById('exclude-date');
    const addExcludedDateButton = document.getElementById('add-excluded-date');
    const displayMonth = document.getElementById('month');
    const displayYear = document.getElementById('year');
    const displayDays = document.getElementById('total-days');
    const numberOfLeadsInput = document.getElementById('number-of-leads');
    const expectedDrrInput = document.getElementById('expected-drr');
    const saveButton = document.getElementById('save-button');
    const displayExcludedDates = document.getElementById('displayExcludedDates');

    // Add an array to store excluded dates
    const excludedDates = [];
    const selectedDates = [];

    startDateInput.addEventListener('input', updateDateInfo);
    endDateInput.addEventListener('input', updateDateInfo);
    addExcludedDateButton.addEventListener('click', addExcludedDate);
    numberOfLeadsInput.addEventListener('input', calculateExpectedDrr);
    expectedDrrInput.addEventListener('input', updateExpectedDrr);

    // Function to update the Month, Year, and Total Days
    function updateDateInfo() {
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);

        if (!isNaN(startDate) && !isNaN(endDate)) {
            const startMonth = startDate.toLocaleString('default', { month: 'long' });
            const startYear = startDate.getFullYear();
            displayMonth.value = startMonth;
            displayYear.value = startYear;

            const daysDiff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
            const excludedDays = excludedDates.length;
            displayDays.value = daysDiff - excludedDays;
        }
    }

    // Function to add an excluded date
    function addExcludedDate() {
        const date = excludedDateInput.value;
        if (date && !selectedDates.includes(date)) {
            excludedDates.push(date);
            selectedDates.push(date);

            const listItem = document.createElement('li');
            listItem.textContent = date;
            displayExcludedDates.appendChild(listItem);
            excludedDateInput.value = '';
            excludedDateInput.min = date; // Disable dates before the selected date
            updateDateInfo(); // Update total days when an excluded date is added
        }
    }

    // Function to calculate Expected DRR
    function calculateExpectedDrr() {
        const numberOfLeads = parseInt(numberOfLeadsInput.value);
        const totalDays = parseInt(displayDays.value);

        if (!isNaN(numberOfLeads) && !isNaN(totalDays)) {
            expectedDrrInput.value = (numberOfLeads / totalDays).toFixed(2);
        }
    }

    // Function to update Expected DRR when user inputs it
    function updateExpectedDrr() {
        const expectedDrr = parseFloat(expectedDrrInput.value);
        const totalDays = parseInt(displayDays.value);

        if (!isNaN(expectedDrr) && !isNaN(totalDays)) {
            numberOfLeadsInput.value = (expectedDrr * totalDays).toFixed(0);
        }
    }
});
