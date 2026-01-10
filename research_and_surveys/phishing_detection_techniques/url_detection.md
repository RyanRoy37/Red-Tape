<h1 align="center">Smart Phishing Detection: Integrating Neural Networks and Ensemble Learning for Enhanced Cybersecurity</h1>
<a href="https://ieeexplore.ieee.org/document/11156377">Research Paper</a>

<h2> Abstract </h2>
<h3>Phishing attacks have emerged as one of the most unavoidable and damaging cyber threats these days, with cybercriminals unfolding new tricks to deceive and defraud users, targeting individuals and businesses alike. Hence, this paper proposes a new NN ensemble-based high accuracy Phishing website detection system combining the features of both supervised and unsupervised schemes which also provides Real-time detection, multigoal support and uses a Phishing history database. The system employs Isolation Forest for its anomaly detection, followed by Ensemble learning methods such as Random Forest, LightGBM, and Gradient boosting. Adding isolation forest anomaly score as one of the features in our ensemble classifier it works better for detection. The new model also preferred the real-time detection in phishing and supports multi-language over several languages and nations, thus completed its worldwide utility while maintaining a history of phishing by preserving a database of previous attacks for results. The experimental results demonstrate excellent performance in fighting upcoming attacks, on a variety of languages, high accuracy, and the adjustment to quasi real-time applications are the main advancements that can be taken from the present work.</h3>

<h3>AI Generated Implementation</h3>

# Step-by-Step Implementation Plan for Phishing Website Detection using Ensemble Machine Learning

## Step 1: Prepare Your Environment
- Install **Python** and all required ML libraries such as `scikit-learn`, `pandas`, `numpy`, `LightGBM`, and `matplotlib`.  
- Set up a dedicated project folder for your implementation.  
- Download and place your **phishing website dataset** (from Kaggle or any trusted source) inside that folder.  

## Step 2: Load and Clean the Dataset
- Load the dataset containing website features like **URL length**, **presence of IP address**, **prefix-suffix**, and **subdomain count**.  
- Remove any duplicate records to ensure unbiased model learning.  
- Handle missing values appropriately — fill them using median or mode depending on the feature type.  

## Step 3: Select and Encode Features
- From the full set of features, select only those most relevant for phishing detection.  
- Remove non-contributing columns (such as indices or irrelevant text labels).  
- Convert categorical (non-numeric) data into numerical format using **Label Encoding** or **One-Hot Encoding**, enabling compatibility with ML algorithms.  

## Step 4: Split the Data
- Split the dataset into:  
  - **Training set (80%)** → used to train ML models.  
  - **Testing set (20%)** → used to evaluate model accuracy.  
- Ensure balanced representation of phishing and legitimate samples in both sets to prevent classification bias.  

## Step 5: Handle Class Imbalance
- If the number of phishing and legitimate samples is uneven, apply a **balancing technique** like **SMOTE (Synthetic Minority Oversampling Technique)**.  
- This creates artificial samples of the minority class (usually phishing) to improve model learning.  

## Step 6: Build Individual Models
- Train multiple models independently for performance comparison:  
  - **Random Forest** → an ensemble of decision trees using majority voting.  
  - **Gradient Boosting** → builds trees sequentially to correct previous errors.  
  - **LightGBM** → a highly efficient boosting algorithm ideal for large datasets.  
  - **Isolation Forest** → detects anomalies and unusual patterns typical of phishing URLs.  

## Step 7: Combine Models (Ensemble Learning)
- Improve detection accuracy and robustness using ensemble methods:  
  - **Stacking Classifier** → combines predictions from multiple models (e.g., Random Forest, Gradient Boosting, LightGBM) using a **meta-learner** for final classification.  
  - **Voting Classifier** → merges outputs from multiple models and predicts the final result based on either:  
    - **Hard voting** (majority class wins)  
    - **Soft voting** (based on probability scores).  

## Step 8: Train All Models
- Train each model using the **training dataset**.  
- Let the models learn feature–label relationships between URL attributes and phishing/legitimate classification.  
- Save trained models for later evaluation and ensemble integration.  

## Step 9: Evaluate Model Performance
- Use the **testing dataset** to evaluate each trained model.  
- Measure performance using multiple metrics:  
  - **Accuracy** → overall percentage of correct predictions.  
  - **Precision** → proportion of predicted phishing sites that are truly phishing.  
  - **Recall** → proportion of actual phishing sites correctly identified.  
  - **F1-score** → harmonic mean of precision and recall.  
  - **ROC-AUC** → ability of the model to distinguish between phishing and legitimate sites.  

