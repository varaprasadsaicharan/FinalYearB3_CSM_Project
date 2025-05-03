import numpy as np
from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler

class DiabetesModel:
    def __init__(self):
        self.model = SVC(
            kernel='rbf',
            probability=True,
            random_state=42
        )
        self.scaler = StandardScaler()
        
    def preprocess_data(self, data):
        features = [
            'glucose', 'blood_pressure', 'insulin', 'bmi',
            'age', 'skin_thickness', 'pregnancies', 'dpf'
        ]
        X = np.array([float(data[f]) for f in features]).reshape(1, -1)
        return self.scaler.transform(X)
        
    def predict(self, data):
        X = self.preprocess_data(data)
        risk_score = self.model.predict_proba(X)[0][1]
        return {
            'risk_score': float(risk_score),
            'risk_level': 'high' if risk_score > 0.7 else 'moderate' if risk_score > 0.3 else 'low'
        }