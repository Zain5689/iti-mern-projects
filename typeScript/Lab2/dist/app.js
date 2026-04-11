import { TaskManger } from "./TaskManger.js";
let manager = new TaskManger();
window.getTasks = () => {
    console.table(manager.getAll());
};
// 
// let txt = document.getElementById("txt1") as HTMLInputElement
// console.log(txt.value);
//# sourceMappingURL=app.js.map