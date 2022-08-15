
export default function Schema() {
    const schema = ['INFP', 'ENFP', 'INFJ', 'ENFJ', 'INTJ', 'ENTJ', 'INTP', 'ENTP', 'ISFP', 'ESFP', 'ISTP', 'ESTP', 'ISFJ', 'ESFJ', 'ISTJ', 'ESTJ']
    return <div>{schema.map(mbti => <button key={mbti}>{mbti}</button>)}</div>;
  }
  