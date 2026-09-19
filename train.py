from ultralytics import YOLO

if __name__ == "__main__":

    # Load a pretrained lightweight YOLO model
    model = YOLO("yolo26n.pt")

    # Train on our vehicle dataset
    results = model.train(
        data="datasets/vehicle_dataset/data.yaml",
        epochs=10,
        imgsz=640,
        batch=4,
        project="runs",
        name="vehicle_detector"
    )

    print("Training completed!")