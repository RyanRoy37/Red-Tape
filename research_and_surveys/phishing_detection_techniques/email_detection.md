<h1 align="center">Detection and Analyzing Phishing Emails Using NLP Techniques<h1>

<a href="https://ieeexplore.ieee.org/document/10156738"> Research Paper</a>

<h2> Abstract</h2>
<h3>The most common detrimental technique used by attackers to deceive victims into disclosing personal information is phishing, in which they pose as trustworthy individuals or organizations often via email. Although fake email attacks are a common tactic used by cybercriminals, their use has recently increased as attacker's profit from victims' anxiety. As a result, further study is required to determine how to recognize bogus emails. This paper proposed a new model to extract the Arabic email content and compare it using three determinants based on neural language programming (NLP) for the purpose of discovering whether it is a legitimate email or a phishing email. The first is a black list of Arabic common phishing words, the roots of a black list of Arabic common phishing words, and a list of Arabic common phishing sentences, the best two results for applying the above conditions were (99% Legal and 96% Phishing) when using the three conditions together and (99% Legal and 94% Phishing) when using a blacklist of common words of phishing, and then will present and discuss the results obtained.</h3>


<h3> AI Generated Implementation</h3>
# Implementation Steps for English Phishing Email Detection Using NLP

## 1. Dataset Collection
- Collect both **phishing** and **legitimate** email datasets from reliable public sources such as:
  - **SpamAssassin Public Corpus**
  - **Enron Email Dataset**
  - **PhishTank**
- Ensure datasets contain sufficient diversity in sender domains, email structures, and topics.

## 2. Email Preprocessing
- Extract **email body content** only — remove:
  - Headers (To, From, Date, Subject)
  - Signatures
  - Embedded HTML tags and scripts
- Clean and normalize text:
  - Convert to lowercase
  - Remove punctuation, digits, and special characters
  - Remove **stopwords** (e.g., “the,” “and,” “is”)
  - Normalize whitespace and encoding inconsistencies

## 3. Tokenization and Text Normalization
- Use **NLTK** or **SpaCy** to tokenize each email’s text into individual words.  
- Apply **stemming** or **lemmatization**:
  - **Stemming:** Reduces words to root form using algorithms (e.g., Porter Stemmer).
  - **Lemmatization:** Converts words to their dictionary form considering part of speech.
- Store tokenized and normalized versions of each email for further processing.

## 4. Linguistic Feature Set Creation
Create three distinct linguistic feature sets to capture phishing intent:

### 4.1 Phishing Keyword Blacklist
- A predefined list of commonly used phishing-indicative words such as:  
  `["verify", "urgent", "update", "password", "login", "confirm", "security", "account", "bank", "immediately"]`

### 4.2 Root-Based Blacklist
- Stemmed or lemmatized forms of the phishing keywords (e.g., “verifi,” “updat,” “confirm,” “secur”).
- Useful for detecting morphological variations of phishing words.

### 4.3 Common Phishing Sentences
- Frequent phishing phrases observed across datasets, such as:
  - “Your account has been suspended.”
  - “Verify your identity now.”
  - “Update your payment details.”
  - “We detected unusual activity in your account.”
- Store these as templates for sentence-level pattern matching.

## 5. Feature Matching and Scoring
- For each email, compare the cleaned text against the three feature sets:
  1. **Word-Level Match:** Count occurrences of blacklist words.
  2. **Root-Level Match:** Count matches of stemmed versions.
  3. **Sentence-Level Match:** Detect presence of phishing sentence templates.
- Assign **weights** to each match type (e.g., sentence matches > root matches > word matches).

### Example Scoring Rule:
| Match Type | Weight | Example |
|-------------|---------|----------|
| Word match | +1 | “verify” |
| Root match | +2 | “verifi” |
| Sentence match | +3 | “Your account has been suspended” |

- Compute total **phishing likelihood score (PLS)** as the weighted sum of matches.

## 6. Classification Decision
- Determine a **score threshold (T)** through experimentation.
  - If `PLS ≥ T` → classify as **Phishing**
  - Else → classify as **Legitimate**
- Combine results from all three feature conditions (word, root, sentence) for the final decision.

## 7. Model Evaluation
- Validate results using a labeled dataset (ground truth: phishing or legitimate).
- Compute the following performance metrics:
  - **Accuracy**
  - **Precision**
  - **Recall**
  - **F1-score**

### Confusion Matrix

|                | Predicted Phishing | Predicted Legitimate |
|----------------|--------------------|----------------------|
| **Actual Phishing** | True Positive (TP) | False Negative (FN) |
| **Actual Legitimate** | False Positive (FP) | True Negative (TN) |

**Accuracy formula:**
\[
Accuracy = \frac{TP + TN}{TP + TN + FP + FN}
\]

**Precision:** \( \frac{TP}{TP + FP} \)  
**Recall:** \( \frac{TP}{TP + FN} \)  
**F1-score:** \( 2 \times \frac{Precision \times Recall}{Precision + Recall} \)

## 8. Visualization and Reporting
- Plot confusion matrices for visual performance comparison.
- Generate bar or line graphs showing:
  - Accuracy over different thresholds.
  - Precision vs. recall trade-offs.
  - Distribution of phishing likelihood scores.
- Document the best-performing configuration and discuss false-positive/false-negative trends.

---


