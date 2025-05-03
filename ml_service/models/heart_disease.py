import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler

class HeartDiseaseModel:
    def __init__(self):
        self.model = RandomForestClassifier(
            n_estimators=100,
            max_depth=10,
            random_state=42
        )
        self.scaler = StandardScaler()
        
    def preprocess_data(self, data):
        features = [
            'age', 'systolic_bp', 'diastolic_bp', 'cholesterol',
            'fasting_blood_sugar', 'max_heart_rate', 'st_depression'
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