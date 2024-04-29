<h1>COSC 4P02 PROJECT</h1><br>
<h2>SOFTWARE: Web Summarizer and shortner</h2><br>

<h3>Team and Project Information:</h3>
<h4>TEAM MEMBERS:</h4>
<ul>
<li>Amani Anderson (6617344) aa18ex@brocku.ca </li><br>
<li>Muhammed Bilal (6695738) bb18hb@brocku.ca </li><br>
<li>Tanvir Hasan (6599328) th18ai@brocku.ca </li><br>
<li>Marium Nur (7327182) mn21xu@brocku.ca </li><br> 
<li>Anjali Sabu	(7337033)	as21qj@brocku.ca </li><br>
<li>Hamza Sidat (6599591) hs18so@brocku.ca </li><br>
<li>Abdul-Maalik Siddiqui (6785828) as19fa@brocku.ca </li><br>
</ul>

<h4>What was your motivation?:</h4>
This project aims to address the challenges users face in accessing relevant information efficiently in the digital age. Navigating through the vast amount of information available online without efficient technologies that provide concise summaries makes information retrieval a daunting task. To simplify access to information, the proposed tool aims to generate shorter URLs for easy sharing and provide succinct and insightful content summaries while employing LLMs or NLP, thus hoping to contribute to a more streamlined and user-friendly digital experience.

<h4>What problem does it solve?:</h4>
When looking for quick access to relevant material in the age of technology, people may find it overwhelming due to the huge amount of information available online. Long URLs are difficult to navigate, and the lack of concise summaries may make it more difficult to understand information properly. It is obvious that to improve user experience and make information retrieval simpler, a tool that can create concise summaries and shorten URLs will be required.

<h4>What is our objective?:</h4>
The objective is to create a program where the input would be a YouTube video or a webpage URL and the output would include a shorter URL for simple sharing. Additionally, the tool will make use of Large Language Models (LLMs) or Natural Language Processing (NLP) to provide short and insightful summaries of web content. Both free and premium aspects of the application would be available, such as user dashboard, social media integration, API access, and custom summarization levels.


# Getting Started with the Frontend Setup

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project's `WebSummarizerShortener/client/my-react-app` directory, you can:

## Step 1: Install node_modules

Installs node_modules which contains the required libraries for the shortify application.\
In the project’s frontend directory stated above, type the following command:
```bash
npm install
```

## Step 2: Other installations

Installs additional required libraries for the shortify application.\
Stay in the project's `client/my-react-app` directory. Then type the following commands to install the up-to-date UI libraries:
```bash
npm install react-router-dom
npm install react-icons
npm install @mui/material @emotion/react @emotion/styled
npm install react-multi-carousel —save
npm install @fortawesome/react-fontawesome
npm install gapi-script
npm install jwt-decode
npm install --save-dev jest
```

## Step 3: Run the App on the Frontend

Runs the app on the development server.\
Stay in the project's  `client/my-react-app` directory. Then type the following command:
```bash
npm start
```

## Additional Steps: Testing

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

First, navigate to the project's `client/my-react-app` directory. Then use the following command:
```bash
npm test
```

##


# Backend Setup Instructions

## Step 1: Create a Virtual Environment

First, navigate to the project's `WebSummarizerShortner` directory. Then, create a virtual environment using the following command:
```bash
python -m venv venv
```
This command creates a new directory named `venv` where the virtual environment is stored. You can replace `venv` with any name you prefer for your virtual environment.

## Step 2: Activate the Virtual Environment

Before installing any packages, you need to activate the virtual environment. The activation command differs based on your operating system:

- On Windows:
  ```cmd
  venv\Scripts\activate.bat
  ```
- On macOS/Linux:
  ```bash
  source venv/bin/activate
  ```

You'll know the virtual environment is activated because its name will appear at the beginning of the terminal prompt.

## Step 3: .gitignore

In the `WebSummarizerShortner` directory, if there isn’t one already, create a `.gitignore` file and add:
```
/venv
```
Save the file after adding the entry.

## Step 4: Install Requirements

With the virtual environment activated, install the necessary packages. If you have a `requirements.txt` file, you can install all the required packages with:
```bash
pip install -r requirements.txt
```

## Step 5: Run Python Files

Now you can run the `server.py` file after navigating to the server directory, run the file in the activated venv:
```bash
python server.py
```

## Create your own OpenAI API Key

### Step 1: Create an OpenAI API Key

Go to the OpenAI API website and log in or create an account if you don't have one. Once logged in, you will find an API keys section on the left-hand side. There, create a new secret key, and copy it, making sure to copy it since you won't be able to view it again. (Make a new key if you didn’t copy).

### Step 2: Save the API Key to a .env File

Navigate to the server directory in your project:
```bash
cd path/to/your/project/WebSummarizerShortner/server
```
Create a new `.env` file if it doesn't already exist:
```bash
touch .env
```
Open the `.env` file in a text editor and add your API key in the following format:
```
OPENAI_API_KEY='your_api_key_here'
```
Replace `your_api_key_here` with the actual API key you obtained from OpenAI. Make sure the key is in quotes.

### Step 3: Update .gitignore

Navigate to the `WebSummarizerShortner` directory and update your `.gitignore` with the new `.env` entry:
```
/server/.env
```
