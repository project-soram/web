import styles from "./privacyPage.module.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

const Privacypage = () => {
  return (
    <div className={cn("container")}>
      <h1>소람 개인정보처리방침</h1>
      <p>
        `소람`(이하 ‘회사’)이 운영하는 ‘소람’ 서비스(이하 ‘서비스’)는 「개인정보
        보호법」 등 관련 법령에 따라 이용자의 개인정보 및 권익을 보호하고, 이와
        관련한 고충을 원활하게 처리할 수 있도록 다음과 같이 개인정보처리방침을
        수립·공개합니다.
      </p>

      <div className={cn("section-content")}>
        <h3>제1조 (개인정보의 수집·이용 목적 및 항목, 보유 기간)</h3>
        <p>
          회사는 서비스 제공을 위하여 필요한 최소한의 개인정보를 다음의 목적을
          위해 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는
          이용되지 않으며, 이용 목적이 변경되는 경우에는 「개인정보 보호법」
          제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
        </p>

        {/* 테이블 스타일링을 위해 table 태그 사용 */}
        <table className={cn("privacy-table")}>
          <thead>
            <tr>
              <th>수집·이용 목적</th>
              <th>수집 항목</th>
              <th>보유 및 이용 기간</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>회원가입 및 본인 확인</strong>
              </td>
              <td>
                <strong>[필수]</strong>{" "}
                <strong>단방향 암호화(Hash)된 휴대폰 식별 정보</strong>,
                소셜로그인 제공사로부터의 회원 식별 정보, 닉네임, 성별, 나이대,
                단말기 정보(OS, 기기 고유 식별 번호)
              </td>
              <td>
                <strong>회원 탈퇴 시까지</strong>
                <br />
                (단, 재가입 제한 및 부정 이용 방지를 위해 제3조에 따라 일정 기간
                보관)
              </td>
            </tr>
            <tr>
              <td>
                <strong>핵심 서비스 이용</strong>
              </td>
              <td>
                <strong>[필수]</strong>{" "}
                <strong>음성(텍스트) 답변 데이터</strong>, 프로필 정보(자기소개,
                관심사, <strong>지역 정보(직접 입력한 텍스트)</strong> 등), 연결
                및 채팅 기록, 서비스 이용 기록
              </td>
              <td>
                <strong>회원 탈퇴 시까지</strong>
                <br />
                (단, 재가입 제한 및 부정 이용 방지를 위해 제3조에 따라 일정 기간
                보관)
              </td>
            </tr>
            <tr>
              <td>
                <strong>서비스 품질 향상</strong>
              </td>
              <td>
                <strong>[필수]</strong> 기기 ID, 서비스 이용 내역, 접속 로그, 앱
                내 기능 사용 통계
                <br />
                <strong>[상세 목적]</strong> 서비스 이용 통계 및 데이터 분석을
                통한 서비스 안정화 및 품질 개선
              </td>
              <td>
                <strong>회원 탈퇴 시까지</strong>
              </td>
            </tr>
            <tr>
              <td>
                <strong>부정 이용 방지 및 제재</strong>
              </td>
              <td>
                <strong>[필수]</strong> 닉네임, 회원 식별 정보, 기기 정보, 접속
                기록, 제재 및 이용 제한 기록,{" "}
                <strong>
                  음성 답변 데이터(부적절 콘텐츠 필터링용 STT 변환 텍스트 포함)
                </strong>
              </td>
              <td>
                <strong>
                  제3조(개인정보의 보유·이용 기간 및 파기) 기준에 따름
                </strong>
              </td>
            </tr>
            <tr>
              <td>
                <strong>고객 문의 응대</strong>
              </td>
              <td>
                <strong>[필수]</strong> 닉네임, 문의 내용, 회신을 위한 연락처
                정보(필요시)
              </td>
              <td>
                <strong>회원 탈퇴 시 또는 문의 해결 후 3년 보관</strong>
                <br />
                (전자상거래법 등 관련 법령에 따름)
              </td>
            </tr>
            <tr>
              <td>
                <strong>이벤트 참여 및 마케팅 정보 안내 (선택)</strong>
              </td>
              <td>
                <strong>[선택]</strong> 닉네임, 휴대폰 번호, 경품 배송지
                정보(필요시)
              </td>
              <td>
                <strong>동의 철회 또는 회원 탈퇴 시까지</strong>
              </td>
            </tr>
          </tbody>
        </table>

        <br />
        <strong>[안내 사항]</strong>
        <ul>
          <li>
            회사는 만 19세 미만 아동 및 청소년에게 본 서비스를 제공하지 않으며,
            관련 개인정보를 의도적으로 수집하지 않습니다.
          </li>
          <li>
            서비스 이용 과정에서 이용자가 개인정보를 직접 입력하거나, 기기 정보
            등이 자동으로 생성·수집될 수 있습니다.
          </li>
          <li>
            <strong>휴대폰 번호 처리 안내:</strong> 회원가입 시 본인 인증을 위해
            사용된 휴대폰 번호는 인증 목적으로만 활용되며, 회사 데이터베이스에는
            복호화가 불가능한 <strong>단방향 암호화(Hash)된 값</strong>으로만
            저장됩니다.
          </li>
        </ul>
      </div>

      <div className={cn("section-content")}>
        <h3>제2조 (개인정보 자동 수집 장치의 설치·운영 및 거부)</h3>
        <p>
          회사는 서비스 이용 과정에서 접속 IP 정보, 서비스 이용 기록, 기기 정보
          등이 자동으로 생성되어 수집될 수 있습니다. 이는 서비스 품질 개선 및
          부정 이용 방지를 위해 사용되며, 이용자는 아래와 같은 방법으로 자동
          수집 일부를 거부할 수 있습니다.
        </p>
        <ul>
          <li>
            <strong>Android:</strong> 설정 → 개인정보 보호 → 광고 ID 재설정 또는
            삭제
          </li>
          <li>
            <strong>iOS:</strong> 설정 → 개인정보보호 및 보안 → 추적 → 앱이
            추적을 요청하도록 허용 끔
          </li>
        </ul>
        <p>※ 단, 거부 시 일부 서비스 이용에 어려움이 발생할 수 있습니다.</p>
      </div>

      <div className={cn("section-content")}>
        <h3>제3조 (개인정보의 보유·이용 기간 및 파기)</h3>
        <ol>
          <li>
            회사는 법령에 따른 개인정보 보유·이용 기간 또는 이용자로부터
            개인정보를 수집 시에 동의받은 보유·이용 기간 내에서 개인정보를
            처리·보유합니다.
          </li>
          <li>
            개인정보 처리 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
            단, 다음의 정보에 대해서는 아래의 사유로 명시한 기간 동안
            보존합니다.
          </li>
        </ol>

        <h4>1. 회사 내부 방침에 의한 정보 보유</h4>
        <ul>
          <li>
            <strong>일반 회원 탈퇴 시 (재가입 제한 목적)</strong>
            <ul>
              <li>보존 이유: 무분별한 탈퇴/재가입 반복 방지</li>
              <li>
                보존 기간: <strong>탈퇴 후 30일</strong>
              </li>
            </ul>
          </li>
          <li>
            <strong>부정 이용 및 제재 내역이 있는 경우</strong>
            <ul>
              <li>
                보존 이유: 부정 이용 방지 및 서비스 내 질서 유지, 분쟁 해결
              </li>
              <li>
                보존 항목: 단방향 암호화된 식별 정보(CI/DI/Hash), 징계 기록
              </li>
              <li>
                보존 기간: <strong>탈퇴 후 1년</strong>
              </li>
            </ul>
          </li>
          <li>
            <strong>휴면 계정 관리</strong>
            <ul>
              <li>
                1년간 서비스를 이용하지 않은 회원의 개인정보는 별도로 분리하여
                안전하게 보관합니다.
              </li>
            </ul>
          </li>
        </ul>

        <h4>2. 관련 법령에 따른 의무 보유 기간</h4>
        <ul>
          <li>
            계약 또는 청약철회 등에 관한 기록: 5년 (전자상거래 등에서의
            소비자보호에 관한 법률)
          </li>
          <li>
            대금결제 및 재화 등의 공급에 관한 기록: 5년 (전자상거래 등에서의
            소비자보호에 관한 법률)
          </li>
          <li>
            소비자의 불만 또는 분쟁처리에 관한 기록: 3년 (전자상거래 등에서의
            소비자보호에 관한 법률)
          </li>
          <li>접속에 관한 기록: 3개월 (통신비밀보호법)</li>
        </ul>

        <p>
          ③ 파기 절차 및 방법: 전자적 파일 형태는 기록을 재생할 수 없는 기술적
          방법을 사용하며, 종이 문서는 분쇄기로 분쇄하여 파기합니다.
        </p>
      </div>

      <div className={cn("section-content")}>
        <h3>제4조 (개인정보 처리 위탁)</h3>
        <p>
          회사는 원활한 서비스 제공을 위해 다음과 같이 개인정보 처리 업무를 외부
          전문 업체에 위탁하고 있습니다.
        </p>
        <table className={cn("privacy-table")}>
          <thead>
            <tr>
              <th>수탁업체</th>
              <th>위탁업무 내용</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Amazon Web Services, Inc.</strong>
              </td>
              <td>클라우드 서버 운영 및 데이터 보관</td>
            </tr>
            <tr>
              <td>
                <strong>Google LLC / Apple Inc.</strong>
              </td>
              <td>인앱 결제 처리</td>
            </tr>
            <tr>
              <td>
                <strong>Google (FCM) / Apple (APNS)</strong>
              </td>
              <td>서비스 관련 정보 및 푸시 알림 발송</td>
            </tr>
            <tr>
              <td>
                <strong>(주)루나소프트 (Solapi)</strong>
              </td>
              <td>본인 인증을 위한 SMS 발송 대행</td>
            </tr>
            <tr>
              <td>
                <strong>카카오 / 메타(Instagram)</strong>
              </td>
              <td>고객 문의 응대 및 상담 채널 운영</td>
            </tr>
          </tbody>
        </table>
        <p>
          ※ 회사는 위탁 계약 체결 시 관련 법령에 따라 수탁자가 개인정보를
          안전하게 처리하는지 감독하고 있습니다.
        </p>
      </div>

      <div className={cn("section-content")}>
        <h3>제5조 (개인정보의 국외 이전)</h3>
        <p>
          회사는 서비스 내 부적절 콘텐츠 필터링 기능 제공을 위해 다음과 같이
          개인정보를 국외로 이전하고 있습니다.
        </p>
        <table className={cn("privacy-table")}>
          <thead>
            <tr>
              <th>이전받는 자</th>
              <th>이전 목적</th>
              <th>이전되는 개인정보 항목</th>
              <th>이전되는 국가</th>
              <th>보유 및 이용 기간</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Amazon Web Services, Inc.</strong>
              </td>
              <td>
                <strong>
                  음성 데이터의 텍스트 변환(STT) 및 부적절 콘텐츠 필터링
                </strong>
              </td>
              <td>
                <strong>음성 답변 데이터</strong>
              </td>
              <td>
                <strong>미국(USA)</strong>
              </td>
              <td>
                <strong>분석 목적 달성 후 즉시 파기</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={cn("section-content")}>
        <h3>제6조 (개인정보의 안전성 확보 조치)</h3>
        <p>
          회사는 이용자의 개인정보를 안전하게 관리하기 위해 다음과 같은
          기술적·관리적·물리적 조치를 하고 있습니다.
        </p>
        <ul>
          <li>
            <strong>개인정보의 암호화</strong>: 비밀번호, 휴대폰 번호 등 주요
            개인정보는 암호화하여 저장 및 관리합니다.
          </li>
          <li>
            <strong>접근 통제 및 권한 관리</strong>: 개인정보를 처리하는 직원을
            최소화하고, 접근 권한을 차등 부여하여 관리합니다.
          </li>
          <li>
            <strong>해킹 등에 대비한 기술적 대책</strong>: 보안 프로그램을
            설치하고 주기적으로 갱신·점검하며, 외부로부터의 무단 접근을
            통제합니다.
          </li>
          <li>
            <strong>접속 기록 보관</strong>: 개인정보처리시스템에 접속한 기록을
            최소 1년 이상 보관·관리합니다.
          </li>
        </ul>
      </div>

      <div className={cn("section-content")}>
        <h3>제7조 (이용자의 권리·의무 및 행사 방법)</h3>
        <p>
          이용자는 언제든지 등록되어 있는 자신의 개인정보를 조회·수정하거나 회원
          탈퇴를 요청할 수 있습니다. 이는 서비스 내 ‘설정’ 메뉴 또는 고객센터를
          통해 행사할 수 있습니다.
        </p>
      </div>

      <div className={cn("section-content")}>
        <h3>제8조 (개인정보보호 책임자)</h3>
        <p>
          회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 이용자의 불만
          처리 및 피해 구제를 위해 아래와 같이 개인정보보호 책임자를 지정하고
          있습니다.
        </p>
        <ul>
          <li>
            <strong>[개인정보보호 책임자]</strong>
            <br />
            성명 : 이형석
            <br />
            연락처 : 카카오톡 플러스 채널 "소람" (ID: @soram_official) 또는 앱
            내 1:1 문의
          </li>
        </ul>
        <p>
          기타 개인정보 침해에 대한 신고나 상담이 필요하신 경우 아래 기관에
          문의하시기 바랍니다.
        </p>
        <ul>
          <li>
            개인정보침해신고센터 (privacy.kisa.or.kr / 국번없이 118)
            <a
              href="https://privacy.kisa.or.kr"
              target="_blank"
              rel="noopener noreferrer"
            >
              [바로가기]
            </a>
          </li>
          <li>
            개인정보 분쟁조정위원회 (www.kopico.go.kr / 1833-6972)
            <a
              href="https://www.kopico.go.kr"
              target="_blank"
              rel="noopener noreferrer"
            >
              [바로가기]
            </a>
          </li>
          <li>
            대검찰청 사이버수사과 (www.spo.go.kr / 국번없이 1301)
            <a
              href="https://www.spo.go.kr"
              target="_blank"
              rel="noopener noreferrer"
            >
              [바로가기]
            </a>
          </li>
          <li>
            경찰청 사이버수사국 (ecrm.cyber.go.kr / 국번없이 182)
            <a
              href="https://ecrm.cyber.go.kr"
              target="_blank"
              rel="noopener noreferrer"
            >
              [바로가기]
            </a>
          </li>
        </ul>
      </div>

      <div className={cn("section-content")}>
        <h3>제9조 (개인정보처리방침 변경)</h3>
        <p>
          본 개인정보처리방침의 내용 추가, 삭제 및 수정이 있을 경우 시행일 최소
          7일 전에 서비스 내 공지사항을 통해 고지할 것입니다.
        </p>
        <ul>
          <li>공고일자: 2025년 11월 25일</li>
          <li>시행일자: 2025년 12월 2일</li>
        </ul>
      </div>
    </div>
  );
};

export default Privacypage;
