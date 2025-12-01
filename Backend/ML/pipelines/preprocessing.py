# transform/preprocessing.py

import pandas as pd
from Backend.ML.feature_extractors.feature_engineering import extract_url_features

def transform(df):
    feature_rows = []

    for url in df["url"]:
        feature_rows.append(extract_url_features(url))

    feature_df = pd.DataFrame(feature_rows)

    return feature_df
