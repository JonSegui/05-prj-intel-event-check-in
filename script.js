const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const attendeeCount = document.getElementById("attendeeCount");

//attendance
let count = 0;
const maxCount = 50;

//submittion of form event listener
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission behavior

  // Get form values
  const name = nameInput.value.trim();
  const team = teamSelect.value;
  const teamName = teamSelect.selectOptions[0].text;

  //debugging
  console.log(name, teamName, teamName);

  //incrementing count
  count++;
  console.log("Total check ins: ", count);
  attendeeCount.textContent = count;

  //updating progress
  const percentage = Math.round((count / maxCount) * 100) + "%";
  console.log(`Progress: ${percentage}`);
  progressBar.style.width = percentage + "%";

  //updating team counter
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

  //welcome message
  const message = `Welcome, ${name}! You have checked in with ${teamName}.`;
  form.reset();
});
