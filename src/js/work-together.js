document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".work-together-form");
  const emailInput = document.getElementById("user-email");
  const commentInput = document.getElementById("user-comment");
  const modal = document.querySelector(".backdrop");
  const closeButton = document.querySelector(".close-btn");
  const sendButton = document.querySelector(".send-button");

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
    msgElement.style.display = "block";

    input.style.borderBottom = isValid ? "2px solid #3cbc81" : "2px solid #e74a3b";
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
        if (!response.ok) throw new Error("Server error: " + response.statusText);
        return response.json();
      })
      .then(() => {
        form.reset();
        document.querySelectorAll(".validation-message").forEach((el) => el.remove());
        emailInput.style.borderBottom = "";
        commentInput.style.borderBottom = "";
        openModal();
      })
      .catch(() => {
        alert("Submission failed. Please check your input and try again.");
      });
  });

  function openModal() {
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
  modal.classList.remove("is-open");
  document.body.style.overflow = "";
  document.activeElement.blur();
}

  closeButton.addEventListener("click", closeModal);

  modal.addEventListener("click", function (e) {
    if (e.target.classList.contains("backdrop")) closeModal();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeModal();
    }
  });
});

