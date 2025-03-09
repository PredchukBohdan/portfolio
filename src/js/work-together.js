document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".work-together-form");
  const emailInput = document.getElementById("user-email");
  const commentInput = document.getElementById("user-comment");
  const modal = document.querySelector(".backdrop");
  const closeButton = document.querySelector(".close-btn");

  const emailPattern = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  function showMessage(input, message, isValid) {
    let msgElement = input.nextElementSibling;

    if (!msgElement || !msgElement.classList.contains("validation-message")) {
      msgElement = document.createElement("p");
      msgElement.classList.add("validation-message");
      input.parentNode.appendChild(msgElement);
    }
    msgElement.textContent = message;
    msgElement.style.color = isValid ? "#3cbc81" : "#e74a3b";
    msgElement.style.display = 'block'; 

    if (isValid) {
      input.style.borderBottom = "2px solid #3cbc81"; 
    } else {
      input.style.borderBottom = "2px solid #e74a3b"; 
    }
  }

  emailInput.addEventListener("input", function () {
    if (emailPattern.test(emailInput.value)) {
      showMessage(emailInput, "Success!", true);
    } else {
      showMessage(emailInput, "Invalid email, try again", false);
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!emailPattern.test(emailInput.value)) {
      showMessage(emailInput, "Invalid email, try again", false);
      return;
    }

    fetch("https://portfolio-js.b.goit.study/api/requests", {
      method: "POST",
      body: JSON.stringify({
        email: emailInput.value,
        comment: commentInput.value,
      }),
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      console.log("Server Response:", response);
      if (!response.ok) throw new Error("Server error: " + response.statusText);
      return response.json();
    })
    .then((data) => {
      console.log("Server Response Data:", data);
      form.reset();
      document.querySelectorAll(".validation-message").forEach((el) => el.remove());
      emailInput.style.borderBottom = "";
      commentInput.style.borderBottom = "";
      openModal();
    })
    .catch((error) => {
      console.error("Submission error:", error);

      alert("Submission failed. Please check your input and try again.");

      if (!emailPattern.test(emailInput.value)) {
        showMessage(emailInput, "Invalid email, try again", false);
      } else {
        showMessage(commentInput, "There was a problem submitting your comment", false);
      }
    });
  });

  function openModal() {
    modal.classList.add("is-open");
  }

  function closeModal() {
    modal.classList.remove("is-open");
  }

  closeButton.addEventListener("click", closeModal);

  modal.addEventListener("click", function (e) {
    if (e.target.classList.contains("backdrop")) closeModal();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });
});
