(function () {
  let template = document.createElement("template");
  template.innerHTML = `

<style>
@import url( 'style.css' );
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,1,0');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,1,0');


</style>
<div class="window-container">
<!-- Menu & Title -->
<div class="header">
    <h1 class="title">Data Insights</h1>
    <div class="menu-bar"></div>
</div>

<!-- Insights -->
<div class="insights-section">
    <div id="favorite-insights-container">
        <div class="favorites-header">
            <h2>Favorites</h2>
            <button id="add-item-btn">+ Add Item</button>
            <hr>
        </div>
    </div>
    <div id="all-insights-container">
        <div class="all-insights-section">
            <h2>All Insights</h2>
            <button id="all-items-btn">
                <span class="material-symbols-outlined">chevron_right</span>
            </button>
            <hr>
        </div>
    </div>
</div>

<!-- Chat button -->
<button class="chatbot-toggler">
    <span class="material-symbols-rounded">forum</span>
    <span class="material-symbols-outlined">close</span>
    <!--  <span class="chatbot-label">Digital Assistant</span> -->
</button>
<!--<span class="btn-text">Chat</span>-->

<!-- Chat window -->
<div class="chatbot">
    <header>
        <h2>Digital Assistant</h2>
        <span class="close-btn material-symbols-outlined">close</span>
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


      /*------------------------------- Favorites & ALL Insights ----------------------------------------- */
      const allInsightsContainer = this.shadowRoot.querySelector('#all-insights-container');
      const favoriteInsightsContainer = this.shadowRoot.querySelector('#favorite-insights-container');

      this.fetchInsights().catch(error => console.error('Error:', error));

      /*------------------------------- Digital Chat ----------------------------------------- */

      const chatbotToggler = this.shadowRoot.querySelector(".chatbot-toggler");
      const closeBtn = this.shadowRoot.querySelector(".close-btn");
      const chatbox = this.shadowRoot.querySelector(".chatbox");
      const chatInput = this.shadowRoot.querySelector(".chat-input textarea");
      const sendChatBtn = this.shadowRoot.querySelector(".chat-input span");
      this.shadowRoot.appendChild(chatbox);
      let userMessage = null; // Variable to store user's message
      const API_KEY = "PASTE-YOUR-API-KEY"; // Paste your API key here
      const inputInitHeight = chatInput.scrollHeight;


      chatInput.addEventListener("input", () => {
        // Adjust the height of the input textarea based on its content
        chatInput.style.height = `${inputInitHeight}px`;
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

      sendChatBtn.addEventListener("click", this.handleChat);  //////////////// might not be corret... maybe the class of the button is needed instead "document.body"////////////////
      closeBtn.addEventListener("click", () => {
        const class_1 = this.shadowRoot.querySelector("show-chatbot");
        class_1.classList.toggle("show-chatbot");
      });
      chatbotToggler.addEventListener("click", () => {
        const class_1 = this.shadowRoot.querySelector("show-chatbot");
        class_1.classList.toggle("show-chatbot");
      });


      /*------------------------------- Create Menu Bar ----------------------------------------- */

      const searchBtn = document.createElement("button");
      searchBtn.textContent = "Search";
      searchBtn.className = 'menu-btn';
      searchBtn.innerHTML = `<span class="close-btn material-symbols-outlined">search</span>
<span class="btn-text">Search</span>`;
      // Add event listener for search button functionality
      searchBtn.addEventListener("click", () => {
        console.log("Search button clicked");
      });

      const infoBtn = document.createElement("button");
      infoBtn.textContent = "Information";
      infoBtn.className = 'menu-btn';
      infoBtn.innerHTML = `<span class="close-btn material-symbols-outlined">info</span>
<span class="btn-text">Info</span>`;
      // Add event listener for search button functionality
      infoBtn.addEventListener("click", () => {
        const url = 'https://pages.github.tools.sap/HANA-Cloud-QA-Delivery/Docs/Quality_Delivery_Reporting/Overview/';
        window.open(url, '_blank');    // Implement search functionality here
      });

      const supportChannelBtn = document.createElement("button");
      supportChannelBtn.textContent = "Support Channel";
      supportChannelBtn.className = 'menu-btn';
      supportChannelBtn.innerHTML = `<span class="close-btn material-symbols-outlined">perm_phone_msg</span> 
<span class="btn-text">Support</span>`;
      supportChannelBtn.addEventListener("click", () => {

        const emailAddress = 'DL_63E569BB8226710299FEF691@global.corp.sap'; // reporting DL
        const subject = encodeURIComponent('Support request - Friendly Reporting'); // URL-encoded subject

        const mailtoLink = `mailto:${emailAddress}?subject=${subject}`;

        // Create a temporary link element and trigger a click on it to open the email client
        const tempLink = document.createElement('a');
        tempLink.href = mailtoLink;
        tempLink.style.display = 'none'; // Hide the link
        this.shadowRoot.appendChild(tempLink); // //////////////// might not be corret.. it was "document.body" //////////////////////
        tempLink.click(); // Programmatically click the link to open the email client

        // Clean up by removing the temporary link from the document
        this.shadowRoot.removeChild(tempLink); // //////////////// might not be corret.. it was "document.body" //////////////////////

      });

      // Initialize menu bar and buttons
      const menuBar = this.shadowRoot.querySelector(".menu-bar");

      menuBar.appendChild(chatbotToggler);
      menuBar.appendChild(infoBtn);
      menuBar.appendChild(searchBtn);
      menuBar.appendChild(supportChannelBtn);

      this.shadowRoot.appendChild(menuBar);
      this.shadowRoot.appendChild(chatbotToggler);


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


    /*custom function */
    /*************************** custom function ****************************/

    /*------------------------------- Insight Content -----------------------------------------*/

    async fetchInsights() {
      const apiUrl = 'https://hda-friendly-reporting.me.sap.corp/api/v1/insights';
      const apiConfig = {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer sc9as24jlpp7994x'
        },
      };

      const response = await fetch(apiUrl, apiConfig)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      this.populateInsightsUI(data.insights);

      return data.insights;
    }

    //this.shadowRoot done
    populateInsightsUI(data) {
      data.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'insight-element';
        this.shadowRoot.appendChild(itemElement); /////////////// Is this needed ???  it's attached to favoriteInsightsContainer////////////

        // Create the button-title container
        const buttonTitleContainer = document.createElement('div');
        buttonTitleContainer.className = 'button-title-container';

        // Create the title div and add it to the button-title container
        const titleDiv = document.createElement('div');
        titleDiv.className = 'insights-title';
        titleDiv.textContent = item.insight;
        buttonTitleContainer.appendChild(titleDiv);

        // Create the button and add it to the button-title container
        const button = document.createElement('button');
        button.className = 'insight-expand-btn';
        button.innerHTML = '<i class="fas fa-chevron-right"></i>';
        buttonTitleContainer.appendChild(button);

        // Add the button-title container to the item div
        itemElement.appendChild(buttonTitleContainer);

        // Create the insight-body-text div and add it to the item div
        const bodyTextDiv = document.createElement('div');
        bodyTextDiv.className = 'insight-body-text';
        bodyTextDiv.textContent = item.content;
        itemElement.appendChild(bodyTextDiv);

        // Add click event listener to the button
        button.addEventListener('click', function () {
          const bodyText = this.parentNode.nextElementSibling; // Directly targets the insight-body-text div
          const icon = this.querySelector('i'); // Targets the <i> element inside the button

          // Toggle body text visibility and icon class
          if (bodyText.style.display === 'none' || bodyText.style.display === '') {
            bodyText.style.display = 'block';
            icon.className = 'fas fa-angle-down';

            // Create additional UI elements only if they don't already exist
            if (!bodyText.querySelector('.feedback')) {

              const feedbackContainer = document.createElement('div');
              feedbackContainer.className = 'feedback';
              feedbackContainer.style.display = 'flex';
              feedbackContainer.style.alignItems = 'center';
              feedbackContainer.style.justifyContent = 'flex-start'; // Align items to the right
              feedbackContainer.style.gap = '10px'; // Space between buttons

              //"Accurate" label and buttons
              const accurateLabel = document.createElement('span');
              accurateLabel.textContent = 'Accurate: ';
              accurateLabel.style.color = 'rgb(182, 134, 21';
              const thumbsUpAccurate = document.createElement('button');
              thumbsUpAccurate.className = 'thumbs-up';
              thumbsUpAccurate.innerHTML = '<span class="material-symbols-outlined">thumb_up</span>';
              const thumbsDownAccurate = document.createElement('button');
              thumbsDownAccurate.className = 'thumbs-down';
              thumbsDownAccurate.innerHTML = '<span class="material-symbols-outlined">thumb_down</span>';

              feedbackContainer.appendChild(accurateLabel);
              feedbackContainer.appendChild(thumbsUpAccurate);
              feedbackContainer.appendChild(thumbsDownAccurate);

              // Create the favorite button
              const favoriteButton = document.createElement('button');
              favoriteButton.className = 'favorite-button';
              favoriteButton.innerHTML = '<span class="material-symbols-outlined">star</span>';
              feedbackContainer.appendChild(favoriteButton);


              bodyText.appendChild(feedbackContainer);
              //  bodyText.parentNode.insertBefore(feedbackContainer, bodyText); // Insert the feedback container right before the bodyText
            }
          } else {
            bodyText.style.display = 'none';
            icon.className = 'fas fa-chevron-right';
          }
          this.shadowRoot.appendChild(bodyText);
        });

        // Append the item div to the container
        this.favoriteInsightsContainer.appendChild(itemElement);
      });
    }

    /*------------------------------- Digital Chat ----------------------------------------- */

    //this.shadowRoot done
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

    //this.shadowRoot done
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

    //this.shadowRoot done
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
  customElements.define("external-friendly-reporting-widget", Widget);
})()
  ;