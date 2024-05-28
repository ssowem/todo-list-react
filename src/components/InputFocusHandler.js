import React, { useEffect } from 'react'

function InputFocusHandler() {

    useEffect(() => {
        const handleFocus = () => {
            document.body.classList.add('fixed');
        };

        const handleBlur = () => {
            document.body.classList.remove('fixed');
        };

        // 포커스인or 포커스아웃 되었을 때: 이벤트 리스너 추가 
        document.addEventListener('focusin', handleFocus);
        document.addEventListener('focusout', handleBlur);

        // 언마운트 될때: 정리함수로 이벤트 리스너 제거
        return () => {
            document.removeEventListener('focusin', handleFocus);
            document.removeEventListener('focusout', handleBlur);
        }
    }, []);

}

export default InputFocusHandler;