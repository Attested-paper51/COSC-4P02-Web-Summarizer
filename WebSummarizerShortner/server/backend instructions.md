# Project Setup Instructions

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
