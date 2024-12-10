interface CardHorizontalProp {
  img: string;
  topic: string;
  description: string;
  category: string;
  date: string;
}

interface CardSubjectProp {
  subjectName:string;
  subjectCode:string;
  currentRoom:string;
  subjectStatus:number;
  total_student:number;
}

export const cardSubjectData: CardSubjectProp[] = [
  {
      subjectName:"ภาษาไทย",
      subjectCode:"000OBAC",
      currentRoom:"1.2",
      total_student:20,
      subjectStatus:1
  },
  {
      subjectName:"ภาษาอังกฤษ",
      subjectCode:"2130645",
      currentRoom:"2.3",
      total_student:20,
      subjectStatus:1
  },
  {
      subjectName:"คณิตศาสตร์",
      subjectCode:"2010666",
      currentRoom:"1.1",
      total_student:20,
      subjectStatus:2
  },
  {
      subjectName:"บัญชีและการจัดการ",
      subjectCode:"1010345",
      currentRoom:"3.2",
      total_student:20,
      subjectStatus:1
  },
  {
      subjectName:"การวิเคราะห์การตลาด",
      subjectCode:"1010645",
      currentRoom:"1.3",
      total_student:20,
      subjectStatus:1
  },
]

export const cardData: CardHorizontalProp[] = [
{
  img: "/images/event.jpg",
  topic: "งานกิจกรรมล่าสุด",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  category: "history",
  date: "10/10/24",
},
{
  img: "/images/event.jpg",
  topic: "รางวัลที่ได้รับ",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  category: "history",
  date: "10/10/24",
},
{
  img: "/images/event.jpg",
  topic: "งานประจำปี",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  category: "history",
  date: "10/10/24",
},
];
