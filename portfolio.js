fetch("assets/data/selected-works.json")
    .then(res => res.json())
    .then(data => {
        const dynasties = [...new Set(data.map(work => work.dynasty))];

        const order = ["唐", "宋", "元", "明", "清"];
        dynasties.sort((a, b) => order.indexOf(a) - order.indexOf(b));

        const filter = document.querySelector(".filter");
        filter.insertAdjacentHTML("beforeend", `<button class="active">全部</button>`);
        dynasties.forEach(d => {
        filter.insertAdjacentHTML("beforeend", `<button>${d}</button>`);
        });

        function render(filter) {
        const list = document.querySelector(".selected-works");
        list.innerHTML = "";   // 清空

        const filtered = (filter === "全部" || !filter)
            ? data
            : data.filter(work => work.dynasty === filter);

        filtered.forEach(work => {
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
        }

        render("全部");   // 初始化：显示全部

        filter.addEventListener("click", e => {
        if (e.target.tagName !== "BUTTON") return;

        filter.querySelectorAll("button").forEach(btn => {
            btn.classList.remove("active");
        });

        e.target.classList.add("active");

        render(e.target.textContent);
        });
    })
    .catch(err => console.error("加载失败:", err));