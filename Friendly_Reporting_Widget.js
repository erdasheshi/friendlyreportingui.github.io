(function () {
  let template = document.createElement("template");
  template.innerHTML = `

<style>
    :host {}

    @import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css";
    @import "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0";
    @import "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,1,0"

    html {
      overflow-y: scroll;
  }

  body {
      overflow-y: scroll;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      margin: 0;
      background-color: black;
  }

  .window-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
      /* Adjust the space between elements */
  }

  /* Style for the container */
  div {
      overflow-y: auto;
      margin: 0.5rem auto;
      max-width: 100%;
      width: 100%;
  }

  .container {
      font-family: Arial, sans-serif;
      margin: 20px;
  }

  .title {
      font-family: Arial, sans-serif;
      color: #e28100;
      text-align: center;
  }

  /*------------------------- ChatBot -------------------------*/

  /* Import Google font - Poppins */
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

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
  body.show-chatbot .chatbot-toggler span:nth-child(1) {
      opacity: 0;
  }

  body.show-chatbot .chatbot-toggler span:nth-child(2) {
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

  body.show-chatbot .chatbot {
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
      padding: 30px 20px 100px;
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

  .chatbox .incoming p {
      border-radius: 10px 10px 10px 0;
  }

  .chatbox .chat p.error {
      color: #721c24;
      background: #f8d7da;
  }

  .chatbox .incoming p {
      color: #000;
      background: #f2f2f2;
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
  }

  /*------------------------- MenuBar -------------------------*/

  .menu-bar {
      background-color: transparent;
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      padding-top: 1%;
          }

  .menu-btn {
      padding: 5px 15px;
      color: rgb(182, 134, 21);
      background-color: transparent;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      font-size: 1rem;
      margin-bottom: 4px;
      /* Space between icon and text */

  }

  .menu-btn:hover,
  .menu-btn:focus {
      background-color: rgba(0, 123, 255, 0.207);
      /* Button's background on hover/focus */
      color: #0057b3;
      /* Icon color */
  }

  .menu-btn .btn-text {
      font-size: 12px;
      /* Text size, adjust as needed */
  }

  /*------------------------- ??????????????????-------------- -------------------------*/

  .section {
      margin-bottom: 20px;
  }

  .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: rgb(232, 171, 17)
  }

  .section-header h2 {
      margin: 0;
      /* Remove default margin to eliminate space around the title */
      color: rgb(232, 171, 17)
  }

  hr {
      border: 0;
      height: 1px;
      background-color: #ccc;
      /* Light grey horizontal line */
      margin-top: 10px;
      /* Adjust if necessary to control space between line and header */
      margin-bottom: 10px;
      /* Adjust if necessary to control space between line and content below */
  }

  .expandable-content {
      margin-top: 10px;
  }

  .hidden {
      display: none;
  }

  /* Styling for the new container */
  .additional-container {
      padding: 20px;
      background-color: #f0f0f0;
      /* Light background for visibility */
      margin-top: 20px;
      /* Space from the sections above */
  }

  /* Reset float for elements after floated items */
  .clearfix::after {
      content: "";
      display: table;
      clear: both;
  }

  /*------------------------- Insight Headers -------------------------*/

  /*    #favorites-section h2,
  #all-insights-section h2 {
      display: inline-block;
      margin-right: 10px;
      margin-bottom: 0;
  }*/

  #add-item-btn,
  #all-items-btn {
      float: right;
      margin-top: -1.3rem;
      /* Adjust based on your layout to align properly */
      background-color: transparent;
      border: transparent;
      color: blue;
      opacity: 1;
      /* Just in case */
      visibility: visible;
      /* Just in case */
  }

  /*------------------------- Insights -------------------------*/

  /* Style for the insights, title and list */
  .insights-section {
      display: block;
      max-height: 80%;
      /* Example fixed height */
      border-top: 0.2px solid #4f4c4c;
      margin-bottom: 10px;
      margin: 0 auto;
      align-items: center;
      padding: 1% 4%;
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  }

  .button-title-container {
      display: flex;
      align-items: center;
  }

  .insight-expand-btn {
      cursor: pointer;
      background-color: #33260b00;
      color: rgb(182, 134, 21);
      border: none;
      border-radius: 5px;
      padding: 5px 10px;
      margin-right: 10px;
      font-size: 22px;
      vertical-align: bottom;
  }

  .insight-element {
      border-bottom: 0.2px solid #4f4c4c;
      margin-bottom: 10px;
  }

  .insight-body-text {
      display: none;
      color: #cac5c5;
  }

  .insights-title {
      font-family: Arial, sans-serif;
      color: rgb(222, 209, 171);
      font-weight: bold;
  }

  /* Style for the read insights button image */
  .img-read-insights {
      height: 30px;
  }

  /* Style for insights container*/
  .insights-container {
      top: auto;

      position: absolute;
      display: flex;
      align-items: center;
      width: 88%;
  }

  /* Style for the button */
  #insights-button {
      padding: 2%;
      font-size: 85%;
      background-color: #00709f;
      color: #fff;
      border: none;
      border-radius: 1rem;
      cursor: pointer;
  }

  #read-insights-button {
      padding: 1%;
      background-color: #3a393b;
      border-radius: 50%;
      border: 0;
  }

  /*------------------------- User Feedback -------------------------*/

  .favorite-button,
  .favorite-button span {
      cursor: pointer;
      background-color: #33260b00;
      color: rgb(182, 134, 21);
      border: none;
      padding: 1px 0px 0px 10px;
      font-size: 22px;
  }

  .thumbs-up,
  .thumbs-up span {
      color: rgba(0, 128, 0, 0.601);
      background-color: transparent;
      border: none;
      padding: 1px 2px;
      font-size: 22px;
  }

  .thumbs-down,
  .thumbs-down span {
      color: rgba(255, 0, 0, 0.763);
      background-color: transparent;
      border: none;
      border-radius: 5px;
      padding: 1px 2px;
      font-size: 22px;
      padding-right: 10px;
  }

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
      let shadowRoot = this.attachShadow({
        mode: "open"
      });
      shadowRoot.appendChild(template.content.cloneNode(true));
      this._props = {};
    }
    async connectedCallback() {
      this.initMain();
    }
    async initMain() {

    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css';
    this.shadowRoot.appendChild(link);


    let link_2 = document.createElement('link');
    link_2.rel = 'stylesheet';
    link_2.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0';
    this.shadowRoot.appendChild(link_2);


    let link_3 = document.createElement('link');
    link_3.rel = 'stylesheet';
    link_3.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,1,0';
    this.shadowRoot.appendChild(link_3);

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
      this.chatbox.scrollTo(0, chatbox.scrollHeight);

      // Remove intention buttons after selection
      this.shadowRoot.querySelector(".options-container").remove();

      this.generateResponse(incomingChatLi, option);
    }

    appendStyleLink(href) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      this.shadowRoot.appendChild(link);
    }

  }
  customElements.define("external-friendly-reporting-widget", Widget);
})()
  ;