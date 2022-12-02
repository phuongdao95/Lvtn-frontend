import React, { useCallback, useMemo } from "react";
import isHotkey from "is-hotkey";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import { Editor, Transforms, createEditor } from "slate";
import { withHistory } from "slate-history";
import { FormatBold, FormatItalic, FormatUnderlined, Code, FormatListNumbered, FormatListBulleted, FormatQuote } from "@mui/icons-material";
import { Button } from "./RTEComponents";
import { Box } from "@mui/system";

const HOTKEYS = {
    "mod+b": "bold",
    "mod+i": "italic",
    "mod+u": "underline",
    "mod+`": "code"
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];


export const initialValue = [{
    type: 'paragraph',
    children: [{ text: '' }],
}]

const RichTextEditor = ({ value, onChange }) => {
    const renderElement = useCallback(props => <Element {...props} />, []);
    const renderLeaf = useCallback(props => <Leaf {...props} />, []);
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);

    return (
        <Box sx={{ border: '1px solid rgba(0,0,0,0.5)', position: 'relative', maxWidth: 800 }}>
            <Slate editor={editor} value={value} onChange={onChange}>
                <Box sx={{ padding: 0.3, position: 'sticky', top: 0, zIndex: 100, background: 'white' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 0.75 }}>
                        <MarkButton format="bold" icon="format_bold" />
                        <MarkButton format="italic" icon="format_italic" />
                        <MarkButton format="underline" icon="format_underlined" />
                        <MarkButton format="code" icon="code" />
                        <BlockButton format="heading-one" icon="looks_one" />
                        <BlockButton format="heading-two" icon="looks_two" />
                        <BlockButton format="block-quote" icon="format_quote" />
                        <BlockButton format="numbered-list" icon="format_list_numbered" />
                        <BlockButton format="bulleted-list" icon="format_list_bulleted" />
                    </Box>
                </Box>

                <Box sx={{ borderTop: '1px solid rgba(0,0,0,0.5)', padding: 1, maxHeight: 400, overflow: 'auto' }}>
                    <Editable
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        placeholder="Enter some rich text…"
                        spellCheck
                        autoFocus
                        onKeyDown={event => {
                            for (const hotkey in HOTKEYS) {
                                if (isHotkey(hotkey, event)) {
                                    event.preventDefault();
                                    const mark = HOTKEYS[hotkey];
                                    toggleMark(editor, mark);
                                }
                            }
                        }}
                    />
                </Box>
            </Slate>
        </Box>
    );
};

const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(editor, format);
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
        match: n => LIST_TYPES.includes(n.type),
        split: true
    });

    Transforms.setNodes(editor, {
        type: isActive ? "paragraph" : isList ? "list-item" : format
    });

    if (!isActive && isList) {
        const block = { type: format, children: [] };
        Transforms.wrapNodes(editor, block);
    }
};

const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        Editor.addMark(editor, format, true);
    }
};

const isBlockActive = (editor, format) => {
    const [match] = Editor.nodes(editor, {
        match: n => n.type === format
    });

    return !!match;
};

const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }) => {
    switch (element.type) {
        case "block-quote":
            return <blockquote {...attributes}>{children}</blockquote>;
        case "bulleted-list":
            return <ul {...attributes}>{children}</ul>;
        case "heading-one":
            return <h1 {...attributes}>{children}</h1>;
        case "heading-two":
            return <h2 {...attributes}>{children}</h2>;
        case "list-item":
            return <li {...attributes}>{children}</li>;
        case "numbered-list":
            return <ol {...attributes}>{children}</ol>;
        default:
            return <p {...attributes}>{children}</p>;
    }
};

const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>;
    }

    if (leaf.code) {
        children = <code>{children}</code>;
    }

    if (leaf.italic) {
        children = <em>{children}</em>;
    }

    if (leaf.underline) {
        children = <u>{children}</u>;
    }

    return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon }) => {
    const editor = useSlate();
    return (
        <Button
            active={isBlockActive(editor, format)}
            onMouseDown={event => {
                event.preventDefault();
                toggleBlock(editor, format);
            }}
        >
            {getIconFromCode(icon) ?? icon}
        </Button>
    );
};

const MarkButton = ({ format, icon }) => {
    const editor = useSlate();

    return (
        <Button
            active={isMarkActive(editor, format)}
            onMouseDown={event => {
                event.preventDefault();
                toggleMark(editor, format);
            }}
        >
            {getIconFromCode(icon) ?? icon}
        </Button>
    );
};


const getIconFromCode = (code) => {
    switch (code) {
        case 'format_bold':
            return <FormatBold fontSize="small" />
        case 'format_italic':
            return <FormatItalic fontSize="small" />;
        case 'format_underlined':
            return <FormatUnderlined fontSize="small" />;
        case 'code':
            return <Code fontSize="small" />;
        case 'looks_one':
            return <span style={{
                display: 'inline-block',
                margin: '0 3px',
                verticalAlign: 'top',
                lineHeight: '22px'
            }}>h1</span>;
        case 'looks_two':
            return <span

                style={{
                    display: 'inline-block',
                    margin: '0 3px',
                    verticalAlign: 'top',
                    lineHeight: '22px'
                }}>h2</span>;
        case 'format_list_numbered':
            return <FormatListNumbered fontSize="small" />;
        case 'format_list_bulleted':
            return <FormatListBulleted fontSize="small" />;
        case 'format_quote':
            return <FormatQuote fontSize="small" />
    }
}


export default RichTextEditor;
