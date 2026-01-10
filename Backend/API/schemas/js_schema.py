from pydantic import BaseModel


class JSAnalysisResult(BaseModel):
    js_redirect: bool
    input_listeners: bool
    obfuscated_js: bool
