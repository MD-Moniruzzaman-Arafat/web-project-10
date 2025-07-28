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
        console.log(item)
        const div = document.createElement("div")
        div.classList = `card bg-base-100 w-96 shadow-sm`
        div.innerHTML = `
            <figure class="px-10 pt-10">
                <img src=${item?.image} />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">${item.phone_name}</h2>
                <div class="card-actions">
                    <button class="btn btn-primary">Show Details</button>
                </div>
            </div>
        `
        itemContainer.appendChild(div)
    })
}