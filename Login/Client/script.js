// Handle file selection and preview
function previewFiles() {
  const files = document.getElementById("fileUpload").files;
  const fileListContainer = document.getElementById("fileList");

  fileListContainer.innerHTML = ''; // Clear previous previews

  // Loop through each selected file and show a preview
  Array.from(files).forEach((file) => {
    const fileItem = document.createElement("div");
    fileItem.classList.add("file-item");

    // Display file name
    const fileName = document.createElement("p");
    fileName.textContent = `File: ${file.name}`;
    
    // Display file preview (for images)
    const filePreview = document.createElement("img");
    filePreview.src = URL.createObjectURL(file);
    filePreview.alt = "File Preview";
    filePreview.style.width = "100px";
    filePreview.style.height = "100px";

    // Number of prints input field
    const printsInput = document.createElement("input");
    printsInput.type = "number";
    printsInput.placeholder = "No. of prints";
    printsInput.min = "1";

    // Print type (color/black & white)
    const printTypeSelect = document.createElement("select");
    const colorOption = document.createElement("option");
    colorOption.value = "color";
    colorOption.textContent = "Color";
    const bwOption = document.createElement("option");
    bwOption.value = "black-white";
    bwOption.textContent = "Black & White";
    
    printTypeSelect.appendChild(colorOption);
    printTypeSelect.appendChild(bwOption);

    // View and Delete buttons
    const viewButton = document.createElement("button");
    viewButton.textContent = "View";
    viewButton.onclick = function () {
      alert("Viewing " + file.name);
    };

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
      fileItem.remove();
      console.log("Deleted file:", file.name);
    };

    // Append elements to the file item
    fileItem.appendChild(fileName);
    fileItem.appendChild(filePreview);
    fileItem.appendChild(printsInput);
    fileItem.appendChild(printTypeSelect);
    fileItem.appendChild(viewButton);
    fileItem.appendChild(deleteButton);

    // Add the file item to the file list container
    fileListContainer.appendChild(fileItem);
  });

  // Show the upload button once files are selected
  document.getElementById("uploadButton").style.display = 'block';
}

// Handle file upload to Firebase when "Upload Files" button is clicked
document.getElementById("uploadButton").addEventListener("click", function() {
  const files = document.getElementById("fileUpload").files;
  const username = localStorage.getItem('username'); // Use the logged-in user's username from localStorage

  // Confirmation before uploading
  if (files.length > 0) {
    const confirmation = confirm("Are you sure you want to upload these files?");
    if (confirmation) {
      uploadFilesToFirebase(files, username); // Pass username to the upload function
    }
  } else {
    console.log("No files selected");
  }
});

// Upload files to Firebase and create a folder named after the username
function uploadFilesToFirebase(files, username) {
  const fileUploadPromises = [];

  Array.from(files).forEach((file) => {
    // Create a Firebase Storage reference that includes the username as a folder
    const storageRef = firebase.storage().ref(`uploads/${username}/${file.name}`); 

    // Upload the file and return a promise
    fileUploadPromises.push(
      storageRef.put(file).then((snapshot) => {
        console.log('Uploaded a file!', snapshot);
      }).catch((error) => {
        console.error('Error uploading file:', error);
      })
    );
  });

  // Wait for all uploads to complete before redirecting
  Promise.all(fileUploadPromises).then(() => {
    console.log("All files uploaded successfully!");
    window.location.href = '/Client/UploadSuc/uppindex.html'; // Redirect to success page
  });
}
