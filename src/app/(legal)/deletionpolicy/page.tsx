"use client";
import styles from "./deletionpolicyPage.module.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

const DeletionpolicyPage = () => {
  return (
    <div className={cn("container")}>
      <h1>계정 및 데이터 삭제 정책</h1>
      <h2>1. 계정 삭제와 관련된 내용</h2>
      <p>계정을 삭제하려면 앱을 실행하고 다음 단계를 따르세요:</p>
      <ol>
        <li>프로필 페이지로 이동합니다.</li>
        <li>
          <strong>계정 삭제</strong>를 클릭합니다.
        </li>
        <li>
          계정 삭제 페이지에서 계정 삭제 이유를 선택한 후 삭제 버튼을
          클릭합니다.
        </li>
        <li>삭제 확인 메시지에 동의하여 계정을 삭제할 수 있습니다.</li>
      </ol>
      <p>
        계정 삭제 시, 데이터는 즉시 삭제되며, 법적으로 요구되는 경우 일정 기간
        보관될 수 있습니다.
      </p>
      <h2>2. 데이터 삭제 요청 방법</h2>
      <p>계정을 삭제하지 않고 데이터 삭제를 요청하려면 다음 단계를 따르세요:</p>
      <ol>
        <li>자신이 올린 게시물을 삭제할 수 있는 기능을 사용하세요.</li>
        <li>
          삭제하려는 게시물에서 <strong>삭제</strong> 버튼을 클릭한 후, 확인
          메시지에 동의하여 삭제를 완료하세요.
        </li>
      </ol>
      <br />
      <strong>문의하기</strong>
      <p>
        계정 및 데이터 삭제 정책에 관한 질문이나 제안 사항이 있으시면
        <a
          href="mailto:dapjiofficial@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          dapjiofficial@gmail.com
        </a>
        으로 서비스 제공자에게 문의해 주시기 바랍니다.
      </p>
    </div>
  );
};

export default DeletionpolicyPage;
