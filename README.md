## ✍ Code Convention

- api url : dash case
- model : Pascal case
- file : camel case
- 변수 : camel case
- function: camel case, 동사+명사

<br>

## 🐱 Git Rule

- 선빵필승. 뒤에 commit하는사람이 conflict 해결해서 commit하기
- commit convention
  - feat : 새로운 기능 추가
  - fix : 버그 수정
  - edit : 기능 수정
  - docs : 문서 수정
  - style : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
  - refactor : 코드 리팩토링
  - test : 테스트 코드, 리팩토링 테스트 코드 추가
  - chore : 빌드 업무 수정, 패키지 매니저 수정
  - merge: pull 받은 후 바로 푸시를 해야될 경우
  - mig: migration
  - 제목은 50자 미만, 문장의 끝에 마침표 넣지 않음. 과거 시제 사용하지 않고, 명령어로 작성하도록 함.
  - 제목 외에 추가적으로 정보를 전달하고 싶을 경우 본문에 추가 정보 기입
  > 예시 : [feat] comment router CRUD 기능 추가 :  본인 이름
- 각 기능 브랜치에서 작업 후 push —> develop 브랜치에 merge는 pull requests를 통해서 하기.
  - 모든 pull requests는 팀원들의 확인 후 merge
  - 이슈가 생길 시 issue 탭 활용