## Step 10: Compare the Results
- Compile results from all models into comparison tables and visualizations.  
- Compare **accuracy**, **F1-score**, and **ROC-AUC** values across models.  
- Typically, the **Stacking Classifier** achieves the highest performance with accuracy and ROC-AUC around **0.9977**, outperforming individual models.  

## Final Outcome
- The ensemble-based approach, especially **Stacking and Voting Classifiers**, provides the most robust and generalizable phishing detection mechanism.  
- This hybrid strategy ensures **high accuracy**, **low false positives**, and strong resilience against diverse phishing attack patterns.



<h1 align="center"> Evaluating the Impact of Feature Engineering in Phishing URL Detection: A Comparative Study of URL, HTML, and Derived Features</h1>

<a href="https://ieeexplore.ieee.org/document/11031414"> Research Paper<a>
<h2> Abstract</h2>
<h3> Phishing attacks have evolved into sophisticated threats, making effective cybersecurity detection strategies essential. While many studies focus on either URL or HTML features, limited work has explored the comparative impact of engineered feature sets across different machine learning models. This study aims to bridge that empirical gap by evaluating the effectiveness of URL-based, HTML-based, and derived features, individually and in combination, on phishing URL detection. The proposed approach utilizes the PhishOFE dataset of 101,063 phishing and legitimate URLs. Features are organized into four sets: 1) URL only, 2) HTML only, 3) URL + HTML, and 4) URL + HTML + derived features. Ten machine learning models are employed, including Random Forest, k-Nearest Neighbors, Logistic Regression, Support Vector Machine, Naive Bayes, and advanced ensemble methods such as LightGBM, XGBoost, and CatBoost. Performance is assessed using accuracy, precision, recall, and F1-score, while permutation importance is used to evaluate feature significance. Experimental results demonstrate that ensemble models outperform traditional classifiers, with CatBoost achieving the highest accuracy of 99.45% using the complete feature set. Moreover, URL features like URLLength and NoOfSubDomain consistently rank high in importance, while derived features such as SuspiciousCharRatio and URLComplexityScore notably enhance detection performance in specific models.</h3>

<h3> AI Generated Implementation</h3>
# Step-by-Step Implementation Plan for Phishing Detection using PhishOFE Dataset

## Step 1 — Prepare the Environment
- Install **Python 3.x** (recommended over 2.7).  
- Set up **Jupyter Notebook** or **Google Colab** for experimentation.  
- Install required libraries: pandas, numpy, scikit-learn, xgboost, lightgbm, catboost, matplotlib, seaborn.  

## Step 2 — Get the Dataset
- Download the **PhishOFE dataset** from **IEEE Dataport**.  
- This dataset already includes both **URL** and **HTML** features.  
- Load it into your environment using pandas.  

## Step 3 — Clean and Validate the Data
- Check for missing values, duplicates, or imbalances.  
- Confirm that class labels (**phishing** or **legitimate**) are balanced.  

## Step 4 — Identify and Organize Features
- Split the features into three main categories:  
  - **URL-based features** — such as URLLength, IsHTTPS, NoOfSubDomain, etc.  
  - **HTML-based features** — such as NoOfHyperlink, LineLength, HasMeta, etc.  
  - **Derived features** — computed values like SuspiciousCharRatio, URLComplexityScore, HTMLContentDensity, InteractiveElementDensity.  

## Step 5 — Calculate Derived Features
- For each record (URL), compute:  
  - **SuspiciousCharRatio** → measures how many suspicious characters are in the URL.  
  - **URLComplexityScore** → combines URL length, subdomains, and obfuscated characters.  
  - **HTMLContentDensity** → ratio of visible vs non-visible HTML elements.  
  - **InteractiveElementDensity** → density of buttons, forms, and popups.  

## Step 6 — Create Different Feature Sets for Experiments
- Conduct four experiments using different feature combinations:  
  1. Only URL features.  
  2. Only HTML features.  
  3. URL + HTML features.  
  4. URL + HTML + Derived features.  
- Each experiment uses the same machine learning models but with different feature sets.  

## Step 7 — Split Data for Training and Testing
- Divide the dataset into **80% training** and **20% testing**.  
- Keep the split random but consistent by setting a fixed random seed.  

