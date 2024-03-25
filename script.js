/*------------------------------- Favorites & ALL Insights ----------------------------------------- */
const allInsightsContainer = document.querySelector('#all-insights-container');
const favoriteInsightsContainer = document.querySelector('#favorite-insights-container');

/*------------------------------- Insight Content ----------------------------------------- */
// This is working fine
class InsightsFetcher {
    constructor(apiUrl, containerSelector) {
        this.apiUrl = apiUrl;
        this.container = document.querySelector(containerSelector);
    }

    async fetchInsights() {
        try {
            const response = await fetch(this.apiUrl, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer sc9as24jlpp7994x'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            this.populateInsightsUI(data.insights);
        } catch (error) {
            console.error('Error fetching insights:', error);
        }
    }

    populateInsightsUI(insights) {
        insights.forEach(insight => this.createInsightElement(insight));
    }

    createInsightElement(insight) {
        const itemElement = document.createElement('div');
        itemElement.className = 'insight-element';

        itemElement.innerHTML = `
            <div class="button-title-container">
                <div class="insights-title">${insight.insight}</div>
                <button class="insight-expand-btn"><i class="fas fa-chevron-right"></i></button>
            </div>
            <div class="insight-body-text">${insight.content}</div>
        `;

        const button = itemElement.querySelector('.insight-expand-btn');
        button.addEventListener('click', () => this.toggleInsightContent(itemElement));

        this.container.appendChild(itemElement);
    }

    toggleInsightContent(itemElement) {
        const bodyText = itemElement.querySelector('.insight-body-text');
        const isVisible = bodyText.style.display === 'block';

        bodyText.style.display = isVisible ? 'none' : 'block';
        const icon = itemElement.querySelector('.insight-expand-btn i');
        icon.className = isVisible ? 'fas fa-chevron-right' : 'fas fa-angle-down';

        if (!isVisible) this.addFeedbackControls(bodyText);
    }

    addFeedbackControls(bodyText) {
        if (bodyText.querySelector('.feedback')) return;

        const feedbackContainer = document.createElement('div');
        feedbackContainer.className = 'feedback';
        feedbackContainer.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: flex-start; gap: 10px;">
                <span style="color: rgb(182, 134, 21);">Accurate: </span>
                <button class="thumbs-up"><span class="material-symbols-outlined">thumb_up</span></button>
                <button class="thumbs-down"><span class="material-symbols-outlined">thumb_down</span></button>
                <button class="favorite-button"><span class="material-symbols-outlined">star</span></button>
            </div>
        `;

        bodyText.appendChild(feedbackContainer);
    }
}

const insightsFetcher = new InsightsFetcher('https://hda-friendly-reporting.me.sap.corp/api/v1/insights', '#favorite-insights-container');
insightsFetcher.fetchInsights();


/*------------------------------- Digital Chat ----------------------------------------- */

// the intermediate text doesn't show up while an answer is being generated

class ChatBot {
    constructor() {
        this.initializeElements();
        this.registerEventListeners();
    }

    initializeElements() {
        this.chatbotToggler = document.querySelector(".chatbot-toggler");
        this.closeBtn = document.querySelector(".close-btn");
        this.chatbox = document.querySelector(".chatbox");
        this.chatInput = document.querySelector(".chat-input textarea");
        this.sendChatBtn = document.querySelector(".chat-input span");
        this.inputInitHeight = this.chatInput.scrollHeight;
    }

    registerEventListeners() {
        this.sendChatBtn.addEventListener("click", () => this.handleChat());
        this.chatInput.addEventListener("input", () => this.adjustInputHeight());
        this.chatInput.addEventListener("keydown", (e) => this.handleEnterPress(e));
        this.closeBtn.addEventListener("click", () => this.toggleChatBot());
        this.chatbotToggler.addEventListener("click", () => this.toggleChatBot());
    }

    adjustInputHeight() {
        this.chatInput.style.height = 'auto';
        this.chatInput.style.height = `${this.chatInput.scrollHeight}px`;
    }

    handleEnterPress(e) {
        if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
            e.preventDefault();
            this.handleChat();
        }
    }

    handleChat() {
        const userMessage = this.chatInput.value.trim();
        if (!userMessage) return;

        this.chatInput.value = "";
        this.adjustInputHeight();
        this.appendMessage(userMessage, "outgoing");
        this.appendOptionButtons();
    }

    appendMessage(message, className) {
        const chatLi = document.createElement("li");
        chatLi.classList.add("chat", className);
        chatLi.innerHTML = className === "outgoing" ?
            `<p>${message}</p>` :
            `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
        this.chatbox.appendChild(chatLi);
        this.chatbox.scrollTo(0, this.chatbox.scrollHeight);
    }

    appendOptionButtons() {
        const existingOptionsContainer = this.chatbox.querySelector(".options-container");
        if (existingOptionsContainer) existingOptionsContainer.remove();

        const options = ['Dashboard Navigation', 'Conceptual Question', 'Data Analytics'];
        const optionsContainer = document.createElement("div");
        optionsContainer.className = "options-container";
        options.forEach(option => {
            const button = document.createElement("button");
            button.textContent = option;
            button.className = "option-button";
            button.addEventListener("click", () => this.handleOptionClick(option));
            optionsContainer.appendChild(button);
        });

        this.chatbox.appendChild(optionsContainer);
        this.chatbox.scrollTo(0, this.chatbox.scrollHeight);
    }

    handleOptionClick(option) {
        this.appendMessage("", "incoming");
        this.generateResponse(option);
    }

    async generateResponse(optionBtn) {
        const apiUrl = this.getApiUrl(optionBtn);
        if (!apiUrl) {
            this.appendMessage("Option not recognized.", "incoming");
            return;
        }

        const userMessage = this.chatInput.value.trim();
        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer sc9as24jlpp7994x'
                },
                body: JSON.stringify({ user_prompt: userMessage })
            });

            if (!response.ok) throw new Error(`Fetch Error: ${response.statusText}`);

            const data = await response.json();
            this.handleApiResponse(data, optionBtn);
        } catch (error) {
            console.error('Error:', error);
            this.appendMessage(`Something went wrong: ${error.message}`, "incoming");
        }
    }

    getApiUrl(option) {
        switch (option) {
            case 'Dashboard Navigation':
                return "https://example.com/api/v1/llms/navigation";
            case 'Conceptual Question':
                return "https://example.com/api/v1/llms/documentation_qa";
            case 'Data Analytics':
                return "https://example.com/api/v1/llms/nlq";
            default:
                return null;
        }
    }

    handleApiResponse(data, optionBtn) {
        // Logic to handle API response based on the option and display the result
        const message = this.extractMessageFromResponse(data, optionBtn);
        this.appendMessage(message, "incoming");
    }

    extractMessageFromResponse(data, optionBtn) {
        // Extract and return the relevant message from the response data based on the option
        // This is a placeholder for actual logic to interpret and format the response data
        return "Response message here";
    }

    toggleChatBot(shouldShow) {
        const isChatBotVisible = document.body.classList.contains("show-chatbot");
        document.body.classList.toggle("show-chatbot", !isChatBotVisible);
    }
}

