$(function () {
    
window.onload = function() {
    // EmailJS 초기화 - PublicKey 대신 user_id 사용
    emailjs.init('3R_Xx0G26iGe4Nu7O'); // 'your_user_id'를 실제 사용자 ID로 교체하세요.

    $('#contact-form').on('submit', function(event) {
        event.preventDefault();

        emailjs.sendForm('o3ouo', 'template_jbqfrtr', this)
            .then(() => {
                console.log('SUCCESS!');
                alert('메일이 성공적으로 전송되었습니다!')
            }, (error) => {
                console.log('FAILED...', error);
                alert('메일 전송에 실패했습니다. 다시 시도해 주세요.')
            });
    });
};

});
