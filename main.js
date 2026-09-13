fetch("assets/data/works.json")
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error("JSON 加载失败:", err));