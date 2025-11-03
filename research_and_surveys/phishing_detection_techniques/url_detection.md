<h1>Smart Phishing Detection: Integrating Neural Networks and Ensemble Learning for Enhanced Cybersecurity</h1>
<a href="https://ieeexplore.ieee.org/document/11156377">Research Paper</a>

<h2> Abstract </h2>
<h3>Phishing attacks have emerged as one of the most unavoidable and damaging cyber threats these days, with cybercriminals unfolding new tricks to deceive and defraud users, targeting individuals and businesses alike. Hence, this paper proposes a new NN ensemble-based high accuracy Phishing website detection system combining the features of both supervised and unsupervised schemes which also provides Real-time detection, multigoal support and uses a Phishing history database. The system employs Isolation Forest for its anomaly detection, followed by Ensemble learning methods such as Random Forest, LightGBM, and Gradient boosting. Adding isolation forest anomaly score as one of the features in our ensemble classifier it works better for detection. The new model also preferred the real-time detection in phishing and supports multi-language over several languages and nations, thus completed its worldwide utility while maintaining a history of phishing by preserving a database of previous attacks for results. The experimental results demonstrate excellent performance in fighting upcoming attacks, on a variety of languages, high accuracy, and the adjustment to quasi real-time applications are the main advancements that can be taken from the present work.</h3>

<h3>AI Generated Implementation</h3>

Step-by-Step Implementation Plan 
Step 1: Prepare Your Environment

Install Python and required ML libraries (like scikit-learn, pandas, numpy, LightGBM, matplotlib, etc.).

Set up a folder for your project.

Keep your dataset (from Kaggle) inside that folder.

Step 2: Load and Clean the Dataset

Load the phishing dataset (contains website features like URL length, IP address, prefix-suffix, etc.).

Remove any duplicate rows to avoid biased learning.

Fill any missing values with appropriate replacements (for example, median values).

Step 3: Select and Encode Features

From all available features, choose the most relevant ones that help distinguish phishing vs legitimate websites.

Remove unnecessary columns (like indexes or text labels that don’t help classification).

Convert all non-numeric (categorical) data into numerical form so that ML models can process it.

Step 4: Split the Data

Divide the data into two parts:

Training set (80%) → used to teach the model.

Testing set (20%) → used to check how well the model works.

Ensure that both sets have a balanced mix of phishing and legitimate examples (to avoid bias).

Step 5: Handle Class Imbalance

If phishing and legitimate sites are not equally distributed, apply a balancing method (like SMOTE).

This step generates synthetic samples for the smaller class (usually phishing sites), so the model learns equally about both types.

Step 6: Build Individual Models

Train several models separately to compare their performance:

Random Forest – builds many decision trees and combines their votes.

Gradient Boosting – builds trees one after another, improving from previous mistakes.

LightGBM – a faster, memory-efficient boosting method good for large datasets.

Isolation Forest – detects anomalies (helps spot unusual URLs that may be phishing).

Step 7: Combine Models (Ensemble Learning)

Use ensemble techniques to improve accuracy and reliability:

Stacking Classifier: Combines multiple models (like Random Forest, Gradient Boosting, and LightGBM) and adds a final model (meta-learner) to make the final decision.

Voting Classifier: Combines predictions from multiple models and selects the majority result (can use either “soft” voting based on probabilities or “hard” voting based on counts).

Step 8: Train All Models

Use the training data to train all chosen models (individually and combined).

The models learn the relationship between URL features and their phishing/legitimate labels.

Step 9: Evaluate Model Performance

Test the trained models using the testing dataset.

Measure key performance metrics:

Accuracy – overall correctness of predictions.

Precision – how many of the predicted phishing sites are actually phishing.

Recall – how many phishing sites were correctly identified.

F1-score – balance between precision and recall.

ROC-AUC – ability to distinguish between phishing and legitimate sites.

Step 10: Compare the Results

Create tables and graphs to compare all models based on their metrics.

Identify which model performed best.

Typically, the Stacking Classifier gives the highest accuracy and ROC-AUC score (~0.9977).