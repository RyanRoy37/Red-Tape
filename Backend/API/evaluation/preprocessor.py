from feature_extractor import extract_basic_features, extract_embeddings
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
import joblib


def preprocess_url(url: str):
    scaler = joblib.load("scaler.pkl")
    num_df=extract_basic_features(url)
    emb_df=extract_embeddings(url)  
    num_df = num_df.replace([np.inf, -np.inf], np.nan)
    num_df = num_df.fillna(0)

    # ---- scale numeric features ----
    num_scaled = scaler.transform(num_df)

    num_scaled_df = pd.DataFrame(
        num_scaled,
        columns=num_df.columns
    )

    # ---- concat with embeddings ----
    X = pd.concat(
        [
            num_scaled_df.reset_index(drop=True),
            emb_df.reset_index(drop=True)
        ],
        axis=1
    )

    return X
    #X=pd.concat(extract_basic_features(url),extract_embeddings(url), axis=1)
    