/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import MenuBar from "./MenuBar"
import Heading from "@tiptap/extension-heading"
import Highlight from "@tiptap/extension-highlight"
import Link from "@tiptap/extension-link"
import { LinkedImage } from "./LinkedImage"

interface TipTapProps {
  id: string
  onChange: (json: any, html: string) => void
}

const Tiptap = ({ id, onChange }: TipTapProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight.configure({ multicolor: true }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: {
          class: "text-blue-600 underline",
        },
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      LinkedImage.configure({
        inline: false,
        allowBase64: true,
      }),
    ],
    content: "<p>Write your content here...</p>",
    editorProps: {
      attributes: {
        class:
          "focus:outline-none min-h-[20rem] border border-input rounded px-4 py-2",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON(), editor.getHTML())
    },
    immediatelyRender: false,
  })

  return (
    <div className="flex flex-col gap-0">
      {editor && <MenuBar editor={editor} />}
      <EditorContent
        editor={editor}
        id={id}
        className="mt-2"
      />
      {/* <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu> */}
      {/* {editor && (
        <BubbleMenu editor={editor}>

        </BubbleMenu>
      )} */}
    </div>
  )
}

export default Tiptap
