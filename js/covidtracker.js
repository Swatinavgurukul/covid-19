//Getting the data from cookie
let state_container = document.getElementById('state_container')
let district_wise_graph_container = document.getElementById('district_wise_graph')
let state_wise_graph_container = document.getElementById('state_wise_graph')
let selected_state = document.getElementById('selected_state')
let confirmed_cases = document.getElementById('tested_cases')
let active_cases = document.getElementById('actice_cases')
let recovered_cases = document.getElementById('recovered_cases')


fetch(`https://api.covid19india.org/state_district_wise.json`)
    .then((response) => {
        return response.json();
    })
    .then((result) => {
        delete result['State Unassigned']
        let count = 0
        //Inserting the states into html
        couunt = 0;
        for (const [key, value] of Object.entries(result)) {
            count += 1
            state_container.innerHTML += `
                        <div class="form-check">
                                                    
                        <label class="form-check-label text-info" for="single_state_${count}">
                        <abbr title="${key}">${value.statecode}</abbr>
                            <input class="form-check-input single_state" type="checkbox" name="" value="select" checked
                                id="single_state_${count} checked">
                            </label>
                        </div>
                        `
        }
    }).then(() => {
        document.getElementById('loading_spinner').classList.add("d-none")
        document.getElementById('dashboard_screen_container').classList.remove('d-none')
    })

    //Function of select state and show datas of selected state
    .then(() => {
        let selected_state_by_click = []
        let all_checkbox_input = document.querySelectorAll('input[type=checkbox]');
        all_checkbox_input.forEach(all_checkbox_input_item => {
            if (all_checkbox_input_item.checked) {
                console.log(all_checkbox_input_item.previousElementSibling.title);
                selected_state_by_click.push(all_checkbox_input_item.previousElementSibling.title)
                getDataOfSingleState(selected_state_by_click)
            }
        })
    })

//Function for retrieving cases of states
function getDataOfSingleState(states) {
    console.log(states, "states")
    let confirmedCases = activeCases = recoveredCases = 0;
    let singleStateConfirmedCases = singleStateActiveCases = singleStateRecoveredCases = 0;

    fetch(`https://api.covid19india.org/state_district_wise.json`)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            delete result['State Unassigned']

            district_wise_graph_container.innerHTML = '';
            state_wise_graph_container.innerHTML = '';

            selected_state.innerText = states.length
            confirmed_cases.innerText = 0
            active_cases.innerText = 0
            recovered_cases.innerText = 0

            states.forEach(state => {
                for (const [key, value] of Object.entries(result)) {

                    if (key == state) {
                        singleStateConfirmedCases = confirmedCases
                        singleStateActiveCases = activeCases
                        singleStateRecoveredCases = recoveredCases

                        let stateData = value.districtData;

                        for (const [key, value] of Object.entries(stateData)) {
                            confirmedCases += value.confirmed
                            activeCases += value.active
                            recoveredCases += value.recovered
                            //Inserting the state graph into html
                            district_wise_graph_container.innerHTML += `
                                <div class="mb-1 p-1">
                                <span class="text-dark">${key}</span>
                                <div class="bg-danger p-0 m-0" style="height: 20px; width: ${((value.active) / 100000) * 100}%;">
                                    <div class="text-end">
                                        <code class="p-0 m-0 text-center">${(((value.active) / 100000) * 100)}%</code>
                                    </div>
                                </div>
                                <div class="bg-success" style="height: 20px; width: ${(((value.confirmed) / 100000) * 100)}%; margin-bottom: 2px;">
                                    <div class="text-end">
                                        <code class="text-dark text-center">${((value.confirmed) / 100000) * 100}%</code>
                                    </div>
                                </div>
                            </div>`
                        }
                        selected_state.innerText = states.length
                        confirmed_cases.innerText = confirmedCases
                        active_cases.innerText = activeCases
                        recovered_cases.innerText = recoveredCases
                        console.log(value, "value")
                        //Inserting the district into html
                        state_wise_graph_container.innerHTML += `
                        
                        <div class="row">
                            <code class="col-2 p-0 m-0 navbar-brand text-center text-info mb-0">${value.statecode}</code>
                            <div class="col-10 p-0 d-flex ps-1 align-items-center">
                                <div id="active_cases" class="p-0 m-0 d-inline bg-danger active_cases" style="width: ${((activeCases - singleStateActiveCases) / 100000) * 100}%; height: 15px;">
                                    
                                </div>
                                <div id="confirmed_cases" class="p-0 m-0 d-inline bg-success confirmed_cases" style="width: ${((confirmedCases - singleStateConfirmedCases) / 1000000) * 100}%; height: 15px;">
                                    
                                </div>
                                <div id="recovered_cases" class="p-0 m-0 d-inline bg-dark recovered_cases" style="width: ${((recoveredCases - singleStateRecoveredCases) / 1000000) * 100}%; height: 15px;">
                                    
                                </div>
                            </div>
                        </div>`
                    }
                }
            });
        })
        .catch((error) => {
            console.log('Request failed', error)
        });
}


// To LogOut The Current User
function logOutUser() {
    localStorage.setItem('loginAcc', '');
    window.location.href = './signup.html';
};