## Step 8 — Train Multiple Machine Learning Models
- Train and evaluate multiple ML models for each experiment, including:  
  - Random Forest  
  - Decision Tree  
  - K-Nearest Neighbors (KNN)  
  - Logistic Regression  
  - Support Vector Machine (SVM)  
  - Naive Bayes  
  - Gradient Boosting Machine (GBM)  
  - LightGBM  
  - XGBoost  
  - CatBoost  
- Initially, all models can be trained with default parameters.  

## Step 9 — Evaluate Model Performance
- Evaluate each model using four performance metrics:  
  - **Accuracy** → overall correctness.  
  - **Precision** → proportion of correctly predicted phishing URLs.  
  - **Recall** → proportion of actual phishing URLs correctly identified.  
  - **F1-Score** → harmonic mean of precision and recall.  
- Compare results across all models and feature sets.  

## Step 10 — Perform Feature Importance Analysis
- Use feature importance or permutation importance to identify which features contribute most to model performance.  
- Key influential features may include URLLength, NoOfHyperlink, NoOfSubDomain, and IsHTTPS.  

## Step 11 — Compare All Results
- Compare model results using tables or bar charts.  
- Visualize:  
  - Accuracy and F1-score of each model.  
  - Feature importance heatmaps.  
- Identify which feature combination (URL-only, HTML-only, or hybrid) achieved the best results.  

## Step 12 — Draw Conclusions
- Determine which model and feature combination performs best (typically **CatBoost** or **XGBoost**).  
- Conclude that **URL + HTML + Derived features** usually give the **highest accuracy (~99%)**.  
- Highlight the most impactful features such as URLLength, NoOfSubDomain, IsHTTPS, and SuspiciousCharRatio.  
- Summarize that integrating both structural and content-based features significantly enhances phishing detection accuracy.  



<h1 align="center">A keyword-based combination approach for detecting phishing webpages <h1>

<a href="https://www.sciencedirect.com/science/article/abs/pii/S0167404819300707"> Research Paper</a>

<h2> Abstract</h2>
<h3> In this paper, the Search & Heuristic Rule & Logistic Regression (SHLR) combination detection method is proposed for detecting the obfuscation techniques commonly used by phishing websites and improving the filtering efficiency of legitimate webpages. The method is composed of three steps. First, the title tag content of the webpage is input as search keywords to the Baidu search engine, and the webpage is considered legal if the webpage domain matches the domain name of any of the top-10 search results; otherwise, further evaluation is performed. Second, if the webpage cannot be identified as legal, then the webpage is further examined to determine whether it is a phishing page based on the heuristic rules defined by the character features. The first two steps can quickly filter webpages to meet the needs of real-time detection. Finally, a logistic regression classifier is used to assess the remaining pages to enhance the adaptability and accuracy of the detection method. The experimental results show that the SHLR can filter 61.9% of legitimate webpages and identify 22.9% of phishing webpages based on uniform/universal resource locator (URL) lexical information. The accuracy of the SHLR is 98.9%; thus, its phishing detection performance is high.</h3>


<h3> AI Generated Implementation </h3>

# Implementation Steps of SHLR (Search–Heuristic–Logistic Regression) Phishing Detection

---

## Phase 1 – Search Engine–Based Detection

### Input
- Collect webpage **URL**.
- Extract the `<title>` tag content from the webpage’s HTML.

### Search Query
- Use the **title content** as a keyword query for a **search engine**:
  - Preferably **Baidu Search Engine API**
  - Use **Google Search** if Baidu is unavailable.

### Top-10 Results
- Retrieve the **top 10 search results**.

### Domain Match Check
1. Extract **domain names** from the top 10 search result URLs.  
2. Compare the **input webpage’s domain** with these domains.

**Decision:**
- ✅ If a match is found → classify as **“Legitimate”**.  
- ❌ If no match → proceed to **Phase 2**.

---

## Phase 2 – Heuristic Rule–Based Detection

### Extract URL Features
Collect the following structural URL features:

- URL length  
- Number of special characters (`-`, `_`, `@`, `?`, `=`, etc.)  
- Presence of IP address instead of domain name  
- Number of dots (`.`) in the domain  
- Use of **unusual top-level domain (TLD)**  
- Presence of brand names with extra suffix/prefix (e.g., `paypal-login.com`)  
- Number of subdomains  

### Apply 7 Heuristic Rules (Binary Checks)
Each rule outputs **1 = Phish**, **0 = Legitimate**.

