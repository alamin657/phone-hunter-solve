const loadPhones = async(searchText,datalimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data,datalimit);

}
const  displayPhones = (phones,datalimit) =>{
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';
     // display  10 phones only
     const showAll = document.getElementById('show-all')
    if(datalimit && phones.length > 10){
        phones = phones.slice(0,10);
        showAll.classList.remove('d-none')
    }
    else{
        showAll.classList.add('d-none')
    }
     // display no phone found
     const noPhone = document.getElementById('no-found-message');
     if(phones.length === 0){
        noPhone.classList.remove('d-none');
     }
     else{
        noPhone.classList.add('d-none');
     }
    //  display all phones
    phones.forEach(phone=>{
        console.log(phone)
     const phoneDiv = document.createElement('div');
     phoneDiv.classList.add('col');
     phoneDiv.innerHTML = `
        <div class="card">
        <img class=p-4 src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <button onclick="loadPhoneDetailes('${phone.slug}')" href="#"  class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Detailes</button>
         </div>
    </div>
    `  
    phonesContainer.appendChild(phoneDiv);
    })
    // stop spinners loader
    ToggleSpinners(false)
} 
// common function
const processSearch = (datalimit) =>{
    ToggleSpinners(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText,datalimit)
}
// btn search handler
document.getElementById('btn-search').addEventListener('click',function(){
    // start loader\
   processSearch(10);
})
// search input field enter key handler
document.getElementById('search-field').addEventListener('keypress',function(e){
       
        if(e.key === 'Enter'){
            processSearch(10);
        }
});
// show all btn handler (not best way)
document.getElementById('show-all-btn').addEventListener('click',function(){
    processSearch();
})

const ToggleSpinners = isloading =>{
    const loaderSection = document.getElementById('loader')
    if(isloading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none')
    }
}
// btn show detailes
const loadPhoneDetailes =  async (id) =>  {
    const url =`https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);

}
// display phone detailes
const displayPhoneDetails = phone =>{
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    console.log(phone.mainFeatures.sensors[0]);
    phoneDetails.innerHTML = `
        <img class=p-4 src="${phone.image}"  alt="...">
        <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</p>
        <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage Information '}</p>
        <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information'}</p>
        <p>Sensor: ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors[0] : 'no sensor'}</p>
    `
}

loadPhones('apple')