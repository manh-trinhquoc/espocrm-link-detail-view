## Overview

- hiển thị màn detail của link vào cùng 1 màn
- cấu hình riêng cho màn detail ở trong detail khác
- Inline edit, edit riêng cho entity
- thử nghiệm với Bpmn process

## Hướng triển khai
- Tạo 1 field custom link-detail-view extend từ trường link:  "views/fields/link"
- tham khảo màn convert lead để hiểu cách gọi màn record detail: crm:views/lead/convert
- tham khảo màn modal để xem cách gọi detail-small: 