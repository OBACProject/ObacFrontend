"use client";
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function OBACApplicationForm() {
  const [formData, setFormData] = useState({
    fullNameTH: 'ถิรวัฒน์ พงศ์ปฏิสนธิิ',
    fullNameEN: 'Tirawat Pongpratisonthi',
    idCard: '100501595209',
    birthDate: '26/05/2025',
    gender: 'Male',
    religion: 'Christian',
    nationality: 'Thai',
    address: '35/400 หมู่ 4 ตำบลบางพูด อำเภอปากเกร็ด จังหวัดนนทบุรี 11120',
    phone: '0941234567',
    email: 'prwork2sent@gmail.com',
    parentName: 'นายสมชาย พงศ์ปฏิสนธิิ',
    parentPhone: '0941234567',
    graduationYear: '2025',
    lastSchool: 'สวนศึกษาวิชาชีพเทคนิคปากเกร็ด',
    major: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted:', formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">ใบสมัครเข้าศึกษาต่อระดับ ปวช.</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input name="fullNameTH" value={formData.fullNameTH} onChange={handleChange} placeholder="ชื่อ - นามสกุล (ภาษาไทย)" />
          <Input name="fullNameEN" value={formData.fullNameEN} onChange={handleChange} placeholder="ชื่อ - นามสกุล (ภาษาอังกฤษ)" />
          <Input name="idCard" value={formData.idCard} onChange={handleChange} placeholder="เลขบัตรประจำตัวประชาชน" />
          <Input name="birthDate" value={formData.birthDate} onChange={handleChange} placeholder="วัน/เดือน/ปีเกิด" />
          <Input name="gender" value={formData.gender} onChange={handleChange} placeholder="เพศ" />
          <Input name="religion" value={formData.religion} onChange={handleChange} placeholder="ศาสนา" />
          <Input name="nationality" value={formData.nationality} onChange={handleChange} placeholder="สัญชาติ" />
          <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="เบอร์โทรศัพท์" />
          <Input name="email" value={formData.email} onChange={handleChange} placeholder="อีเมล" />
          <Input name="parentName" value={formData.parentName} onChange={handleChange} placeholder="ชื่อผู้ปกครอง" />
          <Input name="parentPhone" value={formData.parentPhone} onChange={handleChange} placeholder="เบอร์ผู้ปกครอง" />
          <Input name="graduationYear" value={formData.graduationYear} onChange={handleChange} placeholder="ปีที่สำเร็จการศึกษา" />
          <Input name="lastSchool" value={formData.lastSchool} onChange={handleChange} placeholder="สถานศึกษาที่จบ" />
          <Input name="major" value={formData.major} onChange={handleChange} placeholder="สาขาวิชา" />
        </div>
        <Textarea name="address" value={formData.address} onChange={handleChange} placeholder="ที่อยู่ปัจจุบัน" />
        <Button type="submit" className="w-full">บันทึกข้อมูล</Button>
      </form>
    </div>
  );
}
