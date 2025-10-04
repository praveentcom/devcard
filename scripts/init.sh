#!/bin/bash

# Check if data directory exists and is not empty
if [ -d "data" ] && [ "$(ls -A data)" ]; then
  echo "┌─────────────────────────────────────────────────────────────────┐"
  echo "│                        ⚠️  Warning                               │"
  echo "├─────────────────────────────────────────────────────────────────┤"
  echo "│  The '/data' directory is not empty.                            │"
  echo "│  DevCard may already be initialized.                            │"
  echo "│                                                                 │"
  echo "│  Please remove the /data directory and try again.               │"
  echo "└─────────────────────────────────────────────────────────────────┘"
  exit 1
fi

# Download and extract data from zip file
echo "📥 Downloading data from zip file..."
echo
curl -L -o data.zip "https://storage.googleapis.com/praveentcom-public/projects/devcard/data/data-v1.0.5.zip"
echo

if [ $? -eq 0 ]; then  
  # Extract the zip file to data directory
  echo "📦 Extracting data..."
  unzip -q data.zip -d data
  
  if [ $? -eq 0 ]; then
    # Remove __MACOSX folder if it exists (macOS metadata)
    if [ -d "data/__MACOSX" ]; then
      rm -rf data/__MACOSX
    fi
    
    # Clean up the zip file
    rm data.zip
  else
    echo "❌ Failed to extract data"
    exit 1
  fi
else
  echo "❌ Failed to download data"
  exit 1
fi

echo
echo "┌─────────────────────────────────────────────────────────────────┐"
echo "│                    🎉 Setup Complete!                           │"
echo "├─────────────────────────────────────────────────────────────────┤"
echo "│  🚀 Next Steps:                                                 │"
echo "│     npm run dev    - Start development server                   │"
echo "│     npm run build  - Build for production                       │"
echo "│                                                                 │"
echo "│  📝 Customize your content in the /data directory               │"
echo "└─────────────────────────────────────────────────────────────────┘"
