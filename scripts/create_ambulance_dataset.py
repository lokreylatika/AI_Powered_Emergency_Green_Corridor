from pathlib import Path
import shutil
import yaml

SOURCE_DIR = Path.cwd()
OUTPUT_DIR = SOURCE_DIR / "ambulance_dataset"

# Original ambulance-related class IDs
AMBULANCE_CLASSES = {2, 3, 4, 5, 6}

IMAGE_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
    ".webp"
}


def find_image(images_dir, stem):
    """Find image using the exact label basename."""

    for image in images_dir.iterdir():
        if image.is_file() and image.stem == stem:
            return image

    return None


def polygon_to_bbox(parts):
    """
    Convert YOLO segmentation polygon to YOLO bounding box.

    Input:
        class x1 y1 x2 y2 x3 y3 ...

    Output:
        0 center_x center_y width height
    """

    coordinates = list(map(float, parts[1:]))

    if len(coordinates) < 6:
        return None

    x_values = coordinates[0::2]
    y_values = coordinates[1::2]

    min_x = min(x_values)
    max_x = max(x_values)
    min_y = min(y_values)
    max_y = max(y_values)

    center_x = (min_x + max_x) / 2
    center_y = (min_y + max_y) / 2

    width = max_x - min_x
    height = max_y - min_y

    return f"0 {center_x:.6f} {center_y:.6f} {width:.6f} {height:.6f}"


def process_split(split):

    source_images = SOURCE_DIR / split / "images"
    source_labels = SOURCE_DIR / split / "labels"

    output_images = OUTPUT_DIR / split / "images"
    output_labels = OUTPUT_DIR / split / "labels"

    output_images.mkdir(parents=True, exist_ok=True)
    output_labels.mkdir(parents=True, exist_ok=True)

    print(f"\nProcessing: {split}")

    label_files = list(source_labels.glob("*.txt"))

    print(f"Found {len(label_files)} label files")

    images_copied = 0
    labels_created = 0
    ambulance_objects = 0
    missing_images = 0

    for label_file in label_files:

        lines = label_file.read_text(
            encoding="utf-8"
        ).splitlines()

        new_annotations = []

        for line in lines:

            parts = line.strip().split()

            if not parts:
                continue

            try:
                class_id = int(parts[0])
            except ValueError:
                continue

            # Keep only ambulance-related classes
            if class_id not in AMBULANCE_CLASSES:
                continue

            # Segmentation polygon
            if len(parts) > 5:

                bbox = polygon_to_bbox(parts)

                if bbox:
                    new_annotations.append(bbox)
                    ambulance_objects += 1

            # Normal YOLO bounding box
            elif len(parts) == 5:

                parts[0] = "0"

                new_annotations.append(
                    " ".join(parts)
                )

                ambulance_objects += 1

        # No ambulance annotation in this image
        if not new_annotations:
            continue

        # Find matching image
        image_file = find_image(
            source_images,
            label_file.stem
        )

        if image_file is None:

            print(
                f"WARNING: Image not found for "
                f"{label_file.name}"
            )

            missing_images += 1
            continue

        destination_image = (
            output_images / image_file.name
        )

        destination_label = (
            output_labels / label_file.name
        )

        # Copy image
        try:
            shutil.copyfile(
                str(image_file),
                str(destination_image)
            )
        except Exception as error:
            print(
                f"ERROR copying {image_file.name}: "
                f"{error}"
            )
            continue

        # Write converted detection labels
        destination_label.write_text(
            "\n".join(new_annotations) + "\n",
            encoding="utf-8"
        )

        images_copied += 1
        labels_created += 1

    print(f"Images copied       : {images_copied}")
    print(f"Labels created      : {labels_created}")
    print(f"Ambulance objects   : {ambulance_objects}")
    print(f"Missing images      : {missing_images}")


def create_yaml():

    data = {
        "path": str(OUTPUT_DIR.resolve()),
        "train": "train/images",
        "val": "valid/images",
        "test": "test/images",
        "nc": 1,
        "names": ["ambulance"]
    }

    yaml_file = OUTPUT_DIR / "data.yaml"

    with open(
        yaml_file,
        "w",
        encoding="utf-8"
    ) as file:

        yaml.dump(
            data,
            file,
            sort_keys=False
        )

    print("\nCreated:")
    print(yaml_file)


def main():

    print("=" * 60)
    print("CREATING AMBULANCE-ONLY DETECTION DATASET")
    print("=" * 60)

    print(f"\nSource:")
    print(SOURCE_DIR)

    print(f"\nOutput:")
    print(OUTPUT_DIR)

    for split in ["train", "valid", "test"]:
        process_split(split)

    create_yaml()

    print("\n" + "=" * 60)
    print("COMPLETED")
    print("=" * 60)


if __name__ == "__main__":
    main()