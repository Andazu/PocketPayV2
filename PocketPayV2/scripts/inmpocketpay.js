const currentUrl = "/fastlane/";
let startCalling;
let purchaseDelayTimer;
let txtPurchaseTimerText = "";

document.addEventListener("DOMContentLoaded", () => {
    const swiperContainer = document.querySelector(".swiper-container");
    const swiperLabel = document.querySelector(".swiper-label");
    const swiperArrow = document.getElementById("swiper-arrow");
    const purchaseCardPrompt = document.getElementById("purchaseCardPrompt");
    const swiper = document.getElementById("swiper");
    const locations = document.getElementById("locations");
    const handheldonly = document.getElementById("handheldonly");
    const pinned = document.getElementById("pinned");
    let startX, currentX;
    let dragging = false;

    purchaseCardPrompt.innerHTML = purchaseCardPrompt.getAttribute("data-meal-start");
    txtPurchaseTimerText = document.getElementById("purchaseTimerText").getAttribute("data-timer");
    swiper.style.display = (swiper.getAttribute("data-isclosed").toLowerCase() == "false") ? "block" : "none";
    pinned.style.display = (swiper.getAttribute("data-isclosed").toLowerCase() == "false") ? "block" : "none";
    locations.style.display = (locations.getAttribute("data-locations").toLowerCase() == "true") ? "block" : "none";
    handheldonly.style.display = (handheldonly.getAttribute("data-handheldonly").toUpperCase() == "Y") ? "block" : "none";
    document.getElementById("chkPinned").checked = (pinned.getAttribute("data-pinned").toUpperCase() == "Y");

    const setSwiperTransition = (transitionStyle) => {
        swiperArrow.style.transition = transitionStyle;
        swiperLabel.style.transition = transitionStyle;
    };

    const handleSwipe = (translateX) => {
        swiperArrow.style.transform = `translateX(${translateX}px)`;
        const opacity = 1 - translateX / ((swiperContainer.offsetWidth - swiperArrow.offsetWidth) / 2);
        swiperLabel.style.opacity = Math.max(opacity, 0).toString();
    };

    swiperArrow.addEventListener("touchstart", (e) => {
        startX = e.touches[0].pageX;
        dragging = true;
        setSwiperTransition("none");
    });

    swiperArrow.addEventListener("touchmove", (e) => {
        if (!dragging) return;
        currentX = e.touches[0].pageX - startX;
        const translateX = Math.max(0, Math.min(currentX, swiperContainer.offsetWidth - swiperArrow.offsetWidth));
        handleSwipe(translateX);
    });

    swiperArrow.addEventListener("touchend", () => {
        dragging = false;
        document.getElementById("pinned").style.display = "none";
        document.getElementById("locations").style.display = "none";
        const threshold = swiperContainer.offsetWidth / 2;
        setSwiperTransition("transform 0.3s ease, opacity 0.3s ease");

        if (currentX > threshold) {
            swiperArrow.style.transform = "translateX(0)";
            swiperLabel.style.opacity = "1";
            document.getElementById("swiper").style.display = "none";
            document.getElementById("purchaseTimerText").style.display = "flex";
            purchaseCardPrompt.innerHTML = purchaseCardPrompt.getAttribute("data-meal-wait");
            const timerWait = parseInt(purchaseTimerText.getAttribute("data-timer-wait"), 10);
            purchaseTimerText.innerHTML = txtPurchaseTimerText.replace("$seconds$", timerWait);
            purchaseDelayTimer = 0;
            startCalling = setInterval(purchaseTimer, 1000);
        } else {
            swiperArrow.style.transform = "translateX(0)";
            swiperLabel.style.opacity = "1";
        }
    });

    document.getElementById("purchaseTimerText").addEventListener("click", () => {
        if (parseInt(purchaseTimerText.getAttribute("data-timer-wait"), 10)>0) {
            clearInterval(startCalling)
            document.getElementById("pinned").style.display = "block";
            document.getElementById("purchaseTimerText").style.display = "none";
            document.getElementById("swiper").style.display = "block";
            document.getElementById("locations").style.display = (document.getElementById("locations").getAttribute("data-locations").toLowerCase() == "true") ? "block" : "none";
            purchaseCardPrompt.innerHTML = purchaseCardPrompt.getAttribute("data-meal-start");
        }
    });

    // MPRO change of element not actually implemented
    document.getElementById("SelectedElementId").addEventListener("change", () => {
        const selector = document.getElementById("SelectedElementId");
        const customerno = document.getElementById("locations").getAttribute("data-cno");
        document.location.href = "?customer=" + customerno + "&elementid=" + selector.value;
    });
});

