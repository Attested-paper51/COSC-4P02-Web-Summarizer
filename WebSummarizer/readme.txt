Setting Up Your OpenAI API Key for the Flask Web App

To effectively develop, test, and work on our Flask web application that integrates OpenAI's API for text summarization, each group member will need to set up their own OpenAI API key. This document provides a step-by-step guide on how to obtain an API key from OpenAI and configure it for use with our Flask app.

Step 1: Creating an OpenAI Account (if you don't already have one)

    Go to OpenAI's website and click on the "Sign Up" button.
    Follow the prompts to create a new account. You will need to provide an email address and create a password.
    After signing up, you may be asked to verify your email address. Please check your email inbox and follow the verification link.

Step 2: Generating an API Key

    Once your account is set up and you're logged in, on the left side tab, click on API keys and then click on "+ Create new secrete key" button to generate a new key.
    A new API key will be created and displayed to you. Copy this key and keep it secure; you will not be able to see it again.

Step 3: Configuring the Flask Web App

    On your local machine, locate the .env file in the root directory of our Flask web app project. If the file doesn't exist, create it.

    Add the following line to the .env file, replacing YOUR_API_KEY_HERE with the API key you obtained from OpenAI:


    OPENAI_API_KEY=YOUR_API_KEY_HERE

    Save the .env file. The Flask app is now configured to use your OpenAI API key.

Step 4: Running the Flask App

    Open a terminal or command prompt.

    Navigate to the directory where our Flask app is located.

    Run the app by executing the following command:

    python3 WebApp.py

    You can also run the app from your IDE, on Pycharm (what im using), at the top right is the run button (green play button)

    The Flask app should start, and you can access it by going to http://127.0.0.1:5000 in your web browser.

Additional Notes

    Security: Keep your API key private and do not share it in the codebase or with unauthorized individuals.
    Usage Limits: Be aware of OpenAI's usage limits and pricing. Extensive testing or development work may incur costs.
    Collaboration: Coordinate with team members to ensure that API usage is distributed and that we stay within budget limits.


Using the summarizer:

To summarize your content, simply paste or type it in the text field, and press the summarize button, to summarize it.