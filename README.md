# Photobooth

**Photobooth** is a project consisting of a React front-end application and a Python Flask API. The project includes functionality for image background removal, with an easy-to-use batch script for launching both the frontend and backend.

## Project Structure

```plaintext
.
├── .git/                  # Git configuration and history (for version control)
├── bg-remover/            # Background remover Flask app (Python)
├── download-site/         # Folder for downloaded assets or site resources
├── photobooth/            # React front-end application
├── run.bat                # Batch script to start both frontend and backend

```


### Folder Details

- bg-remover: This directory contains a Python Flask application that removes the background from images. It accepts image data, processes it to remove the background, and returns the processed image.

- photobooth: This is the main front-end application built with React. It provides the user interface for uploading images, displaying processed images, and other interactive elements.

- run.bat: A batch file that simplifies starting both the React front-end and the Flask back-end applications. Running this file will launch both applications, making it easy to get the project up and running in one step.


### Prerequisites

To run this project locally, make sure you have the following installed:

- Node.js and npm (for the React app)
- Python 3 and pip (for the Flask app)
- Git (for version control)

### Setup Instructions

1. Clone the Repository
```bash
git clone https://github.com/AKmahim/rmg-photobooth.git
cd photobooth
```

2. Set Up and Start bg-remover (Flask App)
Navigate to the bg-remover directory and set up a virtual environment:

```bash
cd bg-remover
python -m venv venv
venv\Scripts\activate   # On Windows
# source venv/bin/activate # On macOS/Linux
```
Install dependencies:

```bash
pip install -r requirements.txt
```

Run the Flask app:
```bash
python app.py
```

3. Set Up and Start Photobooth (React App)
Navigate to the photobooth directory:
```bash
cd ../photobooth
```
Install dependencies:
```bash
npm install
```

Run the React app:

```bash
npm start
```

4. Using run.bat Script
To simplify the process of running both the Flask and React apps, you can use the run.bat file in the project root. This will start both the backend and frontend simultaneously.

Usage:
```bash
run.bat
```


### Usage
- Open your browser and navigate to http://localhost:5173 to access the Photobooth React application.
- Upload an image and interact with the front-end to perform actions such as background removal.
- The front-end will communicate with the Flask backend (bg-remover) to process images as required.

### Technologies Used

- React - Front-end JavaScript library
- Flask - Python web framework for the back-end API
- Batch Script - Used for simplifying the start-up process of both applications