new ChatBot();

/*------------------------------- Create Menu Bar ----------------------------------------- */
// this is working fine
class MenuBar {
    constructor() {
        this.menuBar = document.querySelector(".menu-bar");
        this.initializeButtons();
    }

    initializeButtons() {
        const buttonsData = [
            {
                text: "Search",
                icon: "search",
                action: () => console.log("Search button clicked")
            },
            {
                text: "Information",
                icon: "info",
                action: () => window.open('https://pages.github.tools.sap/HANA-Cloud-QA-Delivery/Docs/Quality_Delivery_Reporting/Overview/', '_blank')
            },
            {
                text: "Support Channel",
                icon: "perm_phone_msg",
                action: this.handleSupportChannelClick
            }
        ];

        buttonsData.forEach(buttonData => this.createButton(buttonData));
    }

    createButton({ text, icon, action }) {
        const button = document.createElement("button");
        button.className = 'menu-btn';
        button.innerHTML = `<span class="material-symbols-outlined">${icon}</span><span class="btn-text">${text}</span>`;
        button.addEventListener("click", action);
        this.menuBar.appendChild(button);
    }

    handleSupportChannelClick() {
        const emailAddress = 'DL_63E569BB8226710299FEF691@global.corp.sap';
        const subject = encodeURIComponent('Support request - Friendly Reporting');
        const mailtoLink = `mailto:${emailAddress}?subject=${subject}`;

        // Use window.location for a cleaner approach without creating a temporary element
        window.location.href = mailtoLink;
    }
}

new MenuBar();
