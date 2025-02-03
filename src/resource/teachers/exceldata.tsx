
interface ConvertGradBySubjectId {
    studentCode: string;
    name: string;
    collectScore: number;
    testScore: number;
    affectiveScore: number;
    totalScore: number;
  }
const GenerateMockData = (): ConvertGradBySubjectId[] => {
    const students: ConvertGradBySubjectId[] = [];
    
    for (let i = 1; i <= 10; i++) {
      const firstName = `Student`;
      const lastName = `#${i}`;
      const collectScore = Math.floor(Math.random() * 20) + 1;
      const testScore = Math.floor(Math.random() * 50) + 1;
      const affectiveScore = Math.floor(Math.random() * 30) + 1;
      const totalScore = collectScore + testScore + affectiveScore;
      
      students.push({
        studentCode: `S00${i}`,
        name: `${firstName} ${lastName}`,
        collectScore,
        testScore,
        affectiveScore,
        totalScore,
      });
    }
    
    return students;
  };
  export default GenerateMockData;