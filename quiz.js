var currentQuestionIndex = 0;
var numCorrect = 0; // 정답 수를 저장할 변수 추가

var myQuestions = [
  {
    question: "다음 중 <O-NEW-NOTE>에서 선공개하지 않은 곡은?",
    answers: {
      a: ' Caramel',
      b: ' Paradise',
      c: ' 기억을 걷다',
      d: ' Anywhere'
    },
    correctAnswer: 'c',
    explanation: {
      correct: '',
      incorrect: ''
    },
    type: 'multipleChoice' // 문제 타입 추가
  },
  {
    question: "마누라 자랑은?",
    correctAnswer: '내 특기',
    explanation: '',
    type: 'shortAnswer'
  },
  {
    question: "다음 중 <바라던바다>에서 진기가 들은 말이 아닌 것은?",
    answers: {
      a: ' 여시',
      b: ' 나 온유 좋아하네',
      c: ' 학창시절 첫사랑 만나는 기분이야',
      d: ' 쟤는 아티스트다'
    },
    correctAnswer: 'd',
    explanation: {
      correct: '',
      incorrect: ''
    },
    type: 'multipleChoice'
  },
  {
    question: "다음 중 온유가 바라던바다에서 부른 곡은?",
    answers: {
      a: ' 부디',
      b: ' 다시 사랑한다 말할까',
      c: ' 너의 모든 순간',
      d: ' 스토커'
    },
    correctAnswer: 'b',
    explanation: {
      correct: '',
      incorrect: ''
  },
    type: 'multipleChoice'
  },
  {
    question: "진기의 고3 2학기 중간고사 평균점수는?",
    answers: {
      a: ' 98.7',
      b: ' 97.8',
      c: ' 99.1',
      d: ' 95.4'
    },
    correctAnswer: 'a',
    explanation: {
      correct: '',
      incorrect: ''
    },
    type: 'multipleChoice'
  },
  {
    question: "지금까지 발매된 온유의 한국 솔로앨범 수는?",
    correctAnswer: '3',
    explanation: '',
    type: 'shortAnswer'
  },
  {
    question: "다음 중 이작명씨가 작명한 이름이 아닌 것은?",
    answers: {
      a: ' 안시몬스마기',
      b: ' 이대기',
      c: ' 찜기',
      d: ' 진기방기'
    },
    correctAnswer: 'b',
    explanation: {
      correct: '',
      incorrect: ''
    },
    type: 'multipleChoice'
  },
  {
    question: "DICE 티징 당시 가장 처음 공개된 하이라이트 클립은?",
    correctAnswer: '여우비',
    explanation: '',
    type: 'shortAnswer'
  },
  {
    question: "다음 중 진기가 코스프레 한 적 없는 캐릭터는?",
    answers: {
      a: ' 처키',
      b: ' 펭귄맨',
      c: ' 마스크',
      d: ' 프랑켄슈타인'
    },
    correctAnswer: 'a',
    explanation: {
      correct: '',
      incorrect: ''
    },
    type: 'multipleChoice'
  },
  {
    question: "I _ U ♡",
    correctAnswer: 'O',
    explanation: '',
    type: 'shortAnswer'
  },
];

function showQuestion(questionIndex) {
  var question = myQuestions[questionIndex];
  document.getElementById('question').textContent = question.question;

  if (question.type === 'multipleChoice') {
    document.getElementById('choices').style.display = '';
    document.getElementById('text-answer').style.display = 'none';
    document.getElementById('label-a').textContent = question.answers.a;
    document.getElementById('label-b').textContent = question.answers.b;
    document.getElementById('label-c').textContent = question.answers.c;
    document.getElementById('label-d').textContent = question.answers.d;
  } else if (question.type === 'shortAnswer') {
    document.getElementById('choices').style.display = 'none';
    document.getElementById('text-answer').style.display = 'block';
  }

  // 문제가 마지막 문제인지 확인
  if (questionIndex === myQuestions.length - 1) {
    // 마지막 문제일 경우, '다음' 버튼 대신 '결과 확인' 버튼을 표시
    document.getElementById('check').style.display = 'block'; // 정답 확인 버튼 표시
    document.getElementById('next').style.display = 'none'; // '다음' 버튼 숨김
    document.getElementById('results-button').style.display = 'none'; // '결과 확인' 버튼 숨김
  } else {
    document.getElementById('check').style.display = 'block'; // 정답 확인 버튼 표시
    document.getElementById('next').style.display = 'none'; // '다음' 버튼 숨김
  }

  document.getElementById('explanation').style.display = 'none';
  document.getElementById('feedback').textContent = '';
  document.getElementById('results').style.display = 'none'; // 결과 확인 버튼 숨김
  document.getElementById('check').disabled = false; // 정답 확인 버튼 활성화
}


