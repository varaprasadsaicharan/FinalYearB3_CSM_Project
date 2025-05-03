import numpy as np
from sklearn.neural_network import MLPClassifier
from sklearn.preprocessing import StandardScaler

class LiverDiseaseModel:
    def __init__(self):
        self.model = MLPClassifier(
            hidden_layer_sizes=(100, 50),
            activation='relu',
            random_state=42
        )
        self.scaler = StandardScaler()
        
    def preprocess_data(self, data):
        features = [
            'total_bilirubin', 'direct_bilirubin', 'alkaline_phosphotase',
            'alamine_aminotransferase', 'aspartate_aminotransferase',
            'total_proteins', 'albumin', 'albumin_globulin_ratio'
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