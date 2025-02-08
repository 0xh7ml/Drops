// index page

const newDonor = document.getElementById('giveBlood');
const findDonors = document.getElementById('takeBlood');
const homeurl = document.getElementById('home');
const baseURL = 'https://drops.itsaikat.com/api/v1';

if (newDonor != null) {
    newDonor.addEventListener('click', () => {
        window.location.href = '/signup'
    });
}

if (findDonors != null) {
    findDonors.addEventListener('click', () => {
        window.location.href = '/donors'
    });
}

if (homeurl != null) {
    homeurl.addEventListener('click', () => {
        window.location.href = '/'
    });
}

// form submission
const signupForm = document.getElementById('signup-form');

if (signupForm != null) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // get form data 
        const name = document.getElementById('nameInput').value;
        const id = document.getElementById('idInput').value;
        const phone = document.getElementById('phoneInput').value;
        const bloodgroup = document.getElementById('groups').value;

        const payload =
        {
            "name": name,
            "universityid": id,
            "phonenumber": phone,
            "bloodgroup": bloodgroup
        }

        //pass the form data into CreateDonor()
        CreateDonor(payload);

        // reset the form
        signupForm.reset();
    })
}

// make API call to create donor
function CreateDonor(data) {
    const myHeaders = new Headers();
    myHeaders.append("Access-Control-Request-Method", "");
    myHeaders.append("Content-Type", "application/json");

    const payload = JSON.stringify({
        "name": data.name,
        "universityId": data.universityid,
        "phoneNumber": data.phonenumber,
        "bloodGroup": data.bloodgroup
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: payload,
        redirect: 'follow'
    };

    fetch(`${baseURL}/register/`, requestOptions)
        .then(response => response.json())
        .then(result => {
            window.location.href = '/success';
        })
        .catch(error => console.log('error', error));
}

// get all donor list
const donorSection = document.getElementById('donors-section');
const donorWrap = document.getElementById('donor-wrap');

if (donorWrap != null) {
    getDonorData();
}

function getDonorData() {
    fetch(`{baseURL}/donors/`)
        .then(response => response.json())
        .then(data => {
            if(data.length != 0){
                data.map(el => {
                    showDonors(el);
                })
            }
            else{
                showDonors(data);
            }
        })
        .catch(error => console.log('error', error));

    function showDonors(data) {
        const markdown = `
        <div class="horizontal-card mb-3" data-group="${data.bloodGroup}">
        <div class="d-flex flex-row justify-content-between mb-2">
        <div class="horizontal-donor">
            <div class="horizontal-title">${data.name} - (${data.bloodGroup})</div>
            <div class="horizontal-subtitle">ID: ${data.universityId}</div>
        </div>
        <span class="horizontal-call">
            <a href="tel:+880${data.phoneNumber}"><i class="bi bi-telephone-outbound-fill"></i></a>
        </span>
        </div>
        </div>`;

        const error = `
        <div class="alert alert-danger mb-2" role="alert">
            No Donor Found!
        </div>`;

        if(data.length != 0){
            donorWrap.innerHTML += markdown;
        }
        else{
            donorWrap.innerHTML = error;
        }
    }
}


// filter blood 
const filterBlood = document.getElementById('selectGroup');
if (filterBlood != null) {
    filterBlood.addEventListener('change', (f) => {
        f.preventDefault();
        filterValue = filterBlood.value;
        const donorList = document.querySelectorAll(".horizontal-card");
        donorList.forEach((group) => {
            const datagroup = group.getAttribute("data-group");
            if (filterValue === "all" || datagroup === filterValue) {
                group.classList.remove("d-none");
            }
            else {
                group.classList.add("d-none")
            }
        });
    })
}