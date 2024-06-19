(function () {
  let template = document.createElement("template");
  template.innerHTML = `
  <style>
      .hidden {
        display: none;
      }
      #chat-widget-container {
        position: fixed;
        bottom: 20px;
        right: 20px;
        flex-direction: column;
      }
      #chat-popup {
        height: 70vh;
        max-height: 70vh;
        transition: all 0.3s;
        overflow: hidden;
      }
      @media (max-width: 768px) {
        #chat-popup {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
          max-height: 100%;
          border-radius: 0;
        }
      }

  </style>
  <div id="chat-bubble" class="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer text-3xl">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    </div>
    <div id="chat-popup" class="hidden absolute bottom-20 right-0 w-96 bg-white rounded-md shadow-md flex flex-col transition-all text-sm">
      <div id="chat-header" class="flex justify-between items-center p-4 bg-gray-800 text-white rounded-t-md">
        <h3 class="m-0 text-lg">Chat Widget by GPT4</h3>
        <button id="close-popup" class="bg-transparent border-none text-white cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div id="chat-messages" class="flex-1 p-4 overflow-y-auto"></div>
      <div id="chat-input-container" class="p-4 border-t border-gray-200">
        <div class="flex space-x-4 items-center">
          <input type="text" id="chat-input" class="flex-1 border border-gray-300 rounded-md px-4 py-2 outline-none w-3/4" placeholder="Type your message...">
          <button id="chat-submit" class="bg-gray-800 text-white rounded-md px-4 py-2 cursor-pointer">Send</button>
        </div>
        <div class="flex text-center text-xs pt-4">
          <span class="flex-1">Prompted by <a href="https://twitter.com/anantrp" target="_blank" class="text-indigo-600">@anantrp</a></span>
        </div>
      </div>
    </div>
`;
  class Widget extends HTMLElement {
    constructor() {
      super();
      let shadowRoot = this.attachShadow({ mode: "open" });
        
      shadowRoot.appendChild(template.content.cloneNode(true));
      this._props = {};

    }
    async connectedCallback() {
      this.initMain();
    }
    async initMain() {
      /*------------------------------- Digital Chat ----------------------------------------- */
      const chatInput = document.getElementById('chat-input');
  const chatSubmit = document.getElementById('chat-submit');
  const chatMessages = document.getElementById('chat-messages');
  const chatBubble = document.getElementById('chat-bubble');
  const chatPopup = document.getElementById('chat-popup');
  const closePopup = document.getElementById('close-popup');

  chatSubmit.addEventListener('click', function() {
    
    const message = chatInput.value.trim();
    if (!message) return;
    
    chatMessages.scrollTop = chatMessages.scrollHeight;

    chatInput.value = '';

    onUserRequest(message);

  });

  chatInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      chatSubmit.click();
    }
  });

  chatBubble.addEventListener('click', function() {
    togglePopup();
  });

  closePopup.addEventListener('click', function() {
    togglePopup();
  });
  
  }
    togglePopup() {
      const chatPopup = document.getElementById('chat-popup');
      chatPopup.classList.toggle('hidden');
      if (!chatPopup.classList.contains('hidden')) {
        document.getElementById('chat-input').focus();
      }
    }

    onUserRequest(message) {
      // Handle user request here
      console.log('User request:', message);
    
      // Display user message
      const messageElement = document.createElement('div');
      messageElement.className = 'flex justify-end mb-3';
      messageElement.innerHTML = `
        <div class="bg-gray-800 text-white rounded-lg py-2 px-4 max-w-[70%]">
          ${message}
        </div>
      `;
      chatMessages.appendChild(messageElement);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    
      chatInput.value = '';
    
      // Reply to the user
      setTimeout(function() {
        reply('Hello! This is a sample reply.');
      }, 1000);
    }

    reply(message) {
      const chatMessages = document.getElementById('chat-messages');
      const replyElement = document.createElement('div');
      replyElement.className = 'flex mb-3';
      replyElement.innerHTML = `
        <div class="bg-gray-200 text-black rounded-lg py-2 px-4 max-w-[70%]">
          ${message}
        </div>
      `;
      chatMessages.appendChild(replyElement);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

  
    onCustomWidgetBeforeUpdate(changedProperties) {
      this._props = {
        ...this._props,
        ...changedProperties
      };
    }

    onCustomWidgetAfterUpdate(changedProperties) {
      this.initMain();
    }

    /*------------------------------- Digital Chat ----------------------------------------- */

    createChatLi = (message, className) => {
      // Create a chat <li> element with passed message and className
      const chatLi = document.createElement("li");
      this.shadowRoot.appendChild(chatLi); /////////////// Is this needed ??? ////////////

      chatLi.classList.add("chat", `${className}`);
      let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
      chatLi.innerHTML = chatContent;
      chatLi.querySelector("p").textContent = message;
      return chatLi; // return chat <li> element
    }

    generateResponse = async (chatElement, optionBtn) => {
      let apiUrl = null;
      let response = null;

      const inputParameters = { user_prompt: this.userMessage };
      const apiConfig = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer sc9as24jlpp7994x'
        },
        body: JSON.stringify(inputParameters)
      };

      const messageElement = this.chatElement.querySelector("p");
      messageElement.textContent = "Thinking...";

      switch (this.optionBtn) {
        case 'Dashboard Navigation':
          apiUrl = "https://hda-friendly-reporting.me.sap.corp/api/v1/llms/navigation";

          response = await fetch(apiUrl, apiConfig)
          if (!response.ok) {
            messageElement.classList.add("error");
            messageElement.textContent = `Something went wrong. Fetch Error: ${error}`;
            throw new Error('Network response was not ok');
          } else {
            const data = await response.json();
            // Interpret HTML tags in the output_guide
            messageElement.innerHTML = DOMPurify.sanitize(data.output_guide);
          }
          this.chatbox.scrollTo(0, this.chatbox.scrollHeight);
          break;
        case 'Conceptual Question':
          apiUrl = "https://hda-friendly-reporting.me.sap.corp/api/v1/llms/documentation_qa";

          response = await fetch(apiUrl, apiConfig)
          if (!response.ok) {
            messageElement.classList.add("error");
            messageElement.textContent = `Something went wrong. Fetch Error: ${error}`;
            throw new Error('Network response was not ok');
          } else {
            const data = await response.json();
            messageElement.textContent = data.documentation;
          }
          this.chatbox.scrollTo(0, this.chatbox.scrollHeight);
          break;
        case 'Data Analytics':
          apiUrl = "https://hda-friendly-reporting.me.sap.corp/api/v1/llms/nlq";

          response = await fetch(apiUrl, apiConfig)
          if (!response.ok) {
            messageElement.classList.add("error");
            messageElement.textContent = `Something went wrong. Fetch Error: ${error}`;
            throw new Error('Network response was not ok');
          } else {
            const data = await response.json();
            messageElement.textContent = data.answer;
          }
          this.chatbox.scrollTo(0, this.chatbox.scrollHeight);
          break;
        default:
          messageElement.textContent = "Option not recognized.";
          break;
      }
    }

    handleChat = () => {
      this.userMessage = this.chatInput.value.trim(); // Get user entered message and remove extra whitespace
      if (!this.userMessage) return;

      // Clear the input textarea and set its height to default
      this.chatInput.value = "";
      this.chatInput.style.height = `${inputInitHeight}px`;

      // Append the user's message to the chatbox
      this.chatbox.appendChild(createChatLi(this.userMessage, "outgoing"));
      this.chatbox.scrollTo(0, this.chatbox.scrollHeight);

      // remove option buttons if they already exist
      if (this.shadowRoot.querySelector(".options-container")) { this.shadowRoot.querySelector(".options-container").remove(); }
      this.appendOptionButtons();

    }

    //this.shadowRoot done
    // Function to append 'intention' buttons
    appendOptionButtons = () => {

      const options = ['Dashboard Navigation', 'Conceptual Question', 'Data Analytics'];
      const optionsContainer = document.createElement("div");
      optionsContainer.className = "options-container";

      options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.className = "option-button";
        button.onclick = () => this.handleOptionClick(option);
        optionsContainer.appendChild(button);
      });

      this.chatbox.appendChild(optionsContainer);
      this.chatbox.scrollTo(0, this.chatbox.scrollHeight);
    }

    //this.shadowRoot done
    // Handle option button click
    handleOptionClick = (option) => {
      const incomingChatLi = this.createChatLi("", "incoming");
      this.chatbox.appendChild(incomingChatLi);
      this.chatbox.scrollTo(0, this.chatbox.scrollHeight);

      // Remove intention buttons after selection
      this.shadowRoot.querySelector(".options-container").remove();

      this.generateResponse(incomingChatLi, option);
    }

  }
  customElements.define("external-friendly-reporting-chat-widget", Widget);
})();