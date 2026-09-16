fetch("http://127.0.0.1:8000/api/works/")
    .then(res => res.json())
    .then(data => {
        const list = document.querySelector(".selected-works");

        data.forEach(work => {
            const html = `
                <li class="work-card" data-id="${work.id}">
                    <div class="work-thumb">
                        <img src="${work.cover}" alt="${work.title}">
                    </div>
                    <div class="workinfo">
                        <span class="dynasty">${work.dynasty}</span>
                        <h3>${work.title}</h3>
                    </div>
                </li>
            `;
            list.insertAdjacentHTML("beforeend", html);
        });

        document.querySelector(".selected-works").addEventListener("click", e => {
            const card = e.target.closest(".work-card");
            if (!card) return;
            
            window.location.href = `portfolio.html?id=${card.dataset.id}`;
        });
    })
    .catch(err => console.error("加载失败:", err));