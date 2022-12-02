import React from "react";
import ReactDOM from "react-dom";

export const Button = React.forwardRef(
    ({ className, active, reversed, ...props }, ref) => (
        <span
            {...props}
            ref={ref}
            style={{
                padding: 0,
                cursor: 'pointer',
                color: `${reversed ? active ? "white" : "#aaa" : active ? "black" : "#ccc"}`
            }}
        />
    )
);

export const EditorValue = React.forwardRef(
    ({ className, value, ...props }, ref) => {
        const textLines = value.document.nodes
            .map(node => node.text)
            .toArray()
            .join("\n");
        return (
            <div
                ref={ref}
                {...props}
                style={{
                    margin: '30px -20px 0'
                }}
            >
                <div
                    style={{
                        fontSize: '14px',
                        padding: '5px 20px',
                        color: '#404040',
                        borderTop: '2px solid #eeeeee',
                        background: '#f8f8f8'
                    }}
                >
                    Slate's value as text
                </div>
                <div
                    style={{
                        color: '#404040',
                        font: '12px monospace',
                        whiteSpace: 'pre-wrap',
                        padding: '10px 20px',
                    }}
                >
                    {textLines}
                </div>
            </div>
        );
    }
);

export const Icon = React.forwardRef(({ className, ...props }, ref) => (
    <span
        {...props}
        ref={ref}
    />
));

export const Instruction = React.forwardRef(({ className, ...props }, ref) => (
    <div
        {...props}
        ref={ref}
        className={
            {
                whiteSpace: 'pre-wrap',
                margin: '0 -20px 10px',
                padding: '10px 20px',
                fontSize: '14px',
                background: '#f8f8f8'
            }
        }
    />
));

export const Menu = React.forwardRef(({ className, ...props }, ref) => (
    <div
        {...props}
        ref={ref}
    />
));

export const Portal = ({ children }) => {
    return ReactDOM.createPortal(children, document.body);
};

export const Toolbar = React.forwardRef(({ className, ...props }, ref) => (
    <Menu
        {...props}
        ref={ref}
    />
));
