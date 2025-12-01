# extract/extractor.py

import pandas as pd

def extract_from_csv(path):
    """Extract raw URL data from a CSV file."""
    return pd.read_csv(path)

def extract_from_api(api_url):
    """Extract URL data from an API endpoint."""
    import requests
    response = requests.get(api_url)
    return pd.DataFrame(response.json())
