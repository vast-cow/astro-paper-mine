import en from "./en";
import type { UIStrings } from "../types";

// The Japanese deployment supplies its existing localized strings on its
// language branch. Keep this shared addition localized when the branch uses ja.
export default {
  ...en,
  post: {
    ...en.post,
    comments: "コメント",
  },
} satisfies UIStrings;
