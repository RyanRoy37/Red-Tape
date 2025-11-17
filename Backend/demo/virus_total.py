import time
from dotenv import load_dotenv
import os
import requests 


load_dotenv()
#to load the .env file 

virus_total_api_key=os.getenv("VIRUS_TOTAL_API_KEY")




def scan_file(file_path):
    url = "https://www.virustotal.com/api/v3/files"
    headers = {
    "x-apikey": virus_total_api_key,
    "accept": "application/json",
    #"content-type": "multipart/form-data"
    # The above need not be set, as requests will set it automatically when using the files parameter
    }
    response = None
    with open(file_path, 'rb') as f:
        files = {"file": (os.path.basename(file_path), f)}
        response = requests.post(url, headers=headers, files=files)
        scan_response = response.json()

# Extract analysis ID
    data = scan_response.get("data", {})
    analysis_id = data.get("id", "")
    if not analysis_id:
        print("No analysis ID found. Upload response =", scan_response)
        return scan_response
    status = "queued"

    while status != "completed":
        res = requests.get(
            url=f"https://www.virustotal.com/api/v3/analyses/{analysis_id}",
            headers={
            "x-apikey": virus_total_api_key,
             "accept": "application/json"
         }
        )

        final_response = res.json()
        print("Scanning...")

    # Update status
        status = final_response["data"]["attributes"]["status"]

        if status != "completed":
            time.sleep(3)   # wait before polling again

# Return final completed scan results
    malicious_count = (
    final_response
        .get("data", {})
        .get("attributes", {})
        .get("stats", {})
        .get("malicious", 0)
    )
    suspicious_count = (
        final_response.get("data",{}).get("attributes",{}).get("stats",{}).get("suspicious",0))

    return f"Malicious:{malicious_count}, Suspicious:{suspicious_count}"



    
print(scan_file("Backend/demo/demo_file.sh"))