| Rule | Condition | Decision |
|------|------------|-----------|
| **Rule 1** | URL contains **IP address** | → Phish |
| **Rule 2** | URL length **> 75 characters** | → Phish |
| **Rule 3** | Number of dots **> 5** | → Phish |
| **Rule 4** | Contains suspicious keywords (“verify”, “secure”, “update”) | → Phish |
| **Rule 5** | Uncommon or suspicious **TLD** | → Phish |
| **Rule 6** | Contains **“@”** symbol | → Phish |
| **Rule 7** | Brand name mismatch with domain | → Phish |

### Decision Logic
- If **≥ 4 out of 7 rules** trigger → classify as **Phishing**.  
- Else → proceed to **Phase 3**.

---

## Phase 3 – Logistic Regression–Based Detection

### Feature Vector Creation
For remaining undecided URLs, extract **quantitative features**:

- URL length  
- Number of dots  
- Number of subdirectories  
- Presence of suspicious tokens  
- Entropy of domain string  
- Ratio of digits to letters  
- SSL certificate validity (optional)

### Model Training
- Train a **Logistic Regression (LR)** classifier on **labeled datasets**:
  - **Phishing datasets:** PhishTank, URLBlacklist  
  - **Legitimate datasets:** Yahoo Directory, DMOZ  
- Split dataset into **80% training** and **20% testing** sets.

### Prediction
- Apply the trained LR model to classify remaining URLs.
- **Output:**  
  - Class = { **Legitimate**, **Phishing** }  
  - Include **confidence score**.

---

## Final Output Summary

| Phase | Description | Role |
|-------|--------------|------|
| **Phase 1** | Search Engine–Based Detection | Quickly filters legitimate pages |
| **Phase 2** | Heuristic Rule–Based Detection | Detects obvious obfuscation and manipulations |
| **Phase 3** | Logistic Regression–Based Detection | Accurately classifies ambiguous cases |

### Final Decision
\[
\text{Final Output} = \text{Legitimate / Phishing} + \text{Confidence Score}
\]

**Summary:**
- **Phase 1** eliminates genuine sites efficiently.  
- **Phase 2** flags suspicious URLs using human-like heuristic analysis.  
- **Phase 3** ensures **high accuracy** on complex or borderline cases.

---

<h1 align="center">Classifying Benign and Malicious Websites through URL Feature Extraction Using Transfer Learning</h1>

<a href="https://ieeexplore.ieee.org/document/10843636"> Research paper</a>

<h2> Abstract </h2>
<h3>With the rapid development of digital and communication infrastructures, Internet usage is expanding rapidly. As the global number of Internet users increases, so does the prevalence of cybercriminals and websites infected with various types of malware. Cybercriminals often exploit these infected websites to carry out their malicious activities. Therefore, identifying these websites is crucial to safeguarding Internet users. However, traditional blocklists provided by web browsing services remain ineffective in detecting zero-day attacks, highlighting the need for machine learning techniques in this area. In this paper, we utilize features extracted from URLs of both benign and malicious sites–including defacement, phishing, malware, and spam – to differentiate between the two categories. First, we transform the feature space, then perform feature extraction using pre-trained models such as ResNet50, SqueezeNet, and AlexNet. Finally, we classify the URLs using a long short-term memory (LSTM) deep neural network. This proposed method effectively mitigates the risk posed by four types of malicious websites. The simulation, implemented in Python, achieved an accuracy rate of 97.13%.</h3>

<h3> AI Generated Implementation</h3>
# Implementation Steps for Parallel CNN–LSTM Phishing Detection

## Phase 1 – Data Preprocessing

### Load Dataset
- Use **ISCXURL2016** dataset containing **36,707 samples × 80 features**.

### Handle Missing & Infinite Values
- Identify **9 columns** with missing values and **1 column** with infinite values.
- Drop these **10 columns**.

### Separate Labels
- Isolate the **class label** column.

### Normalize Features
Apply **Min–Max normalization** on each feature:

\[
F_{normalized} = \frac{X - X_{min}}{X_{max} - X_{min}}
\]

- Normalize all feature values to the range **[0, 1]**.

### Class Balancing
- Select **1,945 samples** from each malicious class:
  - Defacement  
  - Malware  
  - Phishing  
  - Spam  
- Randomly remove **1 sample** from the **Benign** class to maintain balance.

**Final Dataset:**
- Total samples: **7,780**
  - 3,890 Benign  
  - 3,890 Malicious  
- Data Shapes:
  - `X.shape = (7780, 69)`  
  - `y.shape = (7780,)`

---

## Phase 2 – Feature Vector Preparation

