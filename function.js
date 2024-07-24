document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".option-button");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            buttons.forEach(btn => {
                if (btn !== this) {
                    btn.classList.add("inactive");
                }
            });
            this.classList.remove("inactive");
            this.classList.add("active");
        });
    });
});


//form code here
document.addEventListener('DOMContentLoaded', function () {
    const propertyAmount = document.getElementById('property-amount');
    const city = document.getElementById('city');
    const pincode = document.getElementById('pincode');
    const yesButton = document.getElementById('yes-button');
    const noButton = document.getElementById('no-button');
    const submitButton = document.getElementById('submit-button');
    let propertyIdentified = null;

    function validateForm() {
        if (propertyAmount.value && city.value && pincode.value && propertyIdentified !== null) {
            submitButton.disabled = false;
            submitButton.classList.add('enabled');
        } else {
            submitButton.disabled = true;
            submitButton.classList.remove('enabled');
        }
    }

    propertyAmount.addEventListener('change', validateForm);
    city.addEventListener('change', validateForm);
    pincode.addEventListener('input', validateForm);

    yesButton.addEventListener('click', () => {
        propertyIdentified = true;
        yesButton.classList.add('selected');
        noButton.classList.remove('selected');
        validateForm();
    });

    noButton.addEventListener('click', () => {
        propertyIdentified = false;
        noButton.classList.add('selected');
        yesButton.classList.remove('selected');
        validateForm();
    });

    submitButton.addEventListener('click', () => {
        if (!submitButton.disabled) {
            alert('Form is submitted!');
        }
    });
});


//First Scroll Code Here 
document.querySelectorAll('.scroll-desgin').forEach(element => {
    element.addEventListener('click', () => {

        document.querySelectorAll('.scroll-desgin').forEach(el => el.classList.remove('active'));
        element.classList.add('active');


        const girlsImage = document.getElementById('girlsImage');
        if (element.dataset.info === 'info1') {
            girlsImage.classList.remove('changed');
        } else {
            girlsImage.classList.add('changed');
        }

        const infoDisplay = document.getElementById('info-display');
        infoDisplay.textContent = `You selected ${element.dataset.info}`;
    });
});

//second section function of calculate 
document.addEventListener('DOMContentLoaded', () => {
    const loanAmountSlider = document.getElementById('loan-amount-slider');
    const loanAmountDisplay = document.getElementById('loan-amount-display');
    const loanRateSlider = document.getElementById('loan-rate-slider');
    const loanRateDisplay = document.getElementById('loan-rate-display');
    const loanTenureSlider = document.getElementById('loan-tenure-slider');
    const loanTenureDisplay = document.getElementById('loan-tenure-display');

    const monthlyEmi = document.getElementById('monthly-emi');
    const principalAmount = document.getElementById('principal-amount');
    const totalInterest = document.getElementById('total-interest');
    const totalAmount = document.getElementById('total-amount');
    const donutChart = document.getElementById('donut-chart');

    function calculateEMI(principal, rate, tenure) {
        const monthlyRate = rate / (12 * 100);
        const numPayments = tenure * 12;
        const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
        return emi;
    }

    function updateCalculations() {
        const principal = parseFloat(loanAmountSlider.value);
        const rate = parseFloat(loanRateSlider.value);
        const tenure = parseFloat(loanTenureSlider.value);


        loanAmountDisplay.textContent = `₹${principal.toLocaleString()}`;
        loanRateDisplay.textContent = `${rate}%`;
        loanTenureDisplay.textContent = `${tenure}Yr`;


        const emi = calculateEMI(principal, rate, tenure);
        const totalPayments = emi * tenure * 12;
        const totalInterestAmount = totalPayments - principal;


        monthlyEmi.textContent = `₹${emi.toFixed(2).toLocaleString()}`;
        principalAmount.textContent = `₹${principal.toLocaleString()}`;
        totalInterest.textContent = `₹${totalInterestAmount.toLocaleString()}`;
        totalAmount.textContent = `₹${totalPayments.toLocaleString()}`;


        const principalPercent = (principal / totalPayments) * 100;
        const interestPercent = 100 - principalPercent;

        donutChart.style.background = `conic-gradient(
            #1C85E8 0% ${principalPercent}%, 
            #100F3F ${principalPercent}% ${principalPercent + interestPercent}%
        )`;
    }

    loanAmountSlider.addEventListener('input', updateCalculations);
    loanRateSlider.addEventListener('input', updateCalculations);
    loanTenureSlider.addEventListener('input', updateCalculations);

    updateCalculations();
});




