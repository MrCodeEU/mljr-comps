import json

def process_country_codes():
    country_data = []
    
    with open('countryCodes.txt', 'r', encoding='utf-8') as file:
        for line in file:
            # Split the line into columns
            columns = line.strip().split('\t')
            if len(columns) < 3:
                continue
            
            # Extract data
            country_name = columns[0].strip()
            dial_code = columns[1].strip()
            codes = columns[2].strip().split('/')
            
            # Remove "1-" prefix from dial code if present
            if dial_code.startswith('1-'):
                dial_code = dial_code[2:]
            
            # Get country code and ISO code
            country_code = codes[0].strip()
            iso_code = codes[1].strip() if len(codes) > 1 else ''
            
            # Create flag code
            flag_code = f"circle-flags:{country_code.lower()}"
            
            # Create country entry
            country_entry = {
                "name": country_name,
                "code": country_code,
                "dialCode": dial_code,
                "isoCode": iso_code,
                "flag": flag_code
            }
            
            country_data.append(country_entry)
    
    # Write to JSON file
    with open('countryData.json', 'w', encoding='utf-8') as outfile:
        json.dump(country_data, outfile, indent=4)

if __name__ == "__main__":
    process_country_codes()

