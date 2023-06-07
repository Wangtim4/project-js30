const url =
    'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=';

const formDom = document.querySelector('.form');
const InputDom = document.querySelector('.form-input');
const resultsDom = document.querySelector('.results');

formDom.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = InputDom.value;
    if (!value) {
        resultsDom.innerHTML = '<div class="error">請輸入搜尋名稱</div>';
        return;
    }
    fetchPages(value);
})

const fetchPages = async (searchValue) => {
    // console.log(searchValue);
    resultsDom.innerHTML = '<div class="loading"></div>';
    try {
        const response = await fetch(`${url}${searchValue}`);
        const data = await response.json();
        // console.log(data);
        const results = data.query.search;
        if (results.length < 1) {
            resultsDom.innerHTML = '<div class="error"><h3>沒有符合的物品，請重新輸入</h3></div>';
        }
        renderResults(results);

    } catch (error) {
        resultsDom.innerHTML = '<div class="error"><h3>錯誤，請重新輸入..<h3></div>';
    }

};

const renderResults = (list) => {
    // console.log(list);
    const cardsList = list.map((card) => {
        // console.log(card);
        const { title, snippet, pageid } = card
        return `<a href="href=http://en.wikipedia.org/?curid=${pageid}" target="_blank">
        <h4>${title}</h4>
        <p>${snippet}</p>
      </a>`;
    }).join('');
    resultsDom.innerHTML = `<div class="articles">
    ${cardsList}
    </div>`;
}