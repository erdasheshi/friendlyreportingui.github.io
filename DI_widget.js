(function () {
    let template = document.createElement("template");
    template.innerHTML = `
  
  <style>
  
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
  
        /*------------------------- MenuBar -------------------------*/
  
        .menu-bar {
          background-color: transparent;
          display: flex;
          width: 70%;
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
          display: block;
          font-size: 1.2rem;
          /* Text size, adjust as needed */
        }

        .di-menu-wrapper img{
            display: inline;
            width: 5%;
            height: auto;
        }

        .btn-wrapper img{
            width: 5%;
            height: auto;
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
  
        #favorites-header h2,
        #all-insights-section h2 {
          display: inline-block;
          margin-right: 10px;
          margin-bottom: 0;
          color: rgb(232, 171, 17);
        }

        .header h2 {
            font-size: 1.4rem;
            color: white;
        }
  
        .fav-items-btn,
        .all-items-btn {
          cursor: pointer;
          float: right;
          display: flex;
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

        .expand {
            content:url("https://erdasheshi.github.io/friendlyreportingui.github.io/DI_expand.png");
        }

        .collapse {
            content:url("https://erdasheshi.github.io/friendlyreportingui.github.io/DI_collapse.png");
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

        #all-insights-container
        .expand {
          visibility: hidden;
        }
        #all-insights-container
        .collapse {
          visibility: visible;
        }
        #favorite-insights-container
        .expand {
          visibility: hidden;
        }
        #favorite-insights-container
        .collapse {
          visibility: visible;
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

        .thumbs-up-img {
            content:url("https://erdasheshi.github.io/friendlyreportingui.github.io/DI_thumbs_up.png");
        }

        .thumbs-down-img {
            content:url("https://erdasheshi.github.io/friendlyreportingui.github.io/DI_thumbs_down.png");
        }

        .add-favorite-img {
            content:url("https://erdasheshi.github.io/friendlyreportingui.github.io/DI_add_favorite.png");
        }

        .favorite-img {
            content:url("https://erdasheshi.github.io/friendlyreportingui.github.io/DI_favorite.png");
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
          <div class="favourites">
              <div class="favorites-header">
                  <h2>Favorites</h2>
                  <button class="fav-items-btn btn-wrapper">
                    <img class="expand"/>
                  </button>
                  <hr>
              </div>
              <div id="favorite-insights-container"></div>
          </div>
          <div class="all-insights">
              <div class="all-insights-section">
                <h2>All Insights</h2>
                <button class="all-items-btn btn-wrapper">
                <img class="expand"/>
                </button>
                <hr>
              </div>
              <div id="all-insights-container"></div>
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
        // this.initMain();
      }
      async initMain() {
  
  
        /*------------------------------- Favorites & ALL Insights ----------------------------------------- */
        const allInsightsContainer = this.shadowRoot.querySelector('#all-insights-container');
        const favoriteInsightsContainer = this.shadowRoot.querySelector('#favorite-insights-container');
        const allInsightsExpander = this.shadowRoot.querySelector(".all-items-btn");
        const favInsightsExpander = this.shadowRoot.querySelector(".fav-items-btn");

        console.log("insights container : ", allInsightsContainer);
        console.log("insights expander : ", allInsightsExpander);
        console.log("fav container : ", favoriteInsightsContainer);
        console.log("fav expander : ", favInsightsExpander);

  
        this.fetchInsights().catch(error => console.error('Error:', error));
  
        /*------------------------------- Create Menu Bar ----------------------------------------- */
  
        const searchBtn = document.createElement("button");
        searchBtn.textContent = "Search";
        searchBtn.className = 'menu-btn';
        searchBtn.innerHTML = `<span class="di-menu-wrapper">
         <img src="https://erdasheshi.github.io/friendlyreportingui.github.io/DI_search.png"/>
        </span>
        <span class="btn-text">Search</span>`;
        // Add event listener for search button functionality
        searchBtn.addEventListener("click", () => {
          console.log("Search button clicked");
        });
  
        const infoBtn = document.createElement("button");
        infoBtn.textContent = "Information";
        infoBtn.className = 'menu-btn';
        infoBtn.innerHTML = `<span class="di-menu-wrapper">
        <img src="https://erdasheshi.github.io/friendlyreportingui.github.io/DI_info.png"/>
       </span>
       <span class="btn-text">Info</span>`;
        // Add event listener for search button functionality
        infoBtn.addEventListener("click", () => {
          const url = 'https://pages.github.tools.sap/HANA-Cloud-QA-Delivery/Docs/Quality_Delivery_Reporting/Overview/';
          window.open(url, '_blank');    // Implement search functionality here
        });
  
        const supportChannelBtn = document.createElement("button");
        supportChannelBtn.textContent = "Support Channel";
        supportChannelBtn.className = 'menu-btn';
        supportChannelBtn.innerHTML = `<span class="di-menu-wrapper">
        <img src="https://erdasheshi.github.io/friendlyreportingui.github.io/DI_support.png"/>
       </span>
       <span class="btn-text">Contact</span>`;
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
  
       
        menuBar.appendChild(infoBtn);
        menuBar.appendChild(searchBtn);
        menuBar.appendChild(supportChannelBtn);



        allInsightsExpander.addEventListener("click", () => {
            this.toggleExpansion(allInsightsExpander);
            this.toggleExpansion(allInsightsContainer);
        });

        favInsightsExpander.addEventListener("click", () => {
          this.toggleExpansion(favInsightsExpander);
          this.toggleExpansion(favoriteInsightsContainer);
        });
  
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

      toggleExpansion(focusElement){
        const isExpand = focusElement.classList.contains("expand");
        if (isExpand) {
            focusElement.classList.remove("expand");
            focusElement.classList.add("collapse");
        } else {
            focusElement.classList.remove("collapse");
            focusElement.classList.add("expand");
        }
      }

  
      //this.shadowRoot done
      populateInsightsUI(data) {
        const favoriteInsightsContainer = this.shadowRoot.querySelector('#favorite-insights-container');
        data.forEach(item => {
          const allInsightsContainer = this.shadowRoot.querySelector('#all-insights-container');

          const itemElement = document.createElement('div');
          itemElement.className = 'insight-element';
          allInsightsContainer.appendChild(itemElement); /////////////// Is this needed ???  it's attached to favoriteInsightsContainer////////////
  
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
          button.className = 'btn-wrapper insight-expand-btn';
          button.innerHTML = '<img class="expand"/>';
          buttonTitleContainer.appendChild(button);
  
          // Add the button-title container to the item div
          itemElement.appendChild(buttonTitleContainer);
  
          // Create the insight-body-text div and add it to the item div
          const bodyTextDiv = document.createElement('div');
          bodyTextDiv.className = 'insight-body-text';
          bodyTextDiv.innerHTML = item.content;
          itemElement.appendChild(bodyTextDiv);
            
          // Add click event listener to the button
          button.addEventListener('click', () => {
            const bodyText = button.parentNode.nextElementSibling; // Directly targets the insight-body-text div
            
          

            // Toggle body text visibility and icon class
            if (bodyText.style.display === 'none' || bodyText.style.display === '') {
                bodyText.style.display = 'block';
                const icon = button.querySelector(".expand"); // Targets the <img> element inside the button
                this.toggleExpansion(icon);
                
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
                thumbsUpAccurate.className = 'thumbs-up btn-wrapper';
                thumbsUpAccurate.innerHTML = '<img class="thumbs-up-img">';
                const thumbsDownAccurate = document.createElement('button');
                thumbsDownAccurate.className = 'thumbs-down btn-wrapper';
                thumbsDownAccurate.innerHTML = '<img class="thumbs-down-img">';
  
                feedbackContainer.appendChild(accurateLabel);
                feedbackContainer.appendChild(thumbsUpAccurate);
                feedbackContainer.appendChild(thumbsDownAccurate);
  
                // Create the favorite button
                const favoriteButton = document.createElement('button');
                favoriteButton.className = 'favorite-button btn-wrapper';
                favoriteButton.innerHTML = '<img class="add-favorite-img">';
                feedbackContainer.appendChild(favoriteButton);
  
  
                bodyText.appendChild(feedbackContainer);
                //  bodyText.parentNode.insertBefore(feedbackContainer, bodyText); // Insert the feedback container right before the bodyText
              }
            } else {
                const icon = button.querySelector(".collapse");
                this.toggleExpansion(icon);
                bodyText.style.display = "none";
            }
            itemElement.appendChild(bodyText);
          });
  
          // Append the item div to the container
          allInsightsContainer.appendChild(itemElement);
        });

      }
    }
    customElements.define("external-di-widget", Widget);
  })();