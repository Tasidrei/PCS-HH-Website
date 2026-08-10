document.addEventListener("DOMContentLoaded", () => {
  // Toggle visibility between sections
  const scheduleBtn = document.getElementById("scheduleBtn");
  const callbackBtn = document.getElementById("callbackBtn");
  const bookVisitBtn = document.getElementById("bookVisitBtn");

  const scheduleSection = document.getElementById("scheduleSection");
  const callbackSection = document.getElementById("callbackSection");
  const visitSection = document.getElementById("visitSection");

  // Show Schedule Appointment
  if (scheduleBtn) {
    scheduleBtn.addEventListener("click", () => {
      scheduleSection.style.display = "block";
      callbackSection.style.display = "none";
      visitSection.style.display = "none";
    });
  }

  // Show Request a Call Back
  if (callbackBtn) {
    callbackBtn.addEventListener("click", () => {
      callbackSection.style.display = "block";
      scheduleSection.style.display = "none";
      visitSection.style.display = "none";
    });
  }

  // Show Book a Visit
  if (bookVisitBtn) {
    bookVisitBtn.addEventListener("click", () => {
      visitSection.style.display = "block";
      scheduleSection.style.display = "none";
      callbackSection.style.display = "none";
    });
  }

  // Confirm Appointment
  const confirmSchedule = document.getElementById("confirmSchedule");
  if (confirmSchedule) {
    confirmSchedule.addEventListener("click", () => {
      const date = document.getElementById("scheduleDate").value;
      const time = document.getElementById("scheduleTime").value;
      if (!date || !time) {
        alert("Please select both date and time.");
        return;
      }
      alert(`Appointment scheduled for ${date} at ${time}.`);
      // Optional EmailJS send here
    });
  }

  // Confirm Visit
  const confirmVisit = document.getElementById("confirmVisit");
  if (confirmVisit) {
    confirmVisit.addEventListener("click", () => {
      const date = document.getElementById("visitDate").value;
      const time = document.getElementById("visitTime").value;
      if (!date || !time) {
        alert("Please select both date and time.");
        return;
      }
      alert(`Visit booked for ${date} at ${time}.`);
      // Optional EmailJS send here
    });
  }

  // Callback Form Submission
  const callbackForm = document.getElementById("callbackForm");
  if (callbackForm) {
    callbackForm.addEventListener("submit", function (e) {
      e.preventDefault();

      emailjs
        .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
          name: this.name.value,
          phone: this.phone.value,
          date: this.date.value,
          time: this.time.value,
        })
        .then(() => {
          alert("Your callback request has been sent!");
          this.reset();
        })
        .catch((error) => {
          alert("Error sending request.");
          console.error(error);
        });
    });
  }
});