const purchaseTimer = () => {
    const purchaseTimerText = document.getElementById("purchaseTimerText");
    const timerWait = parseInt(purchaseTimerText.getAttribute("data-timer-wait"), 10);
    purchaseDelayTimer++;
    let timeLeft = timerWait - purchaseDelayTimer > 0 ? timerWait - purchaseDelayTimer : 0;

    purchaseTimerText.innerHTML = purchaseTimerText.getAttribute("data-timer");
    purchaseTimerText.innerHTML = txtPurchaseTimerText.replace("$seconds$", timeLeft);

    if (purchaseDelayTimer >= timerWait || timerWait==0) {
        clearInterval(startCalling);

        placeOrder()
            .then(() => {
                //proceed
            })
            .catch((error) => {
                console.error("inmERROR: Error placing order", error);
            });
    }
};

const placeOrder = () => {
    return new Promise((resolve, reject) => {
        const postData = [{
            ElementIdSelling: document.getElementById("ElementIdSelling").getAttribute("data-elementidselling"),
            PLUID: document.getElementById("PLUID").getAttribute("data-pluid"),
            Quantity: document.getElementById("Quantity").getAttribute("data-quantity"),
            Pinned: document.getElementById("chkPinned").checked ? "Y": "N"
        }];

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/inmsystemsapi/api/InmPOCKETPay/PlaceOrder", true);
        xhr.setRequestHeader("APIKey", document.getElementById("APIKey").getAttribute("data-apikey"));
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = () => {
            if (xhr.status === 200) {
                const apiResponse = JSON.parse(xhr.responseText);
                const { Status: apiStatus } = apiResponse;

                switch (apiStatus) {
                    case "1":
                        makePurchase();
                        resolve();
                        break;
                    case "2":
                        makePurchaseFail()
                        reject(new Error("API responded with error status"));
                        break;
                    case "0":
                        makePurchaseFail()
                        reject(new Error("API responded with error status"));
                        break;
                }
            } else {
                reject(new Error("Network error"));
            }
        };

        xhr.onerror = () => {
            reject(new Error("Network error"));
        };

        xhr.send(JSON.stringify(postData));
    });
};

const makePurchase = () => {
    const purchaseTimerText = document.getElementById("purchaseTimerText");
    const purchaseCardPrompt = document.getElementById("purchaseCardPrompt");
    const successTime = parseInt(purchaseCardPrompt.getAttribute("data-success-time"), 10);
    const iconCheck = document.getElementById("iconCheck");

    purchaseCardPrompt.innerHTML = purchaseCardPrompt.getAttribute("data-meal-success");
    purchaseTimerText.innerHTML = txtPurchaseTimerText.replace("$seconds$", purchaseTimerText.getAttribute("data-timer-wait"));
    purchaseTimerText.style.display = "none";
    iconCheck.style.display = "block";

    const audioElementOK = document.createElement("audio");
    audioElementOK.src = `${currentUrl}media/inmKioskAccept.wav`;

    audioElementOK.play();

    //MPRO - make URL redirect
    setTimeout(() => {
        document.location.href ="/inmscripts/aoInvoice/Invoice.asp?FindLastOrder=Y&InvoiceType=WebPayment";
    }, successTime * 1000);
};

//MPRO - check this functions code / sound src etc.
const makePurchaseFail = () => {
    const purchaseTimerText = document.getElementById("purchaseTimerText");
    const purchaseCardPrompt = document.getElementById("purchaseCardPrompt");
    const failTime = parseInt(purchaseCardPrompt.getAttribute("data-error-time"), 10);
    const iconFail = document.getElementById("iconFail");

    purchaseCardPrompt.innerHTML = purchaseCardPrompt.getAttribute("data-meal-error");
    purchaseTimerText.innerHTML = txtPurchaseTimerText.replace("$seconds$", purchaseTimerText.getAttribute("data-timer-wait"));
    purchaseTimerText.style.display = "none";
    iconFail.style.display = "block";

    const audioElementError = document.createElement("audio");
    audioElementError.src = `${currentUrl}media/inmKioskError.wav`;

    audioElementOK.play();

    setTimeout(() => {
        window.location.reload();
    }, failTime * 1000);
};