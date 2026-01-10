import pandas as pd
import numpy as np
import torch
from transformers import AutoModel, AutoTokenizer
from .features import mean_pooling,Querylength, domain_token_count, path_token_count, \
    avgdomaintokenlen, longdomaintokenlen, avgpathtokenlen, charcompvowels, charcompace, ldl_url, ldl_domain, ldl_path, ldl_filename, ldl_getArg, dld_url, \
    dld_domain, dld_path, dld_filename, dld_getArg, urlLen, domainlength, pathLength, subDirLen, fileNameLen, this_fileExtLen, ArgLen, pathurlRatio, ArgUrlRatio, \
    argDomanRatio, domainUrlRatio, pathDomainRatio, argPathRatio, executable    , isPortEighty, NumberofDotsinURL, ISIpAddressInDomainName, CharacterContinuityRate, \
    LongestVariableValue, URL_sensitiveWord, URLQueries_variable, url_shortened,email_in_url, Entropy_URL, Entropy_Domain , tld_freq
def extract_basic_features(url: str) -> dict:
    """
    Evaluates all basic URL features for a single URL.

    Returns:
        dict: { feature_name: feature_value }
    """

    feature_values = {}

    BASIC_FEATURES = [
    Querylength, domain_token_count, path_token_count,
    avgdomaintokenlen, longdomaintokenlen, avgpathtokenlen,
      charcompvowels, charcompace,
    ldl_url, ldl_domain, ldl_path, ldl_filename, ldl_getArg,
    dld_url, dld_domain, dld_path, dld_filename, dld_getArg,
    urlLen, domainlength, pathLength, subDirLen, fileNameLen,
    this_fileExtLen, ArgLen,
    pathurlRatio, ArgUrlRatio, argDomanRatio, domainUrlRatio,
    pathDomainRatio, argPathRatio,
    executable, isPortEighty, NumberofDotsinURL,
    ISIpAddressInDomainName, CharacterContinuityRate,
    LongestVariableValue, URL_sensitiveWord,
    URLQueries_variable, url_shortened, email_in_url,
    Entropy_URL, Entropy_Domain, tld_freq
    ]
    for feature_fn in BASIC_FEATURES:
        try:
            feature_values[feature_fn.__name__] = feature_fn(url)
        except Exception:
            feature_values[feature_fn.__name__] = 0

    return pd.DataFrame([feature_values])


def extract_embeddings(url: str) -> pd.DataFrame:
   
    """
    Generates BERT-Tiny embedding for a single URL.
    """
    MODEL_NAME = "prajjwal1/bert-tiny"
    BATCH_SIZE = 64          # can push higher on CPU
    DEVICE = "cpu"

    tokenizer = AutoTokenizer.from_pretrained('evaluation/bert-tiny')
    model = AutoModel.from_pretrained('evaluation/bert-tiny')
    model.eval()
    with torch.no_grad():
        encoded = tokenizer(
            [url],
            padding=True,
            truncation=True,
            max_length=64,
            return_tensors="pt"
        )

        outputs = model(**encoded)
        emb = mean_pooling(
            outputs.last_hidden_state,
            encoded["attention_mask"]
        )

    embedding=emb.numpy().squeeze() 
    emb_df = pd.DataFrame(
        [embedding],
        columns=[f"bert_tiny_emb_{i}" for i in range(len(embedding))]
    )
    
    return emb_df
