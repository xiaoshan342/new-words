import { VocabWord } from '../types';

const A1_WORDS: VocabWord[] = [
   { id: 'a1-1', en: 'apple', vi: ['quả táo'], category: 'Daily Life', level: 'A1' },
   { id: 'a1-2', en: 'book', vi: ['quyển sách', 'đặt chỗ'], category: 'Daily Life', level: 'A1' },
   { id: 'a1-3', en: 'house', vi: ['ngôi nhà'], category: 'Daily Life', level: 'A1' },
   { id: 'a1-4', en: 'water', vi: ['nước', 'tưới nước'], category: 'Daily Life', level: 'A1' },
   { id: 'a1-5', en: 'teacher', vi: ['giáo viên', 'thầy cô giáo'], category: 'Daily Life', level: 'A1' },
   { id: 'a1-6', en: 'student', vi: ['học sinh', 'sinh viên'], category: 'Daily Life', level: 'A1' },
   { id: 'a1-7', en: 'school', vi: ['trường học'], category: 'Daily Life', level: 'A1' },
   { id: 'a1-8', en: 'car', vi: ['xe hơi', 'ô tô'], category: 'Daily Life', level: 'A1' },
   { id: 'a1-9', en: 'dog', vi: ['con chó'], category: 'Daily Life', level: 'A1' },
   { id: 'a1-10', en: 'cat', vi: ['con mèo'], category: 'Daily Life', level: 'A1' },
];

const A2_WORDS: VocabWord[] = [
   { id: 'a2-1', en: 'market', vi: ['chợ', 'thị trường'], category: 'Daily Life', level: 'A2' },
   { id: 'a2-3', en: 'job', vi: ['công việc', 'việc làm'], category: 'Daily Life', level: 'A2' },
   { id: 'a2-4', en: 'money', vi: ['tiền', 'tiền bạc'], category: 'Daily Life', level: 'A2' },
   { id: 'a2-5', en: 'food', vi: ['thức ăn', 'thực phẩm'], category: 'Daily Life', level: 'A2' },
   { id: 'a2-6', en: 'clothes', vi: ['quần áo', 'trang phục'], category: 'Daily Life', level: 'A2' },
   { id: 'a2-7', en: 'rain', vi: ['mưa', 'cơn mưa'], category: 'Daily Life', level: 'A2' },
   { id: 'a2-8', en: 'friend', vi: ['bạn bè', 'người bạn'], category: 'Daily Life', level: 'A2' },
   { id: 'a2-10', en: 'phone', vi: ['điện thoại', 'gọi điện thoại'], category: 'Daily Life', level: 'A2' },
];

const B1_WORDS: VocabWord[] = [
   { id: 'b1-1', en: 'travel', vi: ['du lịch', 'đi lại', 'di chuyển'], category: 'Daily Life', level: 'B1' },
   { id: 'b1-2', en: 'trip', vi: ['chuyến đi', 'cuộc hành trình', 'vấp ngã'], category: 'Daily Life', level: 'B1' },
   { id: 'b1-3', en: 'traffic', vi: ['giao thông', 'lưu lượng giao thông'], category: 'Daily Life', level: 'B1' },
   { id: 'b1-4', en: 'appointment', vi: ['cuộc hẹn', 'sự bổ nhiệm'], category: 'Daily Life', level: 'B1' },
   {
      id: 'b1-5',
      en: 'schedule',
      vi: ['lịch trình', 'thời gian biểu', 'lên lịch', 'lịch'],
      category: 'Daily Life',
      level: 'B1',
   },
   { id: 'b1-6', en: 'routine', vi: ['thói quen hàng ngày', 'lệ thường'], category: 'Daily Life', level: 'B1' },
   { id: 'b1-7', en: 'holiday', vi: ['kỳ nghỉ', 'ngày lễ'], category: 'Daily Life', level: 'B1' },
   { id: 'b1-8', en: 'hospital', vi: ['bệnh viện'], category: 'Daily Life', level: 'B1' },
   { id: 'b1-9', en: 'medicine', vi: ['thuốc', 'y học', 'ngành y'], category: 'Daily Life', level: 'B1' },
   { id: 'b1-10', en: 'weather', vi: ['thời tiết'], category: 'Daily Life', level: 'B1' },
];

