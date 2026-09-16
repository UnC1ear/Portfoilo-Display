fetch("http://127.0.0.1:8000/api/works/")
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
        }

        render("全部");

        const dialog = document.querySelector(".work-modal");

        let currentImages = [];    // 当前作品的图片数组
        let currentIndex = 0;      // 当前显示第几张

        function openModal(work) {
            currentImages = work.images;
            currentIndex = 0;

            // 生成所有图片，第一张加上 active
            const wrapper = dialog.querySelector(".modal-image-wrapper");
            wrapper.innerHTML = work.images
                .map((img, i) => 
                    `<img src="${img.image}" alt="${work.title}" class="${i === 0 ? 'active' : ''}">`
                )
                .join("");

            // 只有一张图时，加 single-image 类，隐藏箭头
            const imagesContainer = dialog.querySelector(".modal-images");
            if (work.images.length <= 1) {
                imagesContainer.classList.add("single-image");
            } else {
                imagesContainer.classList.remove("single-image");
            }

            // 其他字段填充（不变）
            dialog.querySelector(".modal-title").textContent = work.title;
            dialog.querySelector(".modal-dynasty").textContent = work.dynasty;
            dialog.querySelector(".modal-credits").textContent = 
                `建筑：${work.builder} · 渲染：${work.renderer}`;
            dialog.querySelector(".modal-description").textContent = work.description;
            dialog.querySelector(".modal-note").textContent = work.note;

            dialog.showModal();
        }

        function showImage(index) {
            const imgs = dialog.querySelectorAll(".modal-image-wrapper img");
            if (imgs.length === 0) return;

            // 循环：超过边界就绕回
            if (index < 0) index = imgs.length - 1;
            if (index >= imgs.length) index = 0;
            currentIndex = index;

            // 只给当前这张加 active
            imgs.forEach((img, i) => {
                img.classList.toggle("active", i === currentIndex);
            });
        }

        // 点卡片打开弹窗
        document.querySelector(".selected-works").addEventListener("click", e => {
            const card = e.target.closest(".work-card");
            if (!card) return;

            const work = data.find(w => String(w.id) === card.dataset.id);
            if (work) openModal(work);
        });

        // 关闭按钮
        dialog.querySelector(".modal-prev").addEventListener("click", () => {
            showImage(currentIndex - 1);
        });

        dialog.querySelector(".modal-next").addEventListener("click", () => {
            showImage(currentIndex + 1);
        });

        dialog.querySelector(".modal-close").addEventListener("click", () => {
            dialog.close();
        });

        // 点遮罩关闭（点 dialog 自身，但不是内容）
        dialog.addEventListener("click", e => {
            if (e.target === dialog) dialog.close();
        });
        //切换筛选
        filter.addEventListener("click", e => {
        if (e.target.tagName !== "BUTTON") return;

        filter.querySelectorAll("button").forEach(btn => {
            btn.classList.remove("active");
        });

        e.target.classList.add("active");

        render(e.target.textContent);
        });

        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");

        if (id) {
            const work = data.find(w => w.id === id);
            if (work) openModal(work);
        }
    })
    .catch(err => console.error("加载失败:", err));