### Pad Feature Vector
- Original 69 features → **pad with 955 zeros** → total **1024 features**.

### Reshape to 2D
- Reshape each sample to **32 × 32** matrix.

### Convert to 3D Matrix
- Duplicate the 2D matrix 3 times → form **RGB-like input** with shape **(32, 32, 3)**.

---

## Phase 3 – Parallel Feature Extraction Network

### Load Pretrained Networks
Use **three pretrained CNN models (ImageNet weights):**
- ResNet50  
- SqueezeNet  
- AlexNet  

### Truncate Each Network
- Keep only the **feature extraction layers** (remove classifier parts).

### Feed Each Input
- Pass each **(32, 32, 3)** input through all three models **in parallel**.

### Apply Pooling & Flatten
After each model:
- Apply **Average Pooling**  
- Add **Flatten layer**

### Concatenate Feature Vectors
| Model      | Output Size |
|-------------|--------------|
| AlexNet     | 512 features |
| ResNet50    | 1664 features |
| SqueezeNet  | 2048 features |

**Final concatenated vector:**  
`1 × 4224`

---

## Phase 4 – Classification Network (LSTM)

### Input
- Feed **4224-dimensional vector** into the **LSTM** layer.

### LSTM Configuration
- Units: **512**  
- Activation: **ReLU**  
- Recurrent activation: **Sigmoid**  
- `return_sequences = True`

### Flatten Layer
- Flatten the LSTM output.

### Dense Layer
- Add **Dense layer** with **Softmax activation** → output = **2 classes (Benign / Malicious)**.

### Optimizer & Training Parameters
- Optimizer: **Adam**  
- Learning Rate: **0.0001**  
- Epochs: **30**  
- Train/Test Split: **70/30**

---

## Phase 5 – Evaluation

| Metric | Accuracy |
|---------|-----------|
| Train Accuracy | 98.12% |
| Test Accuracy  | 97.13% |

### Comparison with Existing Models
| Model | Focus | Accuracy |
|--------|--------|-----------|
| DMPA | Phishing-only detection | — |
| DOPE | Email-based phishing | — |
| UDFE | URL-based detection | 86% |
| **Proposed Model** | Hybrid CNN–LSTM | **97.13%** ✅ |

---

**Conclusion:**  
The proposed **Parallel CNN–LSTM model** effectively combines deep feature extraction and sequential analysis, achieving superior phishing detection performance compared to traditional URL- or email-based models.



<h1 align="center">Hybrid Feature-Based Machine Learning Method for Phishing URL Detection</h1>

<a href="https://ieeexplore.ieee.org/document/10176901"> Research Paper</a>

<h2>Abstract</h2>
<h3>The Internet's exponential growth has led to an increase in e-commerce usage, but it has also attracted hackers who seek to steal personal information online. One of the most prevalent methods used by cybercriminals is the phishing scheme, where they trick individuals into divulging sensitive information through fake URLs. Due to the semantics-based attack strategy used in phishing, it is challenging to differentiate between legitimate and phishing URLs, taking advantage of computer users' vulnerabilities. Software companies provide anti-phishing systems that utilize blacklists, heuristics, visuals, and machine learning, but they cannot prevent all phishing attempts. Therefore, this research proposes five classification methods that use hybrid features, including natural language processing (NLP) and principal component analysis (PCA), to address this issue. The study finds that the Random Forest algorithm utilizing NLP and word vector features surpasses its competitors, with a 99.75% accuracy rate in classifying phishing URLs.</h3>

<h3> AI Generated Implementation</h3>
# Implementation Steps for Hybrid Feature–Based Machine Learning Phishing URL Detection

## Phase 1 — Data Collection

### 1. Dataset Preparation
- Gather a large dataset of URLs from multiple sources.  
  - **Legitimate URLs:** ≈ 36,395 (from Alexa, Majestic, or DMOZ datasets)  
  - **Phishing URLs:** ≈ 37,173 (from sources like PhishTank, OpenPhish, and Kaggle repositories)  
- Merge the two datasets to form the **final combined dataset** of approximately **73,568 URLs**.

### 2. Labeling
- Assign labels to each record:
  - **0 → Phishing**
  - **1 → Legitimate**
- Shuffle and balance the dataset to ensure equal representation and avoid model bias.

---

## Phase 2 — Data Engineering

### A. Feature Extraction (NLP-based)
1. **Text Preprocessing**
   - Clean the URL text (remove special symbols, trailing slashes, and encoding artifacts).
   - Tokenize each URL into meaningful components (domain, subdomain, path, parameters).
   - Normalize case and remove noise tokens.