//Slider function code here----
document.addEventListener('DOMContentLoaded', () => {
    const sliders = {
        amount: document.getElementById('loan-amount-slider'),
        rate: document.getElementById('loan-rate-slider'),
        tenure: document.getElementById('loan-tenure-slider')
    };

    const displays = {
        amount: document.getElementById('loan-amount-display'),
        rate: document.getElementById('loan-rate-display'),
        tenure: document.getElementById('loan-tenure-display')
    };

    const triangles = {
        amount: document.getElementById('triangle-loan'),
        rate: document.getElementById('triangle-rate'),
        tenure: document.getElementById('triangle-tenure')
    };

    function updateDisplay(value, display, format) {
        display.textContent = format(value);
    }

    function updateSlider(slider, display, triangle, min, max, format) {
        const value = parseFloat(slider.value);
        updateDisplay(value, display, format);
        const percentage = ((value - min) / (max - min)) * 100;
        triangle.style.left = `calc(${percentage}% - 10px)`;
    }

    sliders.amount.addEventListener('input', () => updateSlider(sliders.amount, displays.amount, triangles.amount, 1000, 1000000, formatMoney));
    sliders.rate.addEventListener('input', () => updateSlider(sliders.rate, displays.rate, triangles.rate, 1, 20, formatPercentage));
    sliders.tenure.addEventListener('input', () => updateSlider(sliders.tenure, displays.tenure, triangles.tenure, 1, 30, formatYears));

    document.querySelector('.fourth-box-button-emi').addEventListener('click', calculateEMI);
    document.querySelector('.fourth-box-button-home-loan').addEventListener('click', applyHomeLoan);

    function formatMoney(value) {
        return `₹${value.toFixed(2)}`;
    }

    function formatYears(value) {
        return `${value} years`;
    }

    function formatPercentage(value) {
        return `${value}%`;
    }

    function calculateEMI() {
        const salary = parseInt(document.querySelector('.salary-slider-month').value);
        const tenure = parseInt(document.querySelector('.salary-slider').value);
        const interestRate = parseFloat(document.querySelector('.interest-slider').value);
        const otherEMI = parseInt(document.querySelector('.emi-slider').value);

        const principal = salary * 12 * tenure;
        const monthlyInterestRate = interestRate / (12 * 100);
        const numberOfPayments = tenure * 12;

        const emi = (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
            (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

        updateDisplay(emi, document.querySelector('.money-box-title-emi-rupee'), formatMoney);

        const eligibility = (salary * 12 * tenure) - otherEMI;
        updateDisplay(eligibility, document.querySelector('.money-box-title-rupee'), formatMoney);
    }
});



//Elegibalty calactutor
document.addEventListener('DOMContentLoaded', () => {

    const salarySlider = document.querySelector('.salary-slider-month');
    const salaryValue = document.getElementById('salary-month');

    salarySlider.addEventListener('input', () => {

        const value = salarySlider.value;
        const formattedValue = (value / 1000).toFixed(0) + 'k';
        salaryValue.textContent = `₹${formattedValue}`;
    });


    const tenureSlider = document.getElementById('tenure-slider');
    const tenureValue = document.getElementById('tenure-value');

    tenureSlider.addEventListener('input', () => {
        tenureValue.textContent = `${tenureSlider.value} years`;
    });


    const interestSlider = document.getElementById('interest-slider');
    const interestValue = document.getElementById('interest-value');

    interestSlider.addEventListener('input', () => {
        interestValue.textContent = `${interestSlider.value}%`;
    });

    const emiSlider = document.getElementById('emi-slider');
    const emiValue = document.getElementById('emi-value');

    emiSlider.addEventListener('input', () => {
        emiValue.textContent = `₹${emiSlider.value.toLocaleString()}`;
    });
});


//News box
document.querySelectorAll('.appart-upside, .appart-downside').forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.style.overflow = 'auto';
    });
    element.addEventListener('mouseleave', () => {
        element.style.overflow = 'hidden';
    });
});


function applyHomeLoan() {
    alert('Application for Home Loan is in process.');
}

