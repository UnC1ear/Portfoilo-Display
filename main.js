fetch("assets/data/selected-works.json")
    .then(res => res.json())
    .then(data => {
        const list = document.querySelector(".selected-works");

        data.forEach(work => {
            const html = `
                <li class="work-card">
                    <a href="${work.link}" class="work-link">
                        <div class="work-thumb">
                            <img src="${work.cover}" alt="${work.title}">
                        </div>
                        <div class="workinfo">
                            <span class="dynasty">${work.dynasty}</span>
                            <h3>${work.title}</h3>
                        </div>
                    </a>
                </li>
            `;
            list.insertAdjacentHTML("beforeend", html);
        });
    })
    .catch(err => console.error("加载失败:", err));