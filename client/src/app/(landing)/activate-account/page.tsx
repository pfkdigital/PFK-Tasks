import React from 'react';
import InputOTPForm from "@/components/sign-up-form/activation-code-form";

const ActivateAccount = () => {
    return (
        <div className={"min-h-screen flex justify-center items-center"}>
            <InputOTPForm/>
        </div>
    );
};

export default ActivateAccount;