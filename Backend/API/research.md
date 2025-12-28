Cantina et al. – Visual Similarity for Phishing Detection

Source: WWW Conference (2009)
Key Insight:
Phishing pages replicate login forms but often lack legitimate navigation, footer, or policies.

✔ Supports:

has_password_field

missing_footer

page completeness checks

📄 Zhang et al. – Phishing Webpage Detection

Source: IEEE ICDM
Key Insight:
Structural DOM features outperform lexical features in credential harvesting detection.

✔ Supports:

form count

input types

hidden inputs

📄 Chiew et al. – Features for Phishing Detection

Source: Computers & Security (Elsevier)
Key Insight:
External form actions and empty action attributes are strong phishing indicators.

✔ Supports:

external_form_action


📄 Jagatic et al. – Social Phishing

Source: ACM CCS
Key Insight:
Phishing success heavily relies on urgency, fear, and authority language.

✔ Validates:

urgency keywords

threat wording

📄 Dhamija et al. – Why Phishing Works

Source: CHI Conference
Key Insight:
Users fall victim due to trust cues + action-oriented language.

✔ Validates:

action keywords

phrase patterns (verify, confirm)

📄 Abdelhamid et al. – Phishing Detection

Source: IEEE Communications Surveys
Key Insight:
Keyword frequency and phrase structures outperform raw bag-of-words.

✔ Validates:

keyword counting

regex-based patterns


📄 Nikiforakis et al. – Session Hijacking

Source: WWW Conference
Key Insight:
Malicious JavaScript frequently uses event listeners to intercept user input before submission.

✔ Validates:

onkeypress

addEventListener("input")

📄 Canali et al. – Prophiler

Source: WWW Conference
Key Insight:
Client-side redirects and delayed navigation (setTimeout + location) are strong indicators of malicious intent.

✔ Validates:

JS redirect detection

📄 Curtsinger et al. – Zozzle

Source: USENIX Security
Key Insight:
High-entropy strings and encoded payloads are reliable signals of JavaScript obfuscation.

✔ Validates:

entropy-based detection

encoded string heuristics


📄 Dhamija et al. – Why Phishing Works

Source: CHI Conference
Key Insight:
Phishing pages focus on just the credential area, omitting navigation and secondary content.

✔ Validates:

one-page login detection

lack of navigation

📄 Cantina et al. – Visual Similarity for Phishing

Source: WWW Conference
Key Insight:
Phishing pages often replicate only a fragment of the real site, not the full layout.

✔ Validates:

layout simplicity

missing navbar/footer

📄 Zhang et al. – Detecting Phishing Websites

Source: IEEE ICDM
Key Insight:
Structural features such as link count and page depth strongly distinguish phishing pages.

✔ Validates:

link count

section count