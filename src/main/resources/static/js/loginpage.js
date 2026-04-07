
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    // 로그인 양식이 제출될 때의 이벤트
    loginForm.addEventListener('submit', (e) => {
        // 실제 페이지가 새로고침되는 것을 방지합니다.
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // 실제로는 여기서 서버로 데이터를 보냅니다.
        // 데모를 위해 입력한 내용을 알림창으로 띄웁니다.
        console.log("로그인 시도:");
        console.log(`이메일: ${email}`);
        console.log(`비밀번호: ${password.substring(0, 2)}****`); // 비밀번호 일부만 표시

        alert(`반갑습니다!\n이메일: ${email}님, 로그인 정보를 확인했습니다.\n(이것은 데모입니다.)`);
        
        // 여기에 로그인 성공 후 이동할 페이지 주소를 넣으면 됩니다.
        // window.location.href = "dashboard.html"; 
    });
});