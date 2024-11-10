document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault(); //chặn sự kiện reset trang của submit
  //Lấy giá trị từ ô input
  let name = document.querySelector("#name").value;
  //tạo object item 
  let item = {
    id: new Date().toISOString(), //lấy ngày tháng năm để làm id
    name: name.trim(),
  };
  // hiển thị lên UI dưới dạng div
  addItemToUI(item); //hàm nhận vào item và hiện thị lên UI
  //Lưu lại nó vào localStorage
  addItemToLS(item); //hàm sẽ lưu item vào localStorage
});

const addItemToUI = (item) => {
  const {name, id} = item;//distructuring same same [...item]
  let newCard = document.createElement("div");
  newCard.className =
    "border rounded d-flex justify-content-between align-items-center p-2 mb-3";
  newCard.innerHTML = `
    <span>${name}</span>
    <button data-id="${id}" class="btn btn-danger btn-sm button-remove">Remove</button>
  `;
  document.querySelector(".list").appendChild(newCard);
};

//getList: lấy ds các item từ localStorage xuống và biến thành mảng
const getList = () => {
  return JSON.parse(localStorage.getItem("list")) || [];
};
//hàm sẽ lưu item vào localStorage
const addItemToLS = (item) => {
  let list = getList();//lấy danh sách từ localStorage, có thể là []
  //nhét item vào list
  list.push(item);
  //Lưu list lên lại localStorage
  localStorage.setItem("list",JSON.stringify(list));

};

//hàm hiển thị các item trong list mỗi lần reset trang
const init = () => {
  let list = getList();
  list.forEach((item) => {
    addItemToUI(item);
  });
}
init();

//làm chức nắng xóa từng item
document.querySelector(".list").addEventListener("click", (event) => {
  if(event.target.classList.contains("button-remove")) {
    let nameItem = event.target.previousElementSibling.textContent;
    let isConfirmed = confirm(`Bạn có muốn xóa item: "${nameItem}" không?`);
    if(isConfirmed) {
      //xóa iu
      event.target.parentElement.remove();
      //xóa localStorage
      let idRemove = event.target.dataset.id;
      removeItemFromLS(idRemove);
    }
  }  
});

//Hàm nhận vào id cần xóa thu được từ nút đã nhận, tìm và xóa

const removeItemFromLS = (idRemove) => {
  let list = getList();//lấy danh sách từ localStorage
  list = list.filter((item) => item.id != idRemove);
  //lưu lên lại
  localStorage.setItem("list",JSON.stringify(list));

}

//xóa hết
document.querySelector("#btn-remove-all").addEventListener("click", () => {
  let isConfirmed = confirm("Bạn có muốn xóa tất cả item không?");
  if(isConfirmed) {
    document.querySelector(".list").innerHTML = "";
    localStorage.removeItem("list");
  }

})

//chức năng lọc filter
//(sài khi có sẳn danh sách lưu trữ rồi. Bình thường ko nên sài
//thay thế bằng search (vs 1000sp,limit: 10  và page: 5)
document.querySelector("#filter").addEventListener("keyup", (event) => {
  let inputValue = event.target.value;
  let list = getList();
  list = list.filter((item) => 
    item.name.includes(inputValue));
  //xóa danh sách iu cũ
  document.querySelector(".list").innerHTML = "";
  //thêm danh sách ui cũ
  list.forEach((item) => {
    addItemToUI(item);
  })
})

//innerHTML: lấy những gì bên trong div bị điều khiển
//không thể dom vật thể ảo khi tạo ở js 

//TẠI sao lại gọi hàm ở dùng 11 trc khi tạo hàm ở dùng 16 (trong khi đó là const )

document.addEventListener("DOMContentLoaded", () => {
  init();
})//khai báo kiểu này là khi script để lên đâu :)))