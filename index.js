document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const tableBody = document.querySelector("#employee-table tbody");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); //! Prevent the default form submission

    //! Get form values
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const age = document.getElementById("age").value;
    const nationality = document.getElementById("nationality").value;
    const position = document.getElementById("position").value;
    const experience = document.getElementById("experience").value;

    //! Check if any field is empty
    if (
      !name ||
      !surname ||
      !age ||
      nationality === "nationality" ||
      position === "position" ||
      !experience
    ) {
      alert("Please fill out all fields.");
      return;
    }

    //! Check if an employee with the same name already exists
    const existingEmployee = Array.from(tableBody.querySelectorAll("tr")).find(
      (row) => row.cells[0].textContent === name
    );
    if (existingEmployee) {
      alert("An employee with the same name already exists.");
      return;
    }

    //! Create new row in the table
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
                <td>${name}</td>
                <td>${surname}</td>
                <td>${age}</td>
                <td>${nationality}</td>
                <td>${position}</td>
                <td>${experience}</td>
                <td>
                  <button class="edit-button">Edit</button>
                  <button class="delete-button">Delete</button>
                </td>
            `;

    //! Append the new row to the table
    tableBody.appendChild(newRow);

    //! Clear form fields after submission
    form.reset();
  });

  //! Add event listener for delete buttons here
  tableBody.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-button")) {
      const row = event.target.closest("tr");
      row.remove();
    }
  });

  //! Event listener for edit buttons
  tableBody.addEventListener("click", function (event) {
    if (event.target.classList.contains("edit-button")) {
      //! When edit button is clicked, populate form fields with row data
      const cells = event.target.closest("tr").querySelectorAll("td");
      document.getElementById("name").value = cells[0].textContent;
      document.getElementById("surname").value = cells[1].textContent;
      document.getElementById("age").value = cells[2].textContent;
      document.getElementById("nationality").value = cells[3].textContent;
      document.getElementById("position").value = cells[4].textContent;
      document.getElementById("experience").value = cells[5].textContent;

      //! Store the selected row for editing
      selectedRow = event.target.closest("tr");
    }
  });
});
