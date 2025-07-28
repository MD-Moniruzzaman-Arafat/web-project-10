document.getElementById('search-button').addEventListener('click', function () {
    const searchValue = document.getElementById('search-field').value;
    console.log(searchValue)

    async function loadData(params) {
        const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${params}`)
        const data = await res.json()
        displayItems(data.data)
    }
    loadData(searchValue)

    document.getElementById('search-field').value = ''
    document.getElementById("items-container").textContent = '';
})



function displayItems(data) {
    const itemContainer = document.getElementById("items-container");
    data.forEach(item => {
        // console.log(item)
        const div = document.createElement("div")
        div.classList = `card bg-base-100 w-96 shadow-sm`
        div.innerHTML = `
            <figure class="px-10 pt-10">
                <img src=${item?.image} />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">${item?.phone_name}</h2>
                <div class="card-actions">
                    <button onclick="showDetails('${item?.slug}'); my_modal_1.showModal()" class="btn btn-primary">Show Details</button>
                </div>
            </div>
        `
        itemContainer.appendChild(div)
    })
}


async function showDetails(params) {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${params}`)
    const data = await res.json()
    console.log(data.data)
    const modal = document.getElementById('modal-data')
    modal.innerHTML = `
    <img src="${data.data?.image}" alt="">
    <h1 class="font-bold text-2xl my-2">${data.data?.name}</h1>
    <p class="my-1"><span class="font-bold">Storage</span> : ${data.data.mainFeatures?.storage}</p>
    <p class="my-1"><span class="font-bold">Display Size</span> : ${data.data.mainFeatures?.displaySize}</p>
    <p class="my-1"><span class="font-bold">chipSet</span> : ${data.data.mainFeatures?.chipSet}</p>
    <p class="my-1"><span class="font-bold">Memory</span> : ${data.data.mainFeatures?.memory}</p>
    <p class="my-1"><span class="font-bold">Slug</span> : ${data.data?.slug}</p>
    <p class="my-1"><span class="font-bold">Brand</span> : ${data.data?.brand}</p>
    <p class="my-1"><span class="font-bold">GPS</span> : ${data.data?.others.GPS}</p>
    <div class="modal-action">
        <form method="dialog">
            <button class="btn">Close</button>
        </form>
    </div>
    `
}