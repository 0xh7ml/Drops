// index page

const newDonor = document.getElementById('giveBlood');
const findDonors = document.getElementById('takeBlood');
const homeurl = document.getElementById('home');
const baseURL = 'https://drops.itsaikat.com/api/v1';

if (newDonor) {
    newDonor.addEventListener('click', () => {
        window.location.href = '/signup';
    });
}

if (findDonors) {
    findDonors.addEventListener('click', () => {
        window.location.href = '/donors';
    });
}

if (homeurl) {
    homeurl.addEventListener('click', () => {
        window.location.href = '/';
    });
}

// form submission
const signupForm = document.getElementById('signup-form');

if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // get form data
        const name = document.getElementById('nameInput').value.trim();
        const id = document.getElementById('idInput').value.trim();
        const phone = document.getElementById('phoneInput').value.trim();
        const bloodgroup = document.getElementById('groups').value.trim();

        const payload = {
            name,
            universityid: id,
            phonenumber: phone,
            bloodgroup
        };

        // pass the form data into CreateDonor()
        CreateDonor(payload);

        // reset the form
        signupForm.reset();
    });
}

// make API call to create donor
function CreateDonor(data) {
    const myHeaders = new Headers({
        "Content-Type": "application/json"
    });

    const payload = JSON.stringify({
        name: data.name,
        universityId: data.universityid,
        phoneNumber: data.phonenumber,
        bloodGroup: data.bloodgroup
    });

    fetch(`${baseURL}/register/`, {
        method: 'POST',
        headers: myHeaders,
        body: payload
    })
    .then(response => response.json())
    .then(() => {
        window.location.href = '/success';
    })
    .catch(error => console.error('Error:', error));
}

// get all donor list
const donorWrap = document.getElementById('donor-wrap');

if (donorWrap) {
    getDonorData();
}

function getDonorData() {
    fetch(`${baseURL}/donors/`)
        .then(response => response.json())
        .then(data => {
            donorWrap.innerHTML = ""; // Clear existing content

            if (data.length > 0) {
                data.forEach(showDonors);
            } else {
                donorWrap.innerHTML = `
                <div class="alert alert-danger mb-2" role="alert">
                    No Donor Found!
                </div>`;
            }
        })
        .catch(error => console.error('Error:', error));
}

function showDonors(data) {
    const donorHTML = `
    <div class="horizontal-card mb-3" data-group="${data.bloodGroup}">
        <div class="d-flex flex-row justify-content-between mb-2">
            <div class="horizontal-donor">
                <div class="horizontal-title">${data.name} - (${data.bloodGroup})</div>
                <div class="horizontal-subtitle">ID: ${data.universityId}</div>
            </div>
            <span class="horizontal-call">
                <a href="tel:+${data.phoneNumber}"><i class="bi bi-telephone-outbound-fill"></i></a>
            </span>
        </div>
    </div>`;

    donorWrap.innerHTML += donorHTML;
}

// filter blood 
const filterBlood = document.getElementById('selectGroup');

if (filterBlood) {
    filterBlood.addEventListener('change', (f) => {
        f.preventDefault();
        const filterValue = filterBlood.value;
        const donorList = document.querySelectorAll(".horizontal-card");

        donorList.forEach((group) => {
            const datagroup = group.getAttribute("data-group");
            if (filterValue === "all" || datagroup === filterValue) {
                group.classList.remove("d-none");
            } else {
                group.classList.add("d-none");
            }
        });
    });
}