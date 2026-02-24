const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const greeting = document.getElementById("greeting");
const waterCount = document.getElementById("waterCount");
const zeroCount = document.getElementById("zeroCount");
const powerCount = document.getElementById("powerCount");
const maxCount = 50;
const attendeeList = document.getElementById("attendeeList");

//saving local data
let count = parseInt(localStorage.getItem("count")) || 0;
let teamCounts = JSON.parse(localStorage.getItem("teamCounts")) || {
  water: 0,
  zero: 0,
  power: 0,
};
let attendees = JSON.parse(localStorage.getItem("attendees")) || [];
UIUpdate();

//submittion of form event listener
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission behavior

  if (count >= maxCount) return;

  // Get form values
  const name = nameInput.value.trim();
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  //incrementing count
  count++;
  console.log("Total check ins: ", count);
  teamCounts[team]++;
  attendees.push({ name, teamName });
  attendeeCount.textContent = count;
  //start save
  localStorage.setItem("count", count);
  localStorage.setItem("teamCounts", JSON.stringify(teamCounts));
  localStorage.setItem("attendees", JSON.stringify(attendees));

  //updating progress
  const percentage = Math.round((count / maxCount) * 100);
  console.log(`Progress: ${percentage}`);
  progressBar.style.width = percentage + "%";

  //updating team counter
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;
  UIUpdate();
  listAttendees();
  fullAttendance();

  //welcome message
  greeting.textContent = `Welcome, ${name}! You have checked in with ${teamName}.`;
  form.reset();
});

function UIUpdate() {
  attendeeCount.textContent = count;

  waterCount.textContent = teamCounts.water;
  zeroCount.textContent = teamCounts.zero;
  powerCount.textContent = teamCounts.power;

  const percentage = Math.round((count / maxCount) * 100);
  progressBar.style.width = percentage + "%";

  if (count >= maxCount) {
    document.getElementById("checkInBtn").disabled = true;
  }
}

function listAttendees() {
  if (!attendeeList) return;
  attendeeList.innerHTML = "";
  attendees.forEach((attendee) => {
    const li = document.createElement("li");
    li.textContent = `${attendee.name} - ${attendee.teamName}`;
    attendeeList.appendChild(li);
  });
}

function fullAttendance() {
  if (count < maxCount) return;
  if (
    teamCounts.water > teamCounts.zero &&
    teamCounts.water > teamCounts.power
  ) {
    let winner = "Team Water Wise";
  }
  if (
    teamCounts.zero > teamCounts.water &&
    teamCounts.zero > teamCounts.power
  ) {
    let winner = "Team Net Zero";
  }
  if (
    teamCounts.power > teamCounts.water &&
    teamCounts.power > teamCounts.zero
  ) {
    let winner = "Team Renewables";
  }
  greeting.textContent = `Congratulations! ${winner} wins with the most attendees!`;
}

document.getElementById("resetBtn").addEventListener("click", function () {
  // Clear localStorage
  localStorage.removeItem("count");
  localStorage.removeItem("teamCounts");
  localStorage.removeItem("attendees");

  // Reset variables
  count = 0;
  teamCounts = { water: 0, zero: 0, power: 0 };
  attendees = [];

  // Re-enable button
  document.getElementById("checkInBtn").disabled = false;

  // Clear greeting
  greeting.textContent = "";

  // Update UI
  UIUpdate();
  listAttendees();
});
