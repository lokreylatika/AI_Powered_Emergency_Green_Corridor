// ======================================================
// PRISMTECH 2026
// AI-POWERED EMERGENCY GREEN CORRIDOR
// ======================================================


// ------------------------------------------------------
// GET HTML ELEMENTS
// ------------------------------------------------------

const startBtn = document.getElementById("startBtn");
const destination = document.getElementById("destination");

const activeJunction = document.getElementById("activeJunction");
const corridorStatus = document.getElementById("corridorStatus");
const cctvStatus = document.getElementById("cctvStatus");

const mapAmbulance = document.getElementById("mapAmbulance");
const cctvAmbulance = document.getElementById("cctvAmbulance");

const hospitalName = document.getElementById("hospitalName");
const selectedDestination = document.getElementById("selectedDestination");

const distance = document.getElementById("distance");
const travelTime = document.getElementById("travelTime");
const intersectionCount = document.getElementById("intersectionCount");

const progress = document.getElementById("progress");
const progressBar = document.getElementById("progressBar");

const systemMessage = document.getElementById("systemMessage");

const junctions = document.querySelectorAll(".junction");
const signalCards = document.querySelectorAll(".signal-card");


// ------------------------------------------------------
// HOSPITAL DATA
// ------------------------------------------------------

const hospitals = {

    city: {
        name: "CITY CARE HOSPITAL",
        shortName: "CITY CARE",
        distance: "4.2 KM",
        time: "6 MIN",
        junctions: 3
    },

    apollo: {
        name: "APOLLO EMERGENCY CENTRE",
        shortName: "APOLLO",
        distance: "5.1 KM",
        time: "7 MIN",
        junctions: 3
    },

    government: {
        name: "GOVERNMENT GENERAL HOSPITAL",
        shortName: "GOVERNMENT",
        distance: "3.8 KM",
        time: "5 MIN",
        junctions: 2
    },

    trauma: {
        name: "EMERGENCY TRAUMA CENTRE",
        shortName: "TRAUMA",
        distance: "4.7 KM",
        time: "6 MIN",
        junctions: 3
    }

};


// ------------------------------------------------------
// WAIT FUNCTION
// ------------------------------------------------------

function wait(ms) {

    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });

}


// ------------------------------------------------------
// UPDATE PROGRESS
// ------------------------------------------------------

function updateProgress(value) {

    progress.textContent = value + "%";

    progressBar.style.width = value + "%";

}


// ------------------------------------------------------
// RESET SIGNALS
// ------------------------------------------------------

function resetSignals() {

    junctions.forEach(junction => {

        junction.classList.remove("active");

    });


    signalCards.forEach(card => {

        card.classList.remove("active");

        const state =
            card.querySelector(".signal-state");

        if (state) {
            state.textContent = "RED";
        }

    });

}


// ------------------------------------------------------
// ACTIVATE ONE JUNCTION
// ------------------------------------------------------

function activateJunction(number) {

    resetSignals();


    const currentJunction =
        junctions[number - 1];

    const currentSignal =
        signalCards[number - 1];


    if (currentJunction) {

        currentJunction.classList.add("active");

    }


    if (currentSignal) {

        currentSignal.classList.add("active");

        const state =
            currentSignal.querySelector(".signal-state");

        if (state) {
            state.textContent = "GREEN";
        }

    }


    activeJunction.textContent =
        "J" + number;

}


// ------------------------------------------------------
// MOVE AMBULANCE
// ------------------------------------------------------

function moveAmbulance(position) {

    mapAmbulance.style.left =
        position + "%";


    cctvAmbulance.style.left =
        Math.min(position, 82) + "%";

}


// ------------------------------------------------------
// RESET SYSTEM
// ------------------------------------------------------

function resetSystem() {

    activeJunction.textContent =
        "NONE";


    corridorStatus.textContent =
        "READY";

    corridorStatus.className =
        "kpi-value green";


    cctvStatus.innerHTML =
        "Waiting for ambulance detection...";


    systemMessage.textContent =
        "Ready to create emergency corridor";


    updateProgress(0);


    resetSignals();


    moveAmbulance(7);


    startBtn.disabled =
        false;


    startBtn.textContent =
        "🚑 CREATE GREEN CORRIDOR";

}


