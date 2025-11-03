<h1 align="center"> Phishing Detection Model Combining YOLOv11 on Web Logos</h1>
<a href="https://ieeexplore.ieee.org/document/11163245" alt="Paper">Paper</a>

<h2> Abstract</h2>
<h3>As a state-of-the-art approach, the application of deep learning for logo-based phishing website detection has been considered in recent researches. At present, many of the existing detection methods have achieved good results in conventional metrics such as accuracy, precision, recall, F1-score and time cost. This study proposes a comprehensive phishing detection model combing object detection on web logos. First, use YOLOv11 to capture the logo in the web page, then get the list of legitimate domain names corresponding to that category according to the obtained logo category, and finally match the string of url. Only if the domain name matches successfully will it be considered as a legitimate website, otherwise it will be a phishing site.We made a dataset containing five brands of logo to train and verify yolov11, obtained effective phishing URLs from Phishtank, and made a test set for YOLOv11 and a test set for phishing detection.The experimental results show that the average accuracy, accuracy, recall, F1 score and time cost of YOLOv11 model are 0.979, 0.99,0.973, 0.981 and 0.07s, respectively, indicating that YOLOv11 can quickly and accurately identify logo in web pages and give the judgment of phishing.
</h3>

<h3>AI Generated Implementation</h3>

🧩 Step-by-Step Implementation Guide
🪜 Step 1 — Prepare Your Environment

You can do this on Google Colab (recommended — free GPU).

Go to https://colab.research.google.com

Click New Notebook

Go to Runtime → Change runtime type → GPU

🪜 Step 2 — Install YOLOv11

In a new Colab cell, run:

!pip install ultralytics


Then import:

from ultralytics import YOLO

🪜 Step 3 — Collect Logo Images

Pick 4–5 brands (like Google, Amazon, Facebook, Twitter, Alibaba).
For each:

Download ~50–100 clear logo images from Google Images.

Save them in folders like:

dataset/
 ├── train/
 │    ├── google/
 │    ├── amazon/
 │    ├── facebook/
 │    ├── twitter/
 │    └── alibaba/
 └── val/
      ├── google/
      ├── amazon/
      ├── facebook/
      ├── twitter/
      └── alibaba/

🪜 Step 4 — Label the Logos

YOLO needs bounding boxes (so it knows where the logo is).

Use a free tool: https://roboflow.com

or LabelImg (desktop tool).

Draw boxes around logos and export labels in YOLO format (.txt files).

🪜 Step 5 — Train YOLOv11 on Your Logos

Create a small config YAML file (e.g., data.yaml):

train: /content/dataset/train/images
val: /content/dataset/val/images
nc: 5
names: ['google', 'amazon', 'facebook', 'twitter', 'alibaba']


Run training:

model = YOLO('yolov11s.pt')   # start from pretrained small model
model.train(data='data.yaml', epochs=20, imgsz=640)

🪜 Step 6 — Test Your Model

Run detection on any screenshot:

results = model.predict('/content/test_screenshot.jpg', save=True)


You’ll see boxes drawn around detected logos in /runs/detect/predict.

🪜 Step 7 — Get Webpage Screenshots

For phishing and legit websites:

Use PhishTank to get phishing URLs.

For legit URLs, use official brand sites.

Capture screenshots using Selenium:

from selenium import webdriver

driver = webdriver.Chrome()
driver.get("https://example.com")
driver.save_screenshot("page.png")
driver.quit()

🪜 Step 8 — Match Logo with Domain

Once YOLO detects a logo, check if the domain is legitimate.

Example:

import tldextract

def check_legitimacy(url, detected_brand):
    legit_domains = {
        'google': ['google.com', 'gmail.com'],
        'amazon': ['amazon.com'],
        'facebook': ['facebook.com'],
        'twitter': ['twitter.com'],
        'alibaba': ['alibaba.com']
    }
    domain = tldextract.extract(url)
    full_domain = domain.domain + '.' + domain.suffix
    return full_domain in legit_domains.get(detected_brand, [])

🪜 Step 9 — Classify Result

If YOLO detects a logo and the domain does not match, it’s phishing:

brand = 'amazon'
url = 'https://amaz0n-support.com'
if not check_legitimacy(url, brand):
    print("⚠️ Phishing detected!")
else:
    print("✅ Legitimate site.")

🪜 Step 10 — Evaluate Results

Measure accuracy, recall, F1-score using your test set:

from sklearn.metrics import accuracy_score, recall_score, f1_score
# Compare model predictions with true labels



