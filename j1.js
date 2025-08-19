// js/script.js

// عند إرسال نموذج التواصل
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".contact-form");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault(); // منع الإرسال الفعلي
            alert("✅ تم إرسال رسالتك بنجاح! تواصل معنا لاكمل التسجيل والدفع.");
            form.reset(); // إعادة تعيين الحقول
        });
    }

    // تأثير الظهور عند التمرير
    const elements = document.querySelectorAll(".service-card, .about-preview, .page-content");

    const appearOnScroll = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in");
            }
        });
    }, { threshold: 0.2 });

    elements.forEach(el => appearOnScroll.observe(el));
});