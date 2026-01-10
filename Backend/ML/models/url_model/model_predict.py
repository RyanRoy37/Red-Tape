# model/model_predict.py

import joblib
import pandas as pd

model = joblib.load("url_classification_model.pkl")

def predict(df):
    predictions = model.predict(df)
    df["prediction"] = predictions
    return df
