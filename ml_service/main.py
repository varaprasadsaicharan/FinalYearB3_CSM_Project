from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import cv2
import numpy as np
import pytesseract
from models.heart_disease import HeartDiseaseModel
from models.diabetes import DiabetesModel
from models.liver_disease import LiverDiseaseModel

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize models
heart_model = HeartDiseaseModel()
diabetes_model = DiabetesModel()
liver_model = LiverDiseaseModel()

def extract_parameters(image):
    # Convert image to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Apply thresholding
    thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]
    
    # Extract text using pytesseract
    text = pytesseract.image_to_string(thresh)
    
    # Extract parameters using regex patterns
    parameters = {}
    # Add parameter extraction logic here
    return parameters

@app.post("/predict/heart")
async def predict_heart_disease(file: UploadFile = File(...)):
    # Read and process the image
    contents = await file.read()
    nparr = np.fromstring(contents, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    # Extract parameters from image
    parameters = extract_parameters(image)
    
    # Get prediction
    prediction = heart_model.predict(parameters)
    return prediction

@app.post("/predict/diabetes")
async def predict_diabetes(file: UploadFile = File(...)):
    contents = await file.read()
    nparr = np.fromstring(contents, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    parameters = extract_parameters(image)
    prediction = diabetes_model.predict(parameters)
    return prediction

@app.post("/predict/liver")
async def predict_liver_disease(file: UploadFile = File(...)):
    contents = await file.read()
    nparr = np.fromstring(contents, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    parameters = extract_parameters(image)
    prediction = liver_model.predict(parameters)
    return prediction