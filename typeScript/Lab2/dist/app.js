import { TaskManager } from "./TaskManger.js"; // تأكد من مطابقة الاسم المكتوب في ملفاتك
import { TaskStatus } from "./enums/TaskStatus.js";
const manager = new TaskManager();
// عناصر الصفحة الأساسية (Views)
const dashboardPage = document.getElementById("dashboardPage");
const formPage = document.getElementById("formPage");
// أزرار التنقل (Navigation)
const viewTasksBtn = document.getElementById("viewTasksBtn");
const addTaskBtn = document.getElementById("addTaskBtn");
/**
 * وظيفة الـ Router للتبديل بين الصفحات
 */
const navigateTo = (page) => {
    if (page === "dashboard") {
        dashboardPage.style.display = "block";
        formPage.style.display = "none";
        viewTasksBtn.classList.add("active");
        addTaskBtn.classList.remove("active");
        renderTasks();
    }
    else {
        dashboardPage.style.display = "none";
        formPage.style.display = "block";
        viewTasksBtn.classList.remove("active");
        addTaskBtn.classList.add("active");
    }
};
/**
 * ريندر الجدول
 */
const renderTasks = () => {
    const tableBody = document.getElementById("taskTableBody");
    const tasks = manager.getAll();
    tableBody.innerHTML = tasks
        .map((task) => `
            <tr class="${task.status === TaskStatus.completed ? "task-completed" : ""}">
                <td>${task.id.toString().slice(-5)}</td>
                <td><strong>${task.title}</strong></td>
                <td>${task.description}</td>
                <td>
                    <span class="status-badge ${task.status === TaskStatus.completed ? "status-done" : task.status === TaskStatus.InProgress ? "status-in-progress" : "status-pending"}">
                        ${task.status}
                    </span>
                </td>
                <td>${new Date(task.deadline).toLocaleDateString()}</td>
                <td>
                    <button onclick="deleteTaskHandler(${task.id})" class="btn-delete">Delete</button>
                </td>
            </tr>
        `)
        .join("");
};
/**
 * التعامل مع حذف المهام
 */
window.deleteTaskHandler = (id) => {
    manager.delete(id);
    renderTasks();
};
/**
 * التعامل مع إرسال الفورم
 */
document.getElementById("taskForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    manager.add({
        id: Date.now(),
        title: document.getElementById("title").value,
        description: document.getElementById("desc").value,
        status: document.getElementById("status")
            .value,
        deadline: new Date(document.getElementById("deadline").value),
    });
    e.target.reset();
    // العودة التلقائية للجدول بعد الحفظ
    navigateTo("dashboard");
});
/**
 * إعداد مستمعي الأحداث للتنقل
 */
viewTasksBtn.addEventListener("click", () => navigateTo("dashboard"));
addTaskBtn.addEventListener("click", () => navigateTo("form"));
// البدء بصفحة الجدول عند تحميل التطبيق
navigateTo("dashboard");
//# sourceMappingURL=app.js.map