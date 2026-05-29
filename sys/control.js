export async function group(action) {
    // هنا بيتم التحكم في أحداث الجروبات مثل دخول وخروج الأعضاء
    console.log(`📌 حدث في المجموعة: ${action.action} للجروب ${action.id}`);
}

export async function access(context) {
    // هنا يتم فحص صلاحيات الأوامر والمستخدمين
    return true; 
}
