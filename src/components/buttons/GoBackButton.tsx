import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, ButtonProps } from "@yakad/ui";
import { Symbol } from "@yakad/symbols";

export const GoBackButton = forwardRef<HTMLButtonElement, ButtonProps>(
    function GoBackButton(
        { title, icon, onClick, children, ...restProps },
        ref
    ) {
        const navigate = useNavigate();

        const handleGoBack = () => {
            navigate(-1);
        };

        return (
            <Button
                ref={ref}
                title={title || "Go back"}
                icon={icon || <Symbol icon="arrow_back" />}
                onClick={(e) => {
                    handleGoBack();
                    onClick?.(e);
                }}
                {...restProps}
            >
                {children}
            </Button>
        );
    }
);
