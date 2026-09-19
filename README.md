 🚑 Emergency Green Corridor System

## PRISMTECH 2026 Hackathon | Transportation Domain

An AI-powered emergency traffic management system designed to detect ambulances in traffic scenes, track their movement, and provide intelligent traffic-signal priority to create a simulated green corridor for emergency vehicles.

---

## 📌 Project Description

During medical emergencies, ambulances can lose valuable time because of traffic congestion and red traffic signals.

The **Emergency Green Corridor System** uses computer vision and intelligent traffic-management logic to detect ambulances in traffic scenes and provide signal priority along their route.

The system uses a YOLO-based object detection model to identify vehicles such as ambulances, cars, buses, and trucks. When an ambulance is detected, the system is designed to track its movement, identify upcoming junctions, and activate a signal-priority mechanism.

The final prototype aims to simulate a **green corridor**, allowing an ambulance to move through multiple junctions with reduced signal delays.

---

# 🎯 Problem Statement

Ambulances can experience significant delays due to:

- Heavy traffic
- Congested intersections
- Red traffic signals
- Lack of coordination between traffic signals
- Difficulty identifying and prioritizing emergency vehicles

Our project aims to develop an intelligent system that can detect an ambulance from traffic-camera/video input and coordinate traffic-signal priority along its route.

---

# 💡 Proposed Solution

The proposed system follows this pipeline:

```text
Traffic / CCTV Video
        ↓
Frame Extraction
        ↓
YOLO Vehicle Detection
        ↓
Vehicle Classification
        ↓
🚑 Ambulance Detection
        ↓
Ambulance Tracking
        ↓
Position & Junction Identification
        ↓
Signal Priority Engine
        ↓
Traffic Signal Simulation
        ↓
🚦 Green Corridor
        ↓
🏥 Hospital
