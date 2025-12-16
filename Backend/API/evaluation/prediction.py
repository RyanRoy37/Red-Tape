import joblib

def load_model(model_path: str):
    """
    Loads a trained sklearn-compatible model from .pkl
    """
    return joblib.load(model_path)


import numpy as np
import pandas as pd
from preprocessor import preprocess_url

def predict(url):
    model=load_model()
    X=preprocess_url(url)
    phishing_label:int =0
    benign_label:int =1
    prediction = int(model.predict(X)[0])
    if hasattr(model, "predict_proba"):
        proba = model.predict_proba(X)[0]

        confidence = float(np.max(proba))
        phishing_prob = float(
            proba[list(model.classes_).index(phishing_label)]
        )

    elif hasattr(model, "decision_function"):
        score = model.decision_function(X)[0]
        phishing_prob = float(1 / (1 + np.exp(-score)))
        confidence = float(abs(phishing_prob - 0.5) * 2)

    else:
        phishing_prob = None
        confidence = None
    risk_score = phishing_prob if phishing_prob is not None else None
    
    label = "phishing" if prediction == phishing_label else "benign"

    return {
        "prediction": label,
        "predicted_class": prediction,
        "confidence": confidence,
        "risk_score": risk_score
    }
