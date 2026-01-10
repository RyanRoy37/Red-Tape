from pydantic import BaseModel


class VisualAnalysisResult(BaseModel):
    num_links: int
    num_sections: int
    has_navbar: bool
    has_logo: bool
    has_brand_text: bool
    single_page_login: bool