const B2_WORDS: VocabWord[] = [
   { id: 'b2-1', en: 'insurance', vi: ['bảo hiểm'], category: 'Daily Life', level: 'B2' },
   { id: 'b2-2', en: 'mortgage', vi: ['vay thế chấp', 'khoản vay thế chấp'], category: 'Daily Life', level: 'B2' },
   { id: 'b2-3', en: 'rent', vi: ['tiền thuê nhà', 'thuê', 'cho thuê'], category: 'Daily Life', level: 'B2' },
   {
      id: 'b2-4',
      en: 'neighborhood',
      vi: ['khu phố', 'khu vực lân cận', 'hàng xóm'],
      category: 'Daily Life',
      level: 'B2',
   },
   {
      id: 'b2-5',
      en: 'maintenance',
      vi: ['bảo trì', 'sự duy trì', 'tiền cấp dưỡng'],
      category: 'Daily Life',
      level: 'B2',
   },
   { id: 'b2-6', en: 'electricity', vi: ['điện', 'điện lực'], category: 'Daily Life', level: 'B2' },
   {
      id: 'b2-7',
      en: 'utility bill',
      vi: ['hóa đơn điện nước', 'hóa đơn tiện ích'],
      category: 'Daily Life',
      level: 'B2',
   },
   { id: 'b2-8', en: 'subscription', vi: ['gói đăng ký', 'sự đăng ký dài hạn'], category: 'Daily Life', level: 'B2' },
   { id: 'b2-9', en: 'password', vi: ['mật khẩu'], category: 'Daily Life', level: 'B2' },
   { id: 'b2-10', en: 'security', vi: ['bảo mật', 'an ninh'], category: 'Daily Life', level: 'B2' },
];

const C1_WORDS: VocabWord[] = [
   {
      id: 'c1-1',
      en: 'sustainability',
      vi: ['tính bền vững', 'sự phát triển bền vững'],
      category: 'Daily Life',
      level: 'C1',
   },
   { id: 'c1-2', en: 'pollution', vi: ['ô nhiễm', 'sự ô nhiễm'], category: 'Daily Life', level: 'C1' },
   { id: 'c1-3', en: 'urbanization', vi: ['đô thị hóa', 'sự đô thị hóa'], category: 'Daily Life', level: 'C1' },
   { id: 'c1-4', en: 'lifestyle', vi: ['lối sống', 'phong cách sống'], category: 'Daily Life', level: 'C1' },
   {
      id: 'c1-5',
      en: 'well-being',
      vi: ['sự khỏe mạnh và hạnh phúc', 'phúc lợi', 'sức khỏe tinh thần'],
      category: 'Daily Life',
      level: 'C1',
   },
   {
      id: 'c1-6',
      en: 'work-life balance',
      vi: ['cân bằng công việc và cuộc sống'],
      category: 'Daily Life',
      level: 'C1',
   },
   { id: 'c1-7', en: 'commute', vi: ['đi làm hằng ngày', 'đoạn đường đi làm'], category: 'Daily Life', level: 'C1' },
   { id: 'c1-8', en: 'suburb', vi: ['vùng ngoại ô'], category: 'Daily Life', level: 'C1' },
   { id: 'c1-9', en: 'infrastructure', vi: ['cơ sở hạ tầng'], category: 'Daily Life', level: 'C1' },
   { id: 'c1-10', en: 'digitalization', vi: ['số hóa', 'sự số hóa'], category: 'Daily Life', level: 'C1' },
];

export const dailyLifeWords: VocabWord[] = [...A1_WORDS, ...A2_WORDS, ...B1_WORDS, ...B2_WORDS, ...C1_WORDS];