function checkAnswer() {
  var question = myQuestions[currentQuestionIndex];
  var userAnswer;

  if (question.type === 'multipleChoice') {
    var radios = document.getElementsByName('choice');
    for (var i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked) {
        userAnswer = radios[i].id.replace('choice-', '');
        break;
      }
    }
    // 선택한 라디오 버튼이 없는 경우 함수를 종료
    if (userAnswer === undefined) {
      return;
    }
  } else if (question.type === 'shortAnswer') {
    userAnswer = document.getElementById('text-answer').value;
  }

  // 정답 체크 및 피드백 제공
  if (userAnswer === question.correctAnswer) {
    document.getElementById('feedback').textContent = '정답이에요:)';
    numCorrect++; // 정답을 맞췄을 때, 정답 수를 증가

    // 정답을 맞췄을 때 이미지 변경
    document.getElementById('gif-image').src = 'correct_edit.gif';  // 'correct_answer.gif'를 실제 이미지 파일 경로로 변경
  } else {
    if (question.type === 'multipleChoice') {
      var correctAnswerText = question.answers[question.correctAnswer];
      document.getElementById('feedback').textContent = '틀렸어요;-; 정답은 ' + correctAnswerText + '입니다.';
    } else {
      document.getElementById('feedback').textContent = '틀렸어요;-; 정답은 ' + question.correctAnswer + '입니다.';
    }

    // 정답을 틀렸을 때 이미지 변경
    document.getElementById('gif-image').src = 'wrong_edit.gif';  // 'incorrect_answer.gif'를 실제 이미지 파일 경로로 변경
  }

  // 다음 버튼과 설명을 보이게 함
  if (currentQuestionIndex === myQuestions.length - 1) {
    // 마지막 문제일 경우, '다음' 버튼 대신 '결과 확인' 버튼을 표시
    document.getElementById('check').style.display = 'none'; // 정답 확인 버튼 숨김
    document.getElementById('next').style.display = 'none'; // '다음' 버튼 숨김
    document.getElementById('results-button').style.display = ''; // '결과 확인' 버튼 표시
  } else {
    document.getElementById('next').style.display = ''; // '다음' 버튼 표시
    document.getElementById('check').style.display = 'none'; // 정답 확인 버튼 숨김
  }

  if (typeof question.explanation === 'object') {
    document.getElementById('explanation').textContent = userAnswer === question.correctAnswer ? question.explanation.correct : question.explanation.incorrect;
  } else {
    document.getElementById('explanation').textContent = question.explanation;
  }
}


function nextQuestion() {
  document.getElementById('gif-image').src = 'test_edit.gif';
  if (myQuestions[currentQuestionIndex].type === 'multipleChoice') {
    document.getElementById('choice-a').checked = false;
    document.getElementById('choice-b').checked = false;
    document.getElementById('choice-c').checked = false;
    document.getElementById('choice-d').checked = false;
  } else if (myQuestions[currentQuestionIndex].type === 'shortAnswer') {
    document.getElementById('text-answer').value = '';
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < myQuestions.length) {
    showQuestion(currentQuestionIndex);
    if (currentQuestionIndex === myQuestions.length - 1) {
      // 현재 문제가 마지막 문제인 경우 '정답 확인' 버튼 표시
      document.getElementById('next').style.display = 'none';
      document.getElementById('check').style.display = 'block'; // 수정된 부분
      document.getElementById('results').style.display = 'none';
    }
  } else {
    document.getElementById('next').style.display = 'none';
    document.getElementById('results').style.display = '';
  }
}




function showResults() {
    var resultElement = document.getElementById('result');
    var quizContainerElement = document.getElementById('quiz-container');
    var resultImageElement = document.getElementById('result-image'); // 이미지 요소 선택

    // 퀴즈 점수를 계산
    var score = numCorrect / myQuestions.length * 100;

    resultElement.textContent = '당신이 맞힌 정답 수: ' + numCorrect + '/' + myQuestions.length + ', 점수: ' + score.toFixed(2) + '%';

    // 이미지 소스 설정 및 이미지 보이게 하기
    resultImageElement.src = 'yeah.gif'; // 이미지 파일 경로를 실제 경로로 변경
    resultImageElement.style.display = 'block'; // 이미지를 보이게 함

    // 퀴즈 컨테이너를 숨기고 결과를 표시
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('results').style.display = 'flex';  // '결과 확인' 요소를 flex로 설정

    // '결과 확인' 버튼 숨기기
    document.getElementById('results-button').style.display = 'none';
}


window.onload = function() {
    showQuestion(currentQuestionIndex);
    
    // '결과 확인' 버튼에 이벤트 리스너 추가
    document.getElementById('results-button').addEventListener('click', showResults);

};

    var quizContainerElement = document.getElementById('quiz-container');
    var resultImageElement = document.getElementById('result-image'); // 이미지 요소 선택

    // 퀴즈 점수를 계산
    var score = numCorrect / myQuestions.length * 100;

    resultElement.textContent = '당신이 맞힌 정답 수: ' + numCorrect + '/' + myQuestions.length + ', 점수: ' + score.toFixed(2) + '%';

    // 이미지 소스 설정 및 이미지 보이게 하기
    resultImageElement.src = 'yeah.gif'; // 이미지 파일 경로를 실제 경로로 변경
    resultImageElement.style.display = 'block'; // 이미지를 보이게 함

    // 퀴즈 컨테이너를 숨기고 결과를 표시
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('results').style.display = 'flex';  // '결과 확인' 요소를 flex로 설정

    // '결과 확인' 버튼 숨기기
    document.getElementById('results-button').style.display = 'none';


window.onload = function() {
    showQuestion(currentQuestionIndex);
    
    // '결과 확인' 버튼에 이벤트 리스너 추가
    document.getElementById('results-button').addEventListener('click', showResults);

};