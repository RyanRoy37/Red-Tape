<h1 align="center">Automated malicious advertisement detection using VirusTotal, URLVoid, and TrendMicro</h1>

<a href="https://ieeexplore.ieee.org/document/7921994">Research Paper</a>

<h2> Abstract</h2>
<h3> The Internet economy is based on free access to content in exchange of viewing advertisements that might lead to online purchases. Advertisements represent an important source of revenue to Advertising companies. Those companies employ every possible technique and trick to maximize clicks and visits to advertisers' websites. Modern websites exchange advertisement contents from ads' providers (such as Google AdSense), which means they do not control the contents of those advertisements. Although large providers such as Google and Yahoo! are supposed to be trustworthy, ad arbitration allows them to auction of those ad slots to other providers. Therefore, web administrators cannot guarantee the source of the ads on their delegated website areas. Those advertisements contain Javascript and may redirect to malicious websites which might lead to malicious code being executed or malware being installed. This paper proposes and implements a system for automatically detecting malicious advertisements. It employs three different online malware domain detections systems (VirusTotal, URLVoid, and TrendMicro) for malicious advertisements detection purposes and reports the number of detected malicious advertisements using each system. In addition, we study the efficiency of each system by calculating the confusion matrix and accuracy. We find that URLVoid is the best in terms of accuracy (73%) because it uses a combination of well known website scanners and domain blacklists.</h3>

<h3> AI Generated Implementation </h3>

# Implementation Steps for Automatic Detection of Malicious Advertisements

## 1. Data Source Selection
- **Good feed:** Alexa Top 1 Million websites.  
- **Bad feed:** Blacklisted websites known for malicious behavior.

## 2. Website Crawling
- Crawl a total of **600 websites** using **Selenium WebDriver**:
  - 400 websites from the good feed:
    - 200 top-ranked  
    - 200 mid-ranked  
  - 200 websites from the bad feed:
    - 100 top  
    - 100 bottom  
- Configure **VPN (Browsec)** to access geo-blocked or restricted websites.

## 3. Advertisement URL Extraction
- Extract advertisement URLs (iframes) from each crawled webpage using Selenium automation.  
- Store extracted ad URLs in a text file named **`URLs.txt`**.  
- Use **Websense Master Database** to categorize URLs and identify advertisement links.  
- Save final advertisement URLs in **`AdsURLs.txt`**.

## 4. VirusTotal Analysis
1. Open **VirusTotal** webpage.  
2. Enter each ad URL into the scan field and trigger **“Scan it!”**.  
3. Extract detection ratio.  
4. **Classification rule:**  
   - If **ratio > 1 → malicious**  
   - Else → benign  
5. Save results in **`VirusTotalResults.txt`**.

## 5. URLVoid Analysis
1. Open **URLVoid** webpage.  
2. Enter each ad URL into the scan field and trigger **“Submit Now”**.  
3. Extract safety reputation score.  
4. **Classification rule:**  
   - If **score > 1 → malicious**  
   - Else → benign  
5. Save results in **`URLVoidResults.txt`**.

## 6. TrendMicro Site Safety Analysis
1. Open **TrendMicro Site Safety Center** webpage.  
2. Enter each ad URL and click **“Check Now”**.  
3. Extract assigned site score.  
4. **Classification rule:**  
   - If **score = “Dangerous” → malicious**  
   - Else → benign  
5. Save results in **`TrendMicroResults.txt`**.

## 7. Result Compilation
- Count the number of **malicious** and **benign** ads detected by each system.  
- Randomly select a sample of **70 ad URLs** (35 benign + 35 malicious) for evaluation.  
- Determine **ground truth labels** through manual verification using site history and reputation databases.

## 8. Evaluation and Accuracy Calculation
Construct confusion matrices for each system (**VirusTotal**, **URLVoid**, **TrendMicro**):

| Term | Meaning |
|------|----------|
| TP | True Positive |
| TN | True Negative |
| FP | False Positive |
| FN | False Negative |

**Accuracy Formula:**
\[
Accuracy = \frac{TP + TN}{TP + TN + FP + FN}
\]

## 9. Performance Comparison

| Tool | Accuracy | Notes |
|------|-----------|-------|
| **VirusTotal** | 56% | Uses AV + scanners only |
| **URLVoid** | **73% (Best)** | Combines blacklists + scanners |
| **TrendMicro** | 51% | Uses internal reputation model |

## 10. Analysis and Conclusion
- **URLVoid** outperformed other tools due to its hybrid detection approach combining multiple data sources.  
- **VirusTotal** and **TrendMicro** showed lower accuracy due to limited or proprietary data models.  

### Key Insight:
> Combining multiple detection tools significantly improves malvertisement detection accuracy.

