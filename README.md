# Todo Management
โปรเจค Todo Management เว็บไซต์สร้างรายการที่ต้องทำ
## Features
- สามารถเพิ่ม ลบ แก้ไข Task ต่างๆได้
- แสดงรายการ Task ตามสถานะ หรือทั้งหมดได้
- Checkbox เปลี่ยนสถานะให้รายการที่เลือก เปลี่ยนสถานะสำเร็จได้
- สามารถเปลี่ยนลำดับความเร่งด่วนของรายการที่เลือกได้ (Task Priority)
- Dark Mode Switch ปรับโทนสี
- Responsive Design จัดตำแหน่ง และจำนวนรายการของ Task ให้แสดงตามอุปกรณ์ที่ใช้ Tablet,Mobile,PC
- Delete Confirmation มี Dialog เตือนก่อนตัดสินใจลบ Task
- Caching เก็บแคชรายการที่ต้องทำเพื่อใช้ข้อมูลซ้ำในครั้งถัดไป


## Documentation
  
### Requirements
- requires Node.js 18.18 or later


### Installation

#### 1. Setup .ENV Variables
- DATABASE_URL (Mysql Database Connection string)

#### 2.Npm or bun (Optional)
- npm install
- bun install
#### 3.NPX
- npm install -g npx
#### 4.Prisma
- npx prisma generate
- npx prisma db push
###

การใช้งาน
## Task List Page
![me]([https://github.com/Daisyliu6/Daisyliu6/blob/master/me.gif](https://github.com/ThunPao/todowebapp/blob/master/documentation/list.webp))
### Add Task

### Edit Task

### Toggle Complete Status Check

### Filter Task By Status

### Delete Task


