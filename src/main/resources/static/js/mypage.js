document.addEventListener("DOMContentLoaded", function() {
    // --- 탭 전환 기능 ---
    const tabs = document.querySelectorAll('.history-tabs .tab');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');

            // 1. 탭 버튼 활성화 상태 변경
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // 2. 컨텐츠 박스 표시/숨김
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
            });

            const targetPane = document.getElementById(targetId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
    // 3. 로그아웃 버튼
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if(confirm("로그아웃 하시겠습니까?")) {
                localStorage.removeItem('loginUser');
                location.href = "main.html";
            }
        });
    }
});