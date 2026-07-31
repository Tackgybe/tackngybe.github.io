// Wait for the HTML document to fully load before running the code
document.addEventListener('DOMContentLoaded', () => {
    
    // Grab elements from the HTML page using their IDs
    const actionBtn = document.getElementById('actionBtn');
    const outputMessage = document.getElementById('outputMessage');

    // Keep track of how many times the button is clicked
    let clickCount = 0;

    // Listen for a 'click' event on our button
    actionBtn.addEventListener('click', () => {
        clickCount++;
        
        // Update the text content of our paragraph dynamically
        outputMessage.textContent = `Success! You clicked the button ${clickCount} time(s). 🎉`;
        
        // Add a fun little console log for developers to see
        console.log(`Button was clicked ${clickCount} times.`);
    });
});
