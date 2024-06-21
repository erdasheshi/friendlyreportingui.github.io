(function () {
  let template = document.createElement("template");
  template.innerHTML = `

<style>
      @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,1,0');
      @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css');
      @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0');
      @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,1,0');
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

      /*------------------------- ChatBot -------------------------*/

      #body {
        overflow-y: scroll;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        margin: 0;
        background-color: black;
      }

      div {
        overflow-y: auto;
        margin: 0.5rem auto;
        max-width: 100%;
        width: 100%;
      }

      .window-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        /* Adjust the space between elements */
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Poppins", sans-serif;
        color: rgb(182, 134, 21);
      }

      .chatbot-toggler {
        position: fixed;
        bottom: 25px;
        right: 35px;
        outline: none;
        border: none;
        height: 50px;
        width: 50px;
        display: flex;
        cursor: pointer;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: #568912;
        transition: all 0.2s ease;
      }

      .chatbot-toggler span {
        color: #fff;
        position: absolute;
      }

      .chatbot-toggler span:nth-child(2),
      .show-chatbot .chatbot-toggler span:nth-child(1) {
        opacity: 0;
      }

      .show-chatbot .chatbot-toggler span:nth-child(2) {
        opacity: 1;
      }

      .chatbot-label {
        position: absolute;
        right: 60px;
        white-space: nowrap;
        color: blue;
        font-size: 12px;
      }

      .chatbot-toggler .chatbot-label {
        color: rgb(182, 134, 21);
      }

      .chatbot {
        position: fixed;
        bottom: 5%;
        right: 75px;
        width: 420px;
        background: #fff;
        border-radius: 15px;
        overflow: hidden;
        opacity: 0;
        pointer-events: none;
        transform: scale(0.5);
        transform-origin: bottom right;
        box-shadow: 0 0 128px 0 rgba(0, 0, 0, 0.1),
            0 32px 64px -48px rgba(0, 0, 0, 0.5);
        transition: all 0.1s ease;
      }

      #body .show-chatbot .chatbot {
        opacity: 1;
        pointer-events: auto;
        transform: scale(1);
      }

      .chatbot header {
        padding: 16px 0;
        position: relative;
        text-align: center;
        color: #fff;
        background: #568912;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }

      .chatbot header span {
        position: absolute;
        right: 15px;
        top: 50%;
        display: none;
        cursor: pointer;
        transform: translateY(-50%);
      }

      header h2 {
        font-size: 1.4rem;
        color: white;
      }

      .chatbot .chatbox {
        overflow-y: auto;
        height: 510px;
        padding: 30px 20px 100px; // might need to change this to 20 px
      }

      .chatbot :where(.chatbox, textarea)::-webkit-scrollbar {
        width: 6px;
      }

      .chatbot :where(.chatbox, textarea)::-webkit-scrollbar-track {
        background: #fff;
        border-radius: 25px;
      }

      .chatbot :where(.chatbox, textarea)::-webkit-scrollbar-thumb {
        background: #ccc;
        border-radius: 25px;
      }

      .chatbox .chat {
        display: flex;
        list-style: none;
      }

      .chatbox .outgoing {
        margin: 20px 0;
        justify-content: flex-end;
      }

      .chatbox .incoming span {
        width: 32px;
        height: 32px;
        color: #fff;
        cursor: default;
        text-align: center;
        line-height: 32px;
        align-self: flex-end;
        background: #568912;
        border-radius: 4px;
        margin: 0 10px 7px 0;
      }

      .chatbox .chat p {
        white-space: normal;
        word-wrap: break-word;
        padding: 12px 16px;
        border-radius: 10px 10px 0 10px;
        max-width: 75%;
        color: #fff;
        font-size: 0.95rem;
        background: #568912;
      }

      .chatbox .chat p.error {
        color: #721c24;
        background: #f8d7da;
      }

      .chatbox .incoming p {
        color: #000;
        background: #f2f2f2;
        border-radius: 10px 10px 10px 0;
      }

      .chatbot .chat-input {
        display: flex;
        gap: 5px;
        position: absolute;
        bottom: 0;
        width: 100%;
        background: #fff;
        padding: 3px 20px;
        border-top: 1px solid #ddd;
      }

      .chat-input textarea {
        height: 55px;
        width: 100%;
        border: none;
        outline: none;
        resize: none;
        max-height: 180px;
        padding: 15px 15px 15px 0;
        font-size: 0.95rem;
      }

      .chat-input span {
        align-self: flex-end;
        color: #568912;
        cursor: pointer;
        height: 55px;
        display: flex;
        align-items: center;
        visibility: hidden;
        font-size: 1.35rem;
      }

      .chat-input textarea:valid~span {
        visibility: visible;
      }

      .options-container {
        display: flex;
        justify-content: center;
        gap: 5px;
        /* Adds space between buttons */
        margin-top: 5px;
        /* Adds some space above the button container */
        margin-bottom: 1rem;
      }

      .options-sentence {
        font-size: 0.7rem;
        /* Example font size, adjust as needed */
        color: #333;
        /* Example text color, adjust as needed */
        margin-bottom: 10px;
        /* Ensure there's some space before the buttons */
      }

      .option-button {
        padding: 0px 5px;
        font-size: 0.7rem;
        border-radius: 5px;
        cursor: pointer;
        background-color: transparent;
        border: 2px solid transparent;
        transition: background-color 1s, border-color 0.3s;
      }

      /* Individual styles for each button to have different border colors */
      .option-button:nth-child(1) {
        border-color: #007bff;
      }

      .option-button:nth-child(2) {
        border-color: #caa228;
      }

      .option-button:nth-child(3) {
        border-color: #3e9c54;
      }

      .option-button:hover {
        background-color: #e2e6ea;
        /* Darker grey on hover */
      }

      @media (max-width: 490px) {
        .chatbot-toggler {
            right: auto;
            bottom: auto;
            position: static;
            /* Let it flow within the menu bar */
            margin: 0;
        }
    
        .chatbot {
            right: auto;
            bottom: auto;
            height: 100%;
            border-radius: 0;
            width: 100%;
        }
    
        .chatbot .chatbox {
            height: 90%;
            padding: 25px 15px 100px;
        }
    
        .chatbot .chat-input {
            padding: 5px 15px;
        }
    
        .chatbot header span {
            display: block;
        }

</style>



<!-- Chat window -->
<div id="body">
  <div class = "window-container">
      <!-- Chat button -->
      <button class="chatbot-toggler">
        <span class="material-symbols-rounded">Chat</span>
        <span class="material-symbols-outlined">Close</span>
      </button>
      <div class="chatbot">
          <header>
            <h2>Digital Assistant</h2>
            <span class="close-btn material-symbols-outlined">Close</span>
          </header>
          <ul class="chatbox">
            <li class="chat incoming">
              <span class="material-symbols-outlined">smart_toy</span>
              <p>Hi there 👋<br>How can I help you today?</p>
            </li>
          </ul>
          <div class="chat-input">
            <textarea placeholder="Enter a message..." spellcheck="true" required></textarea>
            <span id="send-btn" class="material-symbols-rounded">send</span>
          </div>
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
      let userMessage = null; // Variable to store user's message

    }
    async connectedCallback() {
      //this.initMain();
    }
    async initMain() {
      /*------------------------------- Digital Chat ----------------------------------------- */

      const chatbotToggler = this.shadowRoot.querySelector(".chatbot-toggler");
      const closeBtn = this.shadowRoot.querySelector(".close-btn");
      const chatInput = this.shadowRoot.querySelector(".chat-input textarea");
      const sendChatBtn = this.shadowRoot.querySelector(".chat-input span");
      
      
      const API_KEY = "PASTE-YOUR-API-KEY"; // Paste your API key here
      

      chatbotToggler.addEventListener("click", () => {
        this.toggleChatBot();
        const class_1 = this.shadowRoot.getElementById("body");
        console.log(class_1.classList);
      });

      closeBtn.addEventListener("click", () => {
        const class_1 = this.shadowRoot.getElementById("body");
        class_1.classList.toggle("show-chatbot");
      });

      chatInput.addEventListener("input", () => {
        // Adjust the height of the input textarea based on its content
        chatInput.style.height = 'auto';
        chatInput.style.height = `${chatInput.scrollHeight}px`;
      });

      chatInput.addEventListener("keydown", (e) => {
        // If Enter key is pressed without Shift key and the window 
        // width is greater than 800px, handle the chat
        if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
          e.preventDefault();
          this.handleChat();
        }
      });

      sendChatBtn.addEventListener("click", this.handleChat);  
 
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
      this.shadowRoot.querySelector(".chatbox").appendChild(chatLi); 

      chatLi.classList.add("chat", `${className}`);
      let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
      chatLi.innerHTML = chatContent;
      chatLi.querySelector("p").textContent = message;
      return chatLi; // return chat <li> element
    }

    generateResponse = async (chatElement, optionBtn) => {
      let apiUrl = null;
      let response = null;

      const chatbox = this.shadowRoot.querySelector(".chatbox");
      const inputParameters = { user_prompt: this.userMessage };
      const apiConfig = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer sc9as24jlpp7994x'
        },
        body: JSON.stringify(inputParameters)
      };
      
      const messageElement = chatElement.querySelector("p");
      messageElement.textContent = "Thinking...";

      switch (optionBtn) {
        case 'Dashboard Navigation':
          apiUrl = "https://hda-friendly-reporting.me.sap.corp/api/v1/llms/navigation";

          response = await fetch(apiUrl, apiConfig);
          if (!response.ok) {
            messageElement.classList.add("error");
            messageElement.textContent = `Something went wrong. Fetch Error: ${error}`;
            throw new Error('Network response was not ok');
          } else {
            const data = await response.json();
            // Interpret HTML tags in the output_guide
            messageElement.innerHTML = DOMPurify.sanitize(data.output_guide);
          }
          chatbox.scrollTo(0, chatbox.scrollHeight);
          break;
        case 'Conceptual Question':
          apiUrl = "https://hda-friendly-reporting.me.sap.corp/api/v1/llms/documentation_qa";

          response = await fetch(apiUrl, apiConfig);
          if (!response.ok) {
            messageElement.classList.add("error");
            messageElement.textContent = `Something went wrong. Fetch Error: ${error}`;
            throw new Error('Network response was not ok');
          } else {
            const data = await response.json();
            messageElement.textContent = data.documentation;
          }
          chatbox.scrollTo(0, chatbox.scrollHeight);
          break;
        case 'Data Analytics':
          apiUrl = "https://hda-friendly-reporting.me.sap.corp/api/v1/llms/nlq";

          response = await fetch(apiUrl, apiConfig);
          if (!response.ok) {
            messageElement.classList.add("error");
            messageElement.textContent = `Something went wrong. Fetch Error: ${error}`;
            throw new Error('Network response was not ok');
          } else {
            const data = await response.json();
            messageElement.textContent = data.answer;
          }
          chatbox.scrollTo(0, chatbox.scrollHeight);
          break;
        default:
          messageElement.textContent = "Option not recognized.";
          break;
      }
    }

    toggleChatBot() {
      const isChatBotVisible = this.shadowRoot.getElementById("body").classList.contains("show-chatbot");
      console.log("is chat bot visible (before): ", isChatBotVisible);
      this.shadowRoot.getElementById("body").classList.toggle("show-chatbot", !isChatBotVisible);
      console.log("is chat bot visible (after): ", !isChatBotVisible);
    }

    //this.shadowRoot done
    handleChat = () => {
      const chatInput = this.shadowRoot.querySelector(".chat-input textarea");
      this.userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
      if (!this.userMessage) return;

      // Clear the input textarea and set its height to default
      chatInput.value = "";
      chatInput.style.height = `${chatInput.scrollHeight}px`;

      // Append the user's message to the chatbox
      const chatbox = this.shadowRoot.querySelector(".chatbox");
      chatbox.appendChild(this.createChatLi(this.userMessage, "outgoing"));
      chatbox.scrollTo(0, chatbox.scrollHeight);

      // remove option buttons if they already exist
      if (this.shadowRoot.querySelector(".options-container")) { this.shadowRoot.querySelector(".options-container").remove(); }
      this.appendOptionButtons();

    }

    //this.shadowRoot done
    // Function to append 'intention' buttons
    appendOptionButtons = () => {
      const chatbox = this.shadowRoot.querySelector(".chatbox");
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

      chatbox.appendChild(optionsContainer);
      chatbox.scrollTo(0, chatbox.scrollHeight);
    }

    //this.shadowRoot done
    // Handle option button click
    handleOptionClick = (option) => {
      const chatbox = this.shadowRoot.querySelector(".chatbox");
      const incomingChatLi = this.createChatLi("", "incoming");
      chatbox.appendChild(incomingChatLi);
      chatbox.scrollTo(0, chatbox.scrollHeight);

      // Remove intention buttons after selection
      this.shadowRoot.querySelector(".options-container").remove();

      this.generateResponse(incomingChatLi, option);
    }

  }
  customElements.define("external-friendly-reporting-chat-widget", Widget);
})();