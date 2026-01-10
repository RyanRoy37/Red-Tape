from pydantic import BaseModel


class DOMAnalysisResult(BaseModel):
    num_forms: int
    has_password_field: bool
    has_email_field: bool
    has_submit_button: bool
    external_form_action: bool
    hidden_inputs: int
    css_hidden_elements: int
    iframe_count: int
    invisible_iframes: int
    missing_footer: bool
    has_about_link: bool
    has_contact_link: bool
    has_privacy_link: bool
    has_terms_link: bool
