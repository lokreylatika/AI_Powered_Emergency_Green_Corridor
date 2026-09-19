from ultralytics import YOLO

MODEL_PATH = "runs/detect/runs/vehicle_detector-4/weights/best.pt"
TEST_IMAGES = "datasets/vehicle_dataset/images/test"

model = YOLO(MODEL_PATH)

results = model.predict(
    source=TEST_IMAGES,
    conf=0.30,
    save=True
)

print("\nDetection completed!")
print("Open the generated images in the runs/detect folder.")