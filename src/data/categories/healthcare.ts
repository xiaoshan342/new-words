import { VocabWord } from '../types';

const A1_WORDS: VocabWord[] = [
   { id: 'a1-1', en: 'apple', vi: ['quả táo'], category: 'Food', level: 'A1' },
   {
      id: 'a1-2',
      en: 'book',
      vi: ['quyển sách', 'đặt chỗ'],
      category: 'Objects',
      level: 'A1',
   },
   {
      id: 'a1-3',
      en: 'house',
      vi: ['ngôi nhà', 'nhà'],
      category: 'Home',
      level: 'A1',
   },
   { id: 'a1-4', en: 'water', vi: ['nước', 'nguồn nước', 'nước uống'], category: 'Food', level: 'A1' },
   { id: 'a1-5', en: 'teacher', vi: ['giáo viên', 'người dạy học'], category: 'People', level: 'A1' },
   { id: 'a1-6', en: 'student', vi: ['học sinh', 'sinh viên'], category: 'People', level: 'A1' },
   { id: 'a1-7', en: 'school', vi: ['trường học', 'hệ thống giáo dục'], category: 'Education', level: 'A1' },
];

const A2_WORDS: VocabWord[] = [
   { id: 'a2-1', en: 'market', vi: ['chợ', 'thị trường', 'khu mua bán'], category: 'Shopping', level: 'A2' },
   { id: 'a2-3', en: 'job', vi: ['công việc', 'việc làm', 'nhiệm vụ'], category: 'Work', level: 'A2' },
   { id: 'a2-4', en: 'money', vi: ['tiền', 'tiền bạc', 'tài chính'], category: 'Finance', level: 'A2' },
   { id: 'a2-5', en: 'food', vi: ['thức ăn', 'đồ ăn', 'lương thực'], category: 'Food', level: 'A2' },
   { id: 'a2-6', en: 'clothes', vi: ['quần áo', 'trang phục'], category: 'Shopping', level: 'A2' },
   { id: 'a2-7', en: 'rain', vi: ['mưa', 'cơn mưa', 'thời tiết mưa'], category: 'Weather', level: 'A2' },
   { id: 'a2-8', en: 'friend', vi: ['bạn bè', 'người bạn'], category: 'People', level: 'A2' },
   { id: 'a2-10', en: 'phone', vi: ['điện thoại', 'gọi điện (động từ)'], category: 'Technology', level: 'A2' },
];

const B1_WORDS: VocabWord[] = [
   { id: 'b1-1', en: 'travel', vi: ['du lịch', 'đi lại'], category: 'Travel', level: 'B1' },
   { id: 'b1-2', en: 'trip', vi: ['chuyến đi', 'cuộc hành trình'], category: 'Travel', level: 'B1' },
   { id: 'b1-3', en: 'traffic', vi: ['giao thông', 'ùn tắc', 'lưu lượng xe'], category: 'Transport', level: 'B1' },
   { id: 'b1-4', en: 'appointment', vi: ['cuộc hẹn', 'lịch hẹn', 'sự bổ nhiệm'], category: 'Daily Life', level: 'B1' },
   {
      id: 'b1-5',
      en: 'schedule',
      vi: ['lịch trình', 'thời gian biểu', 'lên lịch'],
      category: 'Daily Life',
      level: 'B1',
   },
   { id: 'b1-6', en: 'routine', vi: ['thói quen', 'quy trình lặp lại'], category: 'Daily Life', level: 'B1' },
   { id: 'b1-7', en: 'holiday', vi: ['kỳ nghỉ', 'ngày lễ'], category: 'Travel', level: 'B1' },
   { id: 'b1-8', en: 'hospital', vi: ['bệnh viện', 'cơ sở y tế'], category: 'Health', level: 'B1' },
   { id: 'b1-9', en: 'medicine', vi: ['thuốc', 'y học', 'ngành y'], category: 'Health', level: 'B1' },
   { id: 'b1-10', en: 'weather', vi: ['thời tiết', 'khí hậu'], category: 'Weather', level: 'B1' },
];

const B2_WORDS: VocabWord[] = [
   { id: 'b2-1', en: 'insurance', vi: ['bảo hiểm', 'hợp đồng bảo hiểm'], category: 'Finance', level: 'B2' },
   { id: 'b2-2', en: 'mortgage', vi: ['vay thế chấp', 'khoản vay nhà'], category: 'Finance', level: 'B2' },
   { id: 'b2-3', en: 'rent', vi: ['tiền thuê nhà', 'thuê'], category: 'Home', level: 'B2' },
   { id: 'b2-4', en: 'neighborhood', vi: ['khu phố', 'vùng lân cận', 'cộng đồng'], category: 'Home', level: 'B2' },
   { id: 'b2-5', en: 'maintenance', vi: ['bảo trì', 'bảo dưỡng', 'duy trì'], category: 'Home', level: 'B2' },
   { id: 'b2-6', en: 'electricity', vi: ['điện', 'năng lượng điện', 'dòng điện'], category: 'Utilities', level: 'B2' },
   {
      id: 'b2-7',
      en: 'utility bill',
      vi: ['hóa đơn điện nước', 'hóa đơn tiện ích'],
      category: 'Utilities',
      level: 'B2',
   },
   { id: 'b2-8', en: 'subscription', vi: ['gói đăng ký', 'sự đăng ký dịch vụ'], category: 'Digital Life', level: 'B2' },
   { id: 'b2-9', en: 'password', vi: ['mật khẩu', 'mã truy cập'], category: 'Technology', level: 'B2' },
   { id: 'b2-10', en: 'security', vi: ['bảo mật', 'an ninh', 'sự an toàn'], category: 'Technology', level: 'B2' },
];

const C1_WORDS: VocabWord[] = [
   {
      id: 'c1-1',
      en: 'sustainability',
      vi: ['tính bền vững', 'khả năng duy trì lâu dài'],
      category: 'Environment',
      level: 'C1',
   },
   { id: 'c1-2', en: 'pollution', vi: ['ô nhiễm', 'sự làm bẩn môi trường'], category: 'Environment', level: 'C1' },
   { id: 'c1-3', en: 'urbanization', vi: ['đô thị hóa', 'quá trình đô thị hóa'], category: 'Society', level: 'C1' },
   { id: 'c1-4', en: 'lifestyle', vi: ['lối sống', 'phong cách sống'], category: 'Lifestyle', level: 'C1' },
   {
      id: 'c1-5',
      en: 'well-being',
      vi: ['sức khỏe tinh thần', 'trạng thái hạnh phúc'],
      category: 'Health',
      level: 'C1',
   },
   { id: 'c1-6', en: 'work-life balance', vi: ['cân bằng công việc-cuộc sống'], category: 'Lifestyle', level: 'C1' },
   { id: 'c1-7', en: 'commute', vi: ['đi làm hằng ngày', 'di chuyển đi làm'], category: 'Transport', level: 'C1' },
   { id: 'c1-8', en: 'suburb', vi: ['vùng ngoại ô', 'khu ngoại thành'], category: 'Home', level: 'C1' },
   { id: 'c1-9', en: 'infrastructure', vi: ['cơ sở hạ tầng', 'hệ thống hạ tầng'], category: 'City Life', level: 'C1' },
   { id: 'c1-10', en: 'digitalization', vi: ['số hóa', 'chuyển đổi số'], category: 'Technology', level: 'C1' },
];

export const healthcareWords: VocabWord[] = [...A1_WORDS, ...A2_WORDS, ...B1_WORDS, ...B2_WORDS, ...C1_WORDS];
