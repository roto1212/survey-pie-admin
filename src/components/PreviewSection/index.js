import Card from "../Card";

function PreviewSection({ questions }) {
  return <div>
    {questions.map((question, index) => (
      <Card key={index} title={question.title} desc={question.desc}>
        <div>
          <h1>설문 미리보기</h1>
        </div>
      </Card>
    ))}
  </div>;
}

export default PreviewSection;

