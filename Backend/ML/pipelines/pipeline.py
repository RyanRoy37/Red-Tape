from Backend.ML.feature_extractors.extractor import extract_from_api
from preprocessing import transform
from loader import load_to_postgres
from Backend.ML.models.url_model.model_predict import predict
import asyncio

async def etl(api_url, conn_string):
    print("Data extracted")
    raw_df = extract_from_api(api_url)
    print("Data Transformed")
    feature_df = transform(raw_df)
    result=predicted_df.copy()
    print("Fed to model")
    predicted_df = predict(feature_df)
    print("Inserted results into db")
    asyncio.create_task(load_to_postgres(predicted_df, "", conn_string))
    return result