import { Stethoscope, Eye, Activity, FileText } from 'lucide-react';

export const ARTICLES = [
  {
    id: 1,
    title: '7 triệu người Việt mắc đái tháo đường',
    excerpt: 'Hơn 50% người mắc bệnh chưa được chẩn đoán, tạo ra "tảng băng chìm" biến chứng võng mạc nguy hiểm.',
    content: 'Việt Nam có khoảng 7 triệu người bị đái tháo đường, nhưng đến một nửa số đó không biết mình mắc bệnh. 55% người bệnh đái tháo đường gặp biến chứng, gồm 34% biến chứng về tim mạch, 39% mắt và thần kinh, 24% thận.',
    link: 'https://suckhoedoisong.vn/7-trieu-nguoi-viet-bi-dai-thao-duong-co-nhung-benh-nhan-moi-14-15-tuoi-169251018145503945.htm',
    icon: Stethoscope,
    image: '/article2.png', 
    color: 'text-cyan-400',
    bg: 'bg-[#151C2C]'
  },
  {
    id: 2,
    title: 'Nguy cơ mù lòa hàng đầu hiện nay',
    excerpt: 'Võng mạc tiểu đường là nguyên nhân chính gây mất thị lực ở tuổi lao động; 90% ca có thể phòng tránh.',
    content: 'Hiện nay số lượng bệnh nhân mắc tiểu đường (đái tháo đường) đang ngày càng gia tăng. Dự tính đến năm 2030, cả thế giới sẽ có hơn 500 triệu người mắc tiểu đường. Bệnh tiểu đường là nguyên nhân hàng đầu gây mù lòa ở người lớn tuổi.',
    link: 'https://www.vinmec.com/vie/bai-viet/vong-mac-tieu-duong-la-gi-nguyen-nhan-va-nhung-anh-huong-cua-benh-vong-mac-tieu-duong-vi',
    icon: Eye,
    image: '/article3.png',
    color: 'text-cyan-400',
    bg: 'bg-[#151C2C]'
  },
  {
    id: 3,
    title: 'Đột phá AI trong tầm soát mắt',
    excerpt: 'Ứng dụng trí tuệ nhân tạo (AI) giúp chẩn đoán chính xác tổn thương đáy mắt cho hàng chục nghìn người.',
    content: 'Với sự ra đời...',
    link: 'https://thongke.cesti.gov.vn/an-pham-thong-ke/thong-tin-chuyen-de-khoa-hoc-cong-nghe-va-doi-moi-sang-tao/1052-nghien-cuu-ung-dung-tri-tue-nhan-tao-phat-hien-som-benh-mat', 
    icon: Activity,
    image: '/article4.png', 
    color: 'text-cyan-400',
    bg: 'bg-[#151C2C]'
  },
  {
    id: 4,
    title: 'Bài toán nhân lực y tế cơ sở',
    excerpt: 'Sự thiếu hụt bác sĩ chuyên khoa tại tuyến huyện, xã là "nút thắt" lớn trong việc chăm sóc sức khỏe.',
    content: 'Các địa phương miền núi, vùng sâu, vùng xa rất thiếu nhân lực y tế nhưng lại gặp khó khăn trong việc đào tạo và giữ chân nhân viên y tế. Ít sinh viên y khoa muốn về công tác tại tuyến huyện, xã do điều kiện làm việc khó khăn, ít cơ hội phát triển.',
    link: 'https://laodong.vn/suc-khoe/nhieu-chinh-sach-uu-dai-tuyen-co-so-van-thieu-hut-y-bac-si-1467677.ldo',
    icon: FileText,
    image: '/article5.png', 
    color: 'text-cyan-400',
    bg: 'bg-[#151C2C]'
  }
];