### Future Work:
- Integrate additional scanners and hybrid data sources to enhance detection precision.  
- Implement real-time classification and automated feedback loops to reduce false detections.


<h1 algn="center">Optimizing Away JavaScript Obfuscation</h1>

<a href="">Research Paper</a>

<h2> Abstract </h2>
<h3>JavaScript is a popular attack vector for releasing malicious payloads on unsuspecting Internet users. Authors of this malicious JavaScript often employ numerous obfuscation techniques in order to prevent the automatic detection by antivirus and hinder manual analysis by professional malware analysts. Consequently, this paper presents SAFE-DEOBS, a JavaScript deobfuscation tool that we have built. The aim of SAFE-DEOBS is to automatically deobfuscate JavaScript malware such that an analyst can more rapidly determine the malicious script's intent. This is achieved through a number of static analyses, inspired by techniques from compiler theory. We demonstrate the utility of SAFE-DEOBS through a case study on real-world JavaScript malware, and show that it is a useful addition to a malware analyst's toolset.</h3>

<h3> AI Generated Implementation </h3>

# Implementation Steps for SAFE-DEOBS: JavaScript Malware Deobfuscation

## 1. Sample Collection
- Collect real-world JavaScript malware samples from publicly available datasets (e.g., Hynek Petrak dataset).
- Maintain a corpus and track provenance and any preprocessing applied (timestamps, normalization steps).

## 2. Parsing and AST Generation
- Parse input JavaScript code using the **SAFE v2.0** framework to generate the **Abstract Syntax Tree (AST)**.

## 3. Preprocessing (SAFE built-in modules)
- **Hoister**
  - Lift variable declarations to the top of their scopes to normalize declaration locations.
- **WithRewriter**
  - Eliminate `with` statements to restore proper lexical scoping and simplify analysis.

## 4. Iterative Deobfuscation Loop
- Perform iterative deobfuscation passes on the AST until a fixed point is reached (no further transformations).

### 4.1 Constant Folding
- Detect and evaluate expressions involving constants.
- Replace concatenated or arithmetic constant expressions with computed literal values.

### 4.2 Constant Propagation
- Track constant variable states across the AST using an abstract-interpretation lattice model.
- Substitute tracked constant values directly into expressions.

### 4.3 Dead-Branch Removal
- Identify branches and `switch` cases with constant conditions.
- Remove unreachable code sections revealed by earlier passes.

### 4.4 Function Inlining
- Detect trivial functions (e.g., functions with a single `return` literal).
- Replace function calls with their return literals directly in the AST where semantics allow.

### 4.5 String Decoding
- Detect encoded string patterns (hex, Unicode escapes, Base64, common custom encodings).
- Decode strings and rewrite them as readable literals in the AST.

### 4.6 Variable Renaming
- Replace confusing or opaque variable names with deterministic, readable names (for example, use animal names).
- Keep original identifiers as comments for traceability and analyst reference.

### 4.7 Repeat Until Fixed Point
- Repeat all deobfuscation passes until no further AST changes occur.

## 5. Serialization & Verification
- Serialize the optimized AST back into readable JavaScript source code.
- Verify correctness and readability by:
  - Manual inspection.
  - Semantic comparison with the original behavior where possible (tests, known I/O behavior).

## 6. Large-Scale Evaluation
- Evaluate the tool on large malware corpora (example: ≈39,450 samples, reduced to 28,285 after normalization).
- Measure complexity reduction using software metrics:
  - Lines of Code (LOC)
  - Number of functions
  - Cyclomatic complexity
  - Halstead length and related metrics
- Use tools such as **escomplex** to compare metrics before and after deobfuscation.

## 7. Case Study
- Perform an in-depth case study on a representative malware sample (example: reduced from **475 LOC → 12 LOC** after deobfuscation).
- Document the transformations applied and how readability/analysis effort improved.

## 8. Accuracy & Validation
- Validate accuracy by ensuring preserved semantics and improved code readability:
  - Regression tests where available.
  - Manual behavioral validation and comparator tests (e.g., inputs/outputs, side effects).

## 9. Integration & Release
- Integrate **SAFE-DEOBS** into analyst workflows for static JavaScript malware analysis (tooling, documentation, CI).
- Release the tool publicly (e.g., GitHub) with:
  - Usage instructions
  - Example workflows
  - Test corpus and expected outputs
  - License and contribution guidelines

## 10. Future Work (optional)
- Expand decoders for custom/novel string obfuscation schemes.
- Add dynamic emulation checks for behavior-preserving validation.
- Automate performance benchmarks and continuous integration tests for new code transformations.
- Add a visualization interface to show transformation steps for analyst transparency.
