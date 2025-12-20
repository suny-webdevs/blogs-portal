import Image from "@tiptap/extension-image"
import { mergeAttributes } from "@tiptap/core"

export const LinkedImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),

      href: {
        default: null,
        parseHTML: (element) =>
          element.querySelector("a")?.getAttribute("href"),
        renderHTML: (attributes) => {
          if (!attributes.href) {
            return {}
          }
          return { href: attributes.href }
        },
      },
    }
  },

  renderHTML({ HTMLAttributes }) {
    const { href, ...imgAttrs } = HTMLAttributes

    if (href) {
      return [
        "a",
        { href, target: "_blank", rel: "noopener noreferrer" },
        ["img", mergeAttributes(imgAttrs)],
      ]
    }

    return ["img", mergeAttributes(imgAttrs)]
  },
})
