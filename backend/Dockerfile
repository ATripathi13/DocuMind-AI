# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Install system dependencies for OpenCV and EasyOCR
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    tesseract-ocr \
    poppler-utils \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Pre-download ML models silently to speed up startup and avoid log bloat
RUN TQDM_DISABLE=1 python -c "import easyocr; reader = easyocr.Reader(['en'])" > /dev/null 2>&1 && \
    TQDM_DISABLE=1 python -c "from ultralytics import YOLO; YOLO('yolov8n.pt')" > /dev/null 2>&1

# Set environment variables for unbuffered logging and silent progress bars
ENV PYTHONUNBUFFERED=1
ENV TQDM_DISABLE=1

# Make port 8000 available (Render will override this, but good for documentation)
EXPOSE 8000

# Run uvicorn when the container launches, binding to the PORT env variable
CMD sh -c "uvicorn api.main:app --host 0.0.0.0 --port ${PORT:-8000}"