// ------------------------------------------------------
// DESTINATION CHANGE
// ------------------------------------------------------

destination.addEventListener(
    "change",
    function () {

        const hospital =
            hospitals[this.value];


        hospitalName.textContent =
            hospital.name;


        selectedDestination.textContent =
            hospital.shortName;


        distance.textContent =
            hospital.distance;


        travelTime.textContent =
            hospital.time;


        intersectionCount.textContent =
            hospital.junctions;


        resetSystem();

    }
);


// ------------------------------------------------------
// GREEN CORRIDOR
// ------------------------------------------------------

async function startGreenCorridor() {

    const hospital =
        hospitals[destination.value];


    // Disable button

    startBtn.disabled = true;

    startBtn.textContent =
        "⚡ AI PROCESSING...";


    // ==================================================
    // STEP 1 — AMBULANCE DETECTION
    // ==================================================

    corridorStatus.textContent =
        "DETECTING";

    corridorStatus.className =
        "kpi-value yellow";


    cctvStatus.innerHTML =
        "<b>● AMBULANCE DETECTED</b> • AMB-01";


    systemMessage.textContent =
        "AI detected emergency vehicle from CCTV";


    moveAmbulance(12);


    await wait(1500);


    // ==================================================
    // STEP 2 — ROUTE CALCULATION
    // ==================================================

    corridorStatus.textContent =
        "ROUTE FOUND";

    corridorStatus.className =
        "kpi-value blue";


    cctvStatus.innerHTML =
        "<b>AI ROUTE SELECTED</b> • OPTIMAL PATH";


    systemMessage.textContent =
        "Optimal route calculated to " +
        hospital.name;


    await wait(1500);


    // ==================================================
    // STEP 3 — JUNCTION 1
    // ==================================================

    activateJunction(1);

    corridorStatus.textContent =
        "GREEN CORRIDOR ACTIVE";

    corridorStatus.className =
        "kpi-value green";


    moveAmbulance(25);


    if (hospital.junctions === 1) {

        updateProgress(100);

    } else {

        updateProgress(
            Math.round(1 / hospital.junctions * 100)
        );

    }


    cctvStatus.innerHTML =
        "<b>J1 GREEN</b> • Ambulance proceeding";


    systemMessage.textContent =
        "J1 prioritized • Cross traffic released";


    await wait(2500);


    // ==================================================
    // STEP 4 — JUNCTION 2
    // ==================================================

    if (hospital.junctions >= 2) {

        activateJunction(2);

        moveAmbulance(50);


        if (hospital.junctions === 2) {

            updateProgress(75);

        } else {

            updateProgress(50);

        }


        cctvStatus.innerHTML =
            "<b>J2 GREEN</b> • Corridor continuing";


        systemMessage.textContent =
            "J1 restored • J2 now prioritized";


        await wait(2500);

    }


    // ==================================================
    // STEP 5 — JUNCTION 3
    // ==================================================

    if (hospital.junctions >= 3) {

        activateJunction(3);

        moveAmbulance(75);

        updateProgress(75);


        cctvStatus.innerHTML =
            "<b>J3 GREEN</b> • Hospital approaching";


        systemMessage.textContent =
            "J2 restored • Final junction prioritized";


        await wait(2500);

    }


    // ==================================================
    // STEP 6 — ARRIVAL
    // ==================================================

    resetSignals();


    moveAmbulance(88);

    updateProgress(100);


    activeJunction.textContent =
        "DONE";


    corridorStatus.textContent =
        "ARRIVED";

    corridorStatus.className =
        "kpi-value green";


    cctvStatus.innerHTML =
        "<b>✓ AMBULANCE ARRIVED</b> • Hospital reached";


    systemMessage.textContent =
        "Emergency corridor completed successfully";


    // Enable button again

    startBtn.disabled = false;

    startBtn.textContent =
        "↻ START NEW SCENARIO";

}


// ------------------------------------------------------
// BUTTON CLICK
// ------------------------------------------------------

startBtn.addEventListener(
    "click",
    startGreenCorridor
);


// ------------------------------------------------------
// INITIAL STATE
// ------------------------------------------------------

resetSystem();