2. **TF-IDF Feature Generation**
   - Apply **TF-IDF Vectorizer** to represent URLs numerically.
   - Capture term frequency–inverse document frequency weights for each token.
   - Generate approximately **40 TF-IDF features per URL**.
   - Result → **TF-IDF feature vector** representing textual characteristics of the URL.

### B. Hybrid Feature Formation
1. **Word2Vec Embedding**
   - Train or use a pretrained **Word2Vec model** to learn semantic representations of URL tokens.
   - Extract Word2Vec vectors for each URL (≈1700 dimensions).

2. **Dimensionality Reduction (PCA)**
   - Apply **Principal Component Analysis (PCA)** to reduce Word2Vec feature dimensions from 1700 → **102 principal components**.
   - Preserve maximum variance while reducing noise and computation time.

3. **Feature Combination**
   - Concatenate PCA-reduced Word2Vec features (102) + TF-IDF features (40).
   - Form the final **hybrid feature vector** of size **142**.

   **Final Feature Set:**
   | Feature Type | Count |
   |---------------|--------|
   | PCA (Word2Vec) | 102 |
   | TF-IDF | 40 |
   | **Total** | **142** |

---

## Phase 3 — Machine Learning Classification

Train and evaluate multiple ML algorithms using the hybrid feature set.

### 1. Decision Tree
- Train a Decision Tree classifier on the 142-dimensional hybrid vector.
- Measure:
  - Accuracy
  - Precision
  - Recall
  - F1-score
- Record performance metrics and confusion matrix.

### 2. AdaBoost
- Train an **AdaBoost classifier** for **50 epochs**.
- Use Decision Stumps or small trees as weak learners.
- Monitor training and validation accuracy per epoch.

### 3. K-Nearest Neighbors (KNN)
- Determine optimal value of **K** through cross-validation (e.g., K = 5 or 7).
- Train the model on the hybrid feature set.
- Evaluate classification performance.

### 4. Naive Bayes
- Apply a **Multinomial Naive Bayes** classifier on the hybrid features.
- Compute confusion matrix and evaluate accuracy, precision, recall, F1-score.

### 5. Random Forest
- Train a **Random Forest classifier** using multiple decision trees.
- Track training and validation accuracy across 50 epochs.
- Record all evaluation metrics for comparison.

---

## Phase 4 — Performance Measurement

### Evaluation Metrics
For each classifier, generate the following:

1. **Confusion Matrix**  
   |                | Predicted Phishing | Predicted Legitimate |
   |----------------|--------------------|----------------------|
   | **Actual Phishing** | True Positive (TP) | False Negative (FN) |
   | **Actual Legitimate** | False Positive (FP) | True Negative (TN) |

2. **Metrics Formulas**
   - **Accuracy:** \( \frac{TP + TN}{TP + TN + FP + FN} \)
   - **Precision:** \( \frac{TP}{TP + FP} \)
   - **Recall:** \( \frac{TP}{TP + FN} \)
   - **F1-score:** \( 2 \times \frac{Precision \times Recall}{Precision + Recall} \)

3. **Comparison**
   - Evaluate and compare all algorithms based on the above metrics.
   - Plot accuracy, precision, recall, and F1-score side by side for visualization.

---

## Phase 5 — Experimental Results

| Algorithm | Accuracy | Precision | Recall | F1-score | Remarks |
|------------|-----------|------------|----------|------------|----------|
| **Decision Tree** | ~99.08% | High | High | High | Excellent rule-based performance |
| **AdaBoost** | ~96% | Moderate | High | High | Stable but slightly slower convergence |
| **KNN** | ~93.01% | Moderate | Moderate | Moderate | Sensitive to distance metric and scaling |
| **Naive Bayes** | ~68.94% | Low | Moderate | Low | Poor performance on hybrid features |
| **Random Forest** | **~99.75%** | Highest | Highest | Highest | **Best Performer** |

### Notes:
- **Random Forest** achieved the best results, demonstrating strong robustness with ensemble averaging.
- **AdaBoost** and **Decision Tree** also showed competitive accuracy but slightly lower generalization.
- **Naive Bayes** underperformed due to independence assumption mismatch with complex hybrid features.

### Validation
- Model performance was validated over **50 epochs** to ensure stability and reproducibility.
- Final model demonstrates consistent high accuracy with minimal variance.

---