// Review slider Data
let currentReview = 0;
const reviews = [
    {
        name: "Debojyoti Ghosh",
        city: "Pune",
        rating: 5,
        text: "We applied for a joint Home Loan with Realezi for our new house in Pune. Liked the services and offers.",
        img: "./img/profile.png"
    },
    {
        name: "Navneet Kumar",
        city: "Delhi",
        rating: 5,
        text: "Good services and easy process. Got my loan approved in a week.",
        img: "./img/navneet.jpg"
    },
    {
        name: "Abhishek Sharma",
        city: "Mumbai",
        rating: 4,
        text: "The loan process was smooth and the customer support was helpful.",
        img: "./img/profile-img.jpg"
    },
    {
        name: "Mansi Mishra",
        city: "Gurugram",
        rating: 4,
        text: "Efficient service and quick approval. Satisfied with the overall experience.",
        img: "./img/profile2.jpg"
    },
    {
        name: "Rahul Verma",
        city: "Bangalore",
        rating: 3,
        text: "Service was okay, but the approval took longer than expected.",
        img: "./img/profile3.jpg"
    },
    {
        name: "Ankita Singh",
        city: "Hyderabad",
        rating: 5,
        text: "Excellent customer service and fast processing.",
        img: "./img/profile4.jpg"
    },
    {
        name: "Rohit Mehra",
        city: "Chennai",
        rating: 4,
        text: "Good service but the documentation process was a bit tedious.",
        img: "./img/profile5.jpg"
    },
    {
        name: "Sanya Kapoor",
        city: "Kolkata",
        rating: 3,
        text: "Decent service but faced some issues with the verification process.",
        img: "./img/profile6.jpg"
    },
    {
        name: "Vikas Dubey",
        city: "Ahmedabad",
        rating: 4,
        text: "Overall a good experience, but there's room for improvement in customer support.",
        img: "./img/profile.png"
    },
    {
        name: "Priya Sethi",
        city: "Jaipur",
        rating: 5,
        text: "Very satisfied with the quick and hassle-free loan approval process.",
        img: "./img/profile.png"
    }
];

function updateReview() {
    const profileImg = document.querySelector('.profile-image');
    const customerName = document.querySelector('.customer-name');
    const customerCity = document.querySelector('.customer-city');
    const rating = document.querySelector('.rating');
    const customerTextReview = document.querySelector('.customer-text-review');
    const cursorCircles = document.querySelectorAll('.cursor-circle');

    profileImg.src = reviews[currentReview].img;
    customerName.textContent = reviews[currentReview].name;
    customerCity.textContent = reviews[currentReview].city;
    rating.textContent = reviews[currentReview].rating;
    customerTextReview.textContent = reviews[currentReview].text;

    cursorCircles.forEach((circle, index) => {
        circle.classList.remove('active');
        if (index === currentReview) {
            circle.classList.add('active');
        }
    });
}

function nextReview() {
    currentReview = (currentReview + 1) % reviews.length;
    updateReview();
}

document.addEventListener('DOMContentLoaded', updateReview);


function playVideo() {
    document.querySelector('.video-container').classList.add('playing');
}


document.addEventListener('DOMContentLoaded', () => {
    const questionContainers = document.querySelectorAll('.asked-question-container');

    questionContainers.forEach(container => {
        const icon = container.querySelector('.asked-inner-down');
        const answer = container.querySelector('.asked-answer');

        icon.addEventListener('click', () => {
            if (answer.style.display === 'none' || answer.style.display === '') {
                answer.style.display = 'block';
            } else {
                answer.style.display = 'none';
            }
        });
    });
});



//Slider Background color change
function updateSliderBackground(slider) {
    const min = parseFloat(slider.min);
    const max = parseFloat(slider.max);
    const value = (slider.value - min) / (max - min);
    const background = `linear-gradient(to right, #100F3F ${value * 100}%, #1C85E8 ${value * 100}%, #1C85E8 100%)`;
    slider.style.background = background;
}

const interestSlider = document.getElementById('interest-slider');
const tenureSlider = document.getElementById('tenure-slider');
const salarySlider = document.getElementById('salary-slider');
const emiSlider = document.getElementById('emi-slider');


//Second section Slider
const loannamountSlider = document.getElementById('loan-amount-slider');
const loannrateSlider = document.getElementById('loan-rate-slider');
const loanntenureSlider = document.getElementById('loan-tenure-slider');


// Add input event listeners
interestSlider.addEventListener('input', function () {
    updateSliderBackground(interestSlider);
});

tenureSlider.addEventListener('input', function () {
    updateSliderBackground(tenureSlider);
});

salarySlider.addEventListener('input', function () {
    updateSliderBackground(salarySlider);
});

emiSlider.addEventListener('input', function () {
    updateSliderBackground(emiSlider);
});


loannamountSlider.addEventListener('input', function () {
    updateSliderBackground(loannamountSlider);
});

loannrateSlider.addEventListener('input', function () {
    updateSliderBackground(loannrateSlider);
});


loanntenureSlider.addEventListener('input', function () {
    updateSliderBackground(loanntenureSlider);
});

// Initialize the background for both sliders
updateSliderBackground(interestSlider);
updateSliderBackground(tenureSlider)
updateSliderBackground(salarySlider);
updateSliderBackground(emiSlider);

updateSliderBackground(loannamountSlider);
updateSliderBackground(loannrateSlider);
updateSliderBackground(loanntenureSlider);



// Apply Now Form FOunction COde is here open Popup 
var modal = document.getElementById("applyModal");


var btn = document.querySelector(".apply-button");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
