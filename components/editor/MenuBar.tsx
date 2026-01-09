"use client"

import "./styles.css"
import { Editor, useEditorState } from "@tiptap/react"
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"
// import Highlight from "@tiptap/extension-highlight"
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  ImageIcon,
  Italic,
  Link,
  List,
  ListOrdered,
  MessageSquareQuote,
  PenOff,
  Pilcrow,
  Redo,
  SeparatorHorizontal,
  Strikethrough,
  TextWrap,
  Underline,
  Undo,
} from "lucide-react"
import { ButtonGroup } from "../ui/button-group"
import { Button } from "../ui/button"
import uploadImage from "@/lib/uploadImage"
import { toast } from "sonner"

const MenuBar = ({ editor }: { editor: Editor }) => {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        isStrike: ctx.editor.isActive("strike") ?? false,
        isUnderline: ctx.editor.isActive("underline") ?? false,
        isCode: ctx.editor.isActive("code") ?? false,
        isHighlight: ctx.editor.isActive("highlight") ?? false,
        isParagraph: ctx.editor.isActive("paragraph") ?? false,
        isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
        isBulletList: ctx.editor.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor.isActive("orderedList") ?? false,
        isCodeBlock: ctx.editor.isActive("codeBlock") ?? false,
        isBlockquote: ctx.editor.isActive("blockquote") ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
        isImageSelected: ctx.editor.isActive("image"),
      }
    },
  })

  const addLink = () => {
    const url = prompt("Enter URL")
    if (!url) return

    const isImageSelected = editor.isActive("image")
    if (isImageSelected) {
      editor
        .chain()
        .focus()
        .updateAttributes("image", {
          href: url || null,
        })
        .run()
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
  }

  const addImage = async () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"

    input.onchange = async () => {
      if (!input.files?.length) return

      const file = input.files[0]

      try {
        const imageUrl = await uploadImage(file)
        if (!editor || editor.isDestroyed) return
        editor.chain().focus().setImage({ src: imageUrl }).run()
      } catch (error) {
        console.error(error)
        toast.error("Image upload failed")
      }
    }

    input.click()
  }

  if (!editor) return null

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <ToggleGroup
        type="multiple"
        variant="outline"
      >
        <ToggleGroupItem
          value="bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editorState.isBold ? "is-active" : ""}
        >
          <Bold />
        </ToggleGroupItem>

        <ToggleGroupItem
          value="italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editorState.isItalic ? "is-active" : ""}
        >
          <Italic />
        </ToggleGroupItem>

        <ToggleGroupItem
          value="strike"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editorState.isStrike ? "is-active" : ""}
        >
          <Strikethrough />
        </ToggleGroupItem>

        <ToggleGroupItem
          value="underline"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editorState.isUnderline ? "is-active" : ""}
        >
          <Underline />
        </ToggleGroupItem>

        <ToggleGroupItem
          value="code"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={editorState.isCode ? "is-active" : ""}
        >
          <Code />
        </ToggleGroupItem>

        <ToggleGroupItem
          value="highlight"
          onClick={() =>
            editor.chain().focus().toggleHighlight({ color: "#fdeb80" }).run()
          }
          className={editorState.isHighlight ? "is-active" : ""}
        >
          <Highlighter />
        </ToggleGroupItem>
      </ToggleGroup>

      <ToggleGroup
        type="multiple"
        variant="outline"
      >
        <ToggleGroupItem
          value="paragraph"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editorState.isParagraph ? "is-active" : ""}
        >
          <Pilcrow />
        </ToggleGroupItem>

        <ToggleGroupItem
          value="h1"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={editorState.isHeading1 ? "is-active" : ""}
        >
          <Heading1 />
        </ToggleGroupItem>

        <ToggleGroupItem
          value="h2"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={editorState.isHeading2 ? "is-active" : ""}
        >
          <Heading2 />
        </ToggleGroupItem>

        <ToggleGroupItem
          value="h3"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={editorState.isHeading3 ? "is-active" : ""}
        >
          <Heading3 />
        </ToggleGroupItem>
      </ToggleGroup>

      <ToggleGroup
        type="multiple"
        variant="outline"
      >
        <ToggleGroupItem
          value="bullet-list"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editorState.isBulletList ? "is-active" : ""}
        >
          <List />
        </ToggleGroupItem>

        <ToggleGroupItem
          value="ordered-list"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editorState.isOrderedList ? "is-active" : ""}
        >
          <ListOrdered />
        </ToggleGroupItem>

        <ToggleGroupItem
          value="blockquote"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editorState.isBlockquote ? "is-active" : ""}
        >
          <MessageSquareQuote />
        </ToggleGroupItem>
      </ToggleGroup>

      <ButtonGroup>
        <Button
          variant="outline"
          onClick={addLink}
          className="cursor-pointer"
        >
          <Link />
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={addImage}
          className="cursor-pointer"
        >
          <ImageIcon />
        </Button>
      </ButtonGroup>

      <ButtonGroup>
        <Button
          variant="outline"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="cursor-pointer"
        >
          <SeparatorHorizontal />
        </Button>
        <Button
          variant="outline"
          onClick={() => editor.chain().focus().setHardBreak().run()}
          className="cursor-pointer"
        >
          <TextWrap />
        </Button>
        <Button
          variant="outline"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editorState.canUndo}
          className="cursor-pointer"
        >
          <Undo />
        </Button>
        <Button
          variant="outline"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editorState.canRedo}
          className="cursor-pointer"
        >
          <Redo />
        </Button>
        <Button
          variant="outline"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          className="cursor-pointer"
        >
          <PenOff />
        </Button>
      </ButtonGroup>
    </div>
  )
}

export default MenuBar
