		let isFirstCall = true;
        function sendMessage() {
			
			var userInputCheck= document.getElementById('user-input').value.trim(); // Trim whitespace
			
            var userInput = document.getElementById('user-input').value;
			var submitBtn = document.getElementById('submit-btn');
			var chatContainer = document.getElementById('chat-container');
			var userInputElement = document.getElementById('user-input');
			//var uploadContainer = document.getElementById('upload-container');
			var userinputcontainer = document.getElementById('user-input-container');
			var fileInput = document.getElementById('userimg');
			
			if (userInputCheck === '') {
				displayErrorMessage('Please enter text');

				// Return without proceeding
				return;
				}

			//uploadContainer.style.display = 'none';
			//userinputcontainer.style.display = 'none';
			
            // Display user's message in the chat container with user icon
            displayMessage('img/gusr.png', '', userInput);
			
			
			 // Create and append the loader element
			var loader = document.createElement('div');
			loader.classList.add('loader');
			chatContainer.appendChild(loader);
			//submitBtn.classList.add('loading');

            // Simulate a bot response
            //var botResponse = 'Sure, how can I help you?';

            // Display bot's response in the chat container with bot icon
            //displayMessage('gbot.png', '', botResponse);

            // Clear the textarea after processing the message
            
            userInputElement.value = '';
			chatContainer.scrollTop = chatContainer.scrollHeight;
            
			submitBtn.disabled = true;
			
			userInputElement.disabled = true;
			var storedResponse = JSON.parse(localStorage.getItem('apiResponse'));
			 // Make an API call using PHP with user input as JSON payload
			 var payload = {
				"msg": userInput,
				"answer": storedResponse || "."
			};

			 
			 
			 fetch('http://192.168.0.115:8000/chat', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					//body: JSON.stringify({ userInput: userInput })
					body: JSON.stringify(payload)
				})
				.then(response => response.json())
				.then(apiResponse => {
					//console.log(apiResponse)
					
					// Display API response in the chat container with bot icon
					displayMessage('img/gbot.png', '', apiResponse);
					console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
					console.log(apiResponse)
					console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
					 //userinputcontainer.style.display = 'flex';
					
					submitBtn.classList.remove('loading');
					 loader.remove();
					// Clear the textarea after processing the message
					var userInputElement = document.getElementById('user-input');
					userInputElement.value = '';
					userInputElement.disabled = false;
					submitBtn.disabled = false;

					// Set the cursor at the beginning of the textarea
					userInputElement.focus();
				})
				.catch(error => {
					console.error('Error fetching API:', error);
				});
			
            // Set the cursor at the beginning of the textarea
		    
			
			//userInputElement.disabled = false;
            userInputElement.focus();
        }


		function displayErrorMessage(message) {
			var errorMessage = document.createElement('div');
			errorMessage.textContent = message;
			errorMessage.style.color = 'red';
			errorMessage.style.position = 'fixed';
			errorMessage.style.bottom = '35px';
			errorMessage.style.left = '50%';
			errorMessage.style.transform = 'translateX(-50%)';
			errorMessage.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
			errorMessage.style.padding = '10px';
			errorMessage.style.borderRadius = '5px';
			errorMessage.style.transition = 'opacity 2s ease-in-out';

			document.body.appendChild(errorMessage);

			// Automatically remove the error message after 2 seconds
			setTimeout(function () {
				errorMessage.style.opacity = 0;
				setTimeout(function () {
					errorMessage.remove();
				}, 2000);
			}, 2000);
		}


        function handleFileChange() 
				{
				var fileInput = document.getElementById('userimg');
				var userInputElement = document.getElementById('user-input');
				var submitBtn = document.getElementById('submit-btn');
				var chatContainer = document.getElementById('chat-container');
				var initialMessageContainer = document.getElementById('initial-message');
				var userInputContainer = document.getElementById('user-input-container');
				var uploadContainer = document.getElementById('upload-container');
					var maxFileSize = 1 * 1024 * 1024; // 1MB in bytes

				if (fileInput.files.length > 0) {
				var fileSize = fileInput.files[0].size;

				if (fileSize > maxFileSize) {
					displayErrorMessage('File size exceeds the maximum limit of 1MB');
					// Clear the file input to prevent uploading
					fileInput.value = '';
					return; // Exit the function
						} else {
							var fileInput = document.getElementById('userimg');
							//if (fileInput) {
								//fileInput.style.display = 'none';
							//}
						}
					}


				// Remove initial message on file upload
					if (initialMessageContainer) {
						initialMessageContainer.remove();
					}
					
				//if (userInputContainer) {
						//userInputContainer.style.visibility = 'visible';
				// }

				// Remove previous image and horizontal rule
				var existingImage = document.querySelector('#chat-container img');
				if (existingImage) {
					existingImage.remove();
				}

				var existingHr = document.querySelector('#chat-container hr');
				if (existingHr) {
					existingHr.remove();
				}

				if (fileInput.files.length > 0) {
					
					// Display the uploaded image in the chat container
					var imgM = document.createElement('img');
					imgM.src = URL.createObjectURL(fileInput.files[0]);
					imgM.style.maxWidth = '70%';  // Set max-width to 30%
					imgM.style.maxHeight = '70%'; // Set max-height to 30%
					imgM.style.display = 'block'; // Center the image
					imgM.style.margin = 'auto';    // Center the image
					chatContainer.appendChild(imgM);


					// Add a horizontal rule after the image
					//chatContainer.appendChild(document.createElement('hr'));

					// Enable the textarea and submit button
					//userInputElement.disabled = false;
					//submitBtn.disabled = false;
					
				} else {
					// Clear the chat container and disable the textarea and submit button
					chatContainer.innerHTML = '';
					userInputElement.disabled = true;
					submitBtn.disabled = true;
				}
			}

		

        function displayMessage(icon, sender, message) {
            var chatContainer = document.getElementById('chat-container');
            var messageContainer = document.createElement('div');
            messageContainer.classList.add('message-container');

				
            var iconElement = document.createElement('div');
            iconElement.classList.add('message-icon');
            iconElement.innerHTML = `<img src="${icon}" alt="${sender}">`;

            var textElement = document.createElement('div');
            textElement.classList.add('message-text');
			
			//message = message.replace(/\t/g, '\n');
			
			//textElement.innerHTML = `<strong>${sender}</strong>${message}`;
            messageContainer.appendChild(iconElement);
            //messageContainer.appendChild(textElement);
			//chatContainer.appendChild(messageContainer);
			
			const sections = message.split('\n\n');
			const container = document.createElement('div');
			sections.forEach(section => {
				// Create a paragraph element for each section
				const paragraph = document.createElement('p');
				// Set the content of the paragraph
				paragraph.textContent = section;
				// Add styles to the paragraph if needed
				paragraph.classList.add('section-paragraph'); // Add your CSS class for styling
			
				// Append the paragraph to the container
				container.appendChild(paragraph);
			});
			//chatContainer.appendChild(container);
			messageContainer.appendChild(container);
			chatContainer.appendChild(messageContainer);

            // Scroll to the bottom to show the latest messages
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }

        function handleKeyPress(event) {
            // Trigger sendMessage() on Enter key press
            if (event.key === 'Enter') {
                sendMessage();
            }
        }

		function callFirstApi()
		{
				var userInputContainer = document.getElementById('user-input-container');
				var chatContainer = document.getElementById('chat-container');
				var fileInput = document.getElementById('userimg');
				var formData = new FormData();
				var submitBtn = document.getElementById('submit-btn');
				
				formData.append('image', fileInput.files[0]);
				formData.append('userInput', 'describe this image in a few lines');
				console.log(formData)
				var loader = document.createElement('div');
				loader.classList.add('loader');
				chatContainer.appendChild(loader);

				var buttonContainer = document.getElementById('button-container');
				buttonContainer.style.display  = 'none';

				fetch('http://192.168.0.115:8000/image', {
					method: 'POST',
					body: formData,
				})
				.then(response => response.json())
				.then(apiResponse => {
					console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>")
					console.log(apiResponse)
					console.log(apiResponse.response)
					localStorage.setItem('apiResponse', JSON.stringify(apiResponse.response));
					console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>")
					
					// Display API response in the chat container with bot icon
					displayMessage('img/gbot.png', '', apiResponse.response);
					
					 //userinputcontainer.style.display = 'flex';
					
					submitBtn.classList.remove('loading');
					loader.remove();
					// Clear the textarea after processing the message
					var userInputElement = document.getElementById('user-input');
					
					
					userInputElement.value = '';
					userInputElement.disabled = false;
					submitBtn.disabled = false;

					
					if (userInputContainer ) {
						userInputContainer.style.visibility = 'visible';
					}

					// Set the cursor at the beginning of the textarea
					userInputElement.focus();
				})
				.catch(error => {
					console.error('Error fetching API:', error);
				});
		}