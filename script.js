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

function setPrivacy(choice) {
  document.getElementById('privacyBanner').style.display = 'none';
  localStorage.setItem('privacyChoice', choice);
}

window.onload = function() {
  if (!localStorage.getItem('privacyChoice')) {
    document.getElementById('privacyBanner').style.display = 'block';
  }
};

// Link elements to modal hooks
const joinBtn = document.querySelector('.join-btn');
const joinModal = document.getElementById('joinModal');
const closeModalBtn = document.getElementById('closeModalBtn');

// Prevent page redirect and open the popup modal layout
if (joinBtn) {
  joinBtn.addEventListener('click', function(event) {
    event.preventDefault(); // Blocks the browser 404 error redirect link
    joinModal.style.display = 'flex';
  });
}

// Close standard layout actions
if (closeModalBtn) {
  closeModalBtn.addEventListener('click', function() {
    joinModal.style.display = 'none';
  });
}

// Global modal background dismiss container
window.addEventListener('click', function(event) {
  if (event.target === joinModal) {
    joinModal.style.display = 'none';
  }
});

// Capture selected membership selection data
function selectTier(tier) {
  alert(`Thank you for selecting the ${tier} Membership option!`);
  joinModal.style.display = 'none';
  // You can connect registration routing systems here next
}

function selectTier(tier) {
  // Capture price display hooks
  const priceOvernight = document.getElementById('priceOvernight');
  const tierIndicator = document.getElementById('tierIndicator');
  const activeTierName = document.getElementById('activeTierName');
  const joinModal = document.getElementById('joinModal');

  if (tier === 'Premium') {
    // 40% off calculation: €85 * 0.6 = €51
    priceOvernight.innerText = '€51';
    
    // Update structural information visibility frames
    activeTierName.innerText = 'Premium (40% Overnight Discount Applied)';
    activeTierName.style.color = '#063A32'; 
    tierIndicator.style.display = 'block';
    
    alert('Welcome to Premium Membership! Your 40% overnight discount is now active.');
  } else {
    // Revert structural elements back to standard basic pricing plans
    priceOvernight.innerText = '€85';
    
    activeTierName.innerText = 'Basic';
    activeTierName.style.color = '#8A6E5A';
    tierIndicator.style.display = 'block';
    
    alert('Welcome to Basic Membership! Standard structural flat rates apply.');
  }

  // Hide modal viewport window frame
  joinModal.style.display = 'none';
}

// Element Selection Hooks
const authModal = document.getElementById('authModal');
const closeAuthBtn = document.getElementById('closeAuthBtn');
const registerView = document.getElementById('registerFormView');
const loginView = document.getElementById('loginFormView');

const loginLink = document.querySelector('.login-link');
const switchToLogin = document.getElementById('switchToLogin');
const switchToRegister = document.getElementById('switchToRegister');

// State Tracking Variable
let selectedMembershipTier = 'Basic'; 

// Intercept Join Selection inside Membership Modal to show Registration Form
function selectTier(tier) {
  selectedMembershipTier = tier; // Save choice ('Basic' or 'Premium')
  document.getElementById('joinModal').style.display = 'none'; // Close pricing modal
  authModal.style.display = 'flex'; // Open account form modal
  registerView.style.display = 'block';
  loginView.style.display = 'none';
}

// Open Login View when clicking Header "Log In" Link
if (loginLink) {
  loginLink.addEventListener('click', function(e) {
    e.preventDefault();
    authModal.style.display = 'flex';
    registerView.style.display = 'none';
    loginView.style.display = 'block';
  });
}

// Inline modal view toggle triggers
switchToLogin.addEventListener('click', (e) => { e.preventDefault(); registerView.style.display = 'none'; loginView.style.display = 'block'; });
switchToRegister.addEventListener('click', (e) => { e.preventDefault(); loginView.style.display = 'none'; registerView.style.display = 'block'; });
closeAuthBtn.addEventListener('click', () => authModal.style.display = 'none');

// --- Form Submissions and Email Automation via EmailJS ---
document.getElementById('signupForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const userName = document.getElementById('regName').value;
  const userEmail = document.getElementById('regEmail').value;

  // Parameters to pass directly into your EmailJS template
  const templateParams = {
    to_name: userName,
    to_email: userEmail,
    membership_tier: selectedMembershipTier,
    verification_link: window.location.href + "?verify=true" // Simulates a verification link back to your home page
  };

  // Sends the email using your initialization credentials
  emailjs.send('service_ddoy28a', 'template_laz98z6', templateParams)
    .then(function(response) {
       alert(`Account Created! A verification link has been sent to ${userEmail}. Please verify before logging in.`);
       authModal.style.display = 'none';
       
       // Save credentials in the local browser cache for prototype login validation
       localStorage.setItem('user_email', userEmail);
       localStorage.setItem('user_password', document.getElementById('regPassword').value);
       localStorage.setItem('user_name', userName);
       localStorage.setItem('user_tier', selectedMembershipTier);
       localStorage.setItem('is_verified', 'false'); // Account is unverified until they click the link
    }, function(error) {
       alert('Email automation failed. Please confirm your EmailJS Template and Service IDs.');
       console.log('FAILED...', error);
    });
});

// Check if user clicked the simulated verification link on reload
window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('verify') === 'true') {
    localStorage.setItem('is_verified', 'true');
    alert('Thank you! Your account is now successfully verified. You can now log in.');
    // Clean URL
    window.history.replaceState({}, document.title, window.location.pathname);
  }
});

// Login validation engine
document.getElementById('signinForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const emailInput = document.getElementById('loginEmail').value;
  const passInput = document.getElementById('loginPassword').value;

  const savedEmail = localStorage.getItem('user_email');
  const savedPass = localStorage.getItem('user_password');
  const isVerified = localStorage.getItem('is_verified');

  if (emailInput === savedEmail && passInput === savedPass) {
    if (isVerified === 'false') {
      alert('Access Denied: Please check your email inbox to verify your account first.');
      return;
    }
    // Automatically apply the saved pricing tier discount upon login
    const savedTier = localStorage.getItem('user_tier');
    alert(`Success! Logged in as ${localStorage.getItem('user_name')}.`);
    authModal.style.display = 'none';
    
    // Call the original discount function from your dashboard code
    if(typeof applyPricingTierVisual === "function") {
       applyPricingTierVisual(savedTier);
    }
  } else {
    alert('Invalid email address or password combination.');